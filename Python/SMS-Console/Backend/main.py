from datetime import datetime

import pyfiglet

from project_utils.common_utils import *
from project_utils.db_utils import DatabaseHandler
from project_utils.macros import *

db_utils = DatabaseHandler()


class Admin:
    def __init__(self):
        self.student_table = 'students'
        self.teacher_table = 'teachers'

    def show_all_students(self):
        students_header = [STUDENT_ID, FIRST_NAME, LAST_NAME, DOB, GENDER, EMAIL, PHONE, ADDRESS, GUARDIAN_CONTACT,
                           ADMISSION_DATE, NATIONALITY,
                           EMERGENCY_CONTACT_NAME, EMERGENCY_CONTACT, USER_ID]
        all_students_data = db_utils.get_select_query(table_name=self.student_table, header=students_header)
        print(all_students_data)

    def show_all_teachers(self):
        teachers_header = [TEACHER_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE, ADDRESS, DEPARTMENT_ID, HIRE_DATE,
                           DEPARTMENT_ID, HIRE_DATE, SPECIALIZATION, IS_ACTIVE, USER_ID]
        all_teachers_data = db_utils.get_select_query(table_name=self.teacher_table, header=teachers_header)
        print(all_teachers_data)


class StudentFunctionalities:
    def add_student_details(self):
        fields_and_details = {
            FIRST_NAME: None,
            LAST_NAME: None,
            DOB: 'YYY-MMM-DDD',
            GENDER: ['MALE', 'FEMALE', 'OTHERS'],
            EMAIL: None,
            PHONE_NUMBER: None,
            ADDRESS: None,
            GUARDIAN_NAME: None,
            GUARDIAN_PHONE_NUMBER: None,
            ADMISSION_DATE: None,
            NATIONALITY: None,
            EMERGENCY_CONTACT_NAME: None,
            EMERGENCY_CONTACT_PHONE: None,
        }


class TeacherFunctionalities:
    pass


class Authentication:
    def __init__(self):
        pass

    def register(self):
        fields_and_details = {
            USERNAME: None,
            PASSWORD: None,
            USERTYPE: [STUDENT, TEACHER]
        }
        register_user_data = get_user_inputs(fields=fields_and_details)
        register_user_data.update({'registration_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')})
        # db_utils.insert_to_table(register_user_data, 'users')
        if register_user_data[USERTYPE] == STUDENT.lower():
            student = StudentFunctionalities()

    def login(self):
        pass


def start_app():
    db_utils.start_db_connection()
    result = pyfiglet.figlet_format(WELCOME_MSG, font=FONT_STYLE)
    print(result)
    show_options('admin', 'others')
    user_role = get_user_inputs(question_str='Enter your role(1/2): ', data_type='int')

    if user_role == 1:
        admin_instance = Admin()
        admin_instance.show_all_teachers()
    elif user_role == 2:
        print('Getting the authentication options')
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
