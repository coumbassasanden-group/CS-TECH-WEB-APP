<script setup lang="ts">
import { onMounted, ref } from 'vue';

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
        console.error('Error fetching services:', err);
        error.value = err.message || 'Failed to load services';
    } finally {
        loading.value = false;
    }
};

// État pour suivre l'élément actif
const activeIndex = ref(-1);
const isIntersecting = ref(false);

// Référence pour l'intersection observer
const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
    fetchServices();
    
    if (import.meta.client) {
        // Configuration de l'intersection observer
        const observer = new IntersectionObserver((entries) => {
            isIntersecting.value = entries[0].isIntersecting;
        }, { 
            threshold: 0.2 
        });
        
        if (sectionRef.value) {
            observer.observe(sectionRef.value);
        }

        // Nettoyage à la fin
        return () => {
            if (sectionRef.value) {
                observer.unobserve(sectionRef.value);
            }
        };
    }
});

// Fonction pour gérer le survol
const setActive = (index: number) => {
    activeIndex.value = index;
};

// Fonction pour réinitialiser l'état actif
const resetActive = () => {
    activeIndex.value = -1;
};
</script>

<template>
  <section 
    class="services-section" 
    ref="sectionRef"
    :class="{ 'in-view': isIntersecting }"
  >
    <div class="container-fluid">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-icon">
          <svg width="40" height="40" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.7 10.2C1.2325 10.2 0.832431 10.0334 0.4998 9.7002C0.1666 9.36759 0 8.9675 0 8.5C0 8.0325 0.1666 7.63215 0.4998 7.29895C0.832431 6.96635 1.2325 6.8 1.7 6.8C2.1675 6.8 2.56757 6.96635 2.9002 7.29895C3.2334 7.63215 3.4 8.0325 3.4 8.5C3.4 8.9675 3.2334 9.36759 2.9002 9.7002C2.56757 10.0334 2.1675 10.2 1.7 10.2ZM3.1025 15.045L1.9125 13.855L5.61 10.1575L6.8 11.3475L3.1025 15.045ZM5.6525 6.8L1.955 3.1025L3.145 1.9125L6.8425 5.61L5.6525 6.8ZM8.5 17C8.0325 17 7.63241 16.8337 7.2998 16.5011C6.9666 16.1679 6.8 15.7675 6.8 15.3C6.8 14.8325 6.9666 14.4321 7.2998 14.099C7.63241 13.7663 8.0325 13.6 8.5 13.6C8.9675 13.6 9.36785 13.7663 9.70105 14.099C10.0337 14.4321 10.2 14.8325 10.2 15.3C10.2 15.7675 10.0337 16.1679 9.70105 16.5011C9.36785 16.8337 8.9675 17 8.5 17ZM8.5 3.4C8.0325 3.4 7.63241 3.2334 7.2998 2.9002C6.9666 2.56757 6.8 2.1675 6.8 1.7C6.8 1.2325 6.9666 0.83215 7.2998 0.49895C7.63241 0.166319 8.0325 0 8.5 0C8.9675 0 9.36785 0.166319 9.70105 0.49895C10.0337 0.83215 10.2 1.2325 10.2 1.7C10.2 2.1675 10.0337 2.56757 9.70105 2.9002C9.36785 3.2334 8.9675 3.4 8.5 3.4ZM11.3475 6.8425L10.1575 5.61L13.8975 1.9125L15.0875 3.1025L11.3475 6.8425ZM13.8975 15.045L10.2 11.3475L11.39 10.1575L15.0875 13.855L13.8975 15.045ZM15.3 10.2C14.8325 10.2 14.4321 10.0334 14.099 9.7002C13.7663 9.36759 13.6 8.9675 13.6 8.5C13.6 8.0325 13.7663 7.63215 14.099 7.29895C14.4321 6.96635 14.8325 6.8 15.3 6.8C15.7675 6.8 16.1679 6.96635 16.5011 7.29895C16.8337 7.63215 17 8.0325 17 8.5C17 8.9675 16.8337 9.36759 16.5011 9.7002C16.1679 10.0334 15.7675 10.2 15.3 10.2Z" fill="#F9B233"/>
          </svg>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="tech-loader">
          <div class="loader-rings">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-3"></div>
          </div>            <div class="loader-code">
              <span class="code-line">&lt;{{ $t('services_db.loading.code') }}/&gt;</span>
              <div class="dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          </div>
          <p class="loading-text">{{ $t('services_db.loading.title') }}</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#F9B233" stroke-width="2"/>
            <path d="m15 9-6 6" stroke="#F9B233" stroke-width="2"/>
            <path d="m9 9 6 6" stroke="#F9B233" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="error-title">{{ $t('services_db.error.title') }}</h3>
        <p class="error-message">{{ error }}</p>
        <div class="error-code">{{ $t('services_db.error.code') }}</div>
        <button @click="fetchServices" class="retry-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ $t('services_db.error.retry') }}
        </button>
      </div>

      <!-- Services Grid -->
      <div v-else class="services-grid">
        <div 
          v-for="(service, index) in services" 
          :key="service.id" 
          class="service-card"
          :class="{ 'active': activeIndex === index }"
          :style="{
            '--delay': `${index * 150}ms`
          }"
          @mouseenter="setActive(index)"
          @mouseleave="resetActive()"
        >
          <!-- Service Image -->
          <div class="service-image">
            <img :src="`${config.public.apiBaseUrl}/storage/${service.image}`" :alt="service.title" />
            <div class="image-overlay">
              <div class="overlay-pattern"></div>
            </div>
          </div>
          
          <!-- Service Content -->
          <div class="service-content">
            <h3 class="service-title">{{ service.title }}</h3>
            <ul class="service-details">
              <li v-for="detail in service.details" :key="detail" class="detail-item">
                <span class="detail-bullet">•</span>
                {{ detail }}
              </li>
            </ul>
          </div>
          
          <!-- Card Border Effect -->
          <div class="card-border-effect"></div>
        </div>

        <!-- Empty State -->
        <div v-if="services.length === 0" class="col-span-full">
          <div class="empty-state">
            <div class="empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#F9B233" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>{{ $t('services_db.empty.title') }}</h4>
            <p>{{ $t('services_db.empty.description') }}</p>
            <div class="empty-code" v-html="$t('services_db.empty.code')"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:root {
  --cs-tech-orange-color: #F9B233;
  --cs-brown-color: #3F2E1A;
  --cs-tech-light-orange-color: #FEEFD7;
  --cs-light-brown-color: #E7D7C5;
}

.services-section {
  padding: 6rem 0;
  background: #fff;
}

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
}

@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .container-fluid {
    max-width: 1200px;
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .container-fluid {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .section-header h2 {
    font-size: 2.2rem;
  }
  
  .service-image {
    height: 160px;
  }
  
  .service-content {
    padding: 1.2rem;
  }
  
  .loading-container,
  .error-container,
  .empty-state {
    padding: 2rem;
    min-height: 300px;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 4rem 0;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .service-image {
    height: 180px;
  }
  
  .tech-loader {
    transform: scale(0.8);
  }
  
  .container-fluid {
    padding: 0 1rem;
  }
}
</style>