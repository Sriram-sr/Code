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

