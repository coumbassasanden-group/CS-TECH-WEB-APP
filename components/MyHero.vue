<script setup lang="ts">
import { onMounted, ref } from 'vue'

const { locale } = useI18n()
const texts = ref<string[]>([])
const isLoading = ref(true)

const { get } = useApi()

onMounted(async () => {
    try {
        const response = await get<string[]>('/api/texts/hero')
        texts.value = response
    } catch (error) {
        console.error('Erreur lors de la récupération des textes:', error)
        texts.value = locale.value === 'fr' ? [
            "Solutions technologiques avancées et IA de nouvelle génération",
            "Développement d'applications intelligentes et innovantes",
            "Automatisation et optimisation des processus métier",
            "Intelligence artificielle et machine learning",
        ] : [
            "Advanced technology solutions and next-generation AI",
            "Smart and innovative application development",
            "Business process automation and optimization",
            "Artificial intelligence and machine learning"
        ]
    } finally {
        isLoading.value = false
        createFloatingDots()
        startTypingEffect()
    }
})

const createFloatingDots = () => {
    const container = document.querySelector('.floating-dots')
    if (!container) return

    for (let i = 0; i < 8; i++) {
        const dot = document.createElement('div')
        dot.className = 'floating-dot'
        dot.style.left = Math.random() * 100 + '%'
        dot.style.top = Math.random() * 100 + '%'
        dot.style.animationDelay = Math.random() * 4 + 's'
        container.appendChild(dot)
    }
}

const startTypingEffect = () => {
    const typingElement = document.getElementById('typingText')
    if (!typingElement) return

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false

    const typeWriter = () => {
        const currentText = texts.value[textIndex]

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1)
            charIndex--
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1)
            charIndex++
        }

        let typeSpeed = isDeleting ? 30 : 50

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000 // Pause à la fin
            isDeleting = true
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false
            textIndex = (textIndex + 1) % texts.value.length
            typeSpeed = 500 // Pause avant le prochain texte
        }

        setTimeout(typeWriter, typeSpeed)
    }

    // Démarrer l'effet après un délai
    setTimeout(typeWriter, 1500)
}
</script>

<template>
    <section :id="$t('ids.hero')" class="hero section">
        <!-- Structure sémantique optimisée -->

        <h1 class="visually-hidden">
            {{ locale === 'fr'
                ? 'C&S TECH - Solutions Digitales et Intelligence Artificielle en Côte d\'Ivoire'
                : 'C&S TECH - Digital Solutions and Artificial Intelligence in Ivory Coast'
            }}
        </h1>
        <!-- Fond tech subtil -->
        <div class="tech-background">
            <div class="grid-overlay"></div>
            <div class="floating-dots"></div>
        </div>

        <div class="container">
            <CSLogo />
            <!-- Image avec cadre tech -->
            <!-- <div class="hero-image">
                <div class="image-frame">
                    <img src="/assets/images/hero-2.png" alt="COUMBASSA & SANDEN TECH">
                    <div class="frame-corner tl"></div>
                    <div class="frame-corner tr"></div>
                    <div class="frame-corner bl"></div>
                    <div class="frame-corner br"></div>
                </div>
            </div> -->

            <!-- Contenu -->
            <div class="hero-content">
                <!-- <h1 class="hero-title">
                    <span class="brand">COUMBASSA & SANDEN<br>TECH</span>
                </h1> -->

                <div class="hero-description">
                    <span class="bracket">[</span>
                    <span class="typing-text" id="typingText"></span>
                    <span class="cursor">|</span>
                    <span class="bracket">]</span>
                </div>

                <div class="hero-actions">
                    <NuxtLink :to="`#${$t('ids.about')}`" class="btn-tech"
                    :aria-label="`${$t('header.about')} - ${locale === 'fr' ? 'En savoir plus sur C&S TECH' : 'Learn more about C&S TECH'}`">
                        <span class="btn-text">{{ $t('header.about') }}</span>
                        <span class="btn-arrow">→</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
:root {
    --cs-tech-orange-color: #F9B233;
    --cs-brown-color: #3F2E1A;
    --cs-light-brown-color: #E7D7C5;
    --cs-tech-light-orange-color: #FEEFD7;
    --cs-white: #ffffff;
    --cs-gray: #666666;
}

/* Masquer le H1 principal visuellement mais le garder pour SEO */
.hero-main-title {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

.hero {
    min-height: 50vh;
    display: flex;
    align-items: center;
    background: var(--cs-white);
    padding: 80px 0;
    position: relative;
    overflow: hidden;
}

/* Fond tech subtil */
.tech-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

.grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
        linear-gradient(rgba(249, 178, 51, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(249, 178, 51, 0.08) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridSlide 20s linear infinite;
}

@keyframes gridSlide {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(60px, 60px);
    }
}

.floating-dots {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.floating-dot {
    position: absolute;
    width: 3px;
    height: 3px;
    background: var(--cs-tech-orange-color);
    border-radius: 50%;
    opacity: 0.4;
    animation: floatDot 8s ease-in-out infinite;
}

@keyframes floatDot {

    0%,
    100% {
        transform: translateY(0px);
        opacity: 0.2;
    }

    50% {
        transform: translateY(-40px);
        opacity: 0.6;
    }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
    position: relative;
    z-index: 2;
}

/* Image avec cadre tech */
.hero-image {
    margin-top: 90px;
    margin-bottom: 60px;
    display: inline-block;
    position: relative;
}

.image-frame {
    position: relative;
    display: inline-block;
}

.image-frame img {
    max-width: 320px;
    width: 100%;
    border-radius: 12px;
    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
}

.image-frame:hover img {
    transform: scale(1.02);
    box-shadow:
        0 15px 40px rgba(0, 0, 0, 0.15);
}

.frame-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--cs-tech-orange-color);
    opacity: 0.7;
    animation: cornerPulse 3s ease-in-out infinite;
}

.tl {
    top: -8px;
    left: -8px;
    border-right: none;
    border-bottom: none;
}

.tr {
    top: -8px;
    right: -8px;
    border-left: none;
    border-bottom: none;
}

.bl {
    bottom: -8px;
    left: -8px;
    border-right: none;
    border-top: none;
}

.br {
    bottom: -8px;
    right: -8px;
    border-left: none;
    border-top: none;
}

@keyframes cornerPulse {

    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }
}

/* Contenu */
.hero-title {
    margin: 0 0 40px 0;
    line-height: 1.3;
}

.innovation {
    display: block;
    font-size: 1.1rem;
    color: var(--cs-gray);
    font-weight: 300;
    letter-spacing: 3px;
    margin-bottom: 12px;
    opacity: 0;
    animation: slideUp 0.8s ease-out 0.2s forwards;
}

.ai {
    display: block;
    font-size: 1.9rem;
    color: var(--cs-brown-color);
    font-weight: 400;
    margin-bottom: 15px;
    opacity: 0;
    animation: slideUp 0.8s ease-out 0.4s forwards;
}

.brand {
    display: block;
    font-size: 2.3rem;
    color: var(--cs-tech-orange-color);
    font-weight: 600;
    position: relative;
    opacity: 0;
    animation: slideUp 0.8s ease-out 0.6s forwards;
}

.brand::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--cs-brown-color);
    animation: underlineGrow 1s ease-out 1.2s forwards;
}

@keyframes slideUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes underlineGrow {
    0% {
        width: 0;
    }

    100% {
        width: 120px;
    }
}

.hero-description {
    font-size: 1.1rem;
    color: var(--cs-gray);
    margin: 0 0 50px 0;
    max-width: 600px;
    height: 90px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 25px;
    background: var(--cs-tech-light-orange-color);
    border-radius: 8px;
    border-left: 4px solid var(--cs-brown-color);
    font-family: 'Courier New', monospace;
    opacity: 0;
    animation: slideUp 0.8s ease-out 0.8s forwards;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.typing-text {
    color: var(--cs-brown-color);
    min-width: 1px;
}

.cursor {
    color: var(--cs-tech-orange-color);
    font-weight: bold;
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0;
    }
}

.bracket {
    color: var(--cs-tech-orange-color);
    font-weight: 600;
    font-size: 1.2rem;
}

/* Bouton tech */
.btn-tech {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: var(--cs-white);
    color: var(--cs-tech-orange-color);
    text-decoration: none;
    border: 2px solid var(--cs-tech-orange-color);
    border-radius: 8px;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    opacity: 0;
    animation: slideUp 0.8s ease-out 1s forwards;
}

.btn-tech::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--cs-tech-orange-color);
    transition: left 0.3s ease;
    z-index: 1;
}

.btn-tech:hover::before {
    left: 0;
}

.btn-tech:hover {
    color: var(--cs-white);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(249, 178, 51, 0.3);
}

.btn-text,
.btn-arrow {
    position: relative;
    z-index: 2;
}

.btn-arrow {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
}

.btn-tech:hover .btn-arrow {
    transform: translateX(4px);
}


@keyframes statusBlink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .hero {
        padding: 60px 0;
    }

    .image-frame img {
        max-width: 280px;
    }

    .innovation {
        font-size: 1rem;
        letter-spacing: 2px;
    }

    .ai {
        font-size: 1.6rem;
    }

    .brand {
        font-size: 1.5rem !important;
    }

    .hero-description {
        font-size: 1rem;
        padding: 18px 20px;
        margin-bottom: 40px;
    }

    .btn-tech {
        padding: 14px 28px;
        font-size: 0.95rem;
    }

    .status-indicator {
        bottom: 20px;
        left: 20px;
        font-size: 0.75rem;
    }
}

@media (max-width: 480px) {
    .brand {
        font-size: 1.2rem;
    }

    .image-frame img {
        max-width: 250px;
    }

    .hero-description {
        margin: 0 10px 35px 10px;
    }

    .btn-tech {
        padding: 12px 24px;
    }
}
</style>