class TeamDetails extends HTMLElement {
  connectedCallback() {
    this.id = this.getAttribute("id");
    this.src = this.getAttribute("src");
    this.name = this.getAttribute("name");
    this.website = this.getAttribute("website");
    this.tla = this.getAttribute("id");
    this.founded = this.getAttribute("founded");
    this.area = this.getAttribute("area");
    this.address = this.getAttribute("address");
    this.venue = this.getAttribute("venue");
    this.phone = this.getAttribute("phone");

    this.innerHTML = `<div class="row" id="team-details" 
                data-idTeam="${this.id}">
            <div class="col s12">
              <div class="card no-shadow row">
                <div class="card-image col s12 m5">
                  <img
                    src="${this.src.replace(/^http:\/\//i, "https://")}" 
                    alt="${this.name}" 
                    onerror="this.src = '/assets/images/image-error.svg'"
                  />
                </div>
                <div class="card-content no-padding col s12 m7">
                  <h4>
                    <i class="material-icons" id="save">favorite_border</i>
                    <a class="club-title black-text" href="${this.website}"
                      >${this.name} (${this.tla})</a
                    >
                  </h4>
                  <table class="team-info">
                    <tbody>
                      <tr>
                        <td>Founded :</td>
                        <td>${this.founded}</td>
                      </tr>
                      <tr>
                        <td>Nationality :</td>
                        <td>${this.area}</td>
                      </tr>
                      <tr>
                        <td>Address :</td>
                        <td>${this.address}</td>
                      </tr>
                      <tr>
                        <td>Venue :</td>
                        <td>${this.venue}</td>
                      </tr>
                      <tr>
                        <td>Phone :</td>
                        <td>${this.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col s12">
              <div class="card squads no-shadow">
                <h4>Squads</h4>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Pos</th>
                      <th>Nat</th>
                    </tr>
                  </thead>
                  <tbody class="player-list"></tbody>
                </table>
              </div>
            </div>
          </div>`;
  }
}

customElements.define("team-details", TeamDetails);
