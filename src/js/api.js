const baseUrl = "https://api.football-data.org/v2";

const requestPage = (parentSelector, selector, urlKey, results, id) => {
  document.querySelector("#body-content").innerHTML = parentSelector;
  document.querySelector(".fixed-action-btn").innerHTML = "";

  if ("caches" in window) {
    caches
      .match(`${baseUrl}/competitions/${id}/${urlKey}`)
      .then(function (response) {
        if (response) {
          response.json().then(function (response) {
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
              const button = document.querySelectorAll(".team-item");
              button.forEach((btn) => {
                btn.addEventListener("click", function () {
                  document.querySelector(
                    ".fixed-action-btn"
                  ).innerHTML = `<a class="btn-floating btn-large red" id="save">
                  <i class="large material-icons">save</i>
                  </a>`;
                  const item = getTeamDetails(this);
                  const save = document.getElementById("save");
                  save.addEventListener("click", function () {
                    item.then(function (team) {
                      saveForLater(team);
                    });
                  });
                });
              });
            }
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

      if (urlKey === "teams") {
        const button = document.querySelectorAll(".team-item");
        button.forEach((btn) => {
          btn.addEventListener("click", function () {
            document.querySelector(
              ".fixed-action-btn"
            ).innerHTML = `<a class="btn-floating btn-large red" id="save">
            <i class="large material-icons">save</i>
            </a>`;
            const item = getTeamDetails(this);
            const save = document.getElementById("save");
            save.addEventListener("click", function () {
              item.then(function (team) {
                saveForLater(team);
              });
            });
          });
        });
      }
    });
};

const getTeamDetails = (btn) => {
  document.querySelector("#body-content").innerHTML = "";
  return new Promise(function (resolve, reject) {
    const idTeam = btn.dataset.idteam;
    window.location.hash += `/${idTeam}`;

    if ("caches" in window) {
      caches.match(`${baseUrl}/teams/${idTeam}`).then(function (response) {
        if (response) {
          response.json().then(function (response) {
            const teamDetails = details(response);

            document.querySelector("#body-content").innerHTML = teamDetails;

            let card = "";
            response.squad.forEach((player) => {
              card += `<tr>
                      <td>${player.name || "-"}</td>
                      <td>${player.position || "-"}</td>
                      <td>${player.nationality || "-"}</td>
                    </tr>`;
            });
            document.querySelector(".player-list").innerHTML = card;
            resolve(response);
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
        const teamDetails = details(response);

        document.querySelector("#body-content").innerHTML = teamDetails;

        let card = "";
        response.squad.forEach((player) => {
          card += `<tr>
                  <td>${player.name || "-"}</td>
                  <td>${player.position || "-"}</td>
                  <td>${player.nationality || "-"}</td>
                </tr>`;
        });
        document.querySelector(".player-list").innerHTML = card;
        resolve(response);
      });
  });
};

const details = (response) => {
  return `<div class="row">
            <div class="col s12">
              <div class="card no-shadow row">
                <div class="card-image col s12 m5">
                  <img
                    src="${response.crestUrl || "-"}" 
                    alt="${response.name || "-"}"
                  />
                </div>
                <div class="card-content no-padding col s12 m7">
                  <h4>
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

function getSavedTeams() {
  document.querySelector(
    "#body-content"
  ).innerHTML = `<div class="row team-list"><div>`;
  document.querySelector(".fixed-action-btn").innerHTML = "";
  getAll().then(function (response) {
    const items = response;
    let card = "";
    items.forEach(function (response) {
      card += `<div class="team-item col l2 m3 s4" data-idTeam="${response.id}">
      <div class="team-image center-align">
        <img
          src="${response.crestUrl}"
          alt="${response.name} logo"
        />
      </div>
      <h6 class="center-align">${response.name}</h6>
    </div>`;
    });
    const itemList = document.querySelector(".team-list");
    itemList.innerHTML = card;
    getSavedTeamsDetails(".team-item");
  });
}

const getSavedTeamsDetails = (selector) => {
  document.querySelectorAll(selector).forEach((e) => {
    e.addEventListener("click", function () {
      const idTeam = Number(this.dataset.idteam);
      getById(idTeam).then(function (response) {
        const teamDetails = details(response);

        document.querySelector("#body-content").innerHTML = teamDetails;

        let card = "";
        response.squad.forEach((player) => {
          card += `<tr>
                      <td>${player.name || "-"}</td>
                      <td>${player.position || "-"}</td>
                      <td>${player.nationality || "-"}</td>
                    </tr>`;
        });
        document.querySelector(".player-list").innerHTML = card;
      });
    });
  });
};
