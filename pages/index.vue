<!-- pages/index.vue -->
<script setup>
const { t, locale } = useI18n()
const config = useRuntimeConfig()

// Mots-clés optimisés par langue
const keywords = computed(() => {
  if (locale.value === 'fr') {
    return 'C&S TECH, COUMBASSA SANDEN, développement web Abidjan, solutions digitales Côte d\'Ivoire, transformation numérique Afrique, intelligence artificielle, applications web, développeur Abidjan'
  }
  return 'C&S TECH, COUMBASSA SANDEN, web development Abidjan, digital solutions Ivory Coast, digital transformation Africa, artificial intelligence, web applications, developer Abidjan'
})

const pageDescription = computed(() => 
  locale.value === 'fr'
    ? 'C&S TECH, leader en solutions digitales en Côte d\'Ivoire. Développement web, applications mobiles, IA et transformation numérique pour entreprises africaines. Devis gratuit à Abidjan.'
    : 'C&S TECH, leader in digital solutions in Ivory Coast. Web development, mobile apps, AI and digital transformation for African businesses. Free quote in Abidjan.'
)

// SEO de la page d'accueil
useHead({
  title: computed(() => 
    locale.value === 'fr' ? 'Accueil' : 'Home'
  )
})

useSeoMeta({
  title: computed(() => 
    locale.value === 'fr'
      ? 'C&S TECH - Solutions Digitales Innovantes pour l\'Afrique'
      : 'C&S TECH - Innovative Digital Solutions for Africa'
  ),
  description: pageDescription,
  keywords: keywords,
  ogTitle: computed(() => 
    locale.value === 'fr'
      ? 'C&S TECH - Votre Partenaire Technologique en Côte d\'Ivoire'
      : 'C&S TECH - Your Technology Partner in Ivory Coast'
  ),
  ogDescription: pageDescription,
  ogUrl: computed(() => `${config.public.siteUrl}${locale.value === 'fr' ? '/fr' : '/en'}`),
  twitterTitle: computed(() => 
    locale.value === 'fr'
      ? 'C&S TECH - Solutions Digitales Côte d\'Ivoire'
      : 'C&S TECH - Digital Solutions Ivory Coast'
  ),
  twitterDescription: pageDescription
})

// Schema.org pour la page d'accueil
defineWebSite({
  name: 'C&S TECH',
  description: pageDescription.value,
  inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US'
})

defineLocalBusiness({
  name: 'COUMBASSA & SANDEN TECH',
  image: `${config.public.siteUrl}/assets/images/logo-cs-tech.png`,
  telephone: '+225-XX-XX-XX-XX',
  email: 'tech@coumbassa-sanden.com',
  address: {
    addressLocality: 'Abidjan',
    addressCountry: 'CI'
  },
  geo: {
    latitude: 5.3364,
    longitude: -4.0267
  },
  priceRange: '$$',
  openingHours: 'Mo-Fr 08:00-18:00'
})

defineBreadcrumb([
  {
    name: locale.value === 'fr' ? 'Accueil' : 'Home',
    item: `${config.public.siteUrl}${locale.value === 'fr' ? '/fr' : '/en'}`
  }
])
</script>

<template>
  <div>
    <MyHero />
    <Needs />
    <AboutUs />
    <OurServices />
    <Projects />
    <ContactUs />
  </div>
</template>