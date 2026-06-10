<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSectionSEO } from '~/composables/useSectionSEO';

const { t } = useI18n();

const companyName = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const submitted = ref(false);
const loading = ref(false);
const formVisible = ref(false);
const isLoadingSubjects = ref(false);
const subjects = ref([]);
const invalidFields = ref({
    companyName: false,
    email: false,
    subject: false,
    message: false
});

// Utilisation du composable useApi
const { get, post } = useApi();
useSectionSEO('contact');
// Récupération des objets de contact
const fetchSubjects = async () => {
    isLoadingSubjects.value = true;
    try {
        const data = await get('/api/contact-objects');
        subjects.value = data;
    } catch (error) {
        console.error('Erreur lors de la récupération des objets de contact:', error);
        subjects.value = [];
    } finally {
        isLoadingSubjects.value = false;
    }
};

const handleSubmit = async () => {
    // Réinitialiser les erreurs
    Object.keys(invalidFields.value).forEach(key => {
        invalidFields.value[key] = false;
    });

    // Vérifier les champs
    let isValid = true;
    
    if (!companyName.value.trim()) {
        invalidFields.value.companyName = true;
        isValid = false;
    }
    
    if (!email.value || !isValidEmail(email.value)) {
        invalidFields.value.email = true;
        isValid = false;
    }
    
    if (!subject.value) {
        invalidFields.value.subject = true;
        isValid = false;
    }
    
    if (!message.value.trim()) {
        invalidFields.value.message = true;
        isValid = false;
    }

    if (isValid) {
        loading.value = true;
        try {
            const response = await post('/api/contact-message', {
                company_name: companyName.value.trim(),
                email: email.value.trim().toLowerCase(),
                contact_object_id: subject.value,
                message: message.value.trim()
            });

            if (response.ok) {
                submitted.value = true;
                // Réinitialiser le formulaire
                companyName.value = '';
                email.value = '';
                subject.value = '';
                message.value = '';
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            // Vous pouvez ajouter une gestion d'erreur plus détaillée ici
        } finally {
            loading.value = false;
        }
    } else {
        // Animer les champs invalides puis réinitialiser après 2 secondes
        setTimeout(() => {
            Object.keys(invalidFields.value).forEach(key => {
                invalidFields.value[key] = false;
            });
        }, 2000);
    }
};

// Fonction pour réinitialiser le formulaire avec Escape
const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        companyName.value = '';
        email.value = '';
        subject.value = '';
        message.value = '';
        submitted.value = false;
    }
};

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

onMounted(() => {
    // Déclencher l'animation d'entrée
    setTimeout(() => {
        formVisible.value = true;
    }, 100);
    // Charger les objets de contact
    fetchSubjects();
    // Ajouter l'écouteur d'événement pour Escape
    window.addEventListener('keydown', handleKeydown);
});
</script>

<template>
    <section :id="$t('ids.contact')" class="contact-section">
        <div class="container">
            <div class="contact-container">
                <div class="contact-card" :class="{ 'form-visible': formVisible }">
                    <div class="contact-image">
                        <div class="tech-elements">
                            <!-- Grille de fond avec effet technologique -->
                            <div class="tech-grid"></div>
                            
                            <!-- Éléments tech flottants -->
                            <div class="tech-element circuit-1"></div>
                            <div class="tech-element circuit-2"></div>
                            <div class="tech-element data-pulse"></div>
                            <div class="tech-element code-element"></div>
                            
                            <!-- Particules technologiques -->
                            <div class="tech-particles">
                                <span v-for="n in 12" :key="n" class="particle" :class="`p-${n}`"></span>
                            </div>
                        </div>
                        <div class="image-content">
                            <div class="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                                    <circle cx="12" cy="12" r="10" fill="#000" opacity="0.2" />
                                    <path fill="#000"
                                        d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                                </svg>
                            </div>
                            <h3>{{ $t('contact.title') }}</h3>
                            <p>{{ $t('contact.description') }}</p>
                        </div>
                    </div>

                    <div class="contact-form">
                        <div class="contact-form-content">
                            <span class="badge">{{ $t('contact.subtitle') }}</span>

                            <h2 class="contact-title">{{ $t('contact.form.title') }}</h2>
                            <p class="contact-description">{{ $t('contact.form.description') }}</p>

                            <transition name="form-fade">
                                <div class="form-container" v-if="!submitted">
                                    <div class="input-wrapper">
                                        <label for="company">{{ $t('contact.form.company_name') }}</label>
                                        <div class="input-group" :class="{ 'shake': invalidFields.companyName }">
                                            <input 
                                                type="text" 
                                                id="company"
                                                v-model="companyName" 
                                                :placeholder="$t('contact.form.company_placeholder')" 
                                                class="form-input"
                                                :class="{ 'invalid': invalidFields.companyName }" 
                                            />
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <label for="email">{{ $t('contact.form.email') }}</label>
                                        <div class="input-group" :class="{ 'shake': invalidFields.email }">
                                            <input 
                                                type="email" 
                                                id="email"
                                                v-model="email" 
                                                placeholder="your@email.com" 
                                                class="form-input"
                                                :class="{ 'invalid': invalidFields.email }" 
                                            />
                                        </div>
                                    </div>
                                    <div class="input-wrapper">
                                        <label for="subject">{{ $t('contact.form.subject') }}</label>
                                        <div class="input-group" :class="{ 'shake': invalidFields.subject }">
                                            <select 
                                                id="subject"
                                                v-model="subject" 
                                                class="form-input"
                                                :class="{ 'invalid': invalidFields.subject }"
                                                :disabled="isLoadingSubjects"
                                            >
                                                <option value="">
                                                    {{ isLoadingSubjects ? $t('contact.form.subject_loading') : $t('contact.form.subject_placeholder') }}
                                                </option>
                                                <option 
                                                    v-for="option in subjects" 
                                                    :key="option.value" 
                                                    :value="option.value"
                                                >
                                                    {{ option.label }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="input-wrapper">
                                        <label for="message">{{ $t('contact.form.message') }}</label>
                                        <div class="input-group" :class="{ 'shake': invalidFields.message }">
                                            <textarea 
                                                id="message"
                                                v-model="message" 
                                                :placeholder="$t('contact.form.message_placeholder')" 
                                                class="form-input textarea"
                                                :class="{ 'invalid': invalidFields.message }" 
                                                rows="5"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div class="form-footer">
                                        <small>{{ $t('contact.form.privacy') }}</small>
                                        <button @click="handleSubmit" class="submit-btn" :class="{ 'loading': loading }">
                                            <span class="btn-text">
                                                {{ loading ? $t('contact.form.sending') : $t('contact.form.submit') }}
                                            </span>
                                            <i class="btn-icon bi bi-send-fill" v-if="!loading"></i>
                                            <i class="btn-icon bi bi-arrow-repeat spin" v-else></i>
                                        </button>
                                    </div>
                                </div>
                            </transition>

                            <transition name="success-fade">
                                <div class="success-message" v-if="submitted">
                                    <div class="success-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                                            <circle cx="12" cy="12" r="11" fill="var(--cs-tech-orange-color)" opacity="0.2" />
                                            <path fill="var(--cs-tech-orange-color)" 
                                                d="M10.5,16.2l-4-4c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l3.4,3.4l5.4-5.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-6,6C11.3,16.5,10.8,16.5,10.5,16.2z" />
                                        </svg>
                                    </div>
                                    <h3>{{ $t('contact.form.success_title') }}</h3>
                                    <p>{{ $t('contact.form.success_description') }}</p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <NewsLetters/> -->
    </section>
</template>

<style scoped>
/* Base styles */
h2, h3 {
    font-family: var(--cs-family-montserrat);
}

p, label, input, textarea, select, button {
    font-family: var(--cs-family-poppins);
}

.contact-section {
    padding: 3rem 0;
    background: var(--cs-tech-light-orange-color);
    position: relative;
    overflow: hidden;
}

.contact-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/images/bg-hero.png) center center no-repeat;
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
}

.contact-container {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    max-width: 1200px;
}

.contact-card {
    display: flex;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    /* box-shadow: 0 25px 50px rgba(63, 46, 26, 0.12); */
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.contact-card.form-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Image side with tech elements */
.contact-image {
    flex: 0.8;
    position: relative;
    overflow: hidden;
    background: var(--cs-tech-orange-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
}

.form-visible .contact-image {
    opacity: 1;
    transform: translateX(0);
}

.image-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: var(--cs-brown-color);
    padding: 2rem;
}

.contact-icon {
    margin-bottom: 1.5rem;
    transform: scale(0);
    animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.8s;
}

.image-content h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease 1s, transform 0.5s ease 1s;
}

.image-content p {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease 1.2s, transform 0.5s ease 1.2s;
}

.form-visible .image-content h3,
.form-visible .image-content p {
    opacity: 1;
    transform: translateY(0);
}

/* Tech Animation Elements */
.tech-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

/* Tech grid background */
.tech-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(to right, rgba(63, 46, 26, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(63, 46, 26, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.6;
}

/* Tech element animations */
.tech-element {
    position: absolute;
    border-radius: 4px;
    opacity: 0.7;
}

/* Circuit paths */
.circuit-1 {
    width: 120px;
    height: 3px;
    background: var(--cs-brown-color);
    top: 25%;
    left: 10%;
    opacity: 0.3;
    box-shadow: 0 0 8px var(--cs-brown-color);
    animation: circuit-glow 3s ease-in-out infinite, circuit-move-1 8s ease-in-out infinite;
}

/* Circuit path 2 with perpendicular extension */
.circuit-2 {
    width: 60px;
    height: 3px;
    background: var(--cs-brown-color);
    bottom: 35%;
    right: 20%;
    opacity: 0.3;
    box-shadow: 0 0 8px var(--cs-brown-color);
    animation: circuit-glow 2.5s ease-in-out infinite alternate, circuit-move-2 6s ease-in-out infinite alternate;
}

.circuit-2::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 3px;
    height: 40px;
    background: var(--cs-brown-color);
    box-shadow: 0 0 8px var(--cs-brown-color);
    animation: circuit-glow 2.5s ease-in-out infinite alternate 0.5s;
}

/* Data pulse element */
.data-pulse {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(249, 178, 51, 0.2);
    border: 2px solid var(--cs-tech-orange-color);
    top: 60%;
    left: 25%;
    animation: data-pulse 2s ease-in-out infinite;
}

/* Code element animation */
.code-element {
    width: 80px;
    height: 60px;
    background: rgba(63, 46, 26, 0.1);
    border-radius: 4px;
    bottom: 20%;
    left: 15%;
    animation: code-typing 3s ease-in-out infinite;
    overflow: hidden;
}

.code-element::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 3px;
    background: var(--cs-tech-orange-color);
    opacity: 0.7;
    box-shadow: 
        0 10px 0 rgba(249, 178, 51, 0.7),
        0 20px 0 rgba(249, 178, 51, 0.7),
        0 30px 0 rgba(249, 178, 51, 0.7);
    animation: typing 2s steps(10) infinite;
}

/* Tech particles */
.tech-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--cs-tech-orange-color);
    border-radius: 50%;
    opacity: 0.6;
}

/* Generate different particles */
.p-1 { top: 10%; left: 20%; animation: particle-float 7s ease-in-out infinite 0.2s; }
.p-2 { top: 30%; left: 50%; animation: particle-float 5s ease-in-out infinite 1.1s; }
.p-3 { top: 70%; left: 80%; animation: particle-float 6s ease-in-out infinite 0.5s; }
.p-4 { top: 40%; left: 10%; animation: particle-float 8s ease-in-out infinite 1.5s; }
.p-5 { top: 65%; left: 60%; animation: particle-float 9s ease-in-out infinite 0.7s; }
.p-6 { top: 20%; left: 70%; animation: particle-float 7s ease-in-out infinite 2s; }
.p-7 { top: 85%; left: 35%; animation: particle-float 6s ease-in-out infinite 1.3s; }
.p-8 { top: 15%; left: 40%; animation: particle-float 5s ease-in-out infinite 0.9s; }
.p-9 { top: 55%; left: 15%; animation: particle-float 8s ease-in-out infinite 1.8s; }
.p-10 { top: 75%; left: 75%; animation: particle-float 7s ease-in-out infinite 0.3s; }
.p-11 { top: 35%; left: 90%; animation: particle-float 6s ease-in-out infinite 1.7s; }
.p-12 { top: 50%; left: 30%; animation: particle-float 8s ease-in-out infinite 0.8s; }

/* Circuit Animation */
@keyframes circuit-glow {
    0%, 100% {
        opacity: 0.2;
        box-shadow: 0 0 4px var(--cs-brown-color);
    }
    50% {
        opacity: 0.5;
        box-shadow: 0 0 12px var(--cs-brown-color);
    }
}

@keyframes circuit-move-1 {
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(30px);
    }
    100% {
        transform: translateX(0);
    }
}

@keyframes circuit-move-2 {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}

/* Data pulse animation */
@keyframes data-pulse {
    0%, 100% {
        transform: scale(0.8);
        opacity: 0.3;
        box-shadow: 0 0 0 rgba(249, 178, 51, 0.1);
    }
    50% {
        transform: scale(1.2);
        opacity: 0.6;
        box-shadow: 0 0 15px rgba(249, 178, 51, 0.5);
    }
}

/* Code typing animation */
@keyframes typing {
    0%, 100% {
        width: 0;
    }
    50% {
        width: 40px;
    }
}

@keyframes code-typing {
    0%, 100% {
        opacity: 0.5;
        transform: translateY(0);
    }
    50% {
        opacity: 0.7;
        transform: translateY(-5px);
    }
}

/* Particle floating animation */
@keyframes particle-float {
    0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0.6;
    }
    25% {
        transform: translateY(-10px) translateX(5px) scale(1.2);
        opacity: 0.8;
    }
    50% {
        transform: translateY(-5px) translateX(10px) scale(1);
        opacity: 0.6;
    }
    75% {
        transform: translateY(5px) translateX(5px) scale(0.8);
        opacity: 0.4;
    }
}

/* Pop in animation */
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

/* Form side */
.contact-form {
    flex: 1.2;
    padding: 3rem;
    position: relative;
    display: flex;
    align-items: center;
}

.contact-form-content {
    width: 100%;
    opacity: 0;
    transform: translateX(30px);
    transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}

.form-visible .contact-form-content {
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
.contact-title {
    color: var(--cs-brown-color);
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.3;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.5s ease 0.75s, transform 0.5s ease 0.75s;
}

.contact-description {
    color: #666;
    margin-bottom: 2rem;
    font-size: 1rem;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s;
}

.form-visible .contact-title,
.form-visible .contact-description {
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
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--cs-brown-color);
    font-weight: 500;
    font-size: 0.95rem;
}

.input-group {
    display: flex;
    position: relative;
    border-radius: 12px;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.input-group:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.input-group.shake {
    animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
}

@keyframes shake {
    10%, 90% {
        transform: translateX(-1px);
    }
    
    20%, 80% {
        transform: translateX(2px);
    }
    
    30%, 50%, 70% {
        transform: translateX(-4px);
    }
    
    40%, 60% {
        transform: translateX(4px);
    }
}

.form-input {
    width: 100%;
    padding: 1rem 1.25rem;
    border: 2px solid #E0E0E0;
    border-radius: 12px;
    font-size: 1rem;
    color: var(--cs-brown-color);
    background: white;
    transition: all 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: var(--cs-tech-orange-color);
    box-shadow: 0 0 0 3px rgba(249, 178, 51, 0.2);
}

.form-input.invalid {
    border-color: #FF6B6B;
}

.form-input::placeholder {
    color: #AAA;
    transition: color 0.3s ease, transform 0.3s ease;
}

.form-input:focus::placeholder {
    color: #CCC;
    transform: translateX(5px);
}

.textarea {
    resize: vertical;
    min-height: 120px;
}

.form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
}

small {
    color: #888;
    font-size: 0.85rem;
    font-family: var(--cs-family-poppins);
}

.submit-btn {
    padding: 1rem 2rem;
    background: var(--cs-tech-orange-color);
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--cs-brown-color);
    font-weight: 600;
    transition: all 0.3s ease;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(249, 178, 51, 0.3);
}

.submit-btn:hover {
    background: var(--cs-brown-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(63, 46, 26, 0.2);
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

/* Select styling */
select.form-input {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%233F2E1A' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 16px 12px;
    padding-right: 2.5rem;
}

select.form-input:focus {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23F9B233' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
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

.success-message h3 {
    color: var(--cs-brown-color);
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
}

.success-message p {
    color: #666;
    margin-bottom: 2rem;
}

.reset-btn {
    padding: 0.75rem 1.5rem;
    background: var(--cs-light-brown-color);
    border: none;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--cs-brown-color);
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(231, 215, 197, 0.5);
}

.reset-btn:hover {
    background: var(--cs-brown-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(63, 46, 26, 0.2);
}

/* Transitions for form/success switching */
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

/* Responsive Design */
@media (max-width: 992px) {
    .contact-card {
        flex-direction: column;
    }

    .contact-image {
        min-height: 200px;
    }

    .contact-form {
        padding: 2.5rem 2rem;
    }

    .contact-title {
        font-size: 1.8rem;
    }
    
    .form-footer {
        flex-direction: column;
        gap: 1.5rem;
    }
    
    small {
        text-align: center;
    }
    
    .submit-btn {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .contact-section { padding: 2rem 0; }
    .contact-image { min-height: 170px; }
    .contact-form { padding: 2rem 1.5rem; }
    .contact-title { font-size: 1.6rem; }
    .contact-description { font-size: 0.95rem; }
    .image-content h3 { font-size: 1.5rem; }
    .image-content p { font-size: 0.9rem; }
}

@media (max-width: 576px) {
    .contact-section {
        padding: 2rem 0;
    }
    
    .contact-card {
        border-radius: 0;
    }

    .contact-form {
        padding: 1.5rem 1rem;
    }

    .contact-title {
        font-size: 1.4rem;
    }

    .form-input {
        padding: 0.875rem 1rem;
        font-size: 0.95rem;
        min-height: 44px;
    }

    .submit-btn {
        padding: 0.875rem 1.5rem;
    }
    
    .image-content {
        padding: 0.75rem;
    }
    
    .image-content h3 {
        font-size: 1.3rem;
    }
}

@media (max-width: 380px) {
    .contact-title { font-size: 1.2rem; }
    .badge { font-size: 0.75rem; padding: 0.4rem 1rem; }
}
</style>