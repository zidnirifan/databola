import "../../lib/js/idb.js";

const dbPromised = idb.open("data-bola", 1, (upgradeDb) => {
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
      .then((db) => {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        store.add(team);
        return tx.complete;
      })
      .then(() => {
        console.log("Team berhasil di simpan.");
        M.toast({ html: "Team added to favorite", displayLength: 700 });
      });
  },

  deleteSaved: (team) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        store.delete(team);
        return tx.complete;
      })
      .then(() => {
        console.log("Team berhasil dihapus");
        M.toast({ html: "Team Deleted from favorite", displayLength: 700 });
      });
  },

  getAll: () => {
    return new Promise((resolve) => {
      dbPromised
        .then((db) => {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.getAll();
        })
        .then((teams) => {
          resolve(teams);
        });
    });
  },

  getById: (id) => {
    return new Promise((resolve) => {
      dbPromised
        .then((db) => {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.get(id);
        })
        .then((team) => {
          resolve(team);
        });
    });
  },
};

export default db;
