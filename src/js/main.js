document.addEventListener("DOMContentLoaded", function () {
  M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));

  M.Sidenav.init(document.querySelectorAll(".sidenav"));
  const instance = M.Sidenav.getInstance(document.querySelector(".sidenav"));
  document.querySelector(".sidenav").addEventListener("click", () => {
    instance.close();
  });
});

document.querySelectorAll(".menu-mobile").forEach((e) => {
  e.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    e.classList.add("active");
  });
});

document.querySelectorAll(".menu-desktop").forEach((e) => {
  e.addEventListener("click", () => {
    document
      .querySelector(".active-desktop")
      .classList.remove("active-desktop");
    e.parentElement.classList.add("active-desktop");
  });
});

// document.querySelectorAll(".nav-desktop li i, #nav-mobile i").forEach((elm) => {
//   elm.addEventListener("click", (event) => {
//     page = event.target.parentElement.getAttribute("href").substr(1);
//     loadPage(page);
//   });
// });

// let page = window.location.hash.substr(1);
// if (page === "") page = "standings";
// loadPage(page);

// function loadPage(page) {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState === 4) {
//       const content = document.querySelector("#body-content");
//       if (this.status === 200) {
//         content.innerHTML = xhttp.responseText;
//       } else if (this.status === 404) {
//         content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
//       } else {
//         content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
//       }
//     }
//   };
//   xhttp.open("GET", `pages/${page}.html`, true);
//   xhttp.send();
// }
