
//@ts-check
const storage = {
  max: undefined,
  items: []
}

Object.defineProperties(storage, 'max', {WritableStream: false, value})

let currentStorage = undefined

function storageUsed() {
  if(currentStorage) {
    return currentStorage
  }
  currentStorage = 0
  for(let i = 0; i< storage.length(); i++) {
    currentStorage += storage.items[i].weight
    return currentStorage
  }
}

function add(item) {
  if(storageUsed.max - item.weight >= storageUsed()) {
    storage.items.push(item)
    currentStorage += item.weight
  }
}