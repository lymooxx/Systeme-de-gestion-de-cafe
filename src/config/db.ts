import localforage from "localforage";

// 1. Configuration de localForage pour IndexedDB
const db = localforage.createInstance({
  name: "CafeManagementDB",       // Nom de la base de données
  storeName: "cafe_store",        // Nom du store IndexedDB
  driver: [
    localforage.INDEXEDDB,        // Priorité à IndexedDB
    localforage.WEBSQL,           // Fallback pour anciens navigateurs
    localforage.LOCALSTORAGE      // Dernier recours
  ],
  version: 1.0,
  description: "Stockage des données du café"
});

// 2. Vérification de la connexion
db.ready()
  .then(() => console.log("IndexedDB est prêt"))
  .catch((err) => console.error("Erreur IndexedDB:", err));

// 3. Exportez l'instance configurée
export { db };