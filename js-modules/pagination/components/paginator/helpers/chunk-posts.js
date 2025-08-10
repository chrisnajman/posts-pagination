export default function chunkPosts(posts, chunkSize) {
  if (!Array.isArray(posts)) {
    console.error("chunkPosts received invalid posts data:", posts)
    return []
  }
  if (chunkSize <= 0) {
    console.error("chunkPosts received invalid chunkSize:", chunkSize)
    return []
  }
  const chunks = []
  for (let i = 0; i < posts.length; i += chunkSize) {
    chunks.push(posts.slice(i, i + chunkSize))
  }
  return chunks
}
