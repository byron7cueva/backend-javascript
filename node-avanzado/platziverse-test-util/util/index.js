function selectKeys (obj, keys) {
  // Validando si la key tiene el objeto
  const keysObj = Object.keys(obj)
  const selectedKeys = keys.filter(key => keysObj.includes(key))
  // Construyendo el objeto de respuesta
  const objResult = {}
  selectedKeys.forEach(key => {
    objResult[key] = obj[key]
  })
  return objResult
}

exports.extend = function (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

exports.selectAttributes = function (array, attributes) {
  const selected = array.map(obj => selectKeys(obj, attributes))
  return selected
}
