import sys
from datetime import datetime

from project_utils.common_utils import *
from project_utils.db_utils import DatabaseHandler
from project_utils.macros import *

db_utils = DatabaseHandler()


class App:
    """
    A class containing methods for starting and closing app.

    """
    def start_app(self):
        """
        Initialise classes based on user selection(admin/teacher/student).

        :return: None
        """
        display_welcome_msg()
        show_options(message='Choose an option', options=[ADMIN, TEACHER, STUDENT])
        user_role = get_user_inputs(question_str='Enter your role(1/2/3): ', data_type='int')
        enter_new_line()
        if user_role == 1:
            admin = Admin()
            admin.auth_admin()
        else:
            show_options(options=['Register', 'Login'])
            user_auth_choice = get_user_inputs(question_str='What would you like to do(1/2): ', data_type='int')
            if user_role == 2:
                teacher = Teacher()
                teacher.auth_teacher(user_auth_choice)
            else:
                student = Student()
                student.auth_student(user_auth_choice)

        self.close_app()

    @staticmethod
    def close_app():
        """
        Closes db connection and terminates program at any point of time.

        :return: None
        """
        log_banner('Thanks for Visiting Student Management System')
        db_utils.close_connection()
        log_banner('Closed DB Connection')
        sys.exit(0)


class Authentication:
    """
    A class containing methods for register and login.

    All the methods are static in this class.
    """

    @staticmethod
    def register(user_type):
        """
        Register new user and creates db entry to users table.

        :return: Int user id of the newly created user.
        """
        log_banner('Getting Register Details')
        fields_and_details = {
            USERNAME: None,
            PASSWORD: None
        }
        register_user_data = get_user_inputs(fields=fields_and_details)
        register_user_data.update(
            {USERTYPE: user_type, 'registration_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')})
        db_utils.insert_to_table(data=register_user_data, table_name='users')
        log_banner('User Registered Successfully')
        user_id = db_utils.get_single_query(table_name=USERS_TABLE, field_to_get=USER_ID, where_field=USERNAME,
                                            target_value=register_user_data[USERNAME])
        return user_id

    @staticmethod
    def login():
        """
        Login user with the right credentials.

        :return: Int user id of the logged-in user.
        """
        login_retry_count = 0
        while login_retry_count < 3:
            log_banner('Getting Login Details')
            fields_and_details = {
                USERNAME: None,
                PASSWORD: None
            }
            login_user_data = get_user_inputs(fields=fields_and_details)
            password_for_username = db_utils.get_single_query(table_name=USERS_TABLE, field_to_get=PASSWORD,
                                                              where_field=USERNAME,
                                                              target_value=login_user_data[USERNAME])
            if password_for_username == login_user_data[PASSWORD]:
                user_id = db_utils.get_single_query(table_name=USERS_TABLE, field_to_get=USER_ID,
                                                    where_field=USERNAME, target_value=login_user_data[USERNAME])
                return user_id
            else:
                enter_new_line()
                display_in_console('Enter valid Credentials...')
            login_retry_count += 1

        App.close_app()


class Admin:
    def __init__(self):
        self.student_table = 'students'
        self.teacher_table = 'teachers'

    def auth_admin(self):
        """
        Authenticates admin user and continues with other functionalities.

        :return: None
        """
        Authentication.login()
        enter_new_line()
        show_options(message='What would you like to do', options=['Show Teachers', 'Show Students'])
        admin_choice = get_user_inputs(question_str='Enter your choice(1/2): ', data_type='int')
        if admin_choice == 1:
            self.show_all_teachers()
        else:
            self.show_all_students()

    def show_all_students(self):
        """
        Display information about all students in the database.

        This method retrieves and displays a list of student records from the database,
        including details such as student ID, name, date of birth, contact information, etc.
        The information is presented in a formatted manner for easy viewing.

        :return: None
        """
        students_header = [STUDENT_ID, FIRST_NAME, LAST_NAME, DOB, GENDER, EMAIL, PHONE_NUMBER, ADDRESS,
                           GUARDIAN_PHONE_NUMBER,
                           ADMISSION_DATE, NATIONALITY,
                           EMERGENCY_CONTACT_NAME, EMERGENCY_CONTACT_PHONE, USER_ID]
        all_students_data = db_utils.get_select_query(table_name=self.student_table, header=students_header)
        display_in_console(all_students_data)

    def show_all_teachers(self):
        """
        Display information about all teachers in the database.

        This method retrieves and displays a list of teacher records from the database,
        including details such as teacher ID, email, department information, etc.
        The information is presented in a formatted manner for easy viewing.

        :return: None
        """
        teachers_header = [TEACHER_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ADDRESS, DEPARTMENT_ID, HIRE_DATE,
                           DEPARTMENT_ID, HIRE_DATE, SPECIALIZATION, IS_ACTIVE, USER_ID]
        all_teachers_data = db_utils.get_select_query(table_name=self.teacher_table, header=teachers_header)
        display_in_console(all_teachers_data)


class Teacher:
    def __init__(self):
        self.user_id = None
        self.teacher_id = None

    def auth_teacher(self, auth_choice):
        """
        Register/Login student based on student authentication choice.

        :return: None
        """
        if auth_choice == 1:
            self.user_id = Authentication.register(user_type=TEACHER)
            # display_in_console('Do you want to add personal details')
            self.add_teacher_details()
        else:
            self.user_id = Authentication.login()
            print('User ID after teacher login ', self.user_id)
        print('Continuing with other teacher functionalities')
        self.teacher_id = db_utils.get_single_query(table_name=TEACHER_TABLE, field_to_get=TEACHER_ID,
                                                    where_field=USER_ID, target_value=self.user_id)
        show_options(options=['Show courses by department', 'Show your details', 'Mark attendance'])
        user_choice = get_user_inputs(question_str='What would you like to do(1/2): ', data_type='int')
        if user_choice == 1:
            self.show_courses_by_department()
        elif user_choice == 2:
            self.show_teacher_details()
        elif user_choice == 3:
            self.mark_attendance()

    def add_teacher_details(self):
        """
        Adds teacher details post registration.

        :return: None
        """
        log_banner('Getting Teacher Details')
        fields_and_details = {
            FIRST_NAME: None,
            LAST_NAME: None,
            EMAIL: None,
            PHONE_NUMBER: None,
            ADDRESS: None,
            SPECIALIZATION: None
        }
        add_teacher_data = get_user_inputs(fields=fields_and_details)
        add_teacher_data.update({HIRE_DATE: datetime.now().strftime('%Y-%m-%d'), USER_ID: self.user_id, IS_ACTIVE: 1})
        db_utils.insert_to_table(data=add_teacher_data, table_name=TEACHER_TABLE)
        log_banner('Teacher Added Successfully')

    def show_teacher_details(self):
        teachers_header = [TEACHER_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ADDRESS, DEPARTMENT_ID, HIRE_DATE,
                           DEPARTMENT_ID, HIRE_DATE, SPECIALIZATION, IS_ACTIVE, USER_ID]
        teacher_data = db_utils.get_select_query(table_name=TEACHER_TABLE, header=teachers_header,
                                                 where_field=TEACHER_ID, target_value=self.teacher_id)
        display_in_console(teacher_data)

    @staticmethod
    def show_courses_by_department():
        departments_header = [DEPARTMENT_CODE, DEPARTMENT_NAME]
        courses_header = [COURSE_NAME, DESCRIPTION, COURSE_CODE]
        departments = db_utils.get_select_query(table_name=DEPARTMENT_TABLE, header=departments_header, use_header=True)
        display_in_console(departments)
        user_selected_department_code = get_user_inputs(question_str='Enter department code: ')
        department_id = db_utils.get_single_query(table_name=DEPARTMENT_TABLE, field_to_get=DEPARTMENT_ID,
                                                  where_field=DEPARTMENT_CODE,
                                                  target_value=user_selected_department_code)
        courses = db_utils.get_select_query(table_name=COURSES_TABLE, header=courses_header,
                                            where_field=DEPARTMENT_ID, target_value=department_id, use_header=True)
        display_in_console(courses)

    def mark_attendance(self):
        Student.show_courses()
        user_selected_course_code = get_user_inputs(question_str='Enter course code: ')
        course_id = db_utils.get_single_query(table_name=COURSES_TABLE, field_to_get=COURSE_ID, where_field=COURSE_CODE,
                                              target_value=user_selected_course_code)
        student_names = ['ID', 'StudentName']
        enrolled_students_query = f"""
                SELECT students.student_id, users.username FROM users
                JOIN students ON students.user_id = users.user_id
                JOIN enrollments ON enrollments.student_id = students.student_id
                WHERE enrollments.course_id = {course_id}
        """
        enrolled_students = db_utils.execute_query(query=enrolled_students_query, header=student_names)
        enter_new_line()
        display_in_console(enrolled_students)
        enter_new_line()
        enrolled_user_id = get_user_inputs(question_str='Enter Student ID: ', data_type='int')
        enrollment_id = db_utils.get_single_query(table_name=ENROLLMENT_TABLE, field_to_get=ENROLLMENT_ID,
                                                  where_field=STUDENT_ID, target_value=enrolled_user_id,
                                                  and_check=True, and_field=COURSE_ID, and_target_value=course_id)
        status_and_info = get_user_inputs(fields={
            STATUS: ['present', 'absent'],
            ADDITIONAL_INFO: None
        })

        attendance_data = {
            ENROLLMENT_ID: enrollment_id,
            ATTENDANCE_DATE: datetime.now().strftime('%Y-%m-%d'),
            STATUS: status_and_info[STATUS],
            ADDITIONAL_INFO: status_and_info[ADDITIONAL_INFO],
            TEACHER_ID: self.teacher_id
        }
        db_utils.insert_to_table(data=attendance_data, table_name=ATTENDANCE_TABLE)


class Student:
    def __init__(self):
        self.user_id = None
        self.student_id = None

    def auth_student(self, auth_choice):
        """
        Register/Login student based on student authentication choice.

        :return: None
        """
        if auth_choice == 1:
            self.user_id = Authentication.register(user_type=STUDENT)
            # display_in_console('Do you want to add personal details')
            self.add_student_details()
        else:
            self.user_id = Authentication.login()
        self.student_id = db_utils.get_single_query(table_name=STUDENT_TABLE, field_to_get=STUDENT_ID,
                                                    where_field=USER_ID, target_value=self.user_id)
        enter_new_line()
        show_options(
            options=['Enroll a course', 'Show your details', 'Show my enrollments', 'Show courses by department'])
        user_choice = get_user_inputs(question_str='What would you like to do(1/2/3/4): ', data_type='int')
        if user_choice == 1:
            self.enroll_course()
        elif user_choice == 2:
            self.show_student_details()
        elif user_choice == 3:
            self.show_student_enrollments()
        elif user_choice == 4:
            Teacher.show_courses_by_department()

    def add_student_details(self):
        """
        Adds student details post registration.

        :return: None
        """
        log_banner('Getting Student Details')
        fields_and_details = {
            FIRST_NAME: None,
            LAST_NAME: None,
            DOB: 'YYYY-MM-DD',
            GENDER: ['MALE', 'FEMALE', 'OTHERS'],
            EMAIL: None,
            PHONE_NUMBER: None,
            ADDRESS: None,
            GUARDIAN_NAME: None,
            GUARDIAN_PHONE_NUMBER: None,
            NATIONALITY: None,
            EMERGENCY_CONTACT_NAME: None,
            EMERGENCY_CONTACT_PHONE: None,
        }
        add_student_data = get_user_inputs(fields=fields_and_details)
        add_student_data.update({USER_ID: self.user_id, ADMISSION_DATE: datetime.now().strftime('%Y-%m-%d %H:%M:%S')})
        db_utils.insert_to_table(data=add_student_data, table_name=STUDENT_TABLE)
        log_banner('Student Added Successfully')

    def enroll_course(self):
        self.show_courses()
        user_selected_course_code = get_user_inputs(question_str='Enter course code: ')
        course_id = db_utils.get_single_query(table_name=COURSES_TABLE, field_to_get=COURSE_ID, where_field=COURSE_CODE,
                                              target_value=user_selected_course_code)
        fields_and_details = {
            STUDENT_ID: self.student_id,
            COURSE_ID: course_id,
            ENROLLMENT_DATE: datetime.now().strftime('%Y-%m-%d'),
            ENROLLMENT_STATUS: 'active'
        }
        db_utils.insert_to_table(data=fields_and_details, table_name=ENROLLMENT_TABLE)
        log_banner('Course enrolled Successfully')

    def show_student_details(self):
        student_details_header = [STUDENT_ID, FIRST_NAME, LAST_NAME, DOB, GENDER, EMAIL, PHONE_NUMBER, ADDRESS,
                                  GUARDIAN_PHONE_NUMBER,
                                  ADMISSION_DATE, NATIONALITY,
                                  EMERGENCY_CONTACT_NAME, EMERGENCY_CONTACT_PHONE, USER_ID]
        student_data = db_utils.get_select_query(table_name=STUDENT_TABLE, header=student_details_header,
                                                 where_field=STUDENT_ID, target_value=self.student_id)
        display_in_console(student_data)

    def show_student_enrollments(self):
        course_header = [COURSE_NAME, COURSE_CODE]
        course_details = {
            COURSES_TABLE: [COURSE_ID, COURSE_NAME]
        }
        enrolled_courses = db_utils.get_joined_query(from_table=COURSES_TABLE, join_table=ENROLLMENT_TABLE,
                                                     common_field=COURSE_ID, where_field=STUDENT_ID,
                                                     target_value=self.student_id, fields=course_details,
                                                     where_table=ENROLLMENT_TABLE,
                                                     header=course_header)
        enter_new_line()
        display_in_console(enrolled_courses)

    @staticmethod
    def show_courses():
        courses_header = [COURSE_NAME, DESCRIPTION, COURSE_CODE]
        available_courses = db_utils.get_select_query(table_name=COURSES_TABLE, header=courses_header, use_header=True)
        display_in_console(available_courses)


if __name__ == '__main__':
    try:
        db_utils.start_db_connection()
        app = App()
        app.start_app()
    except KeyboardInterrupt:
        enter_new_line()
        App.close_app()
