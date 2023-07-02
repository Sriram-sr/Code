function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
  }

/*
class Person:
    def __init__(self, fn, ln, age, ec):
        self.fn = fn
        self.ln = ln
        self.age = age
        self.ec = ec

instance = Person("John", "Doe", 50, "blue")
*/

Person.prototype.newProperty = 'somevalue'

const myFather = new Person("John", "Doe", 50, "blue");
console.log(myFather.newProperty);
