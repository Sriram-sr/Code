Student Management System REST API project

Current plan is to associate User model with Teacher/Admin/Student.

User Authentication:

POST /signup: User registration.✅
POST /login: User login.✅
POST /forget-password: Forget Password generate token.✅
POST /reset-password: Reset Password with received token.✅
GET /profile: Retrieve user profile information.✅
GET /users: Retrieve a list of users (admin feature).
PATCH /update-profie: Updates user profile with bio and profile picture.✅

Students:

GET /students: Retrieve a list of all students.✅
POST /students: Create a new student.✅
GET /students/:id: Retrieve a specific student by ID.✅
PUT /students/:id: Update student information.✅
DELETE /students/:id: Delete a student.✅

Courses:

GET /courses: Retrieve a list of all courses.
POST /courses: Create a new course.
GET /courses/:id: Retrieve a specific course by ID.
PUT /courses/:id: Update course information.
DELETE /courses/:id: Delete a course.
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
