import { requestPage, getSavedTeams } from "./api.js";

const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));

    M.Sidenav.init(document.querySelectorAll(".sidenav"));
    const instance = M.Sidenav.getInstance(document.querySelector(".sidenav"));
    document.querySelector(".sidenav").addEventListener("click", () => {
      instance.close();
    });
  });

  if (page === "") {
    document.addEventListener("DOMContentLoaded", () => standings.request());
  } else if (page === "standings") {
    document.addEventListener("DOMContentLoaded", () => standings.request());
  } else if (page === "match") {
    document.addEventListener("DOMContentLoaded", () => {
      match.request();
      navActive("match");
    });
  } else if (page === "teams") {
    document.addEventListener("DOMContentLoaded", () => {
      teams.request();
      navActive("teams");
    });
  } else if (page === "saved") {
    document.addEventListener("DOMContentLoaded", () => {
      getSavedTeams(teams.results);
      navActive("saved");
      topbarSaved();
    });
  }
  document
    .querySelector(".brand-logo")
    .addEventListener("click", () => standings.request());
  document.querySelectorAll(".standings").forEach((elm) => {
    elm.addEventListener("click", () => {
      standings.request();
      navActive("standings");
      topbar();
    });
  });
  document.querySelectorAll(".match").forEach((elm) => {
    elm.addEventListener("click", () => {
      match.request();
      navActive("match");
      topbar();
    });
  });
  document.querySelectorAll(".teams").forEach((elm) => {
    elm.addEventListener("click", () => {
      teams.request();
      navActive("teams");
      topbar();
    });
  });
  document.querySelectorAll(".saved").forEach((elm) => {
    elm.addEventListener("click", () => {
      getSavedTeams(teams.results);
      navActive("saved");
      topbarSaved();
    });
  });

  document.querySelectorAll("#dropdown1 a, .sidenav a").forEach((elm) => {
    elm.addEventListener("click", function () {
      document.querySelector(
        ".dropdown-competition"
      ).innerHTML = this.innerHTML;
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
};

const topbarSaved = () => {
  document.querySelector("#top-bar-mobile .brand-logo").innerHTML =
    "Favorite Teams";
  document.querySelector(".sidenav-trigger").classList.add("hide");
};

const topbar = () => {
  document.querySelector(
    "#top-bar-mobile .brand-logo"
  ).innerHTML = document.querySelector(".dropdown-competition").innerHTML;
  document.querySelector(".sidenav-trigger").classList.remove("hide");
};

const navActive = (pageName) => {
  document.querySelector(".active").classList.remove("active");
  document.querySelector(`.menu-mobile.${pageName}`).classList.add("active");
  document.querySelector(".active-desktop").classList.remove("active-desktop");
  document
    .querySelector(`.menu-desktop.${pageName}`)
    .parentElement.classList.add("active-desktop");
};

const page = window.location.hash.substr(1);

let competitionId = "PL";

const standings = {
  results: (results) => {
    return `<tr class="standing-item" data-idTeam="${results.team.id}">
      <td>${results.position}</td>
      <td class="team-img">
        <img
        src="${results.team.crestUrl.replace(/^http:\/\//i, "https://")}"
        alt="${results.team.name} logo" 
        onerror="this.src = '/assets/images/image-error.svg'"
        />
      </td>
      <td class="team-title">${results.team.name}</td>
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
    return `<match-item 
            homeTeam="${results.homeTeam.name}" 
            scoreHome="${results.score.fullTime.homeTeam || "-"}" 
            scoreAway="${results.score.fullTime.awayTeam || "-"}" 
            date="${results.utcDate}" 
            awayTeam="${results.awayTeam.name}">
            </match-item>`;
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
    return `<team-item 
            src="${results.crestUrl}" 
            id="${results.id}" 
            name="${results.name}">
            </team-item>`;
  },
  page: `<div class="row team-list"><div>`,
  request() {
    requestPage(this.page, ".team-list", "teams", this.results, competitionId);
  },
};

export default main;
