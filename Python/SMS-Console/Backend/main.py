from datetime import datetime

from project_utils.common_utils import *
from project_utils.db_utils import DatabaseHandler
from project_utils.macros import *

db_utils = DatabaseHandler()


class Admin:
    """
        A class representing an administrative user with access to manage students and teachers.


        Attributes:
            student_table (str): The name of the table storing student records in the database.
            teacher_table (str): The name of the table storing teacher records in the database.
    """

    def __init__(self):
        self.student_table = 'students'
        self.teacher_table = 'teachers'

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


class StudentFunctionalities:
    """
        A class providing functionalities specific to a student user.

        This class encapsulates methods and attributes tailored for student-related actions.
        Students can access and interact with their personal information, course enrollment,
        grades, attendance, and other relevant actions.

        Attributes:
            user_id (int): The unique identifier of the student user.
    """

    def __init__(self, user_id):
        self.user_id = user_id

    def add_student_details(self):
        """
        Adds student details post registration.

        :return: None
        """
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
        # db_utils.insert_to_table(data=add_student_data, table_name=STUDENT_TABLE)
        log_banner('Student Added Successfully')


class TeacherFunctionalities:
    """
        A class providing functionalities specific to a teacher user.

        This class encapsulates methods and attributes tailored for teacher-related actions.
        Teachers can access and interact with their personal information and much more.

        Attributes:
            user_id (int): The unique identifier of the teacher user.
    """

    def __init__(self, user_id):
        self.user_id = user_id

    def add_teacher_details(self):
        """
        Adds student details post registration.

        :return: None
        """
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


class Authentication:
    def __init__(self):
        pass

    def register(self):
        """
        Registers new user and creates db entry to users table.

        :return: None
        """
        fields_and_details = {
            USERNAME: None,
            PASSWORD: None,
            USERTYPE: [STUDENT, TEACHER]
        }
        register_user_data = get_user_inputs(fields=fields_and_details)
        register_user_data.update({'registration_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')})
        db_utils.insert_to_table(data=register_user_data, table_name='users')
        log_banner('User Registered Successfully')
        registered_user_id = db_utils.get_single_query(table_name=USERS_TABLE, field_to_get=USER_ID,
                                                       where_field=USERNAME,
                                                       target_value=register_user_data[USERNAME])
        if register_user_data[USERTYPE] == STUDENT.lower():
            student = StudentFunctionalities(user_id=registered_user_id)
            student.add_student_details()
        elif register_user_data[USERTYPE] == TEACHER.lower():
            print('Teacher and the user id is ', registered_user_id)
            teacher = TeacherFunctionalities(user_id=registered_user_id)
            teacher.add_teacher_details()

    def login(self):
        fields_and_details = {
            USERNAME: None,
            PASSWORD: None
        }
        login_user_data = get_user_inputs(fields=fields_and_details)
        # try:
        password_for_username = db_utils.get_single_query(table_name=USERS_TABLE, field_to_get=PASSWORD,
                                                          where_field=USERNAME,
                                                          target_value=login_user_data[USERNAME])
        if password_for_username == login_user_data[PASSWORD]:
            logged_in_user_id = db_utils.get_single_query(table_name=USERS_TABLE, field_to_get=USER_ID,
                                                          where_field=USERNAME,
                                                          target_value=login_user_data[USERNAME])
            student = db_utils.check_entry_existence(table_name=STUDENT_TABLE, target_value=logged_in_user_id,
                                                     where_field=USER_ID)
            if student:
                print('Found that you are a Student')
            teacher = db_utils.check_entry_existence(table_name=TEACHER_TABLE, target_value=logged_in_user_id,
                                                     where_field=USER_ID)
            if teacher:
                print('Found that you are a Teacher')
        else:
            print('Enter valid Credentials')

    def find_user_type(self):
        pass


def start_app():
    """
    Initialise classes based on user selection.

    :return: None
    """
    db_utils.start_db_connection()
    display_welcome_msg()
    show_options(message='Choose an option', options=['admin', 'others'])
    user_role = get_user_inputs(question_str='Enter your role(1/2): ', data_type='int')

    if user_role == 1:
        admin_instance = Admin()
        enter_new_line()
        show_options(message='What would you like to do', options=['Show Teachers', 'Show Students'])
        admin_choice = get_user_inputs(question_str='Enter your choice(1/2): ', data_type='int')
        if admin_choice == 1:
            admin_instance.show_all_teachers()
        else:
            admin_instance.show_all_students()
    elif user_role == 2:
        user_auth_instance = Authentication()
        show_options(options=['Register', 'Login'])
        user_auth_choice = get_user_inputs(question_str='What would you like to do(1/2): ', data_type='int')
        if user_auth_choice == 1:
            user_auth_instance.register()
        else:
            user_auth_instance.login()
        enter_new_line()

    db_utils.close_connection()
    log_banner('Closed DB Connection')


if __name__ == '__main__':
    try:
        start_app()
    except KeyboardInterrupt:
        enter_new_line()
        db_utils.close_connection()
        log_banner('Closed DB Connection')
