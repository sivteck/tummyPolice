export const postRequest = async (url, data) => {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let result = await response.json()
    return { response, result }
  } catch (error) {
    return { error }
  }
}
