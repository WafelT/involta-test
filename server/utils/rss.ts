import { XMLParser } from 'fast-xml-parser'
import type { NewsItem, NewsSourceId } from '../../shared/types/news'
import { NEWS_SOURCES } from '../../shared/types/news'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => name === 'item' || name === 'enclosure',
  trimValues: true,
})

function stripHtml(value: unknown): string {
  if (value == null) return ''
  const text = typeof value === 'object' && value !== null && '#text' in value
    ? String((value as { '#text': unknown })['#text'] ?? '')
    : String(value)

  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function pickImage(item: Record<string, unknown>): string | null {
  const enclosures = item.enclosure
  if (Array.isArray(enclosures)) {
    for (const enclosure of enclosures) {
      const url = enclosure?.['@_url']
      const type = String(enclosure?.['@_type'] ?? '')
      if (url && (!type || type.startsWith('image/'))) {
        return String(url)
      }
    }
  }

  const media = item['media:content'] as Record<string, unknown> | undefined
  if (media?.['@_url']) {
    return String(media['@_url'])
  }

  return null
}

function parseFeed(xml: string, source: NewsSourceId): NewsItem[] {
  const meta = NEWS_SOURCES.find((item) => item.id === source)
  if (!meta) return []

  const parsed = parser.parse(xml)
  const channel = parsed?.rss?.channel
  const items = channel?.item

  if (!Array.isArray(items)) return []

  return items.map((item: Record<string, unknown>, index: number) => {
    const link = stripHtml(item.link)
    const title = stripHtml(item.title)
    const pubDate = stripHtml(item.pubDate)
    const description = stripHtml(item.description) || stripHtml(item.category)

    return {
      id: `${source}-${link || index}`,
      title,
      description,
      link,
      pubDate,
      image: pickImage(item),
      source,
      sourceHost: meta.host,
    }
  })
}

export async function fetchRssFeed(
  url: string,
  source: NewsSourceId,
): Promise<NewsItem[]> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
      'User-Agent': 'involta-news/1.0',
    },
  })

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `Failed to fetch RSS feed: ${source}`,
    })
  }

  const xml = await response.text()
  return parseFeed(xml, source)
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const config = useRuntimeConfig()
  const feedUrls = config.rssSources as Record<NewsSourceId, string>

  const results = await Promise.allSettled(
    NEWS_SOURCES.map((source) =>
      fetchRssFeed(feedUrls[source.id] || source.feedUrl, source.id),
    ),
  )

  const items = results.flatMap((result) => {
    if (result.status === 'fulfilled') return result.value
    console.error('RSS fetch failed:', result.reason)
    return []
  })

  return items.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  )
}
