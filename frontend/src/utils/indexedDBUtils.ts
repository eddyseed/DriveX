import { openDB } from 'idb';

const DB_NAME = 'carEcommDB';
const STORE_NAME = 'drafts';

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const saveDraft = async (key: string, value: any) => {
  const db = await initDB();
  await db.put(STORE_NAME, value, key);
};

export const loadDraft = async (key: string) => {
  const db = await initDB();
  return await db.get(STORE_NAME, key);
};

export const clearDraft = async (key: string) => {
  const db = await initDB();
  return await db.delete(STORE_NAME, key);
};