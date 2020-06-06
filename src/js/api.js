const baseUrl = "https://api.football-data.org/v2";

const requestPage = (parentSelector, selector, urlKey, results, id) => {
  document.querySelector("#body-content").innerHTML = parentSelector;

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
        getTeamDetails(".team-item");
      }
    });
};

const getTeamDetails = (selector) => {
  const button = document.querySelectorAll(selector);
  button.forEach((btn) => {
    btn.addEventListener("click", function () {
      const idTeam = this.dataset.idteam;
      fetch(`https://api.football-data.org/v2/teams/${idTeam}`, {
        headers: {
          "X-Auth-Token": "dc6ecbe5da084040b9bd5d42e6eb0a42",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const teamDetails = `<div class="row">
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
