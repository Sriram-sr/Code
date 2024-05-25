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

// Recursion

const myself = {
  name: 'Sriram',
  friends: [
    {
      name: 'Vijay',
      friends: [
        {
          name: 'Ezhumalai'
        }
      ]
    },
    {
      name: 'Prakash',
      friends: [
        {
          name: 'Selveshwaran',
          friends: [
            {
              name: 'Mahesh'
            }
          ]
        }
      ]
    }
  ]
};

function getFriendsList(person) {
  const friendsList = [];

  if (!person.friends) {
    return [];
  }

  for (const friend of person.friends) {
    friendsList.push(friend.name);
    friendsList.push(...getFriendsList(friend));
  }

  return friendsList;
}

console.log(getFriendsList(myself));
