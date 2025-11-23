<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSectionSEO } from '~/composables/useSectionSEO'

const { locale } = useI18n()
const texts = ref<string[]>([])
const isLoading = ref(true)

const { get } = useApi()

useSectionSEO('about')

onMounted(async () => {
  try {
    const response = await get<string[]>('/api/texts/about_us')
    texts.value = response
  } catch (error) {
    console.error('Erreur lors de la récupération des textes:', error)
    texts.value = locale.value === 'fr' ? [
      "Notre équipe est composée de jeunes talents passionnés par la technologie",
      "Nous plaçons les valeurs africaines d'ubuntu au cœur de nos solutions.",
      "Nous combinons l'énergie de la jeunesse, la richesse des valeurs africaines et la puissance de l'intelligence artificielle",
      "Nous créons des solutions qui transforment votre business",
      "Le trésor de l'Afrique est au cœur de nos solutions",
      "L'intelligence artificielle guide nos innovations",
    ] : [
      "Our team consists of young talents passionate about technology",
      "We place African ubuntu values at the heart of our solutions.",
      "We combine youthful energy, rich African values and the power of artificial intelligence",
      "We create solutions that transform your business",
      "Africa's treasure is at the heart of our solutions",
      "Artificial intelligence guides our innovations",
    ]
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section :id="$t('ids.about')" class="about-section">
    <div class="container my-5">
      <!-- En-tête de section -->
      <div class="section-header text-center" data-aos="fade-up">
        <span class="section-badge">{{ $t('about.section.badge') }}</span>
        <h2 class="section-title">{{ $t('about.section.title') }} <span class="highlight">{{ $t('about.section.company')
        }}</span></h2>
        <p class="section-description">
          {{ $t('about.section.description') }}
        </p>
      </div>

      <!-- Contenu principal -->
      <div class="row g-5 align-items-center">
        <!-- Colonne de gauche: Image et informations -->
        <div class="col-lg-6" data-aos="fade-right">
          <div class="about-image-container">
            <div class="main-image-wrapper">
              <img src="~/assets/images/team-young-african.webp" alt="Notre équipe" class="main-image">
            </div>

            <!-- Texte sur l'équipe et les valeurs -->
            <div class="action-buttons d-flex justify-content-center" data-aos="fade-up" data-aos-delay="500">
              <NuxtLink :to="`#${$t('ids.services')}`" class="btn btn-primary">
                {{ $t('about.section.buttons.services') }}
                <i class="bi bi-arrow-right ms-2"></i>
              </NuxtLink>
              <NuxtLink :to="`#${$t('ids.contact')}`" class="btn btn-outline">
                {{ $t('about.section.buttons.contact') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Colonne de droite: Contenu principal -->
        <div class="col-lg-6" data-aos="fade-left">
          <div class="about-content">
            <h2 class="content-title">
              <span class="text-accent">{{ $t('about.section.side_text_1') }}</span>
              {{ $t('about.section.side_text_2') }}
            </h2>

            <!-- <p class="content-description">
              {{ texts[2] }}
            </p> -->

            <!-- Caractéristiques principales -->
            <div class="features-list">
              <div class="value-item my-" data-aos="fade-up" data-aos-delay="100">
                <div class="value-icon">
                  <i class="fa-solid fa-handshake-simple"></i>
                </div>
                <div class="value-content">
                  <h4>{{ $t('about.section.team.title') }}</h4>
                  <p>{{ texts[0] }}</p>
                </div>
              </div>

              <div class="value-item my-3" data-aos="fade-up" data-aos-delay="200">
                <div class="value-icon">
                  <i class="fa-regular fa-screwdriver-wrench"></i>
                </div>
                <div class="value-content">
                  <h4>{{ $t('about.section.team.values') }}</h4>
                  <p>{{ texts[1] }}</p>
                </div>
              </div>
              <div class="value-item my-" data-aos="fade-up" data-aos-delay="100">
                <div class="value-icon">
                  <i class="fa-solid fa-lightbulb-on"></i>
                </div>
                <div class="value-content">
                  <h4>{{ $t('about.section.team.simplify') }}</h4>
                  <p>{{ texts[2] }}</p>
                </div>
              </div>

              <div class="value-item my-3" data-aos="fade-up" data-aos-delay="200">
                <div class="value-icon">
                  <i class="fa-solid fa-lock-keyhole"></i>
                </div>
                <div class="value-content">
                  <h4>{{ $t('about.section.team.security') }}</h4>
                  <p>{{ texts[3] }}</p>
                </div>
              </div>
              <div class="value-item my-3" data-aos="fade-up" data-aos-delay="200">
                <div class="value-icon">
                  <i class="fa-solid fa-messages"></i>
                </div>
                <div class="value-content">
                  <h4>{{ $t('about.section.team.comunication') }}</h4>
                  <p>{{ texts[4] }}</p>
                </div>
              </div>
              <div class="value-item my-3" data-aos="fade-up" data-aos-delay="200">
                <div class="value-icon">
                  <i class="bi bi-robot"></i>
                </div>
                <div class="value-content">
                  <h4>{{ $t('about.section.team.center') }}</h4>
                  <p>{{ texts[5] }}</p>
                </div>
              </div>
              <!-- <div class="feature-item my-3" data-aos="fade-up" data-aos-delay="100">
                <div class="feature-icon" style="background-color: #F9B233">
                  <i class="bi bi-lightbulb"></i>
                </div>
                <div class="feature-content">
                  <h3>{{ $t('about.section.features.innovation.title') }}</h3>
                  <p>{{ texts[2] }}</p>
                </div>
              </div>

              <div class="feature-item" data-aos="fade-up" data-aos-delay="200">
                <div class="feature-icon" style="background-color: #F9B233">
                  <i class="bi bi-robot"></i>
                </div>
                <div class="feature-content">
                  <h3>{{ $t('about.section.features.ai.title') }}</h3>
                  <p>{{ texts[3] }}</p>
                </div>
              </div>
              <div class="feature-item" data-aos="fade-up" data-aos-delay="200">
                <div class="feature-icon" style="background-color: #F9B233">
                  <i class="bi bi-robot"></i>
                </div>
                <div class="feature-content">
                  <h3>{{ $t('about.section.features.ai.title') }}</h3>
                  <p>{{ texts[4] }}</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Variables CSS */
:root {
  --cs-tech-orange-color: #F9B233;
  --cs-brown-color: #3F2E1A;
  --cs-light-brown-color: #E7D7C5;
  --cs-tech-light-orange-color: #FEEFD7;
}

/* === SECTION PRINCIPALE === */
.about-section {
  background: #ffffff;
  padding: 0;
  position: relative;
}

/* === EN-TÊTE === */
.section-header {
  margin-bottom: 60px;
}

.section-badge {
  display: inline-block;
  padding: 12px 24px;
  background: var(--cs-tech-light-orange-color);
  color: var(--cs-tech-orange-color);
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--cs-brown-color);
  margin-bottom: 20px;
  line-height: 1.2;
}

.highlight {
  color: var(--cs-tech-orange-color);
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  font-family: var(--cs-family-roboto) !important;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* === IMAGE ET INFORMATIONS === */
.about-image-container {
  height: 100%;
}

.main-image-wrapper {
  position: relative;
  margin-bottom: 40px;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.experience-badge {
  position: absolute;
  top: -20px;
  right: -20px;
  background: var(--cs-tech-orange-color);
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(249, 178, 51, 0.3);
  z-index: 2;
}

.exp-number {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.exp-text {
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
}

/* === VALEURS D'ÉQUIPE === */
.team-values-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.value-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  background: #fafafa;
  border-radius: 15px;
  border-left: 4px solid var(--cs-tech-orange-color);
  transition: all 0.3s ease;
}

.value-item:hover {
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.value-icon {
  min-width: 50px;
  height: 50px;
  background: var(--cs-tech-light-orange-color);
  color: var(--cs-tech-orange-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.value-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--cs-brown-color);
  margin-bottom: 8px;
}

.value-content p {
  font-size: 0.95rem;
  font-family: var(--cs-family-roboto) !important;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* === CONTENU PRINCIPAL === */
.about-content {
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  height: 100%;
}

.content-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--cs-brown-color);
  margin-bottom: 20px;
  line-height: 1.3;
}

.text-accent {
  color: var(--cs-tech-orange-color);
}

.content-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 40px;
}

/* === CARACTÉRISTIQUES === */
/* .features-list {
  margin-bottom: 40px;
} */

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: #fafafa;
}

.feature-icon {
  min-width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
}

.feature-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--cs-brown-color);
  margin-bottom: 8px;
}

.feature-content p {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* === VALEURS === */
.values-section {
  margin-bottom: 40px;
}

.values-section h4 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--cs-brown-color);
  margin-bottom: 20px;
}

.values-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.value-tag {
  padding: 10px 20px;
  background: var(--cs-tech-light-orange-color);
  color: var(--cs-tech-orange-color);
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.value-tag:hover {
  background: var(--cs-tech-orange-color);
  color: white;
  transform: translateY(-2px);
}

/* === BOUTONS === */
.action-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 15px 30px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--cs-tech-orange-color);
  color: white;
}

.btn-primary:hover {
  background: var(--cs-brown-color);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(63, 46, 26, 0.2);
}

.btn-outline {
  background: transparent;
  color: var(--cs-brown-color);
  border: 2px solid var(--cs-brown-color);
}

.btn-outline:hover {
  background: var(--cs-brown-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(63, 46, 26, 0.2);
}

/* === RESPONSIVE === */
@media (max-width: 991.98px) {
  .about-section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .content-title {
    font-size: 1.6rem;
  }

  .experience-badge {
    right: 20px;
    top: 20px;
  }
}

@media (max-width: 767.98px) {
  .about-section {
    padding: 50px 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .content-title {
    font-size: 1.4rem;
  }

  .about-content {
    padding: 30px;
  }

  .feature-item,
  .value-item {
    flex-direction: column;
    text-align: center;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .main-image {
    height: 300px;
  }

  .experience-badge {
    width: 80px;
    height: 80px;
    right: 15px;
    top: 15px;
  }

  .exp-number {
    font-size: 1.5rem;
  }

  .exp-text {
    font-size: 0.7rem;
  }
}

@media (max-width: 575.98px) {
  .section-header {
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .about-content {
    padding: 25px;
  }

  .team-values-section {
    gap: 20px;
  }

  .value-item {
    padding: 20px;
  }
}
</style>