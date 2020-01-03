export const getRequest = async url => {
  console.log("url from get req", url)
  try {
    let response = await fetch(url)
    let result = await response.json()
    return { response, result }
  } catch (error) {
    return { error }
  }
}
