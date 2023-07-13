class User {
  constructor(object) {
    this.shipActivity = object.active;
    this.shipName = object.name;
    this.shipHomeport = object.home_port;
    this.shipYearbuild = object.year_built;
    this.image = object.image;
  }
  printAllToConsole() {
    console.log(
      this.shipActivity,
      this.shipHomeport,
      this.shipName,
      this.shipYearbuild,
      this.image
    );
  }
}
export default User;
