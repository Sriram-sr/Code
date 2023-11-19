This will be page to describe the completed features of this console based "Student Management System" and to find the
state of the project.

Immediate AI to work on this project is build up on mysql relational database

To Work On: Update user profile information(Done for Student, todo for teachers).

Endpoints:

# ADMIN (3 routes)

# GET

/teachers # Get All Teachers
/students # Get All Students

# PUT

/course/:id # Edit Course

# Teacher (3 routes)

# GET

/courses/:deptId # Get courses based on department id.
/teacher/id # Get profile

# POST

/attendance/:courseId?studentId # Mark Attendance

# Student (4 routes)

# GET

/student/:studentId # Get student profile
/enrollments/:studentId # show student's enrollments
/courses/:deptId # Get courses based on department id.

# POST

/enroll/:courseId?studentId # Enroll course with course/studentId

# PUT

/student/:studentId # Update student profile

# Common (2routes)

# POST

/register # Register user
/login # Login user








