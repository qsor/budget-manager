import { useSettings } from '../hooks/useSettings'

export function Settings() {
  const { settings, update } = useSettings()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Настройки</h2>
      
      <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Темная тема</h3>
            <p className="text-sm text-[var(--text-secondary)]">Переключает интерфейс в темный режим</p>
          </div>
          <button
            onClick={() => update('darkMode', !settings.darkMode)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-medium">Шрифт интерфейса</h3>
            <p className="text-sm text-[var(--text-secondary)]">Выберите основной шрифт приложения</p>
          </div>
          <select
            value={settings.fontFamily}
            onChange={(e) => update('fontFamily', e.target.value)}
            className="border border-[var(--border-color)] rounded-xl px-4 py-2 bg-[var(--bg-primary)] focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="system">Системный</option>
            <option value="inter">Inter</option>
            <option value="roboto">Roboto</option>
            <option value="mono">JetBrains Mono</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Анимации</h3>
            <p className="text-sm text-[var(--text-secondary)]">Плавные переходы и эффекты нажатия</p>
          </div>
          <button
            onClick={() => update('animations', !settings.animations)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.animations ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.animations ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-medium">Точность сумм</h3>
            <p className="text-sm text-[var(--text-secondary)]">Количество знаков после запятой</p>
          </div>
          <select
            value={settings.precision}
            onChange={(e) => update('precision', Number(e.target.value))}
            className="border border-[var(--border-color)] rounded-xl px-4 py-2 bg-[var(--bg-primary)] focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value={0}>0 знаков</option>
            <option value={1}>1 знак</option>
            <option value={2}>2 знака</option>
          </select>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)]">
        <h3 className="font-medium mb-4">Управление данными</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              if (window.confirm('Сбросить все настройки к значениям по умолчанию?')) {
                localStorage.removeItem('app-settings')
                window.location.reload()
              }
            }}
            className="px-4 py-2 border border-[var(--border-color)] rounded-xl hover:bg-[var(--bg-primary)] transition-colors"
          >
            Сбросить настройки
          </button>
          <button
            onClick={() => {
              if (window.confirm('Удалить все транзакции? Это действие нельзя отменить.')) {
                localStorage.removeItem('transactions')
                window.location.reload()
              }
            }}
            className="px-4 py-2 border border-red-500/30 text-red-600 rounded-xl hover:bg-red-500/10 transition-colors"
          >
            Очистить все данные
          </button>
        </div>
      </div>
    </div>
  )
}
