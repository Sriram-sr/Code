import pyfiglet
from project_utils import db_utils
from project_utils.common_utils import *
from project_utils.macros import *


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
        db_utils.close_connection()

    def show_all_teachers(self):
        teachers_header = [TEACHER_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE, ADDRESS, DEPARTMENT_ID, HIRE_DATE,
                           DEPARTMENT_ID, HIRE_DATE, SPECIALIZATION, IS_ACTIVE, USER_ID]
        all_teachers_data = db_utils.get_select_query(table_name=self.teacher_table, header=teachers_header)
        print(all_teachers_data)
        db_utils.close_connection()


class Authentication:
    pass


class Student:
    pass


class Teacher:
    pass


result = pyfiglet.figlet_format(WELCOME_MSG, font=FONT_STYLE)
print(result)
print('''
    1.admin
    2.others
''')
# user_role = int(input('Enter your role(1/2): '))
user_role = get_user_input(question_str='Enter your role(1/2): ', data_type='int')

if user_role == 1:
    admin_instance = Admin()
    admin_instance.show_all_teachers()
elif user_role == 2:
    pass
