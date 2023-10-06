This will be page to describe the completed features of this console based "Student Management System" and to find the state of the project.
Currently, it implements all functionalities with Mysql as primary database. In future this will be changed with a ORM based
Mysql and after that will be changed to cloud deployed Mongodb connected one.

Attendance mark by teacher completed.

ToWorkOn: Admin features/privileges.

Endpoints:

# Get

/register
/login
/teachers # get all teachers
/students # get all students

/teacher/id # get single teacher
/student/id # get single student
/enroll/:courseid?studentid # Enroll course with course/studentId
/enrollments:studentId # show student's enrollments
/courses/:deptId   # show courses based on department id.

# Post


