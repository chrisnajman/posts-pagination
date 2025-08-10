import chunkPosts from "./components/paginator/helpers/chunk-posts.js"

export default function renderPosts(allPosts, pageSize, currentPage) {
  const container = document.getElementById("posts-page-container")
  const template = document.getElementById("article-post")

  container.innerHTML = ""

  const chunks = chunkPosts(allPosts, pageSize)
  const postsToRender = chunks[currentPage - 1] || []

  postsToRender.forEach((post) => {
    const clone = template.content.cloneNode(true)
    clone.querySelector("[data-id]").textContent = post.id
    clone.querySelector("[data-title]").textContent = post.title
    clone.querySelector("[data-body]").textContent = post.body
    clone.querySelector("[data-tags]").textContent = post.tags.join(", ")
    clone.querySelector("[data-views]").textContent = post.views
    clone.querySelector("[data-likes]").textContent = post.reactions.likes
    clone.querySelector("[data-dislikes]").textContent = post.reactions.dislikes
    container.appendChild(clone)
  })
}
