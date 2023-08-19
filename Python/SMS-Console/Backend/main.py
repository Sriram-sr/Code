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
        print(all_students_data)

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
        print(all_teachers_data)


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
        # db_utils.insert_to_table(data=add_student_data, table=STUDENT_TABLE)
        print_formatted_message('Student Added Successfully')


class TeacherFunctionalities:
    pass


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
        # db_utils.insert_to_table(data=register_user_data, table='users')
        print_formatted_message('User Registered Successfully')
        if register_user_data[USERTYPE] == STUDENT.lower():
            registered_user_id = db_utils.get_single_query(table_name=USERS_TABLE, field_to_get=USER_ID,
                                                           where_field=USERNAME,
                                                           target_value=register_user_data[USERNAME])
            student = StudentFunctionalities(user_id=registered_user_id)
            student.add_student_details()

    def login(self):
        pass


def start_app():
    """
    Initialise classes based on user selection.

    :return: None
    """
    db_utils.start_db_connection()
    display_welcome_msg()
    show_options('admin', 'others')
    user_role = get_user_inputs(question_str='Enter your role(1/2): ', data_type='int')

    if user_role == 1:
        admin_instance = Admin()
        admin_instance.show_all_teachers()
    elif user_role == 2:
        user_auth_instance = Authentication()
        show_options('Register', 'Login')
        user_auth_choice = get_user_inputs(question_str='What would you like to do(1/2): ', data_type='int')
        if user_auth_choice == 1:
            user_auth_instance.register()
        else:
            user_auth_instance.login()

    db_utils.close_connection()
    print('Closed DB Connection')


if __name__ == '__main__':
    start_app()
