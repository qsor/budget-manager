import { useState, useEffect } from 'react'

const DEFAULTS = {
  darkMode: false,
  fontFamily: 'system',
  animations: true,
  precision: 2
}

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('app-settings')
      return saved ? JSON.parse(saved) : DEFAULTS
    } catch {
      return DEFAULTS
    }
    
  })

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings))
    document.documentElement.classList.toggle('dark', settings.darkMode)
    
    const fontMap = {
      system: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      inter: '"Inter", sans-serif',
      roboto: '"Roboto", sans-serif',
      mono: '"JetBrains Mono", monospace'
    }
    document.documentElement.style.setProperty('--font-family', fontMap[settings.fontFamily] || fontMap.system)
  }, [settings])

  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }))

  return { settings, update }
}

