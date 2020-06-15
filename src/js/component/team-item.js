class TeamItem extends HTMLElement {
  connectedCallback() {
    this.src = this.getAttribute("src");
    this.id = this.getAttribute("id");
    this.name = this.getAttribute("name");

    this.innerHTML = `<div class="team-item col l2 m3 s4" 
                data-idTeam="${this.id}">
              <div class="team-image center-align">
                <img
                  src="${this.src.replace(/^http:\/\//i, "https://")}"
                  alt="${this.name} logo" 
                  onerror="this.src = '/assets/images/image-error.svg'"
                />
              </div>
              <h6 class="center-align team-title">${this.name}</h6>
            </div>`;
  }
}
customElements.define("team-item", TeamItem);
