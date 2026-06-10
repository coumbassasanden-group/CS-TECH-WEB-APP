<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';

interface Service {
    id: number;
    image: string;
    details: string[];
    title: string;
}

const api = useApi();
const services = ref<Service[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const config = useRuntimeConfig();

const fetchServices = async () => {
    loading.value = true;
    error.value = null;
    try {
        services.value = await api.get<Service[]>('/api/tech-services');
    } catch (err: any) {
        error.value = err.message || 'Failed to load services';
    } finally {
        loading.value = false;
    }
};

// Carousel state
const currentIndex = ref(0);
const isPaused = ref(false);
let interval: ReturnType<typeof setInterval> | null = null;

const goTo = (index: number) => {
    currentIndex.value = (index + services.value.length) % services.value.length;
};

const next = () => goTo(currentIndex.value + 1);
const prev = () => goTo(currentIndex.value - 1);

const startAutoplay = () => {
    interval = setInterval(() => {
        if (!isPaused.value) next();
    }, 3000);
};

const stopAutoplay = () => {
    if (interval) { clearInterval(interval); interval = null; }
};

const onMouseEnter = () => { isPaused.value = true; };
const onMouseLeave = () => { isPaused.value = false; };

const isIntersecting = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
    fetchServices().then(() => {
        if (services.value.length > 1) startAutoplay();
    });

    if (import.meta.client) {
        const observer = new IntersectionObserver((entries) => {
            isIntersecting.value = entries[0].isIntersecting;
        }, { threshold: 0.2 });
        if (sectionRef.value) observer.observe(sectionRef.value);
    }
});

onUnmounted(() => stopAutoplay());
</script>

<template>
  <section 
    class="services-section" 
    ref="sectionRef"
    :class="{ 'in-view': isIntersecting }"
  >
    <div class="container-fluid">

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="tech-loader">
          <div class="loader-rings">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-3"></div>
          </div>
          <div class="loader-code">
            <span class="code-line">&lt;{{ $t('services_db.loading.code') }}/&gt;</span>
            <div class="dots"><span>.</span><span>.</span><span>.</span></div>
          </div>
        </div>
        <p class="loading-text">{{ $t('services_db.loading.title') }}</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#F9B233" stroke-width="2"/>
            <path d="m15 9-6 6" stroke="#F9B233" stroke-width="2"/>
            <path d="m9 9 6 6" stroke="#F9B233" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="error-title">{{ $t('services_db.error.title') }}</h3>
        <p class="error-message">{{ error }}</p>
        <button @click="fetchServices" class="retry-button">{{ $t('services_db.error.retry') }}</button>
      </div>

      <!-- Carousel -->
      <div 
        v-else-if="services.length > 0"
        class="carousel-wrapper"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <!-- Slide -->
        <transition name="slide-fade" mode="out-in">
          <div class="carousel-slide" :key="currentIndex">
            <!-- Texte à gauche -->
            <div class="carousel-text">
              <div class="service-badge">{{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(services.length).padStart(2, '0') }}</div>
              <h3 class="carousel-title">{{ services[currentIndex].title }}</h3>
              <ul class="service-details">
                <li v-for="detail in services[currentIndex].details" :key="detail" class="detail-item">
                  <span class="detail-bullet"></span>
                  {{ detail }}
                </li>
              </ul>
            </div>

            <!-- Image à droite -->
            <div class="carousel-image">
              <img 
                :src="`${config.public.apiBaseUrl}/storage/${services[currentIndex].image}`" 
                :alt="services[currentIndex].title" 
              />
            </div>
          </div>
        </transition>

        <!-- Navigation dots -->
        <div class="carousel-dots">
          <button 
            v-for="(_, i) in services" 
            :key="i"
            class="dot"
            :class="{ active: i === currentIndex }"
            @click="goTo(i)"
            :aria-label="`Service ${i + 1}`"
          ></button>
        </div>

        <!-- Arrows -->
        <button class="carousel-arrow arrow-prev" @click="prev" aria-label="Précédent">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button class="carousel-arrow arrow-next" @click="next" aria-label="Suivant">
          <i class="bi bi-chevron-right"></i>
        </button>

        <!-- Progress bar -->
        <div class="progress-bar" :class="{ paused: isPaused }"></div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <h4>{{ $t('services_db.empty.title') }}</h4>
        <p>{{ $t('services_db.empty.description') }}</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.services-section {
  padding: 4rem 0;
  background: #fff;
}

.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* === CAROUSEL === */
.carousel-wrapper {
  position: relative;
  background: #fafafa;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--cs-light-brown-color);
  box-shadow: 0 8px 30px rgba(63, 46, 26, 0.06);
}

.carousel-slide {
  display: flex;
  align-items: stretch;
  min-height: 380px;
}

/* Texte à gauche */
.carousel-text {
  flex: 1;
  padding: 3rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
}

.service-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--cs-tech-orange-color);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: var(--cs-family-montserrat);
}

.carousel-title {
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--cs-brown-color);
  line-height: 1.3;
  font-family: var(--cs-family-montserrat);
  margin: 0;
}

.service-details {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
}

.detail-bullet {
  width: 8px;
  height: 8px;
  min-width: 8px;
  background: var(--cs-tech-orange-color);
  border-radius: 50%;
  margin-top: 0.4rem;
}

/* Image à droite */
.carousel-image {
  flex: 0 0 45%;
  overflow: hidden;
  position: relative;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Navigation dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 1.2rem 0 1rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--cs-light-brown-color);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot.active {
  background: var(--cs-tech-orange-color);
  transform: scale(1.3);
}

/* Arrows */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--cs-tech-orange-color);
  background: white;
  color: var(--cs-tech-orange-color);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-arrow:hover {
  background: var(--cs-tech-orange-color);
  color: white;
}

.arrow-prev { left: 1rem; }
.arrow-next { right: 1rem; }

/* Progress bar */
.progress-bar {
  height: 3px;
  background: var(--cs-tech-orange-color);
  animation: progress 3s linear infinite;
  transform-origin: left;
}

.progress-bar.paused {
  animation-play-state: paused;
}

@keyframes progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Slide transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Loading / Error / Empty */
.loading-container,
.error-container,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
  text-align: center;
}

.tech-loader {
  position: relative;
  margin-bottom: 1.5rem;
}

.loader-rings {
  position: relative;
  width: 100px;
  height: 100px;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 3px solid transparent;
}

.ring-1 { width: 100px; height: 100px; border-top-color: var(--cs-tech-orange-color); animation: spin 2s linear infinite; }
.ring-2 { width: 75px; height: 75px; top: 12px; left: 12px; border-right-color: var(--cs-brown-color); animation: spin 1.5s linear infinite reverse; }
.ring-3 { width: 50px; height: 50px; top: 25px; left: 25px; border-bottom-color: var(--cs-tech-orange-color); animation: spin 1s linear infinite; }

.loader-code {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.code-line { color: var(--cs-brown-color); font-weight: 600; font-size: 0.8rem; }
.dots span { color: var(--cs-tech-orange-color); font-weight: bold; animation: blink 1.4s infinite; }
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }
.loading-text { color: var(--cs-brown-color); font-weight: 500; }

.error-title { font-size: 1.5rem; font-weight: 700; color: var(--cs-brown-color); margin: 1rem 0 0.5rem; }
.error-message { color: #666; margin-bottom: 1.5rem; }

.retry-button {
  background: var(--cs-tech-orange-color);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover { background: var(--cs-brown-color); }

.empty-state h4 { font-size: 1.3rem; color: var(--cs-brown-color); margin-bottom: 0.5rem; }
.empty-state p { color: #666; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

/* Responsive */
@media (max-width: 992px) {
  .carousel-slide {
    min-height: 320px;
  }
  .carousel-title { font-size: 1.6rem; }
  .carousel-text { padding: 2.5rem 2.5rem; }
}

@media (max-width: 768px) {
  .carousel-slide {
    flex-direction: column-reverse;
    min-height: auto;
  }
  .carousel-image {
    flex: 0 0 220px;
    height: 220px;
  }
  .carousel-text { padding: 1.75rem 1.5rem; }
  .carousel-title { font-size: 1.4rem; }
  .detail-item { font-size: 0.95rem; }
  .arrow-prev { left: 0.5rem; }
  .arrow-next { right: 0.5rem; }
}

@media (max-width: 480px) {
  .services-section { padding: 2.5rem 0; }
  .container-fluid { padding: 0 1rem; }
  .carousel-image { flex: 0 0 180px; height: 180px; }
  .carousel-text { padding: 1.25rem 1rem; gap: 0.8rem; }
  .carousel-title { font-size: 1.2rem; }
  .detail-item { font-size: 0.875rem; }
  .carousel-arrow { width: 36px; height: 36px; font-size: 0.9rem; }
  .service-badge { font-size: 0.7rem; }
}
</style>

.container-fluid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
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

.highlight {
  color: var(--cs-tech-orange-color);
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--cs-tech-orange-color), transparent);
  border-radius: 2px;
}

.header-line {
  height: 4px;
  width: 100px;
  background: linear-gradient(90deg, var(--cs-tech-orange-color), var(--cs-brown-color));
  margin: 0 auto;
  border-radius: 2px;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.tech-loader {
  position: relative;
  margin-bottom: 2rem;
}

.loader-rings {
  position: relative;
  width: 120px;
  height: 120px;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 3px solid transparent;
}

.ring-1 {
  width: 120px;
  height: 120px;
  border-top-color: var(--cs-tech-orange-color);
  animation: spin 2s linear infinite;
}

.ring-2 {
  width: 90px;
  height: 90px;
  top: 15px;
  left: 15px;
  border-right-color: var(--cs-brown-color);
  animation: spin 1.5s linear infinite reverse;
}

.ring-3 {
  width: 60px;
  height: 60px;
  top: 30px;
  left: 30px;
  border-bottom-color: var(--cs-tech-orange-color);
  animation: spin 1s linear infinite;
}

.loader-code {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
}

.code-line {
  color: var(--cs-brown-color);
  font-weight: 600;
  font-size: 0.9rem;
}

.dots {
  margin-top: 0.5rem;
}

.dots span {
  color: var(--cs-tech-orange-color);
  font-weight: bold;
  animation: blink 1.4s infinite;
}

.dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

.loading-text {
  font-size: 1.2rem;
  color: var(--cs-brown-color);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: linear-gradient(135deg, #fff 0%, var(--cs-tech-light-orange-color) 100%);
  border-radius: 20px;
  padding: 3rem;
  border: 2px solid rgba(249, 178, 51, 0.2);
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.error-icon {
  margin-bottom: 1.5rem;
  animation: pulse 2s infinite;
}

.error-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--cs-brown-color);
  margin-bottom: 1rem;
  font-family: var(--cs-family-montserrat, 'Montserrat', sans-serif);
}

.error-message {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
  max-width: 400px;
}

.error-code {
  font-family: 'JetBrains Mono', monospace;
  background: var(--cs-brown-color);
  color: var(--cs-tech-orange-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.retry-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--cs-tech-orange-color);
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--cs-family-poppins, 'Poppins', sans-serif);
}

.retry-button:hover {
  background: var(--cs-brown-color);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(249, 178, 51, 0.3);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: linear-gradient(135deg, #fff 0%, var(--cs-tech-light-orange-color) 100%);
  border-radius: 20px;
  padding: 3rem;
  border: 2px dashed rgba(249, 178, 51, 0.3);
}

.empty-icon {
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.empty-state h4 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--cs-brown-color);
  margin-bottom: 1rem;
}

.empty-state p {
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 300px;
}

.empty-code {
  font-family: 'JetBrains Mono', monospace;
  background: var(--cs-light-brown-color);
  color: var(--cs-brown-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.col-span-full {
  grid-column: 1 / -1;
}

.service-card {
  position: relative;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  opacity: 0;
  transform: translateY(40px);
  animation: slideUp 0.8s ease forwards;
  animation-delay: var(--delay);
  border: 1px solid var(--cs-light-brown-color);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(249, 178, 51, 0.15);
}

.service-card:hover .card-border-effect {
  opacity: 1;
}

.service-image {
  position: relative;
  height: 200px;
  width: 100%;
  overflow: hidden;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.service-card:hover .service-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(249, 178, 51, 0.01), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card:hover .image-overlay {
  opacity: 1;
}

.service-content {
  padding: 1.5rem;
}

.service-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--cs-brown-color);
  margin-bottom: 1rem;
  font-family: var(--cs-family-montserrat, 'Montserrat', sans-serif);
  transition: color 0.3s ease;
}

.service-card:hover .service-title {
  color: var(--cs-tech-orange-color);
}

.service-details {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-bullet {
  color: var(--cs-tech-orange-color);
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: -0.1rem;
}

.service-card:hover .detail-item {
  color: var(--cs-brown-color);
}

.card-border-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid var(--cs-tech-orange-color);
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* Animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1400px) {
  .container-fluid {
    padding: 0 1.5rem;
  }
