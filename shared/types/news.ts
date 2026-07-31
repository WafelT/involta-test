export type NewsSourceId = 'mos' | 'lenta'

export type NewsViewMode = 'list' | 'grid'

export interface NewsItem {
  id: string
  title: string
  description: string
  link: string
  pubDate: string
  image: string | null
  source: NewsSourceId
  sourceHost: string
}

export interface NewsSourceMeta {
  id: NewsSourceId
  label: string
  host: string
  feedUrl: string
}

export const NEWS_SOURCES: NewsSourceMeta[] = [
  {
    id: 'mos',
    label: 'Mos.ru',
    host: 'www.mos.ru',
    feedUrl: 'https://www.mos.ru/rss',
  },
  {
    id: 'lenta',
    label: 'Lenta.ru',
    host: 'www.lenta.ru',
    feedUrl: 'https://lenta.ru/rss',
  },
]

export const PAGE_SIZE = 4
