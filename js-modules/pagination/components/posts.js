import paginator from "./paginator/paginator.js"

export default async function pages(allPosts) {
  try {
    const posts = allPosts.posts

    if (!Array.isArray(posts)) {
      throw new Error("Posts data is not an array")
    }
    if (posts.length === 0) {
      throw new Error("Posts array is empty")
    }
    paginator(posts, 5) // <-- Pass pageSize here
  } catch (error) {
    console.error("Error processing posts data:", error)
    const container = document.getElementById("posts-page-container")
    if (container) {
      container.textContent = "Failed to load posts."
    }
  }
}
