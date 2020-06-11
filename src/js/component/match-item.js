class MatchItem extends HTMLElement {
  connectedCallback() {
    this.homeTeam = this.getAttribute("homeTeam");
    this.scoreHome = this.getAttribute("scoreHome");
    this.scoreAway = this.getAttribute("scoreAway");
    this.date = this.getAttribute("date");
    this.awayTeam = this.getAttribute("awayTeam");

    this.innerHTML = `<div class="match-container col l6 s12 row">
        <div class="match-item z-depth-1 col s12">
          <div class="col s4">${this.homeTeam}</div>
          <div class="col s4 center-align">
            <div>${this.scoreHome} VS ${this.scoreAway}
        </div>
            <div class="date grey-text text-darken-2">${this.date.substr(
              0,
              10
            )}</div>
          </div>
          <div class="col s4 right-align">${this.awayTeam}</div>
        </div>
      </div>`;
  }
}

customElements.define("match-item", MatchItem);
