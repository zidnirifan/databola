const page = window.location.hash.substr(1);

if (page === "") {
  document.addEventListener("DOMContentLoaded", () => standings());
} else if (page === "standings") {
  document.addEventListener("DOMContentLoaded", () => standings());
} else if (page === "match") {
  document.addEventListener("DOMContentLoaded", () => match());
}
document.querySelectorAll(".standings").forEach((elm) => {
  elm.addEventListener("click", () => standings());
});
document.querySelectorAll(".match").forEach((elm) => {
  elm.addEventListener("click", () => match());
});

const resultsStandings = (results) => {
  return `<tr class="standing-item">
      <td>${results.position}</td>
      <td>
        <img
        src="${results.team.crestUrl}"
        />
        </td>
        <td>${results.team.name}</td>
        <td>${results.playedGames}</td>
      <td>${results.won}</td>
      <td>${results.lost}</td>
      <td>${results.points}</td>
      </tr>`;
};

const resultsMatch = (results) => {
  return `<div class="match-container col l6 s12 row">
    <div class="match-item z-depth-1 col s12">
      <div class="col s4">${results.homeTeam.name}</div>
      <div class="col s4 center-align">
        <div>${results.score.fullTime.homeTeam || "-"} VS ${
    results.score.fullTime.awayTeam || "-"
  }
    </div>
        <div class="date grey-text text-darken-2">${results.utcDate.substr(
          0,
          10
        )}</div>
      </div>
      <div class="col s4 right-align">${results.awayTeam.name}</div>
    </div>
  </div>`;
};

const requestPage = (parentSelector, selector, urlKey, results) => {
  document.querySelector("#body-content").innerHTML = parentSelector;

  fetch(`https://api.football-data.org/v2/competitions/2021/${urlKey}`, {
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
      }
      let card = "";
      items.forEach(function (e) {
        card += results(e);
      });
      const standingsList = document.querySelector(selector);
      standingsList.innerHTML = card;
    });
};

const standingsPage = `<table id="standing-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th colspan="2">Club</th>
                      <th>M</th>
                      <th class="green-text text-darken-2">W</th>
                      <th class="red-text text-darken-2">L</th>
                      <th class="amber-text text-darken-3">Pts</th>
                    </tr>
                  </thead>
                  <tbody class="standings-list"></tbody>
                </table>`;

const matchPage = `<div class="row match-list"></div>`;
const standings = () =>
  requestPage(standingsPage, ".standings-list", "standings", resultsStandings);
const match = () =>
  requestPage(matchPage, ".match-list", "matches", resultsMatch);
