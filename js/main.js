"use strict";

const MapSection = document.querySelector(".Section-1");
const coords = [];
// my coords
navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    coords.push(latitude);
    coords.push(longitude);
    loadMap();
  },
  function () {
    console.log(`I don't have Access  `);
  }
);

const loadMap = function () {
  const map = L.map("map", { zoomControl: false }).setView(coords, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords)
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();

  new L.Control.Zoom({ position: "topright" }).addTo(map);
  // L.Control.Zoom()
};
