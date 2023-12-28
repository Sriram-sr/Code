Student Management System REST API project

Next Route: Pending decision.

APPLICATION FLOW:

- There is a register screen on your frontend which is your landing screen.
- Once registered will redirect to Login screen
- Once logged in, based on user's role(admin, student, teacher) will take to respective user's homepage displaying options of those users.

Endpoints:

# Common (7 routes)

POST /api/v1/user/signup: User registration.✅
POST /api/v1/user/signin: User login.✅
POST /api/v1/user/forget-password: Forget Password generate token.✅
POST /api/v1/user/reset-password: Reset Password with received token.✅
GET /api/v1/user/current: Retrieve user profile information.✅
PATCH /api/v1/user/update-profie: Updates user profile with bio and profile picture.✅
GET /api/v1/admin/course: Gets all courses offered.✅

# ADMIN (6 route)

GET /api/v1/user/: Retrieve a list of users.✅
GET /api/v1/student: Retrieve a list of all students.✅
GET /api/v1/teacher: Retrieve a list of all teachers.✅
GET /api/v1/admin/department/: Retrieve list of departments.✅
POST /api/v1/admin/department/: Create new department.✅
POST /api/v1/admin/course: Create new course.✅

# Teacher (4 routes)

POST /api/v1/teacher: Create a new teacher.✅

# Student (5 routes)

POST /api/v1/student: Create a new student.✅
GET /api/v1/student/:studentId: Retrieve a specific student by ID.✅
PUT /api/v1/student/:studentId: Update student information.✅
DELETE /api/v1/student/:studentId: Delete a student.✅
PUT /api/v1/student/enroll-course: Enroll a course.✅

---

Courses:

GET /courses/:id: Retrieve a specific course by ID. (Common)
PUT /courses/:id: Update course information. (Admin)
DELETE /courses/:id: Delete a course. (Admin)

Enrollments:

POST /enrollments: Enroll a student in a course.
DELETE /enrollments/:id: Remove a student from a course.
GET /students/:id/courses: Retrieve a list of courses for a specific student.
GET /courses/:id/students: Retrieve a list of students for a specific course.

Grades and Results:

POST /grades: Record grades and results for students in specific courses.
GET /students/:id/courses/:id/grades: Retrieve a student's grades for a course.
GET /courses/:id/grades: Retrieve grades for all students in a course.
GET /students/:id/grades: Retrieve grades for a specific student.

Search and Filtering:

GET /students/search: Search for students based on criteria (e.g., name, enrollment date).
GET /courses/search: Search for courses based on criteria (e.g., subject, instructor).
Attendance:

POST /attendance: Record student attendance for a class.
GET /courses/:id/attendance: Retrieve attendance records for a specific course.
Events and Announcements:

POST /announcements: Post an announcement.
GET /announcements: Retrieve a list of announcements.
GET /events: Retrieve a list of events.
Profile Management:

GET /students/:id/profile: Retrieve a student's profile.
PUT /students/:id/profile: Update a student's profile.
GET /staff/:id/profile: Retrieve staff profile.
PUT /staff/:id/profile: Update staff profile.
Statistics and Analytics:

GET /statistics/students: Generate statistical reports about the student body.
GET /statistics/courses/:id: Generate course-specific statistics and analytics.
File Upload and Storage:

POST /files/upload: Upload and store documents (e.g., transcripts, assignments).
GET /files/:id: Retrieve a specific document.
DELETE /files/:id: Delete a document.
