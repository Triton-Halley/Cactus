export class Workout {
  id = idGenerator();

  constructor(title, beginning, Destination) {
    this.Title = title;
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
  return +id;
};
