var dbPromised = idb.open("data-bola", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  articlesObjectStore.createIndex("post_title", "post_title", {
    unique: false,
  });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di simpan.");
    });
}
