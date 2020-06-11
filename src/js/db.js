import "../../lib/js/idb.js";

const dbPromised = idb.open("data-bola", 1, function (upgradeDb) {
  const articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  articlesObjectStore.createIndex("post_title", "post_title", {
    unique: false,
  });
});

const db = {
  saveForLater: (team) => {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        store.add(team);
        return tx.complete;
      })
      .then(function () {
        console.log("Team berhasil di simpan.");
        M.toast({ html: "Team Saved" });
      });
  },

  deleteSaved: (team) => {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        store.delete(team);
        return tx.complete;
      })
      .then(function () {
        console.log("Team berhasil dihapus");
        M.toast({ html: "Team Deleted" });
      });
  },

  getAll: () => {
    return new Promise(function (resolve, reject) {
      dbPromised
        .then(function (db) {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function (teams) {
          resolve(teams);
        });
    });
  },

  getById: (id) => {
    return new Promise(function (resolve, reject) {
      dbPromised
        .then(function (db) {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function (team) {
          resolve(team);
        });
    });
  },
};

export default db;
