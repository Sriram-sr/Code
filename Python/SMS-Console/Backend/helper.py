from datetime import datetime

from project_utils.common_utils import *
from project_utils.db_utils import DatabaseHandler
from project_utils.macros import *

db_utils = DatabaseHandler()


class App:
    def __init__(self):
        pass

    def start_app(self):
        """
        Connects to the DB and initialise classes based on user selection(admin/teacher/student).

        :return: None
        """
        db_utils.start_db_connection()
        display_welcome_msg()
        show_options(message='Choose an option', options=[ADMIN, TEACHER, STUDENT])
        user_role = get_user_inputs(question_str='Enter your role(1/2): ', data_type='int')
        if user_role == 1:
            admin = Admin()
            admin.auth_admin()
        elif user_role == 2:
            teacher = Teacher()
            teacher.auth_teacher()
        else:
            student = Student()
            student.auth_student()
        close_app()


def close_app():
    log_banner('Thanks for Visiting Student Management System')
    db_utils.close_connection()
    log_banner('Closed DB Connection')


class Authentication:
    @staticmethod
    def register():
        print('Register called...')

    @staticmethod
    def login():
        print('Login called...')


class Admin:
    def auth_admin(self):
        Authentication.login()

    def show_all_students(self):
        pass

    def show_all_teachers(self):
        pass


class Student:
    def __init__(self):
        pass

    def auth_student(self):
        Authentication.register()
    def add_student_details(self):
        pass

    def enroll_course(self):
        pass


class Teacher:
    def __init__(self):
        pass

    def auth_teacher(self):
        Authentication.register()

    def add_teacher_details(self):
        pass


if __name__ == '__main__':
    try:
        app = App()
        app.start_app()
    except KeyboardInterrupt:
        enter_new_line()
        close_app()
