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

standings();
