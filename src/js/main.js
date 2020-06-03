document.addEventListener("DOMContentLoaded", function () {
  M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));

  M.Sidenav.init(document.querySelectorAll(".sidenav"));
});

document.querySelectorAll(".nav-desktop li i, #nav-mobile i").forEach((elm) => {
  elm.addEventListener("click", (event) => {
    page = event.target.parentElement.getAttribute("href").substr(1);
    loadPage(page);
  });
});

let page = window.location.hash.substr(1);
if (page === "") page = "standings";
loadPage(page);

function loadPage(page) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      const content = document.querySelector("#body-content");
      if (this.status === 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status === 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
      }
    }
  };
  xhttp.open("GET", `pages/${page}.html`, true);
  xhttp.send();
}

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
