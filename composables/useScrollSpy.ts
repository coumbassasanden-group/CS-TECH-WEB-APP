import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollSpy() {
  const activeSection = ref('')
  const { t } = useI18n()

  const checkVisibility = () => {
    const sections = Array.from(document.querySelectorAll('section[id]')).filter(
      (section): section is HTMLElement => {
        return section instanceof HTMLElement && section.offsetParent !== null
      }
    )

    if (sections.length === 0) return

    if (window.scrollY < 100) {
      activeSection.value = t('ids.hero')
      return
    }

    for (const section of sections) {
      const rect = section.getBoundingClientRect()
      const threshold = window.innerHeight * 0.2

      if (rect.top <= threshold && rect.bottom >= threshold) {
        activeSection.value = section.id
        break
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', checkVisibility)
    setTimeout(checkVisibility, 100)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', checkVisibility)
  })

  return {
    activeSection
  }
}