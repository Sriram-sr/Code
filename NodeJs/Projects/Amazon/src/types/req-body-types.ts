export interface signupReqBody {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}

export interface signinReqBody {
    email: string;
    password: string;
}