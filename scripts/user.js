import { updateFavorite } from "./app";
class User {
  favorites =
    JSON.parse(localStorage.getItem("favorites")).filter(
      (el) => typeof el === "string"
    ) || [];
  constructor(object, shipsArray) {
    this.shipActivity = object.active;
    this.shipName = object.name;
    this.shipHomeport = object.home_port;
    this.shipYearbuild = object.year_built;
    this.image =
      object.image ||
      "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png";
    this.id = object.id;
    this.favoriteOrNot =
      this.favorites.indexOf(this.id) === -1
        ? '<i class="fa-regular fa-star"></i>'
        : '<i class="fa-solid fa-star"></i>';
    this.allShips = shipsArray;
  }
  createCard(place) {
    const tick = '<i class="fa-solid fa-check"></i>';
    const times = '<i class="fa-solid fa-xmark"></i>';
    const html = `
      <div class="ships__card">
        <div class="favorite-btn" data-id="${this.id}">${
      this.favoriteOrNot
    }</div>
        <img src="${this.image}" alt="ship image" />
        <div class="ship__card__info">
          <h3>${this.shipName}</h3>
          <p>active: ${this.shipActivity ? tick : times}</p>
          <p>${this.shipHomeport}</p>
          <p>${this.shipYearbuild}</p>
        </div>
      </div>
    `;
    place.insertAdjacentHTML("beforeend", html);
  }
  attachFavoriteListeners() {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    favoriteButtons.forEach((button) => {
      const id = button.dataset.id;
      button.addEventListener("click", () => this.favorite(id));
    });
  }
  favorite(id) {
    const idIndex = this.favorites.indexOf(id);
    if (idIndex === -1) {
      this.favorites.push(id);
      this.createCard(document.querySelector(".favorits"));
    } else {
      this.favorites.splice(idIndex, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
    updateFavorite(this.allShips);
  }
}

export default User;
