/**
 * IndexNow API client
 * Notifies search engines (Google, Bing, Yandex) about updated URLs
 * https://www.indexnow.org/
 */

const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY || 'your-indexnow-key-here'
const SITE_URL = 'https://arteparquet.pro'

export async function notifyIndexNow(urls: string | string[]) {
  if (!INDEXNOW_KEY || INDEXNOW_KEY === 'your-indexnow-key-here') {
    console.warn('IndexNow API key not configured')
    return
  }

  const urlList = Array.isArray(urls) ? urls : [urls]

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'arteparquet.pro',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urlList.map((url) => (url.startsWith('http') ? url : `${SITE_URL}${url}`)),
      }),
    })

    if (response.ok) {
      console.log(`IndexNow: Successfully notified ${urlList.length} URL(s)`)
    } else {
      console.error(`IndexNow error: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error('IndexNow request failed:', error)
  }
}
