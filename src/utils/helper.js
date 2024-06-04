export function extractLinkHeaders(linkHeader) {
  let nextPage = false
  let prevPage = false

  if (linkHeader) {
    const links = linkHeader.split(',')

    for (const link of links) {
      const [url, rel] = link.split(';')
      const cleanRel = rel.trim().split('=')[1].trim().slice(1, -1)

      if (cleanRel === 'next') {
        nextPage = true
      } else if (cleanRel === 'prev') {
        prevPage = true
      }
    }
  }

  return {
    prevPage,
    nextPage
  }
}

export function totalPages(linkHeader) {
  let totalPages = 1
  if (linkHeader) {
    const links = linkHeader.split(',')
    const lastLink = links.find((s) => s.includes('rel="last"'))
    if (lastLink) {
      const lastPageMatch = lastLink.match(/&page=(\d+)/)
      if (lastPageMatch) {
        totalPages = parseInt(lastPageMatch[1], 10)
        return totalPages
      }
    }
  }
}
