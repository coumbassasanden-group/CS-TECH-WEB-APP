<!-- app.vue -->
<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const config = useRuntimeConfig()

// Template de titre global
useHead({
  titleTemplate: (titleChunk: string | undefined) => {
    const siteName = locale.value === 'fr' 
      ? 'C&S TECH - Solutions Digitales'
      : 'C&S TECH - Digital Solutions'
    
    return titleChunk ? `${titleChunk} | ${siteName}` : siteName
  },
  
  htmlAttrs: {
    lang: locale
  },
  
  // Liens canoniques et hreflang
  link: computed(() => [
    // Canonical
    { 
      rel: 'canonical', 
      href: `${config.public.siteUrl}${route.fullPath}` 
    },
    // Hreflang pour chaque langue
    { 
      rel: 'alternate', 
      hreflang: 'fr', 
      href: `${config.public.siteUrl}/fr${route.path === '/fr' ? '' : route.path.replace('/en', '')}` 
    },
    { 
      rel: 'alternate', 
      hreflang: 'en', 
      href: `${config.public.siteUrl}/en${route.path === '/en' ? '' : route.path.replace('/fr', '')}` 
    },
    { 
      rel: 'alternate', 
      hreflang: 'x-default', 
      href: `${config.public.siteUrl}/fr` 
    }
  ])
})

// SEO Meta global
useSeoMeta({
  ogType: 'website',
  ogSiteName: computed(() => 
    locale.value === 'fr' 
      ? 'C&S TECH - Solutions Digitales' 
      : 'C&S TECH - Digital Solutions'
  ),
  ogLocale: computed(() => locale.value === 'fr' ? 'fr_FR' : 'en_US'),
  twitterCard: 'summary_large_image',
  twitterSite: '@cstech_ci',
  ogImage: `${config.public.siteUrl}/og-image.jpg`,
  twitterImage: `${config.public.siteUrl}/og-image.jpg`
})

// Google Fonts
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap',
      crossorigin: '' 
    }
  ]
})

// Google Tag Manager - UNIQUEMENT en production
if (import.meta.client && import.meta.env.PROD) {
  useHead({
    script: [
      {
        innerHTML: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P9QHD7QH');
        `,
        type: 'text/javascript'
      }
    ]
  })
}
</script>

<template>
  <Html>
    <Head>
      <!-- Vérifications des moteurs de recherche -->
      <Meta name="google-site-verification" content="googlef6f59f957dc65acd" />
      <Meta name="msvalidate.01" content="VOTRE_CODE_BING" />
    </Head>
    
    <Body>
      <!-- Google Tag Manager (noscript) - UNIQUEMENT en production -->
      <ClientOnly>
        <noscript v-if="$config.public.NODE_ENV === 'production'">
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9QHD7QH"
            height="0" 
            width="0" 
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
      </ClientOnly>
      
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>