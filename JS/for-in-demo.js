const typicalObject = {
  name: 'Sriram',
  age: 23,
  place: 'TM',
  getName: function() {
    return this.name;
  },
  setName: function (newName){
    this.name = newName;
  }
}

// typicalObject.setName('Varsha');
console.log(typicalObject.getName());