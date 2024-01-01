// Class decorator

function Logger(logStr: string) {
  console.log("First Logger");
  return function (_: Function) {
    console.log(logStr);
  };
}

function secondLogger(logStr: string) {
  console.log("Second logger");
  return function (_: Function) {
    console.log(logStr);
  };
}

function onlyExecInitialised(strToUpper: string) {
  return function <T extends { new (...args: any[]): { userName: string } }>(
    oldConstructor: T
  ) {
    return class extends oldConstructor {
      constructor(..._: any[]) {
        super();
        console.log(
          `Uppercased ${strToUpper.toUpperCase()} and ${this.userName.toUpperCase()}`
        );
      }
    };
  };
}

@onlyExecInitialised("decorator is awesome")
class Person {
  userName: string = "default";

  constructor() {
    console.log("Called once");
  }
}

const person = new Person();

// Property decorator

function instancePropDecorator(target: any, propName: string | Symbol) {
  console.log("Inside property decorator function....");
  console.log(target);
  console.log(propName);
}

function staticPropDecorator(target: any, propName: string | Symbol) {
  console.log("Inside static property decorator function....");
  console.log(target);
  console.log(propName);
}

function accessorDecorator(
  target: any,
  accessorName: string,
  descriptor: PropertyDescriptor
) {
  console.log("Inside accessor decorator...");
  console.log(target);
  console.log(accessorName);
  console.log(descriptor);
}

function methodDecorator(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  console.log("Inside method decorator...");
  console.log(target);
  console.log(methodName);
  console.log(descriptor);
}

function parameterDecorator(
  target: any,
  methodName: string | Symbol,
  position: number
) {
  console.log("Inside parameter decorator...");
  console.log(target);
  console.log(methodName);
  console.log(position);
}

class Product {
  private _price: number;
  @instancePropDecorator
  public title: string;
  @staticPropDecorator
  static cart: string[];

  constructor(p: number, t: string) {
    this._price = p;
    this.title = t;
  }

  @accessorDecorator
  get price() {
    return this._price;
  }

  set price(p: number) {
    if (p > 0) {
      this._price = p;
    } else {
      throw new Error("Price value should be positive only");
    }
  }

  @methodDecorator
  getPriceWithTax(@parameterDecorator p: number) {
    return this._price * (1 + p);
  }
}

const product = new Product(2000, "Typescript");

product.price = 9000;
console.log(product.price);

// Configure functions to decorate

function AutoBind(
  _: any,
  _1: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value; // holds your function
  return {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };
}

class Greet {
  message = "Secret Message";

  @AutoBind
  showMessage() {
    console.log(this);
    return this.message;
  }
}

const greeter = new Greet();

const copiedMethod = greeter.showMessage;

console.log(copiedMethod());
