import { openDB } from "idb";

const DB_NAME = "quicktools-db";
const STORE_NAME = "files";
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, {
        keyPath: "id",
      });
    }
  },
});

// Save a file
export async function saveFile(file) {
  const id = crypto.randomUUID();

  await dbPromise.then((db) =>
    db.put(STORE_NAME, {
      id,
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      blob: file,
      savedAt: Date.now(),
    }),
  );

  return id;
}

// Get all saved files

export async function getAllFiles() {
  const db = await dbPromise;
  const records = await db.getAll(STORE_NAME);

  const now = Date.now();
  const EXPIRY_TIME = 24 * 60 * 60 * 1000;

  const validFiles = [];

  for (const record of records) {
    const isExpired = now - record.savedAt > EXPIRY_TIME;

    if (isExpired) {
      await db.delete(STORE_NAME, record.id);
      continue;
    }

    const file = new File([record.blob], record.name, {
      type: record.type,
      lastModified: record.lastModified,
    });

    file.id = record.id;

    validFiles.push(file);
  }

  return validFiles;
}

// Delete one file
export async function deleteFile(id) {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
}

// Delete all files
export async function clearAllFiles() {
  const db = await dbPromise;
  await db.clear(STORE_NAME);
}
