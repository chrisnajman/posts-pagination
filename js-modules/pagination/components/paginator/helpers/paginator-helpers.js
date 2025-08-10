export function focusCurrentPageButton(container, currentPage) {
  const currentBtn = container.querySelector(
    `button.page-number[data-page-number="${currentPage}"]`
  )
  if (currentBtn) {
    currentBtn.focus()
  }
}

export function getPageFromURL(totalPages) {
  const params = new URLSearchParams(window.location.search)
  const page = parseInt(params.get("page"), 10)
  return !isNaN(page) && page >= 1 && page <= totalPages ? page : 1
}

export function createEllipsis() {
  const span = document.createElement("span")
  span.textContent = "…"
  span.classList.add("ellipsis")
  span.setAttribute("aria-hidden", "true")
  return span
}

export function updatePaginationState(
  currentId,
  totalPages,
  previousBtn,
  nextBtn
) {
  if (currentId === "1") {
    previousBtn.setAttribute("disabled", "")
  } else {
    previousBtn.removeAttribute("disabled")
  }

  if (currentId === totalPages.toString()) {
    nextBtn.setAttribute("disabled", "")
  } else {
    nextBtn.removeAttribute("disabled")
  }
}
