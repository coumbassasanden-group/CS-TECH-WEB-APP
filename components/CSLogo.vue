<script setup lang="ts">

</script>

<template>
    <div class="tech-showcase" data-aos="fade-right" data-aos-delay="200">
        <div class="tech-visual">
            <!-- Animated Tech Elements -->
            <div class="floating-elements">
                <div class="tech-circle circle-1">
                    <i class="fa-brands fa-vuejs"></i>
                </div>
                <div class="tech-circle circle-2">
                    <i class="fa-brands fa-laravel"></i>
                </div>
                <div class="tech-circle circle-3">
                    <i class="fa-brands fa-python"></i>
                </div>
                <div class="tech-circle circle-4">
                    <i class="fa-brands fa-html5"></i>
                </div>
                <div class="tech-circle circle-5">
                    <i class="fa-brands fa-css3-alt"></i>
                </div>
                <div class="tech-circle circle-6">
                    <i class="fas fa-database"></i>
                </div>
                <div class="tech-circle circle-7">
                    <i class="fas fa-cloud"></i>
                </div>
                <div class="tech-circle circle-8">
                    <i class="fas fa-mobile-alt"></i>
                </div>
            </div>

            <!-- Central Hub avec Image -->
            <div class="central-hub">
                <div class="hub-core">
                    <img src="~/assets/images/ds-nimba.png" alt="Central Image" class="central-image" />
                </div>
                <div class="pulse-ring"></div>
                <div class="pulse-ring delay-1"></div>
                <div class="pulse-ring delay-2"></div>
            </div>

            <!-- Connection Lines -->
            <!-- <svg class="connection-lines" viewBox="0 0 400 400">
                <path class="line line-1" d="M200,200 L100,100" />
                <path class="line line-2" d="M200,200 L300,100" />
                <path class="line line-3" d="M200,200 L100,300" />
                <path class="line line-4" d="M200,200 L300,300" />
                <path class="line line-5" d="M200,200 L50,200" />
                <path class="line line-6" d="M200,200 L350,200" />
                <path class="line line-7" d="M200,200 L200,50" />
                <path class="line line-8" d="M200,200 L200,350" />
            </svg> -->

            <!-- Background Grid -->
            <div class="tech-grid"></div>
        </div>
    </div>
</template>

<style scoped>
:root {
    --cs-tech-orange-color: #F9B233;
    --cs-brown-color: #3F2E1A;
    --cs-light-brown-color: #E7D7C5;
    --cs-tech-light-orange-color: #FEEFD7;
}

.projects-container {
    position: relative;
    z-index: 2;
}

.tech-showcase {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.tech-visual {
    position: relative;
    width: 400px;
    height: 400px;
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
    top: 30px;
    left: 30px;
    animation-delay: 0s;
}

.circle-2 {
    top: 30px;
    right: 30px;
    animation-delay: 1s;
}

.circle-3 {
    bottom: 20px;
    left: 20px;
    animation-delay: 2s;
}

.circle-4 {
    bottom: 20px;
    right: 20px;
    animation-delay: 3s;
}

.circle-5 {
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    animation-delay: 4s;
}

.circle-6 {
    top: 50%;
    right: 2px;
    transform: translateY(-50%);
    animation-delay: 5s;
}

.circle-7 {
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    animation-delay: 1.5s;
}

.circle-8 {
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
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
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, var(--cs-brown-color), #5a4232);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 3;
    box-shadow: 0 15px 40px rgba(63, 46, 26, 0.4);
    overflow: hidden;
}

.central-image {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    padding: 10px;
    object-fit: cover;
    border: 3px solid var(--cs-tech-light-orange-color);
}

.pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
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

.line-2 {
    animation-delay: 0.375s;
}

.line-3 {
    animation-delay: 0.75s;
}

.line-4 {
    animation-delay: 1.125s;
}

.line-5 {
    animation-delay: 1.5s;
}

.line-6 {
    animation-delay: 1.875s;
}

.line-7 {
    animation-delay: 2.25s;
}

.line-8 {
    animation-delay: 2.625s;
}

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

@keyframes dash {
    0% { stroke-dashoffset: 10; }
    100% { stroke-dashoffset: 0; }
}

@keyframes grid-move {
    0% { transform: translate(0, 0); }
    100% { transform: translate(20px, 20px); }
}

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

@media (max-width: 768px) {
    .hub-core {
        width: 150px;
        height: 150px;
        padding: 10px;
    }
}
</style>