// composables/useSectionSEO.ts
export const useSectionSEO = (section: string) => {
  const { locale } = useI18n()
  const config = useRuntimeConfig()
  
  const seoData = {
    services: {
      fr: {
        title: 'Nos Services Digitaux',
        description: 'Services complets de développement web, applications mobiles, IA et transformation digitale en Côte d\'Ivoire.',
        keywords: 'services digitaux Côte d\'Ivoire, développement web Abidjan, applications mobiles, intelligence artificielle'
      },
      en: {
        title: 'Our Digital Services',
        description: 'Complete web development, mobile apps, AI and digital transformation services in Ivory Coast.',
        keywords: 'digital services Ivory Coast, web development Abidjan, mobile applications, artificial intelligence'
      }
    },
    
    projects: {
      fr: {
        title: 'Nos Projets',
        description: 'Portfolio de nos réalisations en développement web et solutions digitales pour entreprises en Côte d\'Ivoire.',
        keywords: 'portfolio C&S TECH, projets web Côte d\'Ivoire, réalisations digitales'
      },
      en: {
        title: 'Our Projects',
        description: 'Portfolio of our web development and digital solutions for companies in Ivory Coast.',
        keywords: 'C&S TECH portfolio, web projects Ivory Coast, digital achievements'
      }
    },
    
    contact: {
      fr: {
        title: 'Contact',
        description: 'Contactez C&S TECH pour vos projets digitaux à Abidjan. Devis gratuit et conseil personnalisé.',
        keywords: 'contact C&S TECH, devis développement web, consultant digital Abidjan'
      },
      en: {
        title: 'Contact',
        description: 'Contact C&S TECH for your digital projects in Abidjan. Free quote and personalized consulting.',
        keywords: 'contact C&S TECH, web development quote, digital consultant Abidjan'
      }
    }
  }

  const currentLocale = locale.value as 'fr' | 'en'
  const data = seoData[section as keyof typeof seoData]?.[currentLocale]
  
  if (data) {
    useSeoMeta({
      title: `${data.title} | C&S TECH`,
      description: data.description,
      keywords: data.keywords
    })
  }
}