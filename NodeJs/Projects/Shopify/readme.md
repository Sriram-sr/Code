This is a clone backend of Shopify web.

Endpoints:

Authentication:

POST /api/v1/auth/signup: User registration.✅
POST /api/v1/auth/signin: User login.✅
POST /api/v1/auth/forgot-password: Generates token for resetting password.✅
POST /api/v1/auth/reset-password: Resets new password.✅
// More auth routes to work on...

Product:

GET /api/v1/product/: Gets all products.✅
POST /api/v1/product/: Create new product.✅
