export interface signupReqBody {
  email: string;
  password: string;
  role: string;
}

export interface createProductReqBody {
  productName: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
}