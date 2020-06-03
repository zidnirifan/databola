document.addEventListener("DOMContentLoaded", () => standings());
document
  .querySelector(".standings")
  .addEventListener("click", () => standings());
document.querySelector(".match").addEventListener("click", () => match());

// Standings

const standings = () => {
  fetch("https://api.football-data.org/v2/competitions/2001/standings", {
    headers: {
      "X-Auth-Token": "dc6ecbe5da084040b9bd5d42e6eb0a42",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const standingsItem = response.standings[0].table;
      let card = "";
      standingsItem.forEach(function (item) {
        card += resultsStandings(item);
      });
      const standingsList = document.querySelector(".standings-list");
      standingsList.innerHTML = card;
    });
};

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

// Match

const match = () => {
  fetch("https://api.football-data.org/v2/competitions/2021/matches", {
    headers: {
      "X-Auth-Token": "dc6ecbe5da084040b9bd5d42e6eb0a42",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const standingsItem = response.matches;
      let card = "";
      standingsItem.forEach(function (item) {
        card += resultsMatch(item);
      });
      const standingsList = document.querySelector(".match-list");
      standingsList.innerHTML = card;
      console.log(match);
    });
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
