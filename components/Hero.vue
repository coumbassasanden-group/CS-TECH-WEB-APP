<script setup lang="ts">
const stats = [
  {
    icon: 'bi bi-trophy',
    number: '10+',
    label: 'Années d\'expérience',
    description: 'En solutions digitales'
  },
  {
    icon: 'bi bi-robot',
    number: '15+',
    label: 'Solutions IA',
    description: 'Projets réalisés'
  },
  {
    icon: 'bi bi-people',
    number: '200+',
    label: 'Clients satisfaits',
    description: 'À travers l\'Afrique'
  },
  {
    icon: 'bi bi-code-slash',
    number: '50+',
    label: 'Applications',
    description: 'Web & Mobile'
  }
]
</script>

<template>
    <section id="hero" class="hero section">
        <div class="container" data-aos="fade-up" data-aos-duration="1000">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="hero-content" data-aos="fade-right" data-aos-delay="200">
                        <div class="company-badge mb-4">
                            <i class="bi bi-stars me-2"></i>
                            L'innovation digitale africaine
                        </div>

                        <h1 class="mb-4">
                            Transformons Vos <br>
                            Idées en Solutions <br>
                            <span class="accent-text">Digitales Innovantes</span>
                        </h1>

                        <p class="mb-4 mb-md-5">
                            Experts en développement web, mobile et solutions IA, 
                            nous accompagnons votre transformation digitale avec excellence.
                        </p>

                        <div class="hero-buttons">
                            <a href="#services" class="btn btn-primary me-3">Découvrir nos services</a>
                            <a href="#contact" class="btn btn-outline">Parlons de votre projet</a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="hero-image" data-aos="zoom-in" data-aos-delay="300">
                        <img src="~/assets/images/hero-img.png" alt="CS Tech Innovation" class="img-fluid">
                    </div>
                </div>
            </div>

            <div class="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay="400">
                <div v-for="(stat, index) in stats" :key="index" class="col-lg-3 col-md-6">
                    <div class="stat-item" data-aos="fade-up" :data-aos-delay="500 + (index * 100)">
                        <div class="stat-icon">
                            <i :class="stat.icon"></i>
                        </div>
                        <div class="stat-content">
                            <h4>{{ stat.number }}</h4>
                            <h5>{{ stat.label }}</h5>
                            <p class="mb-0">{{ stat.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero {
    position: relative;
    padding: 160px 0 100px;
    background: linear-gradient(135deg, 
        rgba(249, 178, 51, 0.1) 0%,
        rgba(249, 178, 51, 0.05) 100%);
    overflow: hidden;
}

.hero::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle at center,
        rgba(249, 178, 51, 0.1) 0%,
        transparent 70%);
    animation: rotate 30s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.hero-content {
    position: relative;
    z-index: 2;
}

.hero-content h1 {
    font-family: var(--cs-family-montserrat);
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--cs-brown-color);
}

.hero-content p {
    font-family: var(--cs-family-poppins);
    font-size: 1.1rem;
    color: var(--cs-brown-color);
    opacity: 0.9;
}

.accent-text {
    color: var(--cs-tech-orange-color);
    position: relative;
}

.company-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background-color: var(--cs-tech-light-orange-color);
    border-radius: 50px;
    color: var(--cs-tech-orange-color);
    font-weight: 600;
    transition: transform 0.3s ease;
}

.company-badge:hover {
    transform: translateY(-2px);
}

.btn {
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--cs-tech-orange-color);
    border: none;
    color: white;
}

.btn-outline {
    border: 2px solid var(--cs-tech-orange-color);
    color: var(--cs-tech-orange-color);
    background: transparent;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(249, 178, 51, 0.2);
}

.stat-item {
    background: white;
    border-radius: 15px;
    padding: 1rem;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.stat-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(249, 178, 51, 0.15);
}

.stat-item:hover .stat-icon {
    transform: scale(1.1) rotate(5deg);
    background: var(--cs-tech-orange-color);
}

.stat-item:hover .stat-icon i {
    color: white;
    transform: rotate(-5deg);
}

.stat-icon {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    background: var(--cs-tech-light-orange-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.stat-icon i {
    color: var(--cs-tech-orange-color);
    font-size: 1.75rem;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.stat-content {
    flex: 1;
}

.stat-content h4 {
    font-family: var(--cs-family-montserrat);
    font-size: 2rem;
    font-weight: 700;
    color: var(--cs-brown-color);
    margin-bottom: 0.2rem;
    line-height: 1;
}

.stat-content h5 {
    font-family: var(--cs-family-montserrat);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--cs-tech-orange-color);
    margin-bottom: 0.5rem;
    line-height: 1.2;
}

.stat-content p {
    font-family: var(--cs-family-poppins);
    font-size: 0.9rem;
    color: var(--cs-brown-color);
    opacity: 0.8;
    margin: 0;
    line-height: 1.4;
}

@media (max-width: 992px) {
    .hero-content {
        text-align: center;
        margin-bottom: 3rem;
    }

    .hero-content h1 {
        font-size: 2.5rem;
    }

    .hero-buttons {
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
}

@media (max-width: 576px) {
    .hero-content h1 {
        font-size: 2rem;
    }
    
    .btn {
        width: 100%;
        margin: 0.5rem 0;
    }
}

@media (max-width: 768px) {
    .stat-item {
        padding: 1.25rem;
    }
    
    .stat-content h4 {
        font-size: 1.75rem;
    }
    
    .stat-content h5 {
        font-size: 1rem;
    }
}
</style>