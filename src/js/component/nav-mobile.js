class navMobile extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav
        id="nav-mobile"
        class="white no-shadow navbar-fixed hide-on-large-only"
      >
        <div class="container row">
          <div class="col s3 center-align">
            <a href="#standings" title="Standings"
              ><i class="menu-mobile standings material-icons active"
                >equalizer</i
              ></a
            >
          </div>
          <div class="col s3 center-align">
            <a href="#match" title="Match"
              ><i class="menu-mobile match material-icons">event</i></a
            >
          </div>
          <div class="col s3 center-align">
            <a href="#teams" title="Teams"
              ><i class="menu-mobile teams material-icons">subject</i></a
            >
          </div>
          <div class="col s3 center-align">
            <a href="#saved" title="Saved"
              ><i class="menu-mobile saved material-icons">favorite</i></a
            >
          </div>
        </div>
      </nav>`;
  }
}

customElements.define("nav-mobile", navMobile);
