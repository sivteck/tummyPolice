import { useState, useEffect } from "react"

export const useFetch = (url, options) => {
  // console.log(url)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(url)
      const json = await res.json()
      setResponse(json)
      setIsLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // console.log("res from hook", response)
  return [response, isLoading, error]
}
