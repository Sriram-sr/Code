// Generics

// In a nutshell

function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("String"));
console.log(identity<number>(8));

function mergeObjects<T extends object, U extends object>(
  target: T,
  source: U
) {
  return Object.assign(target, source);
}

const mergedResult = mergeObjects({ _id: 1 }, { userName: "unknown" });

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): string {
  let describeStr = "No truthy element specified";
  if (element.length > 0) {
    describeStr = `Specified element is ${element.length} in length`;
  }

  return describeStr;
}

console.log(countAndDescribe("Typescript"));

function getTheKey<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Value is ${obj[key]}`;
}

getTheKey({ name: "Sriram" }, "name");

// Generic class

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const numStorage = new DataStorage<number>();
const textStorage = new DataStorage<string>();

// Using built-in Partial type

interface courseGoal {
  title: string;
  description: string;
  endDate: Date;
}

function createCourseGoal(tit: string, desc: string, date: Date): courseGoal {
  let courseGoalToBeCreated: Partial<courseGoal> = {};
  courseGoalToBeCreated.title = tit;
  courseGoalToBeCreated.description = desc;
  courseGoalToBeCreated.endDate = date;

  return courseGoalToBeCreated as courseGoal;
}
