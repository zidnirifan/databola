const dbPromised = idb.open("data-bola", 1, function (upgradeDb) {
  const articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  articlesObjectStore.createIndex("post_title", "post_title", {
    unique: false,
  });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di simpan.");
    });
}

function getAll() {
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
}

function getById(id) {
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
}
