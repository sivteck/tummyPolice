function objectToKVs (obj) {
  let KVs = []
  for (let key in obj) {
    KVs.push(key)
    KVs.push(obj[key])
  }
  return KVs
}

module.exports = { objectToKVs }
