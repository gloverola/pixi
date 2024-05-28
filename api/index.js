// @ts-nocheck
import axios from "axios"

const API_KEY = '16011335-d27e757a7fcc9376866c5671b'
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`

const formattedUrl = (params) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true"
  if (!params) return url
  let paramKeys = Object.keys(params)
  paramKeys.map(key => {
    let value = key === 'q' ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`
  })
  console.log("final url", url);
  return url
}


export const apiCall = async (params) => {
  try {
    const response = await axios.get(formattedUrl(params))
    const { data } = response
    return {success: true, data}
  } catch (error) {
    console.log('Error', error.message)
    return {success: false, msg: error.message}
  }
}