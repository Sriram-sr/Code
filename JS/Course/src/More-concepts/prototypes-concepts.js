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

/**
 *  Classes are the syntactic sugar for the Constructor functions
 *
 */

function Person() {
  this.name = 'Sriram';
  this.age = 24;
  // this.greet = function () {
  //   console.log(`${this.name} is ${this.age} years old`);
  // };
}

Person.prototype.greet = function () {
  console.log(`${this.name} is ${this.age} years old`);
}; // This will be the same as creating the class above

Person.prototype.printAge = function () {
  console.log(`Age is ${this.age}`);
};

const firstPerson = new Person();
firstPerson.printAge();
console.log(Person.prototype);
console.log(firstPerson.__proto__);
console.log(Person.prototype === firstPerson.__proto__);

const secondPerson = new Person();
console.log(firstPerson.__proto__ === secondPerson.__proto__); // since all objects have same fallback object

const someArray = [1, 6, 8];
console.log(someArray.__proto__);
console.log(someArray.__proto__ === Array.prototype); // true

const course = {
  title: 'C programming',
  rating: 5
};

Object.setPrototypeOf(course, {
  ...Object.getPrototypeOf(course),
  printRating: function () {
    console.log(`Rating for the course is ${this.rating}`);
  }
});

course.printRating();
