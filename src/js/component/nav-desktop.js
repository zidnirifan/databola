class navDesktop extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav class="green darken-3 hide-on-med-and-down">
        <div class="container">
          <a href="#standings" class="brand-logo">Data Bola</a>
          <ul class="nav-desktop right">
            <li>
              <a class="dropdown-trigger" data-target="dropdown1"
                ><span class="dropdown-competition">Premiere League</span
                ><i class="material-icons right">arrow_drop_down</i></a
              >
            </li>
            <li>
              <a href="#standings" title="Standings" class="active-desktop"
                ><i class="menu-desktop standings material-icons">equalizer</i></a
              >
            </li>
            <li>
              <a href="#match" title="Match"
                ><i class="menu-desktop match material-icons">event</i></a
              >
            </li>
            <li>
              <a href="#teams" title="Teams"
                ><i class="menu-desktop teams material-icons">subject</i></a
              >
            </li>
            <li>
              <a href="#saved" title="Saved"
                ><i class="menu-desktop saved material-icons">save</i></a
              >
            </li>
          </ul>
        </div>
      </nav>
      <!-- Dropdown Structure -->
      <ul id="dropdown1" class="dropdown-content">
        <li><a data-idCompetition="PL">Premiere League</a></li>
        <li><a data-idCompetition="SA">Serie A</a></li>
        <li><a data-idCompetition="CL">Champions League</a></li>
        <li><a data-idCompetition="PD">Primera Division</a></li>
        <li><a data-idCompetition="FL1">France Ligue 1</a></li>
      </ul>`;
  }
}

customElements.define("nav-desktop", navDesktop);
