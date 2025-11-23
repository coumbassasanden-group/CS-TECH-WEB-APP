<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref } from 'vue';
import { useSectionSEO } from '~/composables/useSectionSEO';

interface Project {
    id: string;
    title: string;
    image: string;
    description: string;
    link: string;
}

const { get } = useApi();
const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const config = useRuntimeConfig();

const fetchProjects = async () => {
    loading.value = true;
    error.value = null;

    try {
        const data = await get<Project[]>('/api/projects');
        projects.value = data;
    } catch (err: any) {
        error.value = err.message || 'Failed to load projects';
    } finally {
        loading.value = false;
    }
};
useSectionSEO('projects')
onMounted(() => {
    fetchProjects();
});
</script>

<template>
    <section :id="$t('ids.projects')" class="tech-projects-section">
        <div class="container-fluid">
            <div class="projects-container">
                <div class="row align-items-center justify-content-center">
                    <!-- Left Side - Tech Illustration -->
                    <!-- <div class="col-xl-4">
                        <div class="tech-showcase" data-aos="fade-right" data-aos-delay="200">
                            <div class="tech-visual">
                                <div class="floating-elements">
                                    <div class="tech-circle circle-1">
                                        <i class="fas fa-code"></i>
                                    </div>
                                    <div class="tech-circle circle-2">
                                        <i class="fas fa-database"></i>
                                    </div>
                                    <div class="tech-circle circle-3">
                                        <i class="fas fa-cloud"></i>
                                    </div>
                                    <div class="tech-circle circle-4">
                                        <i class="fas fa-mobile-alt"></i>
                                    </div>
                                </div>

                                <div class="central-hub">
                                    <div class="hub-core">
                                        <i class="fas fa-microchip"></i>
                                    </div>
                                    <div class="pulse-ring"></div>
                                    <div class="pulse-ring delay-1"></div>
                                    <div class="pulse-ring delay-2"></div>
                                </div>

                                <svg class="connection-lines" viewBox="0 0 300 300">
                                    <path class="line line-1" d="M150,150 L75,75" />
                                    <path class="line line-2" d="M150,150 L225,75" />
                                    <path class="line line-3" d="M150,150 L75,225" />
                                    <path class="line line-4" d="M150,150 L225,225" />
                                </svg>

                                <div class="tech-grid"></div>
                            </div>
                        </div>
                    </div> -->

                    <!-- Right Side - Projects Slider -->
                    <div class="col-xl-8">
                        <div class="projects-content">
                            <div class="section-header" data-aos="fade-left" data-aos-delay="300">
                                <div class="header-badge">
                                    <i class="fas fa-rocket"></i>
                                    <span>{{ $t('projects.section.badge') }}</span>
                                </div>
                                <h2 class="section-title">
                                    {{ $t('projects.section.title') }} <span class="highlight">{{ $t('projects.section.title_highlight') }}</span>
                                </h2>
                                <p class="section-subtitle">
                                    {{ $t('projects.section.subtitle') }}
                                </p>
                            </div>

                            <div class="projects-slider-wrapper" data-aos="fade-up" data-aos-delay="500">
                                <!-- Loading State -->
                                <div v-if="loading" class="loading-container">
                                    <div class="tech-loader">
                                        <div class="loader-rings">
                                            <div class="ring ring-1"></div>
                                            <div class="ring ring-2"></div>
                                            <div class="ring ring-3"></div>
                                        </div>
                                        <div class="loader-code">
                                            <div class="code-line">{{ $t('projects.states.loading') }}</div>
                                            <div class="dots">
                                                <span>.</span>
                                                <span>.</span>
                                                <span>.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Error State -->
                                <div v-else-if="error" class="error-container">
                                    <div class="error-icon">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <h4 class="error-title">{{ $t('projects.states.error.title') }}</h4>
                                    <p class="error-message">{{ error }}</p>
                                    <button @click="fetchProjects" class="retry-button">
                                        <i class="fas fa-redo"></i>
                                        {{ $t('projects.states.error.retry') }}
                                    </button>
                                </div>

                                <!-- Empty State -->
                                <div v-else-if="!loading && projects.length === 0" class="empty-state">
                                    <div class="empty-icon">
                                        <i class="fas fa-folder-open"></i>
                                    </div>
                                    <h4 class="text-center">{{ $t('projects.states.empty.title') }}</h4>
                                    <p>{{ $t('projects.states.empty.description') }}</p>
                                    <div class="empty-code">{{ $t('projects.states.empty.code') }}</div>
                                </div>

                                <!-- Projects Slider -->
                                <Swiper v-else
                                    :modules="[Navigation, Autoplay]" 
                                    :navigation="{
                                        nextEl: '.custom-next',
                                        prevEl: '.custom-prev',
                                    }" 
                                    :loop="true" 
                                    :spaceBetween="30" 
                                    :autoplay="{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }" 
                                    :speed="1000"
                                    class="tech-projects-swiper"
                                >
                                    <SwiperSlide v-for="project in projects" :key="project.id">
                                        <div class="project-card">
                                            <div class="card-header">
                                                <div class="project-icon">
                                                    <img :src="`${config.public.apiBaseUrl}/storage/${project.image}`" :alt="project.title">
                                                </div>
                                                <div class="card-dots">
                                                    <span class="dot red"></span>
                                                    <span class="dot yellow"></span>
                                                    <span class="dot green"></span>
                                                </div>
                                            </div>

                                            <div class="card-content">
                                                <h3 class="project-title">{{ project.title }}</h3>
                                                <p class="project-description">{{ project.description }}</p>
                                                <div class="project-actions">
                                                    <NuxtLink :to="project.link" target="_blank" rel="noopener noreferrer" class="btn-secondary">
                                                        <i class="fas fa-external-link-alt"></i>
                                                    </NuxtLink>
                                                </div>
                                            </div>

                                            <div class="card-glow"></div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>

                                <!-- Custom Navigation -->
                                <div class="slider-navigation">
                                    <button class="nav-btn custom-prev">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="nav-btn custom-next">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Variables CSS */
/* :root {
    --cs-tech-orange-color: #F9B233;
    --cs-brown-color: #3F2E1A;
    --cs-light-brown-color: #E7D7C5;
    --cs-tech-light-orange-color: #FEEFD7;
} */

/* Section principale */
.tech-projects-section {
    background: #fff;;
    padding: 120px 0;
    position: relative;
    overflow: hidden;
}

.tech-projects-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 20%, rgba(249, 178, 51, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(63, 46, 26, 0.02) 0%, transparent 50%);
    pointer-events: none;
}

.projects-container {
    position: relative;
    z-index: 2;
}

/* Tech Showcase - Left Side */
.tech-showcase {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.tech-visual {
    position: relative;
    width: 300px;
    height: 300px;
}

/* Floating Tech Elements */
.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.tech-circle {
    position: absolute;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--cs-tech-orange-color), #ffcc5c);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 10px 30px rgba(249, 178, 51, 0.3);
    animation: float 6s ease-in-out infinite;
}

.circle-1 {
    top: 20px;
    left: 20px;
    animation-delay: 0s;
}

.circle-2 {
    top: 20px;
    right: 20px;
    animation-delay: 1.5s;
}

.circle-3 {
    bottom: 20px;
    left: 20px;
    animation-delay: 3s;
}

.circle-4 {
    bottom: 20px;
    right: 20px;
    animation-delay: 4.5s;
}

/* Central Hub */
.central-hub {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.hub-core {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--cs-brown-color), #5a4232);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cs-tech-light-orange-color);
    font-size: 32px;
    position: relative;
    z-index: 3;
    box-shadow: 0 15px 40px rgba(63, 46, 26, 0.4);
}

.pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border: 2px solid var(--cs-tech-orange-color);
    border-radius: 50%;
    animation: pulse 2s ease-out infinite;
}

.delay-1 {
    animation-delay: 0.5s;
}

.delay-2 {
    animation-delay: 1s;
}

/* Connection Lines */
.connection-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.line {
    stroke: var(--cs-tech-orange-color);
    stroke-width: 2;
    fill: none;
    stroke-dasharray: 5, 5;
    opacity: 0.6;
    animation: dash 3s linear infinite;
}

.line-2 { animation-delay: 0.75s; }
.line-3 { animation-delay: 1.5s; }
.line-4 { animation-delay: 2.25s; }

/* Tech Grid Background */
.tech-grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        linear-gradient(rgba(249, 178, 51, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(249, 178, 51, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
    animation: grid-move 10s linear infinite;
}

/* Projects Content - Right Side */
.projects-content {
    padding-left: 60px;
}

.section-header {
    margin-bottom: 50px;
}

.header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--cs-tech-light-orange-color);
    color: var(--cs-brown-color);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    border: 1px solid var(--cs-tech-orange-color);
}

.section-title {
    font-size: 48px;
    font-weight: 800;
    color: var(--cs-brown-color);
    margin-bottom: 15px;
    line-height: 1.2;
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
}

.section-subtitle {
    font-size: 18px;
    color: #666;
    font-weight: 400;
}

/* Project Cards */
.projects-slider-wrapper {
    position: relative;
}

.project-card {
    background: white;
    border-radius: 20px;
    padding: 0;
    box-shadow: 0 10px 40px rgba(63, 46, 26, 0.08);
    border: 1px solid rgba(231, 215, 197, 0.3);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
}

.project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(63, 46, 26, 0.15);
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 30px 20px;
    border-bottom: 1px solid rgba(231, 215, 197, 0.2);
}

.project-icon {
    width: auto;
    height: 150px;
    /* background: linear-gradient(135deg, var(--cs-tech-orange-color), #ffcc5c); */
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 22px;
}

.project-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.card-dots {
    display: flex;
    gap: 8px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28ca42; }

.card-content {
    padding: 30px;
}

.project-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--cs-brown-color);
    margin-bottom: 15px;
}

.project-description {
    font-size: 15px;
    line-height: 1.6;
    color: #666;
    margin-bottom: 25px;
}

.tech-stack {
    margin-bottom: 30px;
}

.stack-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--cs-brown-color);
    margin-bottom: 10px;
    display: block;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tech-tag {
    background: var(--cs-tech-light-orange-color);
    color: var(--cs-brown-color);
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid rgba(249, 178, 51, 0.2);
}

.project-actions {
    display: flex;
    gap: 15px;
    align-items: center;
}

.btn-primary, .btn-secondary {
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-primary {
    background: linear-gradient(135deg, var(--cs-tech-orange-color), #ffcc5c);
    color: white;
    padding: 12px 24px;
    flex: 1;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(249, 178, 51, 0.4);
}

.btn-secondary {
    background: var(--cs-tech-light-orange-color);
    color: var(--cs-brown-color);
    padding: 12px;
    width: 45px;
    height: 45px;
    justify-content: center;
    border: 1px solid var(--cs-tech-orange-color);
}

.btn-secondary:hover {
    background: var(--cs-tech-orange-color);
    color: white;
}

.card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(249, 178, 51, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.project-card:hover .card-glow {
    opacity: 1;
}

/* Navigation */
.slider-navigation {
    position: absolute;
    right: 0;
    top: -80px;
    display: flex;
    gap: 10px;
}

.nav-btn {
    width: 50px;
    height: 50px;
    border: 2px solid var(--cs-tech-orange-color);
    background: white;
    border-radius: 12px;
    color: var(--cs-tech-orange-color);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-btn:hover {
    background: var(--cs-tech-orange-color);
    color: white;
    transform: translateY(-2px);
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
  font-size: 3rem;
  color: var(--cs-tech-orange-color);
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
  text-align: center;
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Animations */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}

@keyframes dash {
    0% { stroke-dashoffset: 10; }
    100% { stroke-dashoffset: 0; }
}

@keyframes grid-move {
    0% { transform: translate(0, 0); }
    100% { transform: translate(20px, 20px); }
}

/* Responsive */
@media (max-width: 1199px) {
    .projects-content {
        padding-left: 30px;
    }
    
    .section-title {
        font-size: 40px;
    }
}

@media (max-width: 991px) {
    .tech-showcase {
        margin-bottom: 60px;
        height: 400px;
    }
    
    .tech-visual {
        width: 250px;
        height: 250px;
    }
    
    .projects-content {
        padding-left: 0;
    }
    
    .slider-navigation {
        position: relative;
        top: 30px;
        right: auto;
        justify-content: center;
    }
}

@media (max-width: 767px) {
    .tech-projects-section {
        padding: 80px 0;
    }
    
    .section-title {
        font-size: 32px;
    }
    
    .tech-circle {
        width: 50px;
        height: 50px;
        font-size: 20px;
    }
    
    .hub-core {
        width: 60px;
        height: 60px;
        font-size: 24px;
    }
    
    .project-actions {
        flex-direction: column;
    }
    
    .btn-secondary {
        align-self: flex-start;
    }
}
</style>