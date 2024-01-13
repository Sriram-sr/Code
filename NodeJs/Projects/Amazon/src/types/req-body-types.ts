export interface signupReqBody {
  firstName: string;
  lastName: string;
  email?: string;
  mobile: string;
  password?: string;
  role: string;
}

export interface signinReqBody {
  email: string;
  password: string;
}

export interface createProductReqBody {
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  brand: string;
}
