<script setup lang="ts">
import { ref } from 'vue'
import { useSectionSEO } from '~/composables/useSectionSEO'

const text = ref<string>('')
const isLoading = ref(true)
useSectionSEO('services')
const { get } = useApi()

// onMounted(async () => {
//     try {
//         // Récupération du texte depuis l'API
//         const response = await get<string[]>('/api/texts/our_services')
//         text.value = response[0]
//     } catch (error) {
//         console.error('Erreur lors de la récupération du texte:', error)
//         // Texte par défaut en cas d'erreur
//         text.value = "Experts en transformation digitale, nous développons des solutions sur mesure intégrant l'IA pour optimiser vos processus et accélérer votre croissance."
//     } finally {
//         isLoading.value = false
//     }
// })
</script>

<template>
  <section :id="$t('ids.services')" class="services-section">
    <div class="container ">
      <div class="row g-5 align-items-center">
        <div class="col-lg-5 about-img p-0">
          <img class="img-fluid" src="~/assets/images/hero-2.png">
        </div>
        <div class="col-lg-7" data-aos="fade-right">
          <div class="section-badge mb-3">{{ $t('our_services.badge') }}</div>
          <h2 class="section-title mb-4">
            {{ $t('our_services.title.main') }} <br>
            <span class="accent-text">{{ $t('our_services.title.highlight') }}</span>
          </h2>
          <!-- <p class="section-text mb-4">
            {{ text }}
          </p> -->
          <NuxtLink :to="`#${$t('ids.contact')}`" class="btn btn-primary rounded-pill px-4">
            {{ $t('our_services.cta') }}
            <i class="bi bi-arrow-right ms-2"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
    <ServicesFromDB />
    <!-- <WhatWeDo/> -->
    <WhyChooseUs/>
  </section>
</template>

<style scoped>
/* .services-section {
  background: red;
} */

.section-badge {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--cs-tech-light-orange-color);
  color: var(--cs-tech-orange-color);
  border-radius: 50px;
  font-weight: 600;
  font-family: var(--cs-family-montserrat);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--cs-brown-color);
  font-family: var(--cs-family-montserrat);
}

.accent-text {
  color: var(--cs-tech-orange-color);
}

.section-text {
  color: var(--cs-brown-color);
  opacity: 0.9;
  font-size: 1.1rem;
  line-height: 1.6;
  font-family: var(--cs-family-poppins);
}

.service-item {
  position: relative;
  padding: 2.5rem 1.5rem;
  background: #FFFFFF;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(249, 178, 51, 0.1);
}

.service-item:hover {
  transform: translateY(-5px);
  background: var(--cs-tech-orange-color);
  box-shadow: 0 15px 30px rgba(249, 178, 51, 0.15);
}

.service-item .service-icon {
  margin: 0 auto 1.25rem auto;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cs-tech-orange-color);
  background: var(--cs-tech-light-orange-color);
  border-radius: 20px;
  transition: all 0.4s ease;
}

.service-item:hover .service-icon {
  background: #FFFFFF;
  transform: rotateY(180deg);
}

.service-icon i {
  font-size: 2rem;
  transition: all 0.4s ease;
}

.service-item h5 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--cs-brown-color);
  transition: all 0.3s ease;
  font-family: var(--cs-family-montserrat);
}

.service-item p {
  color: var(--cs-brown-color);
  opacity: 0.8;
  transition: all 0.3s ease;
  font-family: var(--cs-family-poppins);
}

.service-item:hover h5,
.service-item:hover p {
  color: #FFFFFF;
}

.about-img img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  -o-object-fit: fill;
}

.about-img {
  position: relative;
}

.about-img::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(184, 115, 51, 0.3) 20%,
    rgba(184, 115, 51, 0.8) 80%,
    rgba(184, 115, 51, 1) 100%
  );
}

.about-img::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    to right,
    rgba(184, 115, 51, 1) 0%,
    rgba(184, 115, 51, 0.8) 20%,
    rgba(184, 115, 51, 0.3) 80%,
    transparent 100%
  );
}


.btn-primary {
  background: var(--cs-tech-orange-color);
  border: none;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--cs-brown-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(249, 178, 51, 0.2);
}

@media (max-width: 992px) {
  .section-title {
    font-size: 2rem;
  }

  .service-item {
    padding: 2rem 1rem;
  }
}

@media (max-width: 768px) {
  .services-section {
    text-align: center;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .about-img {
    max-height: 300px;
    overflow: hidden;
  }

  .about-img::before,
  .about-img::after {
    display: none;
  }

  .service-item {
    margin-bottom: 1rem;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .section-badge {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>