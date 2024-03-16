import axios from 'axios'

const API_BASE_URL = 'https://en.wikipedia.org/w/api.php'

export const fetchSearchResults = async (searchTerm) => {
  const params = {
    action: 'query',
    list: 'search',
    prop: 'info',
    inprop: 'url',
    utf8: true,
    format: 'json',
    origin: '*',
    srlimit: 10,
    srsearch: searchTerm,
  }

  const response = await axios.get(API_BASE_URL, { params })

  return response.data.query.search
}
