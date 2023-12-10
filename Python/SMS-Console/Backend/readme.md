Student Management System Console project

Immediate AI is to build api for next route. 

1. Admin create course
2. Admin get all users.

APPLICATION FLOW:

* There is a register screen on your frontend which is your landing screen.
* Once registered will redirect to Login screen
* Once logged in, based on user's role(admin, student, teacher) will take to respective user's homepage displaying
  options of those users.

Ref project: https://github.com/jobic10/student-management-using-django?tab=readme-ov-file

Endpoints:

# Common (2routes)

/api/v1/user/register: Register user.✅
/api/v1/user/login: Login user.✅

# ADMIN (4 routes)

GET /api/v1/teacher: Retrieve a list of all teachers.✅
GET /api/v1/student: Retrieve a list of all students.✅
GET /api/v1/course: Retrieve a list of all courses.✅
PUT /api/v1/course/:courseId: Edit a course.✅

# Teacher (4 routes)

GET /api/v1/course/:deptId: Get courses based on department id.✅
GET /api/v1/teacher/:teacherId: Get teacher based on teacher id.✅
PUT /api/v1/teacher/:teacherId: Update teacher profile.✅
POST /api/v1/teacher/attendance/:courseId/:studentId: Mark attendance for students.✅

# Student (5 routes)

GET /api/v1/student/:studentId: Get student profile.✅
GET /api/v1/student/enrollments/:studentId: show student's enrollments.✅
GET /api/v1/course/:deptId: Get courses based on department id.✅
POST /api/v1/student/enroll/:courseId/:studentId: Enroll course.✅
PUT /api/v1/student/:studentId: Update student profile.✅









