class TopbarMobile extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav id="top-bar-mobile" class="hide-on-large-only green darken-3">
        <div class="nav-wrapper container">
          <a data-target="mobile-demo" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <a class="brand-logo center">Premiere League</a>
        </div>
      </nav>
  
      <ul class="sidenav" id="mobile-demo">
        <li><a data-idCompetition="PL">Premiere League</a></li>
        <li><a data-idCompetition="SA">Serie A</a></li>
        <li><a data-idCompetition="CL">Champions League</a></li>
        <li><a data-idCompetition="PD">Primera Division</a></li>
        <li><a data-idCompetition="FL1">France Ligue 1</a></li>
      </ul>`;
  }
}

customElements.define("topbar-mobile", TopbarMobile);
