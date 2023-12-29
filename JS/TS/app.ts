// In a nutshell

const productName = document.getElementById(
  "product-name"
)! as HTMLInputElement;
const productPrice = document.getElementById("price")! as HTMLInputElement;

function superComplexAddition(value1: number, value2: number) {
  return value1 + value2;
}

superComplexAddition(+productName.value, +productPrice.value);

// Basics

let mobile: any = 9971;
let place: string = "Chennai";
let address: object = {
  street: "Tokyo Street",
  city: "Chennai",
};
let hobbies: readonly string[] = ["code", "cricket"];

mobile = true;

let unknownVariable: unknown = "something";

unknownVariable = 2;

let undefVar: undefined = undefined;

let dynamicArray: [number, string, boolean] = [3, "str", false];

let moreDynamicArray: [x: number, y: boolean] = [3, false];

dynamicArray.push(3);

const [one, two, three] = dynamicArray;

console.log(one);

const User: { email: string; password: string; pin: 3 } = {
  email: "sriram",
  password: "string",
  pin: 3,
};

// User.pin = 5; will throw error

// above basic covered number, string, boolean, array, tuple & object.

// enum

const customUser = {
  name: "SriramSR",
  userRole: 0,
};

enum moreRoles {
  ADMIN = 100,
  TEACHER = "teacher",
  STUDENT = "student",
}

if (customUser.userRole === moreRoles.ADMIN) {
  console.log("User is admin");
}

// union

function combinator(
  value1: string | number,
  value2: string | number,
  mandatoryInput: "good" | "bad"
) {
  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 + value2;
  } else {
    return value1.toString() + value2.toString();
  }
  console.log(mandatoryInput);
}

combinator(2, 3, "bad");

// Function as types

function add(value1: number, value2: number): number {
  return value1 + value2;
}

function printAlone(value: string): void {
  console.log("Value is " + value);
}

let returnFunc: (a: number, b: number) => number; // Type definition
let printFunc: (val: string) => void;

returnFunc = add;
printFunc = printAlone;

// Different Function Def syntaxes

function plainFnSyntax(val1: number, val2: number): number {
  return val1 + val2;
}

const plainArrowFnSyntax = (val1: number, val2: number) => {
  return val1 + val2;
};

const differentArrowFnSyntax: (val1: number, val2: number) => number = (
  realVal1,
  realVal2
) => {
  return realVal1 + realVal2;
};

// Function predefine types

type subFunction = (num1: number, num2: number) => number;

let subtraction: subFunction;

subtraction = (val1: number, val2: number): number => {
  return val1 - val2;
};

// never type

function handleError(message: string, code: number): never {
  throw { message: message, statusCode: code };
}

// never type since the function never returns a value or it is void.

function addition(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return "Useful";
  }
  return 9;
}

let newest = "Unused";

const printStatement: (val: string) => void = (value) => console.log(value);

function additionPro(a: number, b: number = 3) {
  return a + b;
}

const additionInArrow = (a: number, b: number = 5) => {
  return a + b;
};

const additionWithSingleArg: (num: number) => number = (num) => num + 10;

// Class

abstract class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    // Type safety provided by TS
    console.log(`Department is ${this.name}`);
  }

  abstract shouldHave(): void;
}

// const accounting = new Department('Accounting');

// const copyAccounting  = {
//   describe: accounting.describe
// }

// accounting.describe();

// Inheritance

class ITDepartment extends Department {
  public admins: string[];

  constructor(names: string[]) {
    super("IT");
    this.admins = names;
  }

  shouldHave(): number {
    return 1;
  }
}

const itDepartment = new ITDepartment(["Sri", "admin"]);
itDepartment.describe();

// Getters/Setters

class ReportGenerator {
  private secret: string;

  get secretKey(): string {
    if (this.secret) {
      return this.secret;
    }
    throw new Error("Something went wrong");
  }

  set secretKey(value: string) {
    this.secret = value;
  }

  constructor(sec: string) {
    this.secret = sec;
  }
}

const report = new ReportGenerator("SuperComplexSecret");
console.log(report.secretKey);
report.secretKey = "PartlyAssignedValue";
console.log(report.secretKey);

// Access specifiers

class Employee {
  employeeName: string;
  private allEmployees: string[] = [];

  constructor(private readonly employeeId: number, name: string) {
    this.employeeName = name;
  }

  addEmployee(this: Employee) {
    this.allEmployees.push(this.employeeName);
  }

  getCurrentEmployee(this: Employee) {
    console.log(
      `Currrent employee: (${this.employeeId}): ${this.employeeName}`
    );
  }

  getEmployees(this: Employee) {
    console.log(`All employees: ${this.allEmployees}`);
  }
}

const newEmployee = new Employee(2, "Sriram");
newEmployee.addEmployee();
newEmployee.getCurrentEmployee();
// secondEmployee.allEmployees.push('Proxy'); // this throws error

// Singleton class

class SingletonClass {
  private static instance: SingletonClass;
  private constructor(public id: number, private name: string) {}

  simpleMethod() {
    console.log(`ID is ${this.id} and name is ${this.name}`);
  }

  static getInstance(): SingletonClass {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new SingletonClass(1, "Sriram");
    return this.instance;
  }
}

const singleInstance = SingletonClass.getInstance();
const fakingAnotherInstance = SingletonClass.getInstance();
console.log(singleInstance);
singleInstance.simpleMethod();
console.log(fakingAnotherInstance);

// Interfaces

// type

type contrastingUser = {
  referralCode: string | number;
  rewardPoints: number;
};

interface User {
  email: string;
  password: string;
  addToCart(productId: string): void;
}

interface specialUser {
  profilePic: string;
  postSomething(postId: string): void;
}

const newUser: User = {
  email: "test@test.com",
  password: "tester",
  addToCart: (productId) => {
    console.log("Added to cart " + productId);
  },
};

// Interfaces with classes

class AdminUser implements User, specialUser {
  email: string;
  password: string;
  profilePic: string;

  constructor(emailId: string, pass: string, picId: string) {
    this.email = emailId;
    this.password = pass;
    this.profilePic = picId;
  }

  addToCart(productId: string): void {
    console.log("Added to cart " + productId);
  }

  postSomething(postId: string): void {
    console.log(`User posted a picture with the given ${postId}`);
  }
}

// Types can also implemented by classes

type reqBody = {
  email: string;
  password: string;
  generateToken: (id: string) => void;
};

class UserModal implements reqBody {
  email: string;
  password: string;
  constructor() {
    this.email = "test@test.com";
    this.password = "supercomplex password";
  }

  generateToken(id: string): void {
    console.log("ID is " + id);
  }
}

// Interfaces can extend multiple other interfaces

interface CafyBase {
  infra: string;
  version: number;
}

interface platformBase extends CafyBase {
  topology: number;
}

class PlatformAp implements platformBase {
  infra: string;
  version: number;
  topology: number;

  constructor(infra: string, ver: number, topo: number) {
    this.infra = infra;
    this.version = ver;
    this.topology = topo;
  }
}

const platform = new PlatformAp("CQE Infra", 3, 1);

// Interface can be used to define anonymous function type

interface multiplyFn {
  (val1: number, val2: number): number;
}

let multiplication: multiplyFn;

multiplication = (val1: number, val2: number): number => {
  return val1 * val2;
};

// Using optional fields in interfaces

interface linientProto {
  isConfigurable: boolean;
  isAdvisable?: boolean;  // This is optional
  isAuthorised: boolean;
}

const campDetails: linientProto = {
  isAuthorised: false,
  isConfigurable: true
}

class MustImplementer {
  isAdvisable?: boolean;
  isConfigurable: boolean;

  constructor() {
    this.isAdvisable = true;
    this.isConfigurable = false;
  }
}