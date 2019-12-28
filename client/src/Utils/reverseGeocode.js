export const reverseGeocode = async ({ latitude, longitude }) => {
  let res = await fetch(
    `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${longitude},${latitude}`
  )
  let result = await res.json()
  return result.address
}
