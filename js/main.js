"use strict";

const MapSection = document.querySelector(".Section-1");
const WorkoutList = document.querySelector(".Section-2");
const RegisterForm = document.querySelector(".Register-Workout");
const coords = [35.782706207126395, 51.43842669079781];
const btnWorkOutSubmit = document.querySelector(".submit-Register-Workout");
const titleInput = document.querySelector(".title-input");
const textarea = document.querySelector(".Description-txtarea");
let destinationCoords = [];
let CurrentLoaction = [];
// my coords
navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    CurrentLoaction = [latitude, longitude];
    // console.log(latitude, longitude);
    // coords.push(latitude);
    // coords.push(longitude);
    // loadMap();
  },
  function () {
    console.log(`I don't have Access  `);
  }
);

class App {
  constructor() {}

  Loadmap() {
    const map = L.map("map", { zoomControl: false }).setView(coords, 13);

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
      addNewWorkout(e, map);
    });
  }
  AddNewWorkout() {
    this.newWorkout = new Workout(
      titleInput.value,
      textarea.value,
      CurrentLoaction,
      destinationCoords
    );
  }
  AddMarker(coords) {
    //todo
  }
  displayWorkout() {
    const html = `        <div class="Workout">
    <div class="title-section">
      <p class="title">
        <img
          class="title-logo"
          src="/Images/Tag-Icon-480.png"
          alt="Title logo"
        />
        ${this.newWorkout.Title}
      </p>
    </div>
    <div class="decription">
    <p class="description-txt">
        <img class="decription-logo"
        src="/Images/Description_Icon-500px.png"
        alt="Description logo"/>
        ${this.newWorkout.Description}
      </p>
    </div>
    
    <div class="loc">
      <!-- Start Loction -->
      <div class="start">
        <img
          class="startIcon"
          src="/Images/Start-Icon-500.png"
          alt="Start Icon"
        />
        <p>Elahie</p>
      </div>
      <!-- End Loction -->
      <div class="end">
        <img
          class="endIcon"
          src="/Images/finish-flag-Icon-480.png"
          alt="End Icon"
        />
        <p>Jordan</p>
      </div>
    </div>
  </div>`;
    WorkoutList.insertAdjacentHTML("beforeend", html);
  }
  AddToLoacalStorage() {
    localStorage.setItem(titleInput.value, JSON.stringify(this.newWorkout));
  }
}
class Workout {
  id = idGenerator();
  /**
   *
   * @param {string} title
   * @param {string} description
   * @param {array[Lat,lng]} beginning
   * @param {array[Lat,Lng]} Destination
   */
  constructor(title, description, beginning, Destination) {
    this.Title = title;
    this.Description = description;
    this.Beginning = beginning;
    this.Destination = Destination;
  }

  //set to localStorage
  //todo

  //get from localStorage
  //todo
}

const idGenerator = function () {
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += Math.trunc(Math.random * 8) + 1;
  }
  return id;
};

const app = new App();

app.Loadmap();

const addNewWorkout = function (e, _map) {
  const { lat, lng } = e.latlng;
  L.marker([lat, lng]).addTo(_map);
};

btnWorkOutSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  app.AddNewWorkout();
  app.AddToLoacalStorage();
  app.displayWorkout();
  RegisterForm.classList.add("hidden");
  // localStorage.setItem(titleInput.value, JSON.stringify(newWorkout));
});

// const locName = function (cooders) {
//   let geocoder;
//   geocoder = new google.maps.Gepcoder();
// };
