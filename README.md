# involta-news

SSR-приложение-агрегатор новостей на **Nuxt 3 + Vue + Pinia**.

## Источники

Данные берутся **только live-запросами** к RSS (серверный прокси `/api/news`). Локальные XML-фикстуры не используются.

- [Mos.ru RSS](https://www.mos.ru/rss)
- [Lenta.ru RSS](https://lenta.ru/rss)

## Требования

- Node.js >= 20.12 (рекомендуется 22, см. `.nvmrc`)

## Запуск

```bash
nvm use
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Возможности (по ТЗ)

| Требование | Реализация |
|---|---|
| SSR / Nuxt / Pinia | Nuxt 3 SSR, store `view` + `news` |
| RSS | `/api/news` проксирует Mos.ru и Lenta.ru |
| Вид списка | list / grid, сохранение в `localStorage` |
| Пагинация | путь `/1`, `/2`, … (Nuxt Router) |
| Фильтр по источнику | query `?source=mos\|lenta` |
| Поиск | query `?q=...` по title + description |
| Сброс фильтров | «Сбросить фильтры» / кнопка обновления |
| Обновление ленты | кнопка refresh рядом с заголовком |

Примеры URL:

- `/1` — все новости, страница 1  
- `/2?source=mos` — только Mos.ru, страница 2  
- `/1?q=реновация` — поиск  
- `/3?source=lenta&q=москва` — источник + поиск + страница  

## Примечание: вид списка (`list` / `grid`) и `localStorage`

По ТЗ выбранный режим отображения нужно хранить в **`localStorage`**.

`localStorage` доступен только в браузере и **не участвует в SSR**: сервер не знает, какой вид выбран у пользователя. Поэтому:

1. На сервере всегда рендерится значение по умолчанию (`grid`).
2. После гидрации на клиенте режим читается из `localStorage` и, если сохранён `list`, вёрстка переключается.

Из-за этого при сохранённом режиме `list` возможен краткий **layout shift** (сначала приходит `grid`, затем применяется `list`). Это следствие требования ТЗ использовать именно `localStorage`, а не cookie / query / URL — иначе режим можно было бы учесть уже на сервере и отдать сразу нужную разметку.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
