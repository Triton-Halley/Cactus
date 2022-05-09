import { Workout } from "./Workout.js";
let map;
const RegisterForm = document.querySelector(".Register-Workout");
const WorkoutList = document.querySelector(".WorkList");
let currentWorkout;
let destinationCoords = [];
export const ListofKeys = [];
export class App {
  constructor() {}

  Loadmap(coords) {
    this.currentLoc = coords;
    //this.getStreetName(this.currentLoc);

    map = L.map("map", { zoomControl: false }).setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();
    new L.Control.Zoom({ position: "topright" }).addTo(map);
    // L.Control.Zoom()

    map.on("click", function (e) {
      RegisterForm.classList.remove("hidden");
      const { lat, lng } = e.latlng;
      destinationCoords = [lat, lng];
      addNewMarker(e, map);
    });
  }

  async AddNewWorkout(title) {
    currentWorkout = new Workout(
      title,
      await this.getStreetName(this.currentLoc),
      await this.getStreetName(destinationCoords)
    );
    //this.AddToLoacalStorage(titleInput.value);
    //displayLocation(CurrentLoaction[0], CurrentLoaction[1]);
  }
  AddMarker(coords) {
    //todo
  }
  displayWorkout(key) {
    const Workout = JSON.parse(localStorage.getItem(key));
    console.log(Workout);
    const html = `        
    <div class="Workout">
      <div class="title-section">
        <p class="title">
          <img
            class="title-logo"
            src="/Images/Tag-Icon-480.png"
            alt="Title logo"
          />
          ${Workout.Title}
        </p>
      </div>    
        <div class="title-section">

          <p class="title">
          <img
            class="title-logo"
            src="/Images/Start-Icon-500.png"
            alt="Start Icon"
          />
          ${Workout.Beginning}</p>
        </div>
        <div class="title-section">
          <p class="title">
          <img
          class="title-logo"
          src="/Images/finish-flag-Icon-480.png"
          alt="End Icon"
        />
          ${Workout.Destination}</p>
        </div>
  </div>`;
    WorkoutList.insertAdjacentHTML("beforeend", html);
  }
  AddToLoacalStorage(title) {
    ListofKeys.push(title);
    localStorage.setItem("listofkeys", ListofKeys);
    localStorage.setItem(title, JSON.stringify(currentWorkout));
  }

  async getStreetName(loc) {
    const result = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/reverse?key=MBvcpGm7kcRhwzmQ9kRCkWDokIZgmpxG&location=${loc.at(
        0
      )},${loc.at(1)}&includeRoadMetadata=true&includeNearestIntersection=true`
    );
    const resultJSon = await result.json();
    const streetName = resultJSon.results.at(0).locations.at(0).street;
    return streetName;
  }
}

const addNewMarker = (e, _map) => {
  const { lat, lng } = e.latlng;
  L.marker([lat, lng]).addTo(_map);
};
