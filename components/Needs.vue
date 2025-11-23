<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isVisible = ref(false)
onMounted(() => {
    setTimeout(() => {
        isVisible.value = true
    }, 100)
})
</script>

<template>
    <section :id="$t('ids.needs')" class="needs-section">
        <div class="container">
            <!-- En-tête de section -->
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <div class="header-content" :class="{ 'animate-in': isVisible }">
                        <span class="section-badge">{{ $t('need.title') }}</span>
                        <h2 class="section-title">
                            <span class="accent-text">{{ $t('need.subtitle') }}</span>
                        </h2>
                        <div class="section-divider mx-auto"></div>
                        <div class="tech-grid-bg"></div>
                    </div>
                </div>
            </div>

            <!-- Grille des besoins -->
            <div class="row needs-grid">
                <div class="col-lg-3 col-md-6 col-6 need-item" :style="{ '--delay': '0ms' }"
                    :class="{ 'animate-in': isVisible }">
                    <div class="need-card">
                        <div class="card-inner">
                            <!-- Face avant -->
                            <div class="card-front">
                                <div class="image-container">
                                    <div class="tech-border"></div>
                                    <img src="~/assets/images/needs/1.png" :alt="$t('need.items.0.alt')" class="need-image">
                                    <div class="hover-overlay"></div>
                                </div>
                                <div class="content">
                                    <h3 class="title">{{ $t('need.items.0.title') }}</h3>
                                    <div class="tech-indicator">
                                        <div class="indicator-dot"></div>
                                        <div class="indicator-line"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Face arrière -->
                            <div class="card-back">
                                <div class="back-content">
                                    <div class="icon-tech">
                                        <div class="tech-icon"></div>
                                    </div>
                                    <h4 class="back-title">{{ $t('need.items.0.title') }}</h4>
                                    <p class="description">{{ $t('need.items.0.description') }}</p>
                                    <div class="tech-pattern">
                                        <div class="pattern-line" v-for="i in 3" :key="i"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-6 need-item" :style="{ '--delay': '100ms' }"
                    :class="{ 'animate-in': isVisible }">
                    <div class="need-card">
                        <div class="card-inner">
                            <!-- Face avant -->
                            <div class="card-front">
                                <div class="image-container">
                                    <div class="tech-border"></div>
                                    <img src="~/assets/images/needs/2.png" :alt="$t('need.items.1.alt')" class="need-image">
                                    <div class="hover-overlay"></div>
                                </div>
                                <div class="content">
                                    <h3 class="title">{{ $t('need.items.1.title') }}</h3>
                                    <div class="tech-indicator">
                                        <div class="indicator-dot"></div>
                                        <div class="indicator-line"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Face arrière -->
                            <div class="card-back">
                                <div class="back-content">
                                    <div class="icon-tech">
                                        <div class="tech-icon"></div>
                                    </div>
                                    <h4 class="back-title">{{ $t('need.items.1.title') }}</h4>
                                    <p class="description">{{ $t('need.items.1.description') }}</p>
                                    <div class="tech-pattern">
                                        <div class="pattern-line" v-for="i in 3" :key="i"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-6 need-item" :style="{ '--delay': '200ms' }"
                    :class="{ 'animate-in': isVisible }">
                    <div class="need-card">
                        <div class="card-inner">
                            <!-- Face avant -->
                            <div class="card-front">
                                <div class="image-container">
                                    <div class="tech-border"></div>
                                    <img src="~/assets/images/needs/3.png" :alt="$t('need.items.2.alt')" class="need-image">
                                    <div class="hover-overlay"></div>
                                </div>
                                <div class="content">
                                    <h3 class="title">{{ $t('need.items.2.title') }}</h3>
                                    <div class="tech-indicator">
                                        <div class="indicator-dot"></div>
                                        <div class="indicator-line"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Face arrière -->
                            <div class="card-back">
                                <div class="back-content">
                                    <div class="icon-tech">
                                        <div class="tech-icon"></div>
                                    </div>
                                    <h4 class="back-title">{{ $t('need.items.2.title') }}</h4>
                                    <p class="description">{{ $t('need.items.2.description') }}</p>
                                    <div class="tech-pattern">
                                        <div class="pattern-line" v-for="i in 3" :key="i"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-6 need-item" :style="{ '--delay': '300ms' }"
                    :class="{ 'animate-in': isVisible }">
                    <div class="need-card">
                        <div class="card-inner">
                            <!-- Face avant -->
                            <div class="card-front">
                                <div class="image-container">
                                    <div class="tech-border"></div>
                                    <img src="~/assets/images/needs/4.png" :alt="$t('need.items.3.alt')" class="need-image">
                                    <div class="hover-overlay"></div>
                                </div>
                                <div class="content">
                                    <h3 class="title">{{ $t('need.items.3.title') }}</h3>
                                    <div class="tech-indicator">
                                        <div class="indicator-dot"></div>
                                        <div class="indicator-line"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Face arrière -->
                            <div class="card-back">
                                <div class="back-content">
                                    <div class="icon-tech">
                                        <div class="tech-icon"></div>
                                    </div>
                                    <h4 class="back-title">{{ $t('need.items.3.title') }}</h4>
                                    <p class="description">{{ $t('need.items.3.description') }}</p>
                                    <div class="tech-pattern">
                                        <div class="pattern-line" v-for="i in 3" :key="i"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-6 need-item" :style="{ '--delay': '400ms' }"
                    :class="{ 'animate-in': isVisible }">
                    <div class="need-card">
                        <div class="card-inner">
                            <!-- Face avant -->
                            <div class="card-front">
                                <div class="image-container">
                                    <div class="tech-border"></div>
                                    <img src="~/assets/images/needs/5.png" :alt="$t('need.items.4.alt')" class="need-image">
                                    <div class="hover-overlay"></div>
                                </div>
                                <div class="content">
                                    <h3 class="title">{{ $t('need.items.4.title') }}</h3>
                                    <div class="tech-indicator">
                                        <div class="indicator-dot"></div>
                                        <div class="indicator-line"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Face arrière -->
                            <div class="card-back">
                                <div class="back-content">
                                    <div class="icon-tech">
                                        <div class="tech-icon"></div>
                                    </div>
                                    <h4 class="back-title">{{ $t('need.items.4.title') }}</h4>
                                    <p class="description">{{ $t('need.items.4.description') }}</p>
                                    <div class="tech-pattern">
                                        <div class="pattern-line" v-for="i in 3" :key="i"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-6 need-item" :style="{ '--delay': '500ms' }"
                    :class="{ 'animate-in': isVisible }">
                    <div class="need-card">
                        <div class="card-inner">
                            <!-- Face avant -->
                            <div class="card-front">
                                <div class="image-container">
                                    <div class="tech-border"></div>
                                    <img src="~/assets/images/needs/6.png" :alt="$t('need.items.5.alt')" class="need-image">
                                    <div class="hover-overlay"></div>
                                </div>
                                <div class="content">
                                    <h3 class="title">{{ $t('need.items.5.title') }}</h3>
                                    <div class="tech-indicator">
                                        <div class="indicator-dot"></div>
                                        <div class="indicator-line"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Face arrière -->
                            <div class="card-back">
                                <div class="back-content">
                                    <div class="icon-tech">
                                        <div class="tech-icon"></div>
                                    </div>
                                    <h4 class="back-title">{{ $t('need.items.5.title') }}</h4>
                                    <p class="description">{{ $t('need.items.5.description') }}</p>
                                    <div class="tech-pattern">
                                        <div class="pattern-line" v-for="i in 3" :key="i"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-6 need-item" :style="{ '--delay': '600ms' }"
                    :class="{ 'animate-in': isVisible }">
                    <div class="need-card">
                        <div class="card-inner">
                            <!-- Face avant -->
                            <div class="card-front">
                                <div class="image-container">
                                    <div class="tech-border"></div>
                                    <img src="~/assets/images/needs/7.png" :alt="$t('need.items.6.alt')" class="need-image">
                                    <div class="hover-overlay"></div>
                                </div>
                                <div class="content">
                                    <h3 class="title">{{ $t('need.items.6.title') }}</h3>
                                    <div class="tech-indicator">
                                        <div class="indicator-dot"></div>
                                        <div class="indicator-line"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Face arrière -->
                            <div class="card-back">
                                <div class="back-content">
                                    <div class="icon-tech">
                                        <div class="tech-icon"></div>
                                    </div>
                                    <h4 class="back-title">{{ $t('need.items.6.title') }}</h4>
                                    <p class="description">{{ $t('need.items.6.description') }}</p>
                                    <div class="tech-pattern">
                                        <div class="pattern-line" v-for="i in 3" :key="i"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-6 need-item" :style="{ '--delay': '700ms' }"
                    :class="{ 'animate-in': isVisible }">
                    <div class="need-card">
                        <div class="card-inner">
                            <!-- Face avant -->
                            <div class="card-front">
                                <div class="image-container">
                                    <div class="tech-border"></div>
                                    <img src="~/assets/images/needs/8.png" :alt="$t('need.items.7.alt')" class="need-image">
                                    <div class="hover-overlay"></div>
                                </div>
                                <div class="content">
                                    <h3 class="title">{{ $t('need.items.7.title') }}</h3>
                                    <div class="tech-indicator">
                                        <div class="indicator-dot"></div>
                                        <div class="indicator-line"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Face arrière -->
                            <div class="card-back">
                                <div class="back-content">
                                    <div class="icon-tech">
                                        <div class="tech-icon"></div>
                                    </div>
                                    <h4 class="back-title">{{ $t('need.items.7.title') }}</h4>
                                    <p class="description">{{ $t('need.items.7.description') }}</p>
                                    <div class="tech-pattern">
                                        <div class="pattern-line" v-for="i in 3" :key="i"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Éléments décoratifs tech -->
        <div class="tech-decorations">
            <div class="floating-element" v-for="i in 6" :key="i" :style="{ '--i': i }"></div>
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
    --cs-family-montserrat: 'Montserrat', sans-serif;
}

/* Section principale */
.needs-section {
    padding: 30px 0;
    /* background: linear-gradient(135deg, #fafafa 0%, var(--cs-tech-light-orange-color) 100%); */
    position: relative;
    overflow: hidden;
    /* background: var(--cs-tech-light-orange-color);   */
}

/* En-tête */
.header-content {
    position: relative;
    z-index: 2;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-content.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.section-badge {
    display: inline-block;
    padding: 12px 24px;
    background: var(--cs-brown-color);
    color: var(--cs-tech-orange-color);
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: var(--cs-family-montserrat);
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(63, 46, 26, 0.2);
}

.section-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(249, 178, 51, 0.3), transparent);
    transition: left 0.8s;
}

.section-badge:hover::before {
    left: 100%;
}

.section-title {
    font-size: 3.5rem;
    font-weight: 900;
    color: var(--cs-brown-color);
    margin-bottom: 2rem;
    line-height: 1.1;
    font-family: var(--cs-family-montserrat);
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.accent-text {
    color: var(--cs-tech-orange-color);
    position: relative;
    background: linear-gradient(45deg, var(--cs-tech-orange-color), #ffcc5c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-divider {
    width: 100px;
    height: 6px;
    background: linear-gradient(45deg, var(--cs-tech-orange-color), var(--cs-brown-color));
    border-radius: 3px;
    margin: 2rem auto;
    position: relative;
}

.section-divider::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 2px;
    background: var(--cs-tech-orange-color);
    opacity: 0.3;
    border-radius: 1px;
}

/* Grille tech en arrière-plan */
.tech-grid-bg {
    position: absolute;
    top: -50px;
    left: -50px;
    right: -50px;
    bottom: -50px;
    background-image:
        linear-gradient(rgba(249, 178, 51, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(249, 178, 51, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: -1;
    animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(40px, 40px);
    }
}

/* Grille des besoins */
.needs-grid {
    margin-top: 80px;
}

.need-item {
    margin-bottom: 40px;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: var(--delay);
}

.need-item.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Cartes */
.need-card {
    height: 320px;
    perspective: 1000px;
    cursor: pointer;
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.need-card:hover .card-inner {
    transform: rotateY(180deg);
}

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
    overflow: hidden;
}

.card-front {
    background: white;
    box-shadow: 0 20px 60px rgba(63, 46, 26, 0.1);
    border: 2px solid var(--cs-light-brown-color);
}

.card-back {
    background: linear-gradient(135deg, var(--cs-brown-color), #2a1f0f);
    transform: rotateY(180deg);
    color: white;
}

/* Face avant */
.image-container {
    position: relative;
    height: 60%;
    overflow: hidden;
}

.tech-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--cs-tech-orange-color), transparent, var(--cs-tech-orange-color));
    z-index: 2;
}

.need-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
}

.hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(249, 178, 51, 0.8), rgba(63, 46, 26, 0.8));
    opacity: 0;
    transition: opacity 0.3s;
}

.need-card:hover .hover-overlay {
    opacity: 1;
}

.content {
    padding: 20px;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--cs-brown-color);
    /* line-height: 1.3; */
    margin: 0;
    font-family: var(--cs-family-montserrat);
}

.tech-indicator {
    position: absolute;
    bottom: 10px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.indicator-dot {
    width: 8px;
    height: 8px;
    background: var(--cs-tech-orange-color);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.indicator-line {
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, var(--cs-tech-orange-color), transparent);
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

/* Face arrière */
.back-content {
    padding: 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    position: relative;
}

.icon-tech {
    margin-bottom: 20px;
}

.tech-icon {
    width: 50px;
    height: 50px;
    background: var(--cs-tech-orange-color);
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tech-icon::before {
    content: '';
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 3px;
}

.back-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--cs-tech-orange-color);
    margin-bottom: 15px;
    font-family: var(--cs-family-montserrat);
}

.description {
    font-size: 0.9rem;
    font-family: var(--cs-family-roboto) !important;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
}

.tech-pattern {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 4px;
}

.pattern-line {
    width: 20px;
    height: 2px;
    background: rgba(249, 178, 51, 0.5);
    border-radius: 1px;
    animation: patternGlow 1.5s infinite alternate;
    animation-delay: calc(var(--i, 0) * 0.2s);
}

@keyframes patternGlow {
    0% {
        opacity: 0.3;
    }

    100% {
        opacity: 1;
    }
}

/* Éléments décoratifs */
.tech-decorations {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
}

.floating-element {
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--cs-tech-orange-color);
    border-radius: 50%;
    opacity: 0.3;
    animation: float 3s infinite linear;
    animation-delay: calc(var(--i) * 0.5s);
}

.floating-element:nth-child(1) {
    top: 10%;
    left: 10%;
}

.floating-element:nth-child(2) {
    top: 20%;
    right: 15%;
}

.floating-element:nth-child(3) {
    top: 60%;
    left: 5%;
}

.floating-element:nth-child(4) {
    bottom: 30%;
    right: 10%;
}

.floating-element:nth-child(5) {
    bottom: 10%;
    left: 20%;
}

.floating-element:nth-child(6) {
    top: 40%;
    right: 5%;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .section-title {
        font-size: 2.5rem;
    }

    .need-card {
        height: 280px;
    }

    .needs-grid {
        margin-top: 60px;
    }

    .title {
        font-size: 0.8rem !important;
    }

    .back-title {
        font-size: 0.8rem;
        color: var(--cs-tech-orange-color);
        margin-bottom: 10px;
    }

    .description {
        font-size: 0.7rem !important;

    }

    .need-item {
        margin-bottom: 30px;
    }
}

@media (max-width: 576px) {
    .section-title {
        font-size: 2rem;
    }

    .need-card {
        height: 250px;
    }

    .title {
        font-size: 0.8rem !important;
    }

    .back-title {
        font-size: 0.8rem;
        color: var(--cs-tech-orange-color);
        margin-bottom: 10px;
    }

    .description {
        font-size: 0.7rem !important;

    }
}
</style>