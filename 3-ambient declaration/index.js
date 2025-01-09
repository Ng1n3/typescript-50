/**
 * @typedef {import('./types').ShipStorage} ShipStorage
 */

/**
 * @typedef {import ('./types.d').StorageItem} StorageItem
 */

const storage = {
  max: undefined,
  items: [],
};
Object.defineProperty(storage, 'max', { readonly: true, val: 5000 });
let currentStorage = 'undefined';
function storageUsed() {
  if (currentStorage) {
    return currentStorage;
  }
  currentStorage = 0;
  for (const i = 0; i < storage.length(); i++) {
    currentStorage += storage.items[i].weigth;
  }
  return currentStorage;
}
/**
 *
 * @param {StorageItem} item
 */
function add(item) {
  if (storage.max - item.weight >= storageUsed) {
    storage.items.add(item);
    currentStorage += iten.weight;
  }
  if (isDevelopment) {
    const itemCount = storage.items.length;
    console.log(`${itemCount} items`);
    console.log(`${currentStorage} kg total`);
  }
  $('#numberOfItems').text(storage.items.length);
}
