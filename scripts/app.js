if (module.hot) module.hot.accept();
import User from "./user";
//selecting elements
const navBarLinks = document.querySelectorAll(".nav-bar__list li");
const sections = document.querySelectorAll(".content section");
//ship class
class Ship {
  constructor(object) {}
}
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
  new User(res.data.ships[0]).printAllToConsole();
});
