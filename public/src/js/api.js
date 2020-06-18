import db from "./db.js";

const baseUrl = "https://api.football-data.org/v2";
const apiKey = "dc6ecbe5da084040b9bd5d42e6eb0a42";

const requestPage = (container, selector, urlKey, results, id) => {
  // loading animation
  document.querySelector("#body-content").innerHTML = `<div class="progress">
      <div class="indeterminate"></div>
    </div>`;

  if ("caches" in window) {
    caches.match(`${baseUrl}/competitions/${id}/${urlKey}`).then((response) => {
      if (response) {
        response.json().then((response) => {
          afterRequest(response, urlKey, results, selector, container);
        });
      }
    });
  }

  fetch(`${baseUrl}/competitions/${id}/${urlKey}`, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      afterRequest(response, urlKey, results, selector, container);
    });
};

const afterRequest = (response, urlKey, results, selector, container) => {
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
  document.querySelector("#body-content").innerHTML = container;
  const itemList = document.querySelector(selector);
  itemList.innerHTML = card;

  if (urlKey === "teams") {
    document.querySelectorAll(".team-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        getTeamDetails(this);
      });
    });
  } else if (urlKey === "standings") {
    document
      .querySelectorAll(".standing-item .team-title, .standing-item .team-img")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          getTeamDetails(this.parentElement);
        });
      });
  }
};

const getTeamDetails = (btn) => {
  // loading animation
  document.querySelector("#body-content").innerHTML = `<div class="progress">
      <div class="indeterminate"></div>
    </div>`;
  const idTeam = btn.dataset.idteam;

  if ("caches" in window) {
    caches.match(`${baseUrl}/teams/${idTeam}`).then((response) => {
      if (response) {
        response.json().then((response) => {
          afterGetDetails(response);
        });
      }
    });
  }

  fetch(`${baseUrl}/teams/${idTeam}`, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      afterGetDetails(response);
    });
};

const afterGetDetails = (response) => {
  const teamDetails = details(response);

  document.querySelector("#body-content").innerHTML = teamDetails;

  playerList(response);

  // save button
  document.querySelector("#save").addEventListener("click", function () {
    db.saveForLater(response);
    this.innerHTML = "favorite";
    this.classList.add("red-text");
  });
};

function getSavedTeams(results) {
  document.querySelector(
    "#body-content"
  ).innerHTML = `<div class="row team-list"><div>`;
  db.getAll().then(function (response) {
    const items = response;
    let card = "";
    items.forEach(function (response) {
      card += results(response);
    });
    if (card === "") {
      card = "<h4 class='center-align'>No Favorite Team</h4>";
    }
    const itemList = document.querySelector(".team-list");
    itemList.innerHTML = card;

    document.querySelectorAll(".team-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        getSavedTeamsDetails(this);
      });
    });
  });
}

const getSavedTeamsDetails = (selector) => {
  const idTeam = Number(selector.dataset.idteam);
  db.getById(idTeam).then(function (response) {
    const teamDetails = details(response);

    document.querySelector("#body-content").innerHTML = teamDetails;

    playerList(response);

    // delete button
    const save = document.querySelector("#save");
    save.innerHTML = "favorite";
    save.classList.add("red-text");
    save.addEventListener("click", () => {
      db.deleteSaved(idTeam);
      save.innerHTML = "favorite_border";
      save.classList.remove("red-text");
    });
  });
};

const details = (response) => {
  return `<team-details 
          id="${response.id}" 
          src="${response.crestUrl}" 
          name="${response.name}" 
          website="${response.website || "-"}" 
          tla="${response.tla || "-"}" 
          founded="${response.founded || "-"}" 
          area="${response.area.name || "-"}" 
          address="${response.address || "-"}" 
          venue="${response.venue || "-"}" 
          phone="${response.phone || "-"}">
          </team-details>`;
};

const playerList = (response) => {
  let card = "";
  response.squad.forEach((player) => {
    card += `<tr>
                  <td>${player.shirtNumber || "-"}</td>
                  <td>${player.name || "-"}</td>
                  <td>${player.position || "-"}</td>
                  <td>${player.nationality || "-"}</td>
                </tr>`;
  });
  document.querySelector(".player-list").innerHTML = card;
};

export { requestPage, getSavedTeams };
