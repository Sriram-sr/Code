// Basics

let mobile: any = 9971;
let place: string = 'Chennai';
let address: object = {
    street: 'Tokyo Street',
    city: 'Chennai'
}
let hobbies: readonly string[] = ['code', 'cricket'];

mobile = true;

let unknownVariable: unknown = 'something';

unknownVariable = 2;

let undefVar: undefined = undefined;

let dynamicArray: [number, string, boolean] = [3, 'str', false];

let moreDynamicArray: [x: number, y: boolean] = [3, false];

dynamicArray.push(3);

const [one, two, three] = dynamicArray;

console.log(one);

const User: { email: string; password: string; pin: 3 } = {
    email: 'sriram',
    password: 'string',
    pin: 3
}

// User.pin = 5; will throw error

// above basic covered number, string, boolean, array, tuple & object.

// enum

const customUser = {
    name: 'Sriram',
    userRole: 0
}

enum moreRoles {
    ADMIN = 100, TEACHER = 'teacher', STUDENT = 'student'
}

if (customUser.userRole === moreRoles.ADMIN) {
    console.log('User is admin');
}

// union

function combinator(value1: string | number, value2: string | number, mandatoryInput: 'good' | 'bad') {
    if (typeof (value1) === 'number' && typeof (value2) === 'number') {
        return value1 + value2;
    } else {
        return value1.toString() + value2.toString();
    }
}

combinator(2, 3, 'bad');


// Function as types

function add(value1: number, value2: number): number {
    return value1 + value2;
}

function printAlone(value: string): void {
    console.log('Value is ' + value);
}

let returnFunc: (a: number, b:number) => number; // Type definition
let printFunc: (val: string) => void;

returnFunc = add;
printFunc = printAlone;

// never type

function handleError(message: string, code: number): never {
    throw { message: message, statusCode: code};
}

// never type since the function never returns a value or it is void.
