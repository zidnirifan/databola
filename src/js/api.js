const baseUrl = "https://api.football-data.org/v2";

const requestPage = (parentSelector, selector, urlKey, results, id) => {
  document.querySelector("#body-content").innerHTML = parentSelector;
  document.querySelector(".fixed-action-btn").innerHTML = "";

  if ("caches" in window) {
    caches.match(`${baseUrl}/competitions/${id}/${urlKey}`).then((response) => {
      if (response) {
        response.json().then((response) => {
          afterRequest(response, urlKey, results, selector);
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
      afterRequest(response, urlKey, results, selector);
    });
};

const afterRequest = (response, urlKey, results, selector) => {
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

  if (urlKey === "teams") {
    document.querySelectorAll(".team-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        getTeamDetails(this);
      });
    });
  }
};

const getTeamDetails = (btn) => {
  document.querySelector("#body-content").innerHTML = "";
  const idTeam = btn.dataset.idteam;
  window.location.hash += `/${idTeam}`;

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
      "X-Auth-Token": "dc6ecbe5da084040b9bd5d42e6eb0a42",
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

  document.querySelector("#save").addEventListener("click", function () {
    saveForLater(response);
    this.innerHTML = "favorite";
    this.classList.add("red-text");
  });
};

function getSavedTeams(results) {
  document.querySelector(
    "#body-content"
  ).innerHTML = `<div class="row team-list"><div>`;
  document.querySelector(".fixed-action-btn").innerHTML = "";
  getAll().then(function (response) {
    const items = response;
    let card = "";
    items.forEach(function (response) {
      card += results(response);
    });
    const itemList = document.querySelector(".team-list");
    itemList.innerHTML = card;

    document.querySelectorAll(".team-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        getSavedTeamsDetails(this);
      });
    });
  });
}

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

const getSavedTeamsDetails = (selector) => {
  const idTeam = Number(selector.dataset.idteam);
  getById(idTeam).then(function (response) {
    const teamDetails = details(response);

    document.querySelector("#body-content").innerHTML = teamDetails;

    playerList(response);

    const save = document.querySelector("#save");
    save.innerHTML = "favorite";
    save.classList.add("red-text");
    save.addEventListener("click", () => {
      deleteSaved(idTeam);
      save.innerHTML = "favorite_border";
      save.classList.remove("red-text");
    });
  });
};

const details = (response) => {
  return `<div class="row" id="team-details" data-idTeam="${response.id}">
            <div class="col s12">
              <div class="card no-shadow row">
                <div class="card-image col s12 m5">
                  <img
                    src="${response.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}" 
                    alt="${response.name || "-"}"
                  />
                </div>
                <div class="card-content no-padding col s12 m7">
                  <h4>
                    <i class="material-icons" id="save">favorite_border</i>
                    <a class="club-title black-text" href="${
                      response.website || "-"
                    }"
                      >${response.name || "-"} (${response.tla || "-"})</a
                    >
                  </h4>
                  <table class="team-info">
                    <tbody>
                      <tr>
                        <td>Founded :</td>
                        <td>${response.founded || "-"}</td>
                      </tr>
                      <tr>
                        <td>Nationality :</td>
                        <td>${response.area.name || "-"}</td>
                      </tr>
                      <tr>
                        <td>Address :</td>
                        <td>${response.address || "-"}</td>
                      </tr>
                      <tr>
                        <td>Venue :</td>
                        <td>${response.venue || "-"}</td>
                      </tr>
                      <tr>
                        <td>Phone :</td>
                        <td>${response.phone || "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col s12">
              <div class="card squads no-shadow">
                <h4>Squads</h4>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Pos</th>
                      <th>Nat</th>
                    </tr>
                  </thead>
                  <tbody class="player-list"></tbody>
                </table>
              </div>
            </div>
          </div>`;
};
