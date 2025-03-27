// class AgedPerson {
//   printAge() {
//     console.log(`Age is ${this.age}`);
//   }
// }

// class Person extends AgedPerson {
//   name = 'Sriram';

//   constructor() {
//     super();
//     this.age = 24;
//   }

//   greet() {
//     console.log(`${this.name} is ${this.age} years old`);
//   }
// }

function Person() {
  this.name = 'Sriram';
  this.age = 24;
  this.greet = function () {
    console.log(`${this.name} is ${this.age} years old`);
  };
}

Person.prototype.printAge = function () {
  console.log(`Age is ${this.age}`);
};

const firstPerson = new Person();
firstPerson.printAge();
console.log(Person.prototype);
console.log(firstPerson.__proto__);
console.log(Person.prototype === firstPerson.__proto__);