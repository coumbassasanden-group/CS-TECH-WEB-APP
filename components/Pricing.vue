<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface PricingPlan {
    id: number;
    title: string;
    description: string;
    price: string;
    period: string;
    features: string[];
    footer: string;
    recommended?: boolean;
    icon: string;
}

// États réactifs
const isLoading = ref(true);
const hasError = ref(false);
const errorMessage = ref('');
const pricingPlans = ref<PricingPlan[]>([]);
const retryCount = ref(0);

// Images pour les plans


// Données locales pour les plans
const getLocalPricingPlans = (): PricingPlan[] => [
    {
        id: 1,
        title: t('tech.pricing.pack_startup.title') || 'Pack Startup',
        description: t('tech.pricing.pack_startup.description') || 'Solutions digitales pour démarrer votre activité',
        price: '899€',
        period: '/mois',
        features: [],
        footer: t('tech.pricing.pack_startup.footer') || 'Idéal pour les startups et PME',
        icon: 'rocket',
        recommended: false
    },
    {
        id: 2,
        title: t('tech.pricing.pack_business.title') || 'Pack Business',
        description: t('tech.pricing.pack_business.description') || 'Solutions complètes pour développer votre business',
        price: '1499€',
        period: '/mois',
        features: [],
        footer: t('tech.pricing.pack_business.footer') || 'Le plus populaire pour les entreprises',
        icon: 'briefcase',
        recommended: true
    },
    {
        id: 3,
        title: t('tech.pricing.pack_enterprise.title') || 'Pack Enterprise',
        description: t('tech.pricing.pack_enterprise.description') || 'Solutions sur-mesure pour les grandes entreprises',
        price: 'Sur devis',
        period: '',
        features: [],
        footer: t('tech.pricing.pack_enterprise.footer') || 'Solutions personnalisées et accompagnement dédié',
        icon: 'building',
        recommended: false
    },
];

// Simulation d'API pour récupérer les features
const fetchPricingData = async (): Promise<PricingPlan[]> => {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Simulation d'erreur (20% de chance)
    if (Math.random() < 0.2 && retryCount.value < 2) {
        throw new Error('Erreur de connexion au serveur');
    }

    const featuresFromServer = [
        [
            "🚀 Création de sites vitrines modernes",
            "🎨 Identité visuelle et branding",
            "📱 Gestion des réseaux sociaux (2 pages, 16 posts/mois)",
            "📊 Analytics de base",
            "🔧 Support technique standard"
        ],
        [
            "🛒 Développement d'e-commerce complet",
            "📱 Applications mobiles (MVP Flutter/React Native)",
            "🎯 Campagnes marketing digital (SEO, SEA, emailing)",
            "🔄 Refonte de sites web (UX/UI optimisé)",
            "☁️ Digitalisation et Collaboration (GED, plateformes)",
            "🔗 Intégration d'API & Webservices (REST, SOAP)",
            "📈 Reporting avancé",
            "🚀 Support technique prioritaire"
        ],
        [
            "⚙️ Solutions ERP/CRM sur-mesure",
            "☁️ Infrastructure Cloud et DevOps (CI/CD)",
            "📊 Data Analytics et Business Intelligence",
            "🤖 Intelligence Artificielle & Automatisation",
            "🎯 Conseil et transformation digitale",
            "🔍 Audit sécurité et performance",
            "🧪 Tests logiciels et qualité",
            "👨‍💼 Accompagnement dédié 24/7"
        ],
    ];

    const localPlans = getLocalPricingPlans();
    return localPlans.map((plan, index) => ({
        ...plan,
        features: featuresFromServer[index]
    }));
};

// Fonction de chargement des données
const loadPricingData = async () => {
    try {
        isLoading.value = true;
        hasError.value = false;
        errorMessage.value = '';

        const data = await fetchPricingData();
        pricingPlans.value = data;

        // Réinitialiser le compteur de retry en cas de succès
        retryCount.value = 0;

    } catch (error) {
        hasError.value = true;
        errorMessage.value = error instanceof Error ? error.message : 'Une erreur est survenue';
        console.error('Erreur lors du chargement des données pricing:', error);
    } finally {
        isLoading.value = false;
    }
};

// Fonction de retry
const retryLoading = async () => {
    retryCount.value++;
    await loadPricingData();
};

// Animation de compteur pour les prix
const animateCounter = (element: HTMLElement, target: number, duration: number = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toString();
        }
    };

    updateCounter();
};

// Computed pour le statut global
const isReady = computed(() => !isLoading.value && !hasError.value && pricingPlans.value.length > 0);

// Initialisation
onMounted(async () => {
    await loadPricingData();
});
</script>

<template>
    <section :id="$t('ids.packs')" class="pricing-section position-relative">
        <!--===============spacing==============-->
        <div class="pd_top_80"></div>
        <!--===============spacing==============-->

        <div class="container">
            <!-- Éléments décoratifs -->
            <div class="floating-elements">
                <div class="floating-icon floating-icon-1" data-aos="fade-up" data-aos-delay="200">
                    <i class="fas fa-code"></i>
                </div>
                <div class="floating-icon floating-icon-2" data-aos="fade-down" data-aos-delay="400">
                    <i class="fas fa-cog"></i>
                </div>
                <div class="floating-icon floating-icon-3" data-aos="fade-left" data-aos-delay="600">
                    <i class="fas fa-rocket"></i>
                </div>
            </div>

            <!-- Header Section -->
             <div class="pricing-header text-center mb-70" data-aos="fade-up">
                <div class="header-icon">
                    <svg width="40" height="40" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.7 10.2C1.2325 10.2 0.832431 10.0334 0.4998 9.7002C0.1666 9.36759 0 8.9675 0 8.5C0 8.0325 0.1666 7.63215 0.4998 7.29895C0.832431 6.96635 1.2325 6.8 1.7 6.8C2.1675 6.8 2.56757 6.96635 2.9002 7.29895C3.2334 7.63215 3.4 8.0325 3.4 8.5C3.4 8.9675 3.2334 9.36759 2.9002 9.7002C2.56757 10.0334 2.1675 10.2 1.7 10.2ZM3.1025 15.045L1.9125 13.855L5.61 10.1575L6.8 11.3475L3.1025 15.045ZM5.6525 6.8L1.955 3.1025L3.145 1.9125L6.8425 5.61L5.6525 6.8ZM8.5 17C8.0325 17 7.63241 16.8337 7.2998 16.5011C6.9666 16.1679 6.8 15.7675 6.8 15.3C6.8 14.8325 6.9666 14.4321 7.2998 14.099C7.63241 13.7663 8.0325 13.6 8.5 13.6C8.9675 13.6 9.36785 13.7663 9.70105 14.099C10.0337 14.4321 10.2 14.8325 10.2 15.3C10.2 15.7675 10.0337 16.1679 9.70105 16.5011C9.36785 16.8337 8.9675 17 8.5 17ZM8.5 3.4C8.0325 3.4 7.63241 3.2334 7.2998 2.9002C6.9666 2.56757 6.8 2.1675 6.8 1.7C6.8 1.2325 6.9666 0.83215 7.2998 0.49895C7.63241 0.166319 8.0325 0 8.5 0C8.9675 0 9.36785 0.166319 9.70105 0.49895C10.0337 0.83215 10.2 1.2325 10.2 1.7C10.2 2.1675 10.0337 2.56757 9.70105 2.9002C9.36785 3.2334 8.9675 3.4 8.5 3.4ZM11.3475 6.8425L10.1575 5.61L13.8975 1.9125L15.0875 3.1025L11.3475 6.8425ZM13.8975 15.045L10.2 11.3475L11.39 10.1575L15.0875 13.855L13.8975 15.045ZM15.3 10.2C14.8325 10.2 14.4321 10.0334 14.099 9.7002C13.7663 9.36759 13.6 8.9675 13.6 8.5C13.6 8.0325 13.7663 7.63215 14.099 7.29895C14.4321 6.96635 14.8325 6.8 15.3 6.8C15.7675 6.8 16.1679 6.96635 16.5011 7.29895C16.8337 7.63215 17 8.0325 17 8.5C17 8.9675 16.8337 9.36759 16.5011 9.7002C16.1679 10.0334 15.7675 10.2 15.3 10.2Z"
                            fill="#F9B233" />
                    </svg>
                </div>
                <h2>
                    Empowering <span class="highlight">Tech Innovation</span> & Digital Excellence
                </h2>
                <p class="section-subtitle">
                    Choisissez le pack qui correspond à vos besoins et accélérez votre transformation digitale
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="loading-container" data-aos="fade-in">
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <p class="loading-text">Chargement de nos solutions tech...</p>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="hasError" class="error-container" data-aos="fade-in">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="error-title">Oops ! Problème technique</h3>
                <p class="error-message">{{ errorMessage }}</p>
                <button @click="retryLoading" class="retry-btn" :disabled="isLoading">
                    <i class="fas fa-redo-alt"></i>
                    Réessayer
                </button>
            </div>

            <!-- Pricing Plans -->
            <div v-else-if="isReady" class="row justify-content-center">
                <div v-for="(plan, index) in pricingPlans" :key="plan.id" class="col-lg-4 col-md-6 col-sm-12 mb-4"
                    :data-aos="index === 0 ? 'fade-right' : index === 2 ? 'fade-left' : 'fade-up'"
                    :data-aos-delay="index * 200">
                    <div class="pricing_plan_box" :class="{ 'recommended': plan.recommended, 'type_one': true }">
                        <!-- Tag populaire -->
                        <div v-if="plan.recommended" class="popular-tag" data-aos="pulse" data-aos-delay="1000">
                            <i class="fas fa-star"></i>
                            {{ $t('popular') || 'Populaire' }}
                        </div>

                        <div class="pricing_plan_box_inner">
                            <!-- Header du plan -->
                            <div class="upper_content">
                                <div class="plan-icon" data-aos="zoom-in" :data-aos-delay="index * 200 + 300">
                                    <i :class="`fas fa-${plan.icon}`"></i>
                                </div>
                                <div class="title_s">
                                    <h3>{{ plan.title }}</h3>
                                </div>
                                <p class="plan-description">{{ plan.description }}</p>

                                <!-- Prix -->
                                <div class="price-container" data-aos="flip-up" :data-aos-delay="index * 200 + 500">
                                    <div class="price">
                                        <span class="currency">{{ plan.price === 'Sur devis' ? '' : '' }}</span>
                                       
                                    </div>
                                </div>
                            </div>

                            <!-- Features -->
                            <div class="lower_content">
                                <ul class="features-list">
                                    <li v-for="(feature, i) in plan.features" :key="i" data-aos="fade-left"
                                        :data-aos-delay="index * 200 + 600 + (i * 100)">
                                        <span class="check-icon">
                                            <i class="fas fa-check"></i>
                                        </span>
                                        <span v-html="feature"></span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Footer -->
                            <div class="down_content">
                                <p class="plan-footer">{{ plan.footer }}</p>
                                <button class="cta-button" :class="{ 'primary': plan.recommended }" data-aos="zoom-in"
                                    :data-aos-delay="index * 200 + 800">
                                    <span>{{ plan.price === 'Sur devis' ? 'Nous contacter' : 'Choisir ce pack' }}</span>
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Effet de brillance -->
                        <div class="shine-effect"></div>
                    </div>
                </div>
            </div>
        </div>

        <!--===============spacing==============-->
        <div class="pd_bottom_70"></div>
        <!--===============spacing==============-->
    </section>
</template>

<style lang="css" scoped>
:root {
    --cs-tech-orange-color: #F9B233;
    --cs-brown-color: #3F2E1A;
    --cs-tech-light-orange-color: #FEEFD7;
    --cs-light-brown-color: #E7D7C5;
}

.pricing-section {
    background: linear-gradient(135deg, var(--cs-tech-light-orange-color) 0%, #ffffff 100%);
    position: relative;
    overflow: hidden;
}

.pricing-section .floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
}

.pricing-section .floating-elements .floating-icon {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--cs-tech-orange-color), #FFD700);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    animation: float 3s ease-in-out infinite;
    box-shadow: 0 10px 30px rgba(249, 178, 51, 0.3);
}

.pricing-section .floating-elements .floating-icon-1 {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
}

.pricing-section .floating-elements .floating-icon-2 {
    top: 20%;
    right: 10%;
    animation-delay: 1s;
}

.pricing-section .floating-elements .floating-icon-3 {
    bottom: 15%;
    left: 8%;
    animation-delay: 2s;
}

.pricing-section .pricing-header {
    position: relative;
    z-index: 2;
    margin-bottom: 4rem;
}

.pricing-section .pricing-header .section-title {
    font-size: 3rem;
    font-weight: 700;
    color: var(--cs-brown-color);
    margin-bottom: 1rem;
}

.pricing-section .pricing-header .section-title .highlight {
    background: linear-gradient(45deg, var(--cs-tech-orange-color), #FFD700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.pricing-section .pricing-header .section-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.in-view .section-header {
  opacity: 1;
  transform: translateY(0);
}

.header-icon {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.section-subtitle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--cs-brown-color);
  margin-bottom: 1rem;
  font-family: 'JetBrains Mono', monospace;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 800;
  color: var(--cs-brown-color);
  margin-bottom: 1rem;
  font-family: var(--cs-family-montserrat, 'Montserrat', sans-serif);
  letter-spacing: -1px;
}

.pricing-section .loading-container {
    text-align: center;
    padding: 4rem 0;
}

.pricing-section .loading-container .loading-spinner {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-bottom: 2rem;
}

.pricing-section .loading-container .loading-spinner .spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-top: 4px solid var(--cs-tech-orange-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.pricing-section .loading-container .loading-spinner .spinner-ring:nth-child(2) {
    animation-delay: 0.3s;
    border-top-color: var(--cs-brown-color);
}

.pricing-section .loading-container .loading-spinner .spinner-ring:nth-child(3) {
    animation-delay: 0.6s;
    border-top-color: #FFD700;
}

.pricing-section .loading-container .loading-text {
    font-size: 1.2rem;
    color: var(--cs-brown-color);
    margin-bottom: 2rem;
}

.pricing-section .loading-container .loading-progress {
    width: 300px;
    height: 4px;
    background: var(--cs-light-brown-color);
    border-radius: 2px;
    margin: 0 auto;
    overflow: hidden;
}

.pricing-section .loading-container .loading-progress .progress-bar {
    height: 100%;
    background: linear-gradient(45deg, var(--cs-tech-orange-color), #FFD700);
    animation: progress 2s ease-in-out infinite;
}

.pricing-section .error-container {
    text-align: center;
    padding: 4rem 0;
}

.pricing-section .error-container .error-icon {
    font-size: 4rem;
    color: #e74c3c;
    margin-bottom: 1.5rem;
    animation: shake 0.5s ease-in-out;
}

.pricing-section .error-container .error-title {
    font-size: 2rem;
    color: var(--cs-brown-color);
    margin-bottom: 1rem;
}

.pricing-section .error-container .error-message {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
}

.pricing-section .error-container .retry-btn {
    background: linear-gradient(45deg, var(--cs-tech-orange-color), #FFD700);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.pricing-section .error-container .retry-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(249, 178, 51, 0.4);
}

.pricing-section .error-container .retry-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.pricing-section .error-container .retry-btn i {
    margin-right: 8px;
}

.pricing-section .pricing_plan_box {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    height: 100%;
    border: 2px solid transparent;
}

.pricing-section .pricing_plan_box:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(249, 178, 51, 0.2);
    border-color: var(--cs-tech-orange-color);
}

.pricing-section .pricing_plan_box:hover .shine-effect {
    transform: translateX(100%);
}

.pricing-section .pricing_plan_box.recommended {
    transform: scale(1.05);
    border-color: var(--cs-tech-orange-color);
}

.pricing-section .pricing_plan_box.recommended .pricing_plan_box_inner {
    background: linear-gradient(135deg, var(--cs-tech-light-orange-color) 0%, white 100%);
}

.pricing-section .pricing_plan_box .popular-tag {
    position: absolute;
    top: 20px;
    right: -30px;
    background: linear-gradient(45deg, var(--cs-tech-orange-color), #FFD700);
    color: white;
    padding: 8px 40px;
    font-size: 0.9rem;
    font-weight: 600;
    transform: rotate(45deg);
    z-index: 10;
    box-shadow: 0 5px 15px rgba(249, 178, 51, 0.3);
}

.pricing-section .pricing_plan_box .popular-tag i {
    margin-right: 5px;
}

.pricing-section .pricing_plan_box .pricing_plan_box_inner {
    padding: 2.5rem 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.pricing-section .pricing_plan_box .upper_content {
    text-align: center;
    margin-bottom: 2rem;
}

.pricing-section .pricing_plan_box .upper_content .plan-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, var(--cs-tech-orange-color), #FFD700);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    font-size: 2rem;
    box-shadow: 0 10px 25px rgba(249, 178, 51, 0.3);
}

.pricing-section .pricing_plan_box .upper_content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--cs-brown-color);
    margin-bottom: 0.5rem;
}

.pricing-section .pricing_plan_box .upper_content .plan-description {
    color: #666;
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.pricing-section .pricing_plan_box .upper_content .price-container {
    margin-bottom: 1rem;
}

.pricing-section .pricing_plan_box .upper_content .price-container .price .amount {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--cs-tech-orange-color);
}

.pricing-section .pricing_plan_box .upper_content .price-container .price .period {
    font-size: 1rem;
    color: #666;
    vertical-align: middle;
}

.pricing-section .pricing_plan_box .lower_content {
    flex: 1;
    margin-bottom: 2rem;
}

.pricing-section .pricing_plan_box .lower_content .features-list {
    list-style: none;
    padding: 0;
}

.pricing-section .pricing_plan_box .lower_content .features-list li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}

.pricing-section .pricing_plan_box .lower_content .features-list li .check-icon {
    width: 20px;
    height: 20px;
    background: var(--cs-tech-orange-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
    margin-top: 2px;
}

.pricing-section .pricing_plan_box .lower_content .features-list li .check-icon i {
    color: white;
    font-size: 0.7rem;
}

.pricing-section .pricing_plan_box .down_content .plan-footer {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.pricing-section .pricing_plan_box .down_content .cta-button {
    width: 100%;
    background: linear-gradient(45deg, var(--cs-brown-color), #5a4332);
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pricing-section .pricing_plan_box .down_content .cta-button.primary {
    background: linear-gradient(45deg, var(--cs-tech-orange-color), #FFD700);
}

.pricing-section .pricing_plan_box .down_content .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.pricing-section .pricing_plan_box .down_content .cta-button i {
    margin-left: 8px;
    transition: transform 0.3s ease;
}

.pricing-section .pricing_plan_box .down_content .cta-button:hover i {
    transform: translateX(3px);
}

.pricing-section .pricing_plan_box .shine-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: transform 0.6s ease;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes progress {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-5px);
    }

    75% {
        transform: translateX(5px);
    }
}

@media (max-width: 768px) {
    .pricing-section .pricing-header .section-title {
        font-size: 2rem;
    }

    .pricing-section .floating-elements .floating-icon {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }

    .pricing-section .pricing_plan_box {
        margin-bottom: 2rem;
    }

    .pricing-section .pricing_plan_box.recommended {
        transform: none;
    }
}

@media (max-width: 576px) {
    .pricing-section .pricing_plan_box .pricing_plan_box_inner {
        padding: 2rem 1.5rem;
    }
}
</style>