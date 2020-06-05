const page = window.location.hash.substr(1);

if (page === "") {
  document.addEventListener("DOMContentLoaded", () => standings.request());
} else if (page === "standings") {
  document.addEventListener("DOMContentLoaded", () => standings.request());
} else if (page === "match") {
  document.addEventListener("DOMContentLoaded", () => match.request());
} else if (page === "teams") {
  document.addEventListener("DOMContentLoaded", () => teams.request());
}
document
  .querySelector(".brand-logo")
  .addEventListener("click", () => standings.request());
document.querySelectorAll(".standings").forEach((elm) => {
  elm.addEventListener("click", () => standings.request());
});
document.querySelectorAll(".match").forEach((elm) => {
  elm.addEventListener("click", () => match.request());
});
document.querySelectorAll(".teams").forEach((elm) => {
  elm.addEventListener("click", () => teams.request());
});

document.querySelectorAll("#dropdown1 a, .sidenav a").forEach(function (elm) {
  elm.addEventListener("click", function () {
    document.querySelector(".dropdown-competition").innerHTML = this.innerHTML;
    document.querySelector(
      "#top-bar-mobile .brand-logo"
    ).innerHTML = this.innerHTML;
    competitionId = this.dataset.idcompetition;
    const page = window.location.hash.substr(1);
    if (page === "") {
      standings.request();
    } else if (page === "standings") {
      standings.request();
    } else if (page === "match") {
      match.request();
    } else if (page === "teams") {
      teams.request();
    }
  });
});

let competitionId = "PL";

const standings = {
  results: (results) => {
    return `<tr class="standing-item">
      <td>${results.position}</td>
      <td>
        <img
        src="${results.team.crestUrl.replace(/^http:\/\//i, "https://")}"
        alt="${results.team.name} logo"
        />
        </td>
        <td>${results.team.name}</td>
        <td>${results.playedGames}</td>
      <td>${results.won}</td>
      <td>${results.lost}</td>
      <td>${results.points}</td>
      </tr>`;
  },
  page: `<table id="standing-table">
      <thead>
        <tr>
          <th>#</th>
          <th colspan="2">Club</th>
          <th>M</th>
          <th class="green-text text-darken-2">W</th>
          <th class="red-text text-darken-2">L</th>
          <th class="light-blue-text text-darken-3">Pts</th>
        </tr>
      </thead>
      <tbody class="standings-list"></tbody>
    </table>`,
  request() {
    requestPage(
      this.page,
      ".standings-list",
      "standings",
      this.results,
      competitionId
    );
  },
};

const match = {
  results: (results) => {
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
  },
  page: `<div class="row match-list"></div>`,
  request() {
    requestPage(
      this.page,
      ".match-list",
      "matches",
      this.results,
      competitionId
    );
  },
};

const teams = {
  results: (results) => {
    return `<div class="team-item col l2 m3 s4">
            <div class="team-image center-align">
              <img
                src="${results.crestUrl.replace(/^http:\/\//i, "https://")}"
                alt="${results.name} logo"
              />
            </div>
            <h6 class="center-align">${results.name}</h6>
          </div>`;
  },
  page: `<div class="row team-list"><div>`,
  request() {
    requestPage(this.page, ".team-list", "teams", this.results, competitionId);
  },
};

const requestPage = (parentSelector, selector, urlKey, results, id) => {
  document.querySelector("#body-content").innerHTML = parentSelector;

  fetch(`https://api.football-data.org/v2/competitions/${id}/${urlKey}`, {
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
      const standingsList = document.querySelector(selector);
      standingsList.innerHTML = card;
    });
};
