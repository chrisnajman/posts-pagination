import { showLoader, hideLoader } from "../../../loader.js"
import setMultipleAttributes from "../../../helpers/set-multiple-attributes.js"
import renderPosts from "../../render-posts.js"
import announceLiveRegion from "./helpers/announce-live-region.js"
import {
  getPageFromURL,
  createEllipsis,
  focusCurrentPageButton,
  updatePaginationState,
} from "./helpers/paginator-helpers.js"

export default function paginator(allPosts, pageSize) {
  const paginator = document.getElementById("paginator")
  const previousBtn = document.createElement("button")
  const nextBtn = document.createElement("button")

  const totalPages = Math.ceil(allPosts.length / pageSize)
  const maxVisibleButtons = 4

  getPageFromURL(totalPages)

  createEllipsis()

  function createPageButton(page) {
    const btn = document.createElement("button")
    btn.textContent = page
    setMultipleAttributes(btn, {
      type: "button",
      class: "page-number",
      tabindex: "0",
      "aria-current": page === currentPage ? "page" : null,
    })
    btn.dataset.pageNumber = page
    btn.addEventListener("click", () => {
      renderPage(page)
    })
    return btn
  }

  let currentPage = getPageFromURL()

  previousBtn.textContent = "Previous"
  previousBtn.classList.add("previous-next-btn", "previous-btn")
  previousBtn.setAttribute("type", "button")
  nextBtn.textContent = "Next"
  nextBtn.classList.add("previous-next-btn", "next-btn")
  nextBtn.setAttribute("type", "button")

  function renderPage(pageNum) {
    currentPage = pageNum
    showLoader()
    setTimeout(() => {
      renderPosts(allPosts, pageSize, currentPage)
      announceLiveRegion(`Page ${currentPage}`)
      focusCurrentPageButton(paginator, currentPage)
      updatePaginationState(
        currentPage.toString(),
        totalPages,
        previousBtn,
        nextBtn
      )
      // Update URL with current page, using history API
      const newUrl = `${window.location.pathname}?page=${currentPage}`
      window.history.pushState({ page: currentPage }, "", newUrl)

      // Re-render page buttons with ellipsis on page change
      renderPageButtons()

      hideLoader()
    }, 250)
  }

  previousBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      renderPage(currentPage - 1)
    }
  })

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      renderPage(currentPage + 1)
    }
  })

  // function renderPageButtons() {
  //   // Clear existing page buttons but keep previous and next buttons
  //   // Remove all except previousBtn and nextBtn
  //   ;[...paginator.querySelectorAll(".page-number, .ellipsis")].forEach((el) =>
  //     el.remove()
  //   )

  //   // Insert previous button first if not already
  //   if (!paginator.contains(previousBtn))
  //     paginator.insertBefore(previousBtn, paginator.firstChild)
  //   // Insert next button last if not already
  //   if (!paginator.contains(nextBtn)) paginator.appendChild(nextBtn)

  //   if (totalPages <= maxVisibleButtons) {
  //     // Show all buttons
  //     for (let i = 1; i <= totalPages; i++) {
  //       paginator.insertBefore(createPageButton(i), nextBtn)
  //     }
  //   } else {
  //     // Complex case: show window around currentPage, with ellipsis if needed

  //     // Always show first page button
  //     paginator.insertBefore(createPageButton(1), nextBtn)

  //     let startPage = Math.max(2, currentPage - 1)
  //     let endPage = Math.min(totalPages - 1, currentPage + 1)

  //     // Adjust window if at beginning or end
  //     if (currentPage <= 2) {
  //       startPage = 2
  //       endPage = 3
  //     }
  //     if (currentPage >= totalPages - 1) {
  //       startPage = totalPages - 2
  //       endPage = totalPages - 1
  //     }

  //     // Show ellipsis after first page if gap
  //     if (startPage > 2) {
  //       paginator.insertBefore(createEllipsis(), nextBtn)
  //     }

  //     // Show middle page buttons
  //     for (let i = startPage; i <= endPage; i++) {
  //       paginator.insertBefore(createPageButton(i), nextBtn)
  //     }

  //     // Show ellipsis before last page if gap
  //     if (endPage < totalPages - 1) {
  //       paginator.insertBefore(createEllipsis(), nextBtn)
  //     }

  //     // Always show last page button
  //     paginator.insertBefore(createPageButton(totalPages), nextBtn)
  //   }
  // }
  function renderPageButtons() {
    // Clear existing page buttons container if any
    const existingList = paginator.querySelector(".page-numbers-container")
    if (existingList) {
      existingList.remove()
    }

    // Create the <ul> container
    const ul = document.createElement("ul")
    ul.classList.add("page-numbers-container")

    // Insert previous button first if not already present
    if (!paginator.contains(previousBtn))
      paginator.insertBefore(previousBtn, paginator.firstChild)
    // Insert next button last if not already present
    if (!paginator.contains(nextBtn)) paginator.appendChild(nextBtn)

    // Helper to create <li> wrapper around buttons or ellipsis
    function wrapInListItem(element) {
      const li = document.createElement("li")
      li.appendChild(element)
      return li
    }

    if (totalPages <= maxVisibleButtons) {
      // Show all buttons
      for (let i = 1; i <= totalPages; i++) {
        ul.appendChild(wrapInListItem(createPageButton(i)))
      }
    } else {
      // Complex case: show window around currentPage, with ellipsis if needed

      // Always show first page button
      ul.appendChild(wrapInListItem(createPageButton(1)))

      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust window if at beginning or end
      if (currentPage <= 2) {
        startPage = 2
        endPage = 3
      }
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2
        endPage = totalPages - 1
      }

      // Show ellipsis after first page if gap
      if (startPage > 2) {
        ul.appendChild(wrapInListItem(createEllipsis()))
      }

      // Show middle page buttons
      for (let i = startPage; i <= endPage; i++) {
        ul.appendChild(wrapInListItem(createPageButton(i)))
      }

      // Show ellipsis before last page if gap
      if (endPage < totalPages - 1) {
        ul.appendChild(wrapInListItem(createEllipsis()))
      }

      // Always show last page button
      ul.appendChild(wrapInListItem(createPageButton(totalPages)))
    }

    // Insert the <ul> between previous and next buttons
    paginator.insertBefore(ul, nextBtn)
  }

  paginator.appendChild(previousBtn)
  paginator.appendChild(nextBtn)

  // Initial render
  renderPageButtons()
  renderPage(currentPage)
}
