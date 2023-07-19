// if (module.hot) module.hot.accept();
import Ship from "./user";
//selecting elements
const navBarLinks = document.querySelectorAll(".nav-bar__list li");
const sections = document.querySelectorAll(".content section");
const shipsSection = document.querySelector(".ships");
const favoritsSection = document.querySelector(".favorits");
////////////////////////////////////////////////////////////////
navBarLinks.forEach((link) =>
  link.addEventListener("click", function () {
    navBarLinks.forEach((el) => el.classList.remove("nav-bar__list__selected"));
    this.classList.add("nav-bar__list__selected");
    sections.forEach((section) => section.classList.add("hide"));
    document
      .querySelector(`.content .${this.dataset.section}`)
      .classList.remove("hide");
  })
);
const fetchContent = async function () {
  const res = await fetch("https://spacex-production.up.railway.app/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
query Query {
  ships {
    abs
    active
    attempted_landings
    class
    course_deg
    home_port
    id
    image
    imo
    missions {
      flight
      name
    }
    mmsi
    model
    name
    position {
      latitude
      longitude
    }
    roles
    speed_kn
    status
    successful_landings
    type
    url
    weight_kg
    weight_lbs
    year_built
  }
}

      `,
    }),
  });

  return res.json();
};
fetchContent().then((res) => {
  const data = res.data.ships;
  data.forEach((el) => {
    const ship = new Ship(el, data);
    ship.createCard(shipsSection);
    ship.attachFavoriteListeners();
  });
  updateFavorite(data);
});

const updateFavorite = function (arrayOfShips) {
  favoritsSection.innerHTML = "";
  const allFavorites = JSON.parse(localStorage.getItem("favorites"));
  allFavorites.forEach((id1) => {
    const matchShip = new Ship(arrayOfShips.find((ship) => ship.id === id1));
    console.log(matchShip);
    matchShip.createCard(favoritsSection);
    matchShip.attachFavoriteListeners();
  });
};
export { updateFavorite };

const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close");
const modalOverlay = document.querySelector(".overlay");
function openModal(object) {
  const modalImg = document.getElementById("modal__img");
  const modalActive = document.getElementById("modal__active");
  const modalWeight = document.getElementById("modal__weight");
  const modalSpeed = document.getElementById("modal__speed");
  const modalModel = document.getElementById("modal__model");
  const modalClass = document.getElementById("modal__class");
  const modalYearbuilt = document.getElementById("modal__year-built");
  function active() {
    return object.active
      ? `active : <i class="fa-solid fa-check"></i>`
      : 'active : <i class="fa-solid fa-check"></i>';
  }
  console.log(object);
  modalImg.src = object.image || "not specified";
  modalActive.innerHTML = active() || "not specified";
  modalWeight.innerHTML = object.weight_kg || "not specified";
  modalSpeed.innerHTML = object.speed_kn || "not specified";
  modalModel.innerHTML = object.model || "not specified";
  modalClass.innerHTML = object.class || "not specified";
  modalYearbuilt.innerHTML = object.year_built || "not specified";
  modal.classList.remove("hide");
}
function closeModal() {
  modal.classList.add("hide");
}
modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
export { openModal };
