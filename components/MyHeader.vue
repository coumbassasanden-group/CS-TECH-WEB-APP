<script setup>
import { useLanguage } from '~/composables/useLanguage';
import { useScrollSpy } from '~/composables/useScrollSpy';
const { activeSection } = useScrollSpy();
const { currentLanguage, languages, changeLanguage } = useLanguage();
const localePath = useLocalePath();
const isDropdownOpen = ref(false)
const isMobileNavActive = ref(false)

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
    isDropdownOpen.value = false
}

const toggleMobileNav = () => {
    isMobileNavActive.value = !isMobileNavActive.value
    document.body.classList.toggle('mobile-nav-active')
}

const closeMobileNav = () => {
    isMobileNavActive.value = false
    document.body.classList.remove('mobile-nav-active')
}

// Handle scroll for header
if (import.meta.client) {
    const handleScroll = () => {
        const selectBody = document.querySelector('body')
        if (window.scrollY > 100) {
            selectBody?.classList.add('scrolled')
        } else {
            selectBody?.classList.remove('scrolled')
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial scroll position
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })
}
</script>

<template>
    <header id="header" class="header fixed-top scroll-up-sticky">

        <div class="branding d-flex align-items-center">

            <div class="container position-relative d-flex align-items-center justify-content-between">
                <NuxtLink :to="localePath('/')" class="logo d-flex align-items-center">
                    <!-- Uncomment the line below if you also wish to use an image logo -->
                    <img src="~/assets/images/logo-cs-tech.png" alt="cs-tech">
                    <!-- <h1 class="sitename">Impact</h1> -->
                </NuxtLink>

                <i class="mobile-nav-toggle mobile-nav-show d-xl-none bi bi-list" @click="toggleMobileNav" v-show="!isMobileNavActive"></i>
                <i class="mobile-nav-toggle mobile-nav-hide d-xl-none bi bi-x" @click="toggleMobileNav" v-show="isMobileNavActive"></i>

                <nav id="navmenu" class="navmenu" :class="{ 'active': isMobileNavActive }">
                    <ul>
                        <li>
                            <NuxtLink :to="`#${$t('ids.hero')}`" @click="closeMobileNav" :class="{ active: activeSection === $t('ids.hero') }">{{
                                $t('header.hero') }}</NuxtLink>
                        </li>
                        <!-- <li>
                            <NuxtLink :to="`#${$t('ids.needs')}`" @click="closeMobileNav"
                                :class="{ active: activeSection === $t('ids.needs') }">{{ $t('header.needs') }}
                            </NuxtLink>
                        </li> -->
                        <li>
                            <NuxtLink :to="`#${$t('ids.about')}`" @click="closeMobileNav"
                                :class="{ active: activeSection === $t('ids.about') }">{{ $t('header.about') }}
                            </NuxtLink>
                        </li>
                        <li><NuxtLink :to="`#${$t('ids.services')}`" @click="closeMobileNav" :class="{ active: activeSection === $t('ids.services') }">{{ $t('header.services') }}</NuxtLink></li>
                        <li><NuxtLink :to="`#${$t('ids.projects')}`" @click="closeMobileNav" :class="{ active: activeSection === $t('ids.projects') }">{{ $t('header.projects') }}</NuxtLink></li>
                        <!-- <li><NuxtLink :to="`#${$t('ids.packs')}`" :class="{ active: activeSection === $t('ids.packs') }">{{ $t('header.packs') }}</NuxtLink></li> -->
                        <li><NuxtLink :to="`#${$t('ids.contact')}`" @click="closeMobileNav" :class="{ active: activeSection === $t('ids.contact') }">{{ $t('header.contact') }}</NuxtLink></li>
                        <li class="language-selector" @blur="closeDropdown">
                            <button @click="toggleDropdown" class="language-btn">
                                {{languages.find(lang => lang.code === currentLanguage)?.flag}}
                                {{languages.find(lang => lang.code === currentLanguage)?.code.toUpperCase()}}
                                <i class="bi bi-chevron-down"></i>
                            </button>
                            <div class="language-dropdown" :class="{ 'show': isDropdownOpen }">
                                <button v-for="lang in languages" :key="lang.code"
                                    @click="changeLanguage(lang.code); closeDropdown()"
                                    :class="{ 'active': currentLanguage === lang.code }" class="dropdown-item">
                                    <span class="flag">{{ lang.flag }}</span>
                                    <span class="lang-name">{{ lang.name }}</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                </nav>

            </div>

        </div>

    </header>
</template>

<style scoped>
.language-selector {
    position: relative;
    margin-left: 1.5rem;
}

.language-btn {
    background-color: var(--cs-brown-color);
    border: none;
    color: var(--cs-tech-orange-color);
    padding: 0.6rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.language-btn:hover {
    background-color: var(--cs-tech-orange-color);
    color: var(--cs-brown-color);
}

.language-btn i {
    font-size: 0.8rem;
    transition: transform 0.3s ease;
}

.language-btn:hover i {
    transform: rotate(180deg);
}

.language-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    min-width: 160px;
    overflow: hidden;
    border: 1px solid rgba(162, 228, 246, 0.3);
}

.language-dropdown.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    padding: 0.8rem 1.2rem;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #3F2E1A;
    font-family: var(--cs-family-poppins);
    font-weight: 600;
}

.dropdown-item:hover {
    background-color: rgba(162, 228, 246, 0.1);
    color: #0C657B;
}

.dropdown-item.active {
    background-color: rgba(12, 101, 123, 0.05);
    color: #0C657B;
    font-weight: 500;
}

.dropdown-item:not(:last-child) {
    border-bottom: 1px solid rgba(162, 228, 246, 0.1);
}

.flag {
    font-size: 1.1rem;
}

.lang-name {
    font-size: 0.9rem;
    font-weight: 400;
}

@media (max-width: 1200px) {
    .mobile-nav-active {
        overflow: hidden;
    }

    .navmenu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        max-width: 400px;
        bottom: 0;
        transition: 0.3s;
        z-index: 9997;
        background: rgba(var(--color-white-rgb), 0.8);
        backdrop-filter: blur(10px);
        padding: 60px 0;
    }

    .navmenu ul {
        flex-direction: column;
        padding: 0;
        margin: 0;
    }

    .navmenu a {
        padding: 10px 20px;
        display: block;
        font-size: 15px;
        font-weight: 600;
        transition: 0.3s;
    }

    .navmenu.active {
        right: 0;
    }

    .mobile-nav-toggle {
        display: block;
        font-size: 28px;
        cursor: pointer;
        line-height: 0;
        transition: 0.5s;
        color: var(--cs-brown-color);
        z-index: 9999;
        margin-left: 10px;
    }

    .language-dropdown {
        left: 5px;
    }

    .language-btn {
        background-color: var(--cs-brown-color);
        color: var(--cs-tech-orange-color);
    }
}

@media (max-width: 480px) {
    .navmenu {
        max-width: 100%;
    }

    .language-btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.85rem;
        gap: 0.4rem;
    }

    .navmenu a {
        font-size: 14px;
        padding: 10px 16px;
    }
}

@media (max-width: 360px) {
    .language-btn {
        padding: 0.4rem 0.6rem;
        font-size: 0.8rem;
    }
}
</style>