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
function add(item) {
  if (storage.max - item.weight >= storageUsed) {
    storage.items.add(item);
    currentStorage += iten.weight;
  }
}

/**
 * With //@ts-check we activate Typescript in the file we are currently editing.
 * We use JSDoc comments type annotation for all our constants, objects, and functions.
 * We create custom type definitions in type declaration files, and load as needed in our JSDoc type annotions
 */
