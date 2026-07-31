import { fetchAllNews } from '../utils/rss'

export default defineEventHandler(async () => {
  const items = await fetchAllNews()

  return {
    items,
    updatedAt: new Date().toISOString(),
  }
})
