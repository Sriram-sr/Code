Student Management System REST API project

APPLICATION FLOW:

- There is a register screen on your frontend which is your landing screen.
- Once registered will redirect to Login screen
- Once logged in, based on user's role(admin, student, teacher) will take to respective user's homepage displaying options of those users.

CURRENT FLOW:

So thus far, what has been built is user(any) can login/register. They will be landed in their profile screen and prompts to update profile with bio & profile picture. Now Admin features to built on.

Endpoints:

# Common (7 routes)

POST /api/v1/auth/signup: User registration.✅
POST /api/v1/auth/signin: User login.✅
POST /api/v1/auth/forgot-password: Forgot Password generate token.✅
POST /api/v1/auth/reset-password: Reset Password with received token.✅
GET /api/v1/auth/user: Retrieve user profile information.✅
PATCH /api/v1/auth/update-profie: Updates user profile with bio and profile picture.✅
GET /api/v1/admin/course: Gets all courses offered.✅

# ADMIN (9 routes)

GET /api/v1/auth/all-users: Retrieve a list of users.✅
GET /api/v1/admin/department/: Retrieve list of departments.✅
GET /api/v1/teacher: Retrieve a list of all teachers.✅
GET /api/v1/student: Retrieve a list of all students.✅
GET /api/v1/admin/course/:courseId: Retrieve a single course details.✅
POST /api/v1/admin/department: Create new department.✅
POST /api/v1/admin/course: Create new course.✅
PUT /api/v1/admin/course/:courseId: Updates the course.✅
DELETE /api/v1/admin/course/:courseId: Deletes a course.✅

# Teacher (1 route)

POST /api/v1/teacher: Create a new teacher.✅

# Student (1 route)

POST /api/v1/student: Create a new student.✅
