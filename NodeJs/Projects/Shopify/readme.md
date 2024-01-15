This is a clone backend of Shopify web.

Endpoints:

Authentication:

POST /api/v1/auth/signup: User registration.✅
POST /api/v1/auth/signin: User login.✅
POST /api/v1/auth/forgot-password: Generates token for resetting password.✅
POST /api/v1/auth/reset-password: Resets new password.✅
// More auth routes to work on...

User:

GET /api/v1/user/: Gets all users.✅
GET /api/v1/user/active: Gets currently logged in user.✅
GET /api/v1/user/:userId: Gets single user.✅
PUT /api/v1/user/:userId: Updates a user.✅
DELETE /api/v1/user/:userId: Deletes a user.✅
PATCH /api/v1/user/update-profile: Updates profile picture.✅

Product:

GET /api/v1/product/: Gets all products.✅
GET /api/v1/product/:productId: Gets single product.✅
POST /api/v1/product/: Create new product.✅
PUT /api/v1/product/:productId: Updates a product.✅
DELETE /api/v1/product/:productId: Deletes a product.✅

Wishlist:

GET /api/v1/wishlist/: Gets user's all wishlisted products.✅
POST /api/v1/wishlist/:productId: Adds a product to users's wishlist.✅
DELETE /api/v1/wishlist/:productId: Removes a product from users's wishlist.✅
PATCH /api/v1/wishlist/clear: Clears all products from user's wishlist.✅

// Like for product is a seperate functionality.
