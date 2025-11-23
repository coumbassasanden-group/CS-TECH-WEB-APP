<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const texts = ref<string[]>([])
const isLoading = ref(true)

const { get } = useApi()

onMounted(async () => {
    try {
        // Récupération des textes depuis l'API
        const response = await get<string[]>('/api/texts/methodologie')
        texts.value = response
    } catch (error) {
        console.error('Erreur lors de la récupération des textes:', error)
        // Textes par défaut en cas d'erreur
        texts.value = [
            "Accédez facilement aux informations clients et améliorez la qualité de votre relation client grâce à des solutions digitales intuitives.",
            "Dites adieu aux heures perdues à la recherche de documents. Un système de gestion documentaire numérique vous permet de retrouver les informations rapidement et facilement.",
            "Automatisez vos processus de facturation et réduisez les erreurs grâce à des solutions de facturation numériques.",
            "Optimisez vos communications internes et externes grâce à des outils collaboratifs et de communication unifiée.",
            "Protégez vos données sensibles et assurez leur confidentialité grâce à des solutions de sécurité informatique robustes.",
            "Accédez à des analyses et des données exploitables pour prendre des décisions éclairées et améliorer la performance de votre entreprise."
        ]
    } finally {
        isLoading.value = false
    }
})

// Définition des 6 étapes sélectionnées de la roadmap
const roadmapSteps = [
  {
    icon: 'fa-solid fa-computer-mouse-scrollwheel',
    title: t('roadmap.steps.brainstorming.title'),
    step: 1
  },
  {
    icon: 'fa-solid fa-file-magnifying-glass',
    title: t('roadmap.steps.ux_research.title'),
    step: 2
  },
  {
    icon: 'fa-solid fa-file-invoice',
    title: t('roadmap.steps.product_design.title'),
    step: 3
  },
  {
    icon: 'fa-solid fa-phone-office',
    title: t('roadmap.steps.frontend.title'),
    step: 4
  },
  {
    icon: 'fa-solid fa-lock-keyhole',
    title: t('roadmap.steps.backend.title'),
    step: 5
  },
  {
    icon: 'bi bi-check-circle',
    title: t('roadmap.steps.testing.title'),
    step: 6
  }
]

// État pour gérer les animations
const isVisible = ref(false)
const activeIndex = ref(-1)
const autoAnimationIndex = ref(-1)

// Référence pour la section
const sectionRef = ref(null)

// Ajout d'un drapeau pour suivre si l'animation a déjà été exécutée
const hasAnimated = ref(false)
let animationInterval: NodeJS.Timeout | null = null

// Fonction pour l'animation automatique
const startAutoAnimation = () => {
  if (animationInterval) return
  
  animationInterval = setInterval(() => {
    autoAnimationIndex.value = (autoAnimationIndex.value + 1) % roadmapSteps.length
  }, 1500) // Change toutes les 1.5 secondes
}

const stopAutoAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
}

// Configuration de l'intersection observer
onMounted(() => {
  if (import.meta.client) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.value) {
        isVisible.value = true
        hasAnimated.value = true
        // Démarrer l'animation automatique après un délai
        setTimeout(() => {
          startAutoAnimation()
        }, 1000)
      }
    }, { threshold: 0.3 })

    if (sectionRef.value) {
      observer.observe(sectionRef.value)
    }

    return () => {
      if (sectionRef.value) {
        observer.unobserve(sectionRef.value)
      }
      stopAutoAnimation()
    }
  }
})

// Nettoyage à la destruction du composant
onUnmounted(() => {
  stopAutoAnimation()
})

// Gestion du hover sur les cartes
const setActive = (index: number) => {
  activeIndex.value = index
}

const resetActive = () => {
  activeIndex.value = -1
}
</script>

<template>
  <section id="roadmap" class="roadmap-section" ref="sectionRef">
    <div class="container">
      <!-- En-tête de la section -->
      <div class="row">
        <div class="col-lg-8 mx-auto text-center">
          <span class="section-badge mb-3">{{ $t('roadmap.methodology') }}</span>
          <h2 class="section-title">
            {{ $t('roadmap.title') }}
            <span class="accent-text">{{ $t('roadmap.subtitle') }}</span>
          </h2>
          <div class="section-divider mx-auto my-4"></div>
          <!-- <p class="section-text">
            {{ texts[0] }}
          </p> -->
        </div>
      </div>

      <!-- Items de la roadmap -->
      <div class="row g-4 mt-4 d-flex justify-content-center">
        <div v-for="(step, index) in roadmapSteps" :key="index" class="col-lg-3 col-md-6" data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)">
          <div 
            class="roadmap-card" 
            :class="{ 'auto-active': autoAnimationIndex === index, 'active': activeIndex === index }"
            @mouseenter="setActive(index)"
            @mouseleave="resetActive()"
          >
            <div class="step-badge">{{ step.step }}</div>
            <div class="roadmap-icon">
              <i :class="step.icon"></i>
            </div>
            <h5>{{ step.title }}</h5>
            <p>{{ texts[index] }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="row">
        <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
          <div class="cta-card">
            <h4>{{ $t('roadmap.cta.title') }}</h4>
            <p>{{ $t('roadmap.cta.description') }}</p>
            <NuxtLink :to="`#${$t('ids.contact')}`" class="btn btn-primary btn-lg rounded-pill">
              {{ $t('roadmap.cta.button') }}
              <i class="bi bi-arrow-right ms-2"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Base Styles */
.roadmap-section {
  background: var(--cs-tech-light-orange-color);
  padding: 6rem 0;
  overflow: hidden;
  position: relative;
}

.roadmap-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(249, 178, 51, 0.05) 0%, rgba(249, 178, 51, 0) 70%);
  z-index: 0;
}

.roadmap-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(249, 178, 51, 0.05) 0%, rgba(249, 178, 51, 0) 70%);
  z-index: 0;
}

/* Section Header */
.section-badge {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  background: var(--cs-dark-color);
  color: var(--cs-tech-orange-color);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: var(--cs-family-montserrat, 'Montserrat', sans-serif);
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--cs-brown-color);
  margin-bottom: 1rem;
  line-height: 1.2;
  font-family: var(--cs-family-montserrat);
}

.accent-text {
  color: var(--cs-tech-orange-color);
  position: relative;
  z-index: 1;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: var(--cs-dark-color);
  border-radius: 2px;
}

.section-text {
  color: var(--cs-brown-color);
  opacity: 0.85;
  font-size: 1.15rem;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 600;
  font-family: var(--cs-family-poppins, 'Poppins', sans-serif);
}

/* Roadmap Cards */
.roadmap-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  box-shadow: 0 8px 25px rgba(58, 46, 37, 0.05);
  position: relative;
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  border: 1px solid rgba(249, 178, 51, 0.1);
  height: 100%;
  text-align: center;
  z-index: 1;
}

.roadmap-card:hover,
.roadmap-card.active,
.roadmap-card.auto-active {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(249, 178, 51, 0.2);
  border-color: var(--cs-tech-orange-color);
}

.roadmap-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--cs-tech-orange-color);
  border-radius: 0 0 12px 12px;
  transform: scaleX(0);
  transform-origin: center;
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.roadmap-card:hover::after,
.roadmap-card.active::after,
.roadmap-card.auto-active::after {
  transform: scaleX(1);
}

.step-badge {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 32px;
  height: 32px;
  background: var(--cs-tech-orange-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(249, 178, 51, 0.3);
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.roadmap-card:hover .step-badge,
.roadmap-card.active .step-badge,
.roadmap-card.auto-active .step-badge {
  background: var(--cs-brown-color);
  transform: scale(1.1);
}

.roadmap-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: var(--cs-brown-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.roadmap-card:hover .roadmap-icon,
.roadmap-card.active .roadmap-icon,
.roadmap-card.auto-active .roadmap-icon {
  background: var(--cs-tech-light-orange-color);
  transform: rotateY(180deg);
}

.roadmap-icon i {
  font-size: 1.5rem;
  color: var(--cs-tech-light-orange-color);
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.roadmap-card:hover .roadmap-icon i,
.roadmap-card.active .roadmap-icon i,
.roadmap-card.auto-active .roadmap-icon i {
  color: var(--cs-brown-color);
}

.roadmap-card h5 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--cs-brown-color);
  margin-bottom: 0.75rem;
  font-family: var(--cs-family-montserrat, 'Montserrat', sans-serif);
  line-height: 1.3;
  transition: all 0.3s ease;
}

.roadmap-card:hover h5,
.roadmap-card.active h5,
.roadmap-card.auto-active h5 {
  color: var(--cs-tech-orange-color);
}

.roadmap-card p {
  color: var(--cs-brown-color);
  opacity: 0.8;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 0;
  font-family: var(--cs-family-poppins, 'Poppins', sans-serif);
  transition: all 0.3s ease;
}

.roadmap-card:hover p,
.roadmap-card.active p,
.roadmap-card.auto-active p {
  opacity: 1;
  color: var(--cs-brown-color);
}

/* CTA Section */
.cta-card {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 30px rgba(58, 46, 37, 0.05);
  margin-top: 3rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: var(--cs-brown-color);
}

.cta-card h4 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cs-brown-color);
  margin-bottom: 1rem;
  font-family: var(--cs-family-montserrat, 'Montserrat', sans-serif);
}

.cta-card p {
  color: var(--cs-brown-color);
  opacity: 0.85;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-family: var(--cs-family-poppins, 'Poppins', sans-serif);
}

.btn-primary {
  background: var(--cs-tech-orange-color);
  border: none;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  font-family: var(--cs-family-montserrat, 'Montserrat', sans-serif);
}

.btn-primary:hover {
  background: var(--cs-brown-color);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(58, 46, 37, 0.15);
}

/* Animation automatique plus fluide */
.roadmap-card.auto-active {
  animation: autoHover 0.6s ease-in-out;
}

@keyframes autoHover {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(-8px);
  }
}

/* Responsive Styles */
@media (max-width: 992px) {
  .roadmap-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2.25rem;
  }
}

@media (max-width: 768px) {
  .roadmap-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .section-text {
    font-size: 1rem;
  }

  .roadmap-card {
    padding: 1.25rem 0.75rem;
    margin-bottom: 1.5rem;
  }

  .roadmap-card h5 {
    font-size: 1rem;
  }

  .roadmap-card p {
    font-size: 0.8rem;
  }

  .roadmap-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 0.75rem;
  }

  .roadmap-icon i {
    font-size: 1.25rem;
  }

  .step-badge {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
    top: -10px;
    right: -10px;
  }

  .cta-card {
    padding: 2rem 1.5rem;
  }

  .btn-primary {
    padding: 0.75rem 1.5rem;
  }
}

@media (max-width: 576px) {
  .roadmap-card {
    padding: 1rem 0.5rem;
  }

  .roadmap-card h5 {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .roadmap-card p {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  .roadmap-icon {
    width: 45px;
    height: 45px;
  }

  .roadmap-icon i {
    font-size: 1.1rem;
  }
}
</style>