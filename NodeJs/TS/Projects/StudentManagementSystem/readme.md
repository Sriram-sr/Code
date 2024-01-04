Student Management System REST API project

APPLICATION FLOW:

- There is a register screen on your frontend which is your landing screen.
- Once registered will redirect to Login screen
- Once logged in, based on user's role(admin, student, teacher) will take to respective user's homepage displaying options of those users.

CURRENT FLOW:

So thus far, what has been built is user(any) can login/register. They will be landed in their profile screen and prompts to update profile with bio & profile picture. Admin and Student endpoints
built(some). When you comeback have to remember that It was finished on a logical point on Jan 4, 2024 after your.... you know...

Endpoints:

# Common (7 routes)

POST /api/v1/auth/signup: User registration.✅
POST /api/v1/auth/signin: User login.✅
POST /api/v1/auth/forgot-password: Forgot Password generate token.✅
POST /api/v1/auth/reset-password: Reset Password with received token.✅
GET /api/v1/auth/user: Retrieve user profile information.✅
PATCH /api/v1/auth/update-profie: Updates user profile with bio and profile picture.✅
GET /api/v1/admin/course: Gets all courses offered.✅

# ADMIN (10 routes)

GET /api/v1/auth/all-users: Retrieve a list of users.✅
GET /api/v1/admin/department/: Retrieve list of departments.✅
GET /api/v1/teacher: Retrieve a list of all teachers.✅
GET /api/v1/student: Retrieve a list of all students.✅
GET /api/v1/admin/course/:courseId: Retrieve a single course details.✅
GET /api/v1/admin/course/:courseId/students: Retreives list of students who enrolled in a specific course.✅
POST /api/v1/admin/department: Create new department.✅
POST /api/v1/admin/course: Create new course.✅
PUT /api/v1/admin/course/:courseId: Updates the course.✅
DELETE /api/v1/admin/course/:courseId: Deletes a course.✅

# Teacher (1 route)

POST /api/v1/teacher: Create a new teacher.✅

# Student (4 routes)

GET /api/v1/student/courses: Retrieves courses enrolled by the student.✅
POST /api/v1/student: Create a new student.✅
PUT /api/v1/student/enroll-course: Enroll a course.✅
PATCH /api/v1/student/unenroll-course: Unenrolls a course.✅

---

ToDo Plans

Enrollments:

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
