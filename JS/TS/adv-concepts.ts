// Intersection Types

type AdminProto = {
  userName: string;
  privilages: string[];
};

type EmployeeProto = {
  userName: string;
  tasks: string[];
  joinedDate: Date;
};

const typicalEmployee: AdminProto & EmployeeProto = {
  userName: "Sriram",
  tasks: ["Eat", "Code", "Dont sleep"],
  joinedDate: new Date(),
  privilages: ["Open Office"],
};

let anotherEmployee: AdminProto & EmployeeProto;

type combinable = string | boolean;
type numeric = number | boolean;

let generic: combinable & numeric;

type addVariants = string | number;

function addProMax(a: addVariants, b: addVariants) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// Type Guards(used when using union types)

class Truck {
  drive() {
    console.log("Truck driving");
  }

  loadCargo() {
    console.log("Loading cargo");
  }
}

class Car {
  drive() {
    console.log("Car driving");
  }
}

type Vehicle = Truck | Car;

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ('loadCargo' in vehicle) {
  //     vehicle.loadCargo();
  // }
  if (vehicle instanceof Truck) {
    vehicle.loadCargo();
  }
}

const truck = new Truck();
const car = new Car();

useVehicle(truck);

// Discriminated Unions

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  groundSpeed: number;
}

type Animal = Bird | Horse;

function setSpeed(animal: Animal) {
  let currentSpeed;
  switch (animal.type) {
    case "bird":
      currentSpeed = 1000;
      break;
    case "horse":
      currentSpeed = 1000;
      break;
  }
  console.log("Current speed " + currentSpeed);
}

setSpeed({
  type: "bird",
  flyingSpeed: 90,
});

const inputElement = document.getElementById("user-input")! as HTMLInputElement;

inputElement.value = "Hello";

// Index properties

interface errorProto {
  _id: string;
  // count: number; // can't give value type as any other type(number) when using indexed type
  [prop: string]: string;
}

const errorContainer: errorProto = {
  _id: "3",
  email: "Please enter a valid email",
  password: "password is a required field",
  3: "Third property key to look for",
};

// Function overloads

type combination = string | number;

function additionProMax(a: string, b: string): string;
function additionProMax(a: combination, b: combination) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const addedStr = additionProMax("Vijay", " Kumar");
addedStr.split(""); // Split fn is not allowed by TS as it is not sure our result is string
// In this case overloads

// Optional chaining

const backendData = {
  _id: 2,
  job: {
    description: "Software Engineer works as a Test QA",
    title: "Software Engineer",
    exp: 2,
  },
};

console.log(backendData?.job?.exp);

// Nullish coalesing

let userInput = "";

const copiedValue = userInput ?? "DEFAULT"; // Will return the fallback if value is really null/undefined

console.log("User entered value is " + copiedValue);
