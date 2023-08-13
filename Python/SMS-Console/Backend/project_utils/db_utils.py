import mysql.connector as db
from tabulate import tabulate


def connect_database():
    connection = db.connect(
        user='root',
        host='localhost',
        password='sriram',
        database='student_management_system'
    )

    cursor = connection.cursor()  # Create cursor inside the connection context
    return connection, cursor


db_connection, db_cursor = connect_database()  # Get the connection and cursor


def get_select_query(table_name=None, header=None):
    db_cursor.execute(f'select * from {table_name}')
    all_students = db_cursor.fetchall()
    table = tabulate(all_students, headers=header, tablefmt='grid')

    return table


def close_connection():
    db_cursor.close()
    db_connection.close()
