<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const texts = ref<string[]>([])
const isLoading = ref(true)

const { get } = useApi()

onMounted(async () => {
    try {
        // Récupération des textes depuis l'API
        const response = await get<string[]>('/api/texts/why_choose_us')
        texts.value = response
    } catch (error) {
        console.error('Erreur lors de la récupération des textes:', error)
        // Textes par défaut en cas d'erreur
        texts.value = [
            "Nous combinons expertise technique, créativité et compréhension approfondie de vos besoins pour offrir des solutions sur mesure qui dépassent vos attentes.",
            "Contactez-nous dès aujourd'hui pour discuter de vos projets et découvrir comment nous pouvons vous aider à atteindre vos objectifs."
        ]
    } finally {
        isLoading.value = false
    }
})

// Modification pour utiliser les icônes au lieu des nombres
const stats = [
  { icon: 'fa-solid fa-paper-plane', title: t('why_choose_us.stats.projects') },
  { icon: 'fa-solid fa-ballot-check', title: t('why_choose_us.stats.clients') },
  { icon: 'fa-solid fa-head-side-headphones', title: t('why_choose_us.stats.experience') },
  { icon: 'fa-solid fa-face-smile-relaxed', title: t('why_choose_us.stats.support') }
];

// État pour gérer les animations
const isVisible = ref(false);
const activeIndex = ref(-1);
const autoAnimationIndex = ref(-1);

// Référence pour la section
const sectionRef = ref(null);

// Ajout d'un drapeau pour suivre si l'animation a déjà été exécutée
const hasAnimated = ref(false);
let animationInterval: NodeJS.Timeout | null = null;

// Fonction pour l'animation automatique
const startAutoAnimation = () => {
  if (animationInterval) return;
  
  animationInterval = setInterval(() => {
    autoAnimationIndex.value = (autoAnimationIndex.value + 1) % stats.length;
  }, 1000); // Change toutes les 1.5 secondes
};

const stopAutoAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
};

// Modification de la configuration de l'intersection observer
onMounted(() => {
  if (import.meta.client) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.value) {
        isVisible.value = true;
        hasAnimated.value = true;
        // Démarrer l'animation automatique après un délai
        setTimeout(() => {
          startAutoAnimation();
        }, 1000);
      }
    }, { threshold: 0.3 });

    if (sectionRef.value) {
      observer.observe(sectionRef.value);
    }

    return () => {
      if (sectionRef.value) {
        observer.unobserve(sectionRef.value);
      }
      stopAutoAnimation();
    };
  }
});

// Nettoyage à la destruction du composant
onUnmounted(() => {
  stopAutoAnimation();
});

// Gestion du hover sur les cartes
const setActive = (index: number) => {
  activeIndex.value = index;
};

const resetActive = () => {
  activeIndex.value = -1;
};
</script>

<template>
  <div class="why-choose-us" ref="sectionRef">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <h6 class="subheading" :class="{ 'animate': isVisible }">{{ $t('why_choose_us.heading') }}</h6>
          <!-- <h2 class="section-title" :class="{ 'animate': isVisible }">
            {{ $t('why_choose_us.title.part1') }} <span class="highlight">{{ $t('why_choose_us.title.part2') }}</span>
          </h2> -->
          <div class="divider" :class="{ 'animate': isVisible }"></div>
          <p class="section-description" :class="{ 'animate': isVisible }">
            {{ texts[0] }}
          </p>
        </div>
      </div>
      <!-- <OurProjects /> -->
      <!-- Cartes raisons -->
      <!-- <div class="row g-4 mb-5">
        <div v-for="(reason, index) in reasons" :key="index" class="col-md-6 col-lg-4">
          <div 
            class="reason-card" 
            :class="{ 'animate': isVisible, 'active': activeIndex === index }" 
            :style="{ '--delay': `${index * 100}ms` }"
            @mouseenter="setActive(index)"
            @mouseleave="resetActive()"
          >
            <div class="icon-wrapper">
              <div class="icon-bg"></div>
              <i :class="reason.icon"></i>
            </div>
            <h4>{{ reason.title }}</h4>
            <p>{{ reason.description }}</p>
            <div class="card-decoration"></div>
          </div>
        </div>
      </div> -->
      <h6 class="subheading text-center" style="font-size: 35px;" :class="{ 'animate': isVisible }">COUMBASSA & SANDEN
        <br> TECH
      </h6>
      <!-- Bannière statistiques avec icônes -->
      <div class="stats-banner" :class="{ 'animate': isVisible }">
        <div class="row g-4">
          <div v-for="(stat, index) in stats" :key="index" class="col-6 col-md-3">
            <div 
              class="stat-item" 
              :class="{ 'auto-active': autoAnimationIndex === index }"
              @mouseenter="setActive(index)"
              @mouseleave="resetActive()"
            >
              <div class="stat-icon">
                <i :class="stat.icon"></i>
              </div>
              <div class="stat-title">{{ stat.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-8 text-center">
          <div class="cta-box" :class="{ 'animate': isVisible }">
            <h3>{{ $t('why_choose_us.cta.title') }}</h3>
            <p>{{ texts[1] }}</p>
            <NuxtLink :to="`#${$t('ids.contact')}`" class="btn cta-button">
              {{ $t('why_choose_us.cta.button') }}
              <i class="bi bi-arrow-right"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Variables de couleur */
:root {
  --cs-tech-orange-color: #F9B233;
  --cs-brown-color: #3F2E1A;
  --cs-tech-light-orange-color: #FEEFD7;
}

/* Styles généraux de la section */
.why-choose-us {
  background-color: #fff;
  position: relative;
  overflow: hidden;
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.why-choose-us::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background-color: var(--cs-tech-light-orange-color);
  border-radius: 0 0 0 100%;
  opacity: 0.6;
  z-index: 0;
}

.why-choose-us::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 250px;
  height: 250px;
  background-color: var(--cs-tech-light-orange-color);
  border-radius: 0 100% 0 0;
  opacity: 0.4;
  z-index: 0;
}

/* En-tête de section */
.subheading {
  color: var(--cs-tech-orange-color);
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.section-title {
  color: var(--cs-brown-color);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  transition-delay: 100ms;
}

.highlight {
  color: var(--cs-tech-orange-color);
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: var(--cs-tech-light-orange-color);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.section-title.animate .highlight::after {
  transform: scaleX(1);
}

.divider {
  height: 4px;
  width: 80px;
  background: var(--cs-tech-orange-color);
  margin: 0 auto 1.5rem;
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.6s ease;
  transition-delay: 200ms;
}

.section-description {
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  transition-delay: 300ms;
}

/* Animation des éléments au défilement */
.subheading.animate,
.section-title.animate,
.section-description.animate {
  opacity: 1;
  transform: translateY(0);
}

.divider.animate {
  opacity: 1;
  transform: scaleX(1);
}

/* Cartes des raisons */
.reason-card {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0;
  transform: translateY(30px);
}

.reason-card.animate {
  opacity: 1;
  transform: translateY(0);
  transition-delay: var(--delay);
}

.reason-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(249, 178, 51, 0.15);
}

.icon-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-bg {
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: var(--cs-tech-light-orange-color);
  border-radius: 12px;
  transform: rotate(0deg);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.reason-card i {
  font-size: 2rem;
  color: var(--cs-tech-orange-color);
  position: relative;
  z-index: 2;
  transition: all 0.5s ease;
}

.reason-card:hover .icon-bg {
  transform: rotate(45deg) scale(1.1);
  background-color: var(--cs-tech-orange-color);
}

.reason-card:hover i {
  color: #fff;
  transform: scale(1.1);
}

.reason-card h4 {
  color: var(--cs-brown-color);
  font-size: 1.35rem;
  margin-bottom: 1rem;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

.reason-card h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--cs-tech-orange-color);
  transition: all 0.3s ease;
}

.reason-card:hover h4::after {
  width: 60px;
}

.reason-card p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}

.card-decoration {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 100px;
  height: 100px;
  background-color: var(--cs-tech-light-orange-color);
  opacity: 0;
  border-radius: 50%;
  transform: scale(0);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.reason-card:hover .card-decoration {
  opacity: 0.2;
  transform: scale(1);
}

/* Section statistiques avec icônes */
.stats-banner {
  background: linear-gradient(135deg, var(--cs-brown-color), #2a1f12);
  border-radius: 15px;
  padding: 3rem 2rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  transition-delay: 400ms;
}

.stats-banner.animate {
  opacity: 1;
  transform: translateY(0);
}

.stats-banner::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background-color: rgba(249, 178, 51, 0.1);
  border-radius: 50%;
}

.stats-banner::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: -30px;
  width: 150px;
  height: 150px;
  background-color: rgba(249, 178, 51, 0.1);
  border-radius: 50%;
}

.stat-item {
  text-align: center;
  color: #fff;
  position: relative;
  transition: all 0.6s ease;
}

.stat-item:hover,
.stat-item.auto-active {
  transform: translateY(-5px);
}

/* Styles pour les icônes */
.stat-icon {
  margin-bottom: 1rem;
  position: relative;
}

.stat-icon i {
  font-size: 3rem;
  color: var(--cs-tech-orange-color);
  transition: all 0.6s ease;
  filter: drop-shadow(0 4px 8px rgba(249, 178, 51, 0.3));
}

.stat-item:hover .stat-icon i,
.stat-item.auto-active .stat-icon i {
  color: #fff;
  transform: scale(1.1);
  filter: drop-shadow(0 6px 12px rgba(255, 255, 255, 0.3));
}

.stat-title {
  font-size: 1rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.6s ease;
}

.stat-item:hover .stat-title,
.stat-item.auto-active .stat-title {
  opacity: 1;
  color: var(--cs-tech-orange-color);
}

/* Section CTA */
.cta-box {
  background: linear-gradient(135deg, #fff, var(--cs-tech-light-orange-color));
  border-radius: 15px;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
  margin-top: 4rem;
  border: 1px dashed var(--cs-tech-orange-color);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  transition-delay: 500ms;
}

.cta-box.animate {
  opacity: 1;
  transform: translateY(0);
}

.cta-box h3 {
  color: var(--cs-brown-color);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-box p {
  color: var(--cs-brown-color);
  opacity: 0.9;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background: var(--cs-tech-orange-color);
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(249, 178, 51, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.cta-button:hover {
  background: var(--cs-brown-color);
  transform: translateY(-3px);
  box-shadow: 0 15px 25px rgba(63, 46, 26, 0.3);
}

.cta-button i {
  transition: transform 0.3s ease;
}

.cta-button:hover i {
  transform: translateX(5px);
}

/* Responsive Design */
@media (max-width: 992px) {
  .section-title {
    font-size: 2.2rem;
  }

  .stat-icon i {
    font-size: 2.5rem;
  }

  .stat-title {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
  }

  .cta-box h3 {
    font-size: 1.8rem;
  }

  .stats-banner {
    padding: 2rem 1rem;
  }

  .reason-card {
    padding: 1.5rem;
  }

  .stat-icon i {
    font-size: 2rem;
  }
}
</style>