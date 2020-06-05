const baseUrl = "https://api.football-data.org/v2";

const requestPage = (parentSelector, selector, urlKey, results, id) => {
  document.querySelector("#body-content").innerHTML = parentSelector;

  if ("caches" in window) {
    caches.match(`${baseUrl}/competitions/${id}/${urlKey}`).then((response) => {
      if (response) {
        response.json().then((response) => {
          let items = response;
          if (urlKey === "matches") {
            items = response.matches;
          } else if (urlKey === "standings") {
            items = response.standings[0].table;
          } else if (urlKey === "teams") {
            items = response.teams;
          }
          let card = "";
          items.forEach((e) => {
            card += results(e);
          });
          const itemList = document.querySelector(selector);
          itemList.innerHTML = card;
        });
      }
    });
  }

  fetch(`${baseUrl}/competitions/${id}/${urlKey}`, {
    headers: {
      "X-Auth-Token": "dc6ecbe5da084040b9bd5d42e6eb0a42",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      let items = response;
      if (urlKey === "matches") {
        items = response.matches;
      } else if (urlKey === "standings") {
        items = response.standings[0].table;
      } else if (urlKey === "teams") {
        items = response.teams;
      }
      let card = "";
      items.forEach(function (e) {
        card += results(e);
      });
      const itemList = document.querySelector(selector);
      itemList.innerHTML = card;
    });
};
