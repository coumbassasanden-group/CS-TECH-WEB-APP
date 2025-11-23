<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { post } = useApi();

// États du formulaire
const email = ref('');
const errors = ref({});
const isSubmitting = ref(false);
const submitStatus = ref(null); // 'success', 'error', null
const submitMessage = ref('');
const formVisible = ref(false);

// Validation du formulaire
const validateForm = () => {
    const newErrors = {};

    // Validation email
    if (!email.value.trim()) {
        newErrors.email = t('newsletter.form.errors.email_required');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            newErrors.email = t('newsletter.form.errors.email_invalid');
        }
    }

    // Nettoyage et mise à jour des erreurs
    Object.keys(errors.value).forEach(key => {
        delete errors.value[key];
    });

    Object.keys(newErrors).forEach(key => {
        errors.value[key] = newErrors[key];
    });

    return Object.keys(newErrors).length === 0;
};

// Réinitialisation du formulaire
const resetForm = () => {
    email.value = '';
    Object.keys(errors.value).forEach(key => {
        delete errors.value[key];
    });
};

// Réinitialisation du statut après un délai
const resetStatusAfterDelay = (delay = 5000) => {
    setTimeout(() => {
        if (submitStatus.value) {
            submitStatus.value = null;
            submitMessage.value = '';
        }
    }, delay);
};

// Nettoyage des erreurs lors de la saisie
const clearFieldError = (fieldName) => {
    if (errors.value[fieldName]) {
        delete errors.value[fieldName];
    }
};

// Soumission du formulaire
const handleSubmit = async (event) => {
    event?.preventDefault();

    // Réinitialiser le statut précédent
    submitStatus.value = null;
    submitMessage.value = '';

    // Validation côté client
    if (!validateForm()) {
        return;
    }

    // Début de la soumission
    isSubmitting.value = true;

    try {
        // Préparation des données
        const cleanedData = {
            email: email.value.trim().toLowerCase()
        };

        // Envoi des données
        const response = await post('/api/newsletters', cleanedData);

        // Gestion du succès
        submitStatus.value = 'success';
        submitMessage.value = response?.message || t('newsletter.form.success');

        // Réinitialiser le formulaire après succès
        resetForm();

        // Analytics tracking (optionnel)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                method: 'newsletter_form',
                company: 'tech'
            });
        }

        // Réinitialiser le statut après 7 secondes pour le succès
        resetStatusAfterDelay(7000);

    } catch (error) {
        // Gestion des erreurs
        submitStatus.value = 'error';

        // Gestion des différents types d'erreurs
        if (error.response) {
            // Erreur de réponse du serveur
            const status = error.response.status;
            const errorData = error.response.data;

            if (status === 422 && errorData.errors) {
                // Erreurs de validation côté serveur
                Object.keys(errorData.errors).forEach(key => {
                    if (errorData.errors[key] && errorData.errors[key].length > 0) {
                        errors.value[key] = errorData.errors[key][0];
                    }
                });
                submitMessage.value = t('newsletter.form.validation_error');
            } else if (status === 429) {
                // Trop de requêtes
                submitMessage.value = t('newsletter.form.rate_limit_error');
            } else if (status >= 500) {
                // Erreur serveur
                submitMessage.value = t('newsletter.form.server_error');
            } else {
                // Autres erreurs
                submitMessage.value = errorData.message || t('newsletter.form.error');
            }
        } else if (error.request) {
            // Erreur de réseau/connexion
            submitMessage.value = t('newsletter.form.network_error');
        } else {
            // Autres erreurs
            submitMessage.value = t('newsletter.form.error');
        }

        console.error('Erreur lors de l\'inscription à la newsletter:', error);

        // Réinitialiser le statut après 10 secondes pour les erreurs
        resetStatusAfterDelay(10000);

    } finally {
        // Fin du chargement
        isSubmitting.value = false;
    }
};

// Gestion des touches clavier (Escape pour réinitialiser)
const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        resetForm();
        submitStatus.value = null;
        submitMessage.value = '';
    }
};

onMounted(() => {
    setTimeout(() => {
        formVisible.value = true;
    }, 100);
    window.addEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div class="newsletter-section">
        <div class="container">
            <div class="newsletter-container">
                <div class="newsletter-card" :class="{ 'form-visible': formVisible }">
                    <div class="newsletter-image">
                        <div class="floating-elements">
                            <div class="floating-element element-1"></div>
                            <div class="floating-element element-2"></div>
                            <div class="floating-element element-3"></div>
                        </div>
                        <img src="~/assets/images/newsletter.png" alt="Newsletter" />
                    </div>

                    <div class="newsletter-form">
                        <div class="newsletter-form-content">
                            <span class="badge">Newsletter</span>

                            <h2 class="newsletter-title">{{ $t('newsletter.form.title') }}</h2>
                            <p class="newsletter-description">{{ $t('newsletter.form.description') }}</p>

                            <!-- Messages de statut -->
                            <div v-if="submitStatus === 'success'"
                                class="alert alert-success mb-15 d-flex align-items-center">
                                <i class="fas fa-check-circle me-2"></i>
                                {{ submitMessage || $t('newsletter.form.success') }}
                            </div>
                            <div v-if="submitStatus === 'error'"
                                class="alert alert-danger mb-15 d-flex align-items-center">
                                <i class="fas fa-exclamation-triangle me-2"></i>
                                {{ submitMessage || $t('newsletter.form.error') }}
                            </div>

                            <transition name="form-fade">
                                <div class="form-container" v-if="!submitStatus">
                                    <div class="input-wrapper">
                                        <div class="input-group" :class="{ 'shake': errors.email }">
                                            <input type="email" v-model="email"
                                                :placeholder="$t('newsletter.form.placeholder')" class="email-input"
                                                :class="{ 'invalid': errors.email }" @input="clearFieldError('email')"
                                                @keyup.enter="handleSubmit" :disabled="isSubmitting" />
                                            <button @click="handleSubmit" class="submit-btn"
                                                :class="{ 'loading': isSubmitting }" :disabled="isSubmitting">
                                                <span class="btn-text">
                                                    {{ isSubmitting ? $t('newsletter.form.sending') :
                                                    $t('newsletter.form.subscribe') }}
                                                </span>
                                                <i class="btn-icon bi bi-send-fill" v-if="!isSubmitting"></i>
                                                <i class="btn-icon bi bi-arrow-repeat spin" v-else></i>
                                            </button>
                                        </div>
                                        <div v-if="errors.email" class="invalid-feedback">
                                            {{ errors.email }}
                                        </div>
                                    </div>
                                    <small>{{ $t('newsletter.form.privacy') }}</small>
                                    <small>{{ $t('newsletter.form.privacy_ask') }}</small>
                                    <p class="mt-4"><a href="mailto:tech@coumbassa-sanden.com">tech@coumbassa-sanden.com</a></p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h3 {
    font-family: var(--cs-family-montserrat);
}

p {
    font-family: var(--cs-family-poppins);
}

p a {
    color: var(--cs-tech-orange-color);
    text-decoration: none;
    font-weight: 700;
}

.newsletter-section {
    padding: 3rem 0;
    background: transparent;
    position: relative;
    overflow: hidden;
}

.newsletter-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: url(../assets/images/bg-hero.png) center center no-repeat; */
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
}

.newsletter-container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
}

.newsletter-card {
    display: flex;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    /* box-shadow: 0 25px 50px rgba(63, 46, 26, 0.12); */
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.newsletter-card.form-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Image side */
.newsletter-image {
    flex: 0.8;
    position: relative;
    overflow: hidden;
    background: var(--cs-tech-orange-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    padding-left: 1%;
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
}

.form-visible .newsletter-image {
    opacity: 1;
    transform: translateX(0);
}

.newsletter-image img {
    width: 100%;
    height: auto;
    object-fit: contain;
    transform: scale(1.05);
    transition: transform 1.5s ease;
    z-index: 2;
}

.form-visible .newsletter-image img:hover {
    transform: scale(1.12);
}

/* Floating elements */
.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.floating-element {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
}

.element-1 {
    width: 120px;
    height: 120px;
    background: var(--cs-tech-light-orange-color);
    top: 10%;
    left: 10%;
    opacity: 0.15;
    animation: float 4s ease-in-out infinite;
}

.element-2 {
    width: 80px;
    height: 80px;
    background: var(--cs-brown-color);
    bottom: 15%;
    right: 10%;
    opacity: 0.1;
    animation: float 2s ease-in-out infinite 1s;
}

.element-3 {
    width: 40px;
    height: 40px;
    background: var(--cs-brown-color);
    top: 60%;
    left: 20%;
    opacity: 0.08;
    animation: float 7s ease-in-out infinite 2s;
}

@keyframes float {
    0% {
        transform: translateY(0) translateX(0);
    }

    50% {
        transform: translateY(-15px) translateX(10px);
    }

    100% {
        transform: translateY(0) translateX(0);
    }
}

/* Form side */
.newsletter-form {
    flex: 1.2;
    padding: 2rem;
    position: relative;
    display: flex;
    align-items: center;
}

.newsletter-form-content {
    width: 100%;
    opacity: 0;
    transform: translateX(30px);
    transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}

.form-visible .newsletter-form-content {
    opacity: 1;
    transform: translateX(0);
}

/* Badge */
.badge {
    background-color: var(--cs-tech-orange-color);
    color: var(--cs-brown-color);
    font-weight: 600;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s;
}

.form-visible .badge {
    opacity: 1;
    transform: translateY(0);
}

/* Text content */
.newsletter-title {
    color: var(--cs-brown-color);
    font-size: 2rem;
    font-family: var(--cs-family-montserrat);
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.3;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.5s ease 0.75s, transform 0.5s ease 0.75s;
}

.newsletter-description {
    color: #666;
    margin-bottom: 2rem;
    font-size: 1rem;
    font-family: var(--cs-family-poppins);
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s;
}

.form-visible .newsletter-title,
.form-visible .newsletter-description {
    opacity: 1;
    transform: translateY(0);
}

/* Form elements */
.form-container {
    margin-top: 2rem;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.5s ease 1.05s, transform 0.5s ease 1.05s;
}

.form-visible .form-container {
    opacity: 1;
    transform: translateY(0);
}

.input-wrapper {
    margin-bottom: 1rem;
}

.input-group {
    display: flex;
    position: relative;
    border-radius: 12px;
    background: transparent !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.input-group:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.input-group.shake {
    animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
    border-color: #FF6B6B;
}

@keyframes shake {

    10%,
    90% {
        transform: translateX(-1px);
    }

    20%,
    80% {
        transform: translateX(2px);
    }

    30%,
    50%,
    70% {
        transform: translateX(-4px);
    }

    40%,
    60% {
        transform: translateX(4px);
    }
}

.email-input {
    flex: 1;
    padding: 1.25rem 1.5rem;
    border: 2px solid #E0E0E0;
    border-radius: 12px;
    font-size: 1rem;
    color: var(--cs-brown-color);
    background: white;
    transition: all 0.3s ease;
}

.email-input:focus {
    outline: none;
    border-color: var(--cs-tech-orange-color);
    box-shadow: 0 0 0 3px rgba(249, 178, 51, 0.2);
}

.email-input.invalid {
    border-color: #FF6B6B;
}

.email-input::placeholder {
    color: #AAA;
    transition: color 0.3s ease, transform 0.3s ease;
}

.email-input:focus::placeholder {
    color: #CCC;
    transform: translateX(5px);
}

.submit-btn {
    position: relative;
    right: 0;
    padding: 1.5rem;
    height: 100%;
    background: var(--cs-tech-orange-color);
    border: none;
    border-radius: 0 12px 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--cs-brown-color);
    font-weight: 600;
    transition: all 0.3s ease;
    overflow: hidden;
}

.submit-btn:hover {
    background: var(--cs-brown-color);
    color: white;
}

.btn-text {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
}

.btn-icon {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
}

.submit-btn:hover .btn-text {
    transform: translateX(-3px);
}

.submit-btn:hover .btn-icon {
    transform: translateX(3px);
}

.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

small {
    color: #888;
    font-size: 0.85rem;
    display: block;
    margin-top: 0.75rem;
    font-family: var(--cs-family-poppins);
}

/* Success message styling */
.success-message {
    text-align: center;
    padding: 2rem 0;
}

.success-icon {
    margin-bottom: 1.5rem;
    transform: scale(0);
    animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes pop-in {
    0% {
        transform: scale(0);
    }

    70% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.success-message h3 {
    color: var(--cs-brown-color);
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
}

.success-message p {
    color: #666;
    margin-bottom: 0;
}

/* Error message styling */
.error-message {
    color: #FF6B6B;
    background: #FFE6E6;
    border: 1px solid #FF6B6B;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.error-message p {
    margin: 0;
}

/* Transitions for form/success/error switching */
.form-fade-enter-active,
.form-fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.form-fade-enter-from,
.form-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.success-fade-enter-active,
.success-fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.success-fade-enter-from,
.success-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.error-fade-enter-active,
.error-fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.error-fade-enter-from,
.error-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

/* Responsive Design */
@media (max-width: 992px) {
    .newsletter-card {
        flex-direction: column;
    }

    .newsletter-image {
        min-height: 220px;
        padding: 1.5rem;
    }

    .newsletter-form {
        padding: 2.5rem 2rem;
    }

    .newsletter-title {
        font-size: 1.8rem;
    }
}

@media (max-width: 576px) {
    /* .newsletter-section {
        padding: 1.5rem 1rem;
    } */

    /* .newsletter-form {
        padding: 2rem 1.5rem;
        background-color: red;
    } */
    .submit-btn {
        display: block !important;
        margin: auto !important;
        margin-top: 5px !important;
        padding: 1.5rem;
        height: 50px;
        border-radius: 12px !important;
        
    }
    .newsletter-section {
        padding: 0 !important;
    }

    .email-input {
        border-radius: 10px !important;
    }

    .newsletter-title {
        font-size: 1.5rem;
    }

    .submit-btn {
        padding: 0 1rem;
    }

    .btn-icon {
        margin: 0;
    }

    .newsletter-card {
        border-radius: 0px;
    }
}

.message {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--cs-tech-orange-color);
}

.message.error {
    color: #FF6B6B;
}
</style>