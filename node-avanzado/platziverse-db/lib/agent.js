module.exports = function setupAgent (AngentModel) {
  function findById (id) {
    return AngentModel.findById(id)
  }

  return {
    findById
  }
}
