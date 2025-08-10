const POSTS = "/json/posts.json"

import posts from "./components/posts.js"

export default async function pagination() {
  try {
    const response = await fetch(POSTS)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const allPosts = await response.json()
    posts(allPosts)
  } catch (e) {
    console.error("Pagination load error:", e)
  }
}
