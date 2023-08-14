import mysql.connector as db
from tabulate import tabulate


class DatabaseHandler:
    def __init__(self):
        print('Initializing all db attributes')
        self.user = 'root'
        self.host = 'localhost'
        self.password = 'sriram'
        self.database = 'student_management_system'
        self.db_connection = None
        self.db_cursor = None

    def connect_database(self):
        connection = db.connect(
            user=self.user,
            host=self.host,
            password=self.password,
            database=self.database
        )

        print('DB connection Took')
        cursor = connection.cursor()  # Create cursor inside the connection context
        return connection, cursor

    def start_db_connection(self):
        self.db_connection, self.db_cursor = self.connect_database()

    def get_select_query(self, table_name=None, header=None):
        self.db_cursor.execute(f'select * from {table_name}')
        all_students = self.db_cursor.fetchall()
        table = tabulate(all_students, headers=header, tablefmt='grid')

        return table

    def insert_to_table(self, data, table):
        field_list = ', '.join(data.keys())
        query = f'INSERT INTO {table} ({field_list}) VALUES {tuple(data.values())}'
        self.db_cursor.execute(query)
        self.db_connection.commit()
        print('Inserted data successfully')

    def close_connection(self):
        self.db_cursor.close()
        self.db_connection.close()

