// Constructor Function

function Person() {
  this.userName = 'Sriram';
  this.age = 23;
  this.greetUser = function () {
    console.log(`Hello ${this.userName}`);
  };
}

Person.prototype.printAge = function () {
  // extending more properties of Person constructor
  console.log(this.age);
};

const firstPerson = new Person();
console.log(firstPerson.__proto__ === Person.prototype); // true
console.dir(Person);
