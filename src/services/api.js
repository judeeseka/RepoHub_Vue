import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
  }
})

export default {
  async getAllRepos(username, options = {}, searchInput) {
    const response = await api.get(`/users/${username}/repos`, {
      params: {
        per_page: searchInput ? 30 : 5,
        visibility: 'all',
        ...options
      }
    })

    //   Filter repositories based on search input
    const filteredRepositories = searchInput
      ? {
          ...response,
          data: response.data.filter((repo) =>
            repo.name.toLowerCase().includes(searchInput.toLowerCase())
          )
        }
      : response
    return filteredRepositories
  },

  getSingleRepo(name, repo) {
    return api.get(`/repos/${name}/${repo}`)
  }
}
