Student Management System REST API project

APPLICATION FLOW:

- There is a register screen on your frontend which is your landing screen.
- Once registered will redirect to Login screen
- Once logged in, based on user's role(admin, student, teacher) will take to respective user's homepage displaying options of those users.

Endpoints:

# Common (7 routes)

POST /api/v1/auth/signup: User registration.✅