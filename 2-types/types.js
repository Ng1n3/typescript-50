/**
 * Adding two nubers. this anotattion tells Typescript
 * which types to expect. Two parameters9params) of type number and arturn type of number
 * 
 * @param {number} numberOne
 * @param {number} numberTwo
 * @returnss {number}
*/

function addNumbers(numberOne, numberTwo) {
  return numberOne + numberTwo;
}
/** 
 * @typedef {Object} StorageItem
 * @property {number} weight
 */

const storage = {
  max: undefined,
  items: []
}

/**
 * @typeof {Object} ShipStorage
 * @property {number} max
 * @property {StorageItem[]} items
 * 
 * */ 

/**
 * @param (storageItem) item
*/
function add(item) {
  if(storage.max - item.weight >= storageUsed()) {
    storage.items.push(item)
    currentStorage += item.weight
  }
}