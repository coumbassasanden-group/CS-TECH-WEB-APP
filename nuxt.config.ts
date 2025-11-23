// nuxt.config.ts - Version corrigée
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  // Configuration SITE obligatoire pour les modules SEO
  site: {
    url: 'https://tech.coumbassa-sanden.com',
    name: 'C&S TECH',
    description: 'Solutions digitales innovantes en Côte d\'Ivoire'
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://nextapi.coumbassa-sanden.com',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://tech.coumbassa-sanden.com'
    }
  },

  // Configuration app.head
  app: {
    head: {
      title: 'C&S TECH - Solutions Digitales Innovantes pour l\'Afrique',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'COUMBASSA & SANDEN TECH' },
        { name: 'theme-color', content: '#F9B233' },
        { name: 'geo.region', content: 'CI-AB' },
        { name: 'geo.placename', content: 'Abidjan, Côte d\'Ivoire' },
        { name: 'geo.position', content: '5.3364;-4.0267' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  css: [
    "/assets/css/bootstrap/bootstrap.min.css",
    "/assets/css/main.css",
    "/assets/css/bootstrap-icons/bootstrap-icons.css",
    '/assets/css/font-awesome-pro.css',
    '/assets/css/spacing.css',
    '/assets/css/swiper-bundle.css'
  ],

  modules: [
    '@nuxtjs/i18n',
    'nuxt-aos',
    '@nuxt/image',
    'nuxt-swiper',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  // Configuration i18n
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { 
        code: 'fr', 
        language: 'fr-FR', 
        file: 'fr.json',
        name: 'Français',
        iso: 'fr-FR'
      },
      { 
        code: 'en', 
        language: 'en-US', 
        file: 'en.json',
        name: 'English',
        iso: 'en-US'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'fr',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieCrossOrigin: false,
      cookieSecure: true,
      alwaysRedirect: true,
      fallbackLocale: 'fr',
      redirectOn: 'root'
    }
  },

  // Configuration Schema.org
  schemaOrg: {
    enabled: true,
    identity: {
      type: 'Organization',
      name: 'COUMBASSA & SANDEN TECH',
      alternateName: 'C&S TECH',
      url: 'https://tech.coumbassa-sanden.com',
      address: {
        type: 'PostalAddress',
        addressLocality: 'Abidjan',
        addressRegion: 'Abidjan',
        addressCountry: 'CI'
      }
    },
    defaults: true,
    minify: true,
    reactive: true
  },

  // Configuration Sitemap CORRIGÉE
  sitemap: {
    enabled: true,
    // Hostname sera automatiquement pris depuis site.url
    // gzip: true,
    autoLastmod: true,
    autoI18n: true,
    
    // Désactiver le XSL stylesheet qui cause l'erreur
    xsl: false,
    
    defaults: {
      changefreq: 'weekly',
      priority: 1.0
    },
    
    exclude: [
      '/api/**',
      '/.nuxt/**'
    ]
  },

  // Configuration Robots
  robots: {
    enabled: true,
    groups: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/fr/',
          '/en/',
          '/assets/',
          '/_nuxt/',
          '/images/'
        ],
        disallow: [
          '/api/',
          '/.nuxt/',
          '/admin/'
        ]
      }
    ]
    // sitemap sera automatiquement ajouté depuis site.url
  },

  // Configuration Image
  image: {
    format: ['webp', 'avif', 'png', 'jpg'],
    quality: 85,
    densities: [1, 2]
  },

  // Configuration Nitro
  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: [
        '/',
        '/fr',
        '/en'
      ],
      // Ignorer les erreurs de prerendering pour certaines routes
      failOnError: false
    }
  }
})