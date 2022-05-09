import { App, ListofKeys } from "./app.js";
import { Workout } from "./Workout.js";
const MapSection = document.querySelector(".Section-1");
const RegisterForm = document.querySelector(".Register-Workout");
const coords = [35.782706207126395, 51.43842669079781];
const btnWorkOutSubmit = document.querySelector(".submit-Register-Workout");
const titleInput = document.querySelector(".title-input");
const textarea = document.querySelector(".Description-txtarea");
const app = new App();

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
    app.Loadmap(CurrentLoaction);
  },
  function () {
    console.log(`I don't have Access  `);
  }
);
(function () {
  localStorage
    .getItem("listofkeys")
    .split(",")
    .forEach((key) => {
      app.displayWorkout(key);
    });
})();

btnWorkOutSubmit.addEventListener("click", async function (e) {
  e.preventDefault();
  await app.AddNewWorkout(titleInput.value);
  app.AddToLoacalStorage(titleInput.value);
  app.displayWorkout(titleInput.value);
  RegisterForm.classList.add("hidden");
  // localStorage.setItem(titleInput.value, JSON.stringify(newWorkout));
});

// const locName = function (cooders) {
//   let geocoder;
//   geocoder = new google.maps.Gepcoder();
// };

// function displayLocation(latitude, longitude) {
//   var geocoder;
//   geocoder = new google.maps.Geocoder();
//   var latlng = new google.maps.LatLng(latitude, longitude);

//   geocoder.geocode({ latLng: latlng }, function (results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       if (results[0]) {
//         var add = results[0].formatted_address;
//         var value = add.split(",");

//         count = value.length;
//         country = value[count - 1];
//         state = value[count - 2];
//         city = value[count - 3];
//         console.log(city);
//         // x.innerHTML = "city name is: " + city;
//       } else {
//         // x.innerHTML = "address not found";
//         console.log("address not found");
//       }
//     } else {
//       // x.innerHTML = "Geocoder failed due to: " + status;
//       console.log("Geocoder failed due to: " + status);
//     }
//   });
// }
