class ExploreEs7 {
    classVariable = 'someValue';

    printVariable() {
        console.log(this.classVariable);
        console.log('Other')
    }
}

let instance = new ExploreEs7();
instance.printVariable();