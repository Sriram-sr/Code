export interface signupReqBody {
  email: string;
  password: string;
  role: string;
}

export interface createProductReqBody {
  productName?: string;
  description?: string;
  price?: number;
  category?: string;
  stockQuantity?: number;
}

export interface updateUserReqBody {
  email?: string;
  mobile?: string;
  gender?: 'male' | 'female' | 'others';
}