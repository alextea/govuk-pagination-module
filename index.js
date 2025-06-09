/**
 * Creates a GOV.UK pagination object.
 *
 * @param {number} currPage - The current page number (1-based).
 * @param {Object} options - Pagination options.
 * @param {number} [options.numPages] - Total number of pages (required if hrefArray not provided).
 * @param {string} [options.pathBase="/?page="] - Base path for URLs.
 * @param {number} [options.pageBuffer=2] - Number of pages to show around the current page.
 * @param {string[]} [options.hrefArray=null] - Array of hrefs for each page.
 * @returns {Object} Pagination object with previous, next, and items for sending to the govukPagination nunjucks macro
 */

function createGOVUKPagination( currPage, { numPages, pathBase = "/?page=", pageBuffer = 2, hrefArray = null } = {} ) {
  if (currPage == null) throw new Error("currPage is required");
  if (!hrefArray && typeof numPages !== "number") throw new Error("You must supply either numPages or hrefArray");

  currPage = Number(currPage)
  if (hrefArray) numPages = hrefArray.length;

  const paginationObj = {};

  if (currPage > 1) {
    let prevUrl = ""
    if (hrefArray) {
      prevUrl = hrefArray[currPage - 2]
    } else {
      prevUrl = pathBase + (currPage-1)
    }
    paginationObj.previous = {
      href: prevUrl
    }
  }

  if (currPage < numPages) {
    let nextUrl = ""
    if (hrefArray) {
      nextUrl = hrefArray[currPage]
    } else {
      nextUrl = pathBase + (currPage+1)
    }
    paginationObj.next = {
      href: nextUrl
    }
  }

  paginationObj.items = []
  let prevSkip = false;
  let nextSkip = false;

  for (let i=1; i<=numPages; i++) {
    let item = {};
    if (i == 1
      || (i >= currPage-pageBuffer && i <= currPage+pageBuffer)
      || i == numPages) {
      
        item.number = i;

        if (hrefArray) {
          item.href = hrefArray[i-1]
        } else {
          item.href = pathBase + i
        }

        if (i == currPage) {
          item.current = true;
        }

        paginationObj.items.push(item)
    }
    
    if (i > 1 && (i <= currPage-pageBuffer) && !prevSkip) {
      item.ellipsis = true;
      prevSkip = true
      paginationObj.items.push(item)
    }
    
    if (i < numPages && (i > currPage+pageBuffer) && !nextSkip) {
      item.ellipsis = true;
      nextSkip = true
      paginationObj.items.push(item)
    }
  }

  return paginationObj
}

export { createGOVUKPagination }