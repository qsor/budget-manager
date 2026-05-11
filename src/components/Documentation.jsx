export function Documentation() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Документация</h2>

      <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] space-y-4">
        <h3 className="text-lg font-semibold">Начало работы</h3>
        <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
          <li>Откройте приложение в браузере или установите как PWA на устройство.</li>
          <li>В форме добавления выберите тип операции: Доход или Расход.</li>
          <li>Укажите сумму, выберите категорию и добавьте краткое описание.</li>
          <li>Нажмите "Добавить операцию". Запись появится в списке и повлияет на баланс.</li>
        </ol>
      </section>

      <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] space-y-4">
        <h3 className="text-lg font-semibold">Фильтрация и поиск</h3>
        <p className="text-[var(--text-secondary)]">
          Используйте панель фильтров под формой. Вы можете ограничить список по типу операции, категории или найти запись по описанию. 
          Кнопка "Сбросить" возвращает фильтры в исходное состояние. Количество найденных записей отображается в правом углу панели.
        </p>
      </section>

      <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] space-y-4">
        <h3 className="text-lg font-semibold">Аналитика</h3>
        <p className="text-[var(--text-secondary)]">
          Справа от списка операций расположен круговой график. Используйте переключатель "Расходы / Доходы" для отображения структуры трат или источников поступлений. 
          Наведение на сектор графика показывает точную сумму. Легенда справа дублирует данные списком.
        </p>
      </section>

      <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] space-y-4">
        <h3 className="text-lg font-semibold">Экспорт данных</h3>
        <p className="text-[var(--text-secondary)]">
          В шапке приложения доступна кнопка экспорта. Нажмите на нее, выберите формат (CSV, JSON или TXT) и файл автоматически скачается. 
          CSV совместим с Excel, JSON подходит для разработчиков, TXT удобен для быстрого чтения.
        </p>
      </section>

      <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] space-y-4">
        <h3 className="text-lg font-semibold">Настройки и внешний вид</h3>
        <p className="text-[var(--text-secondary)]">
          Во вкладке "Настройки" можно включить темную тему, сменить шрифт, отключить анимации или изменить точность отображения сумм. 
          Все изменения сохраняются локально и применяются мгновенно.
        </p>
      </section>

      <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] space-y-6">
        <h3 className="text-lg font-semibold">Поддержка проекта</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <p className="font-medium text-blue-600 mb-1">Поставьте звезду репозиторию</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Ваша звезда помогает проекту расти в поиске GitHub и мотивирует на дальнейшую разработку.
            </p>
            <a 
              href="https://github.com/qsor/budget-manager" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-blue-600 hover:underline"
            >
              github.com/qsor/budget-manager
            </a>
          </div>

          <div className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)]">
            <p className="font-medium mb-1">Финансовая поддержка</p>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              Если приложение оказалось полезным, вы можете поддержать разработчика в рублях. 
              Все средства идут на оплату хостинга, доменов и развитие функционала.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://t.me/tocue" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-[var(--accent)] text-white rounded-xl text-center hover:bg-[var(--accent-hover)] transition-colors"
              >
                Написать в Telegram (@tocue)
              </a>
              <a 
                href="https://t.me/qsor_ru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-xl text-center hover:bg-[var(--bg-primary)] transition-colors"
              >
                Канал @qsor_ru
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
