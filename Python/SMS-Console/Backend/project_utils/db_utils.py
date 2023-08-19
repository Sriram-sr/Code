import mysql.connector as db
from tabulate import tabulate


class DatabaseHandler:
    """
        A class responsible for managing database connections and interactions.

        This class provides methods and attributes for establishing connections to the database,
        executing queries, and managing database-related operations. It encapsulates database
        configuration details such as host, username, password, and database name.

        Attributes:
            user (str): The username for accessing the database.
            host (str): The host address of the database server.
            password (str): The password associated with the database user.
            database (str): The name of the database being accessed.
            db_connection: The active database connection object.
            db_cursor: The cursor object for executing SQL queries.
    """
    def __init__(self):
        self.user = 'root'
        self.host = 'localhost'
        self.password = 'sriram'
        self.database = 'student_management_system'
        self.db_connection = None
        self.db_cursor = None

    def connect_database(self):
        """
        Connects to database with defined credentials.

        :return: Connection and cursor object.
        """
        connection = db.connect(
            user=self.user,
            host=self.host,
            password=self.password,
            database=self.database
        )

        print('DB connection Took')
        cursor = connection.cursor()
        return connection, cursor

    def start_db_connection(self):
        """
        Starts the connection to database.

        :return: None
        """
        self.db_connection, self.db_cursor = self.connect_database()

    def get_select_query(self, table_name=None, header=None):
        """
        Executes a SELECT query on the specified table and retrieves all rows of data.

        :param table_name: The name of the table to retrieve data from.
        :param header: A list of column headers to display in the formatted table.

        :return:  Formatted table containing the retrieved data.
        """
        self.db_cursor.execute(f'select * from {table_name}')
        all_students = self.db_cursor.fetchall()
        table = tabulate(all_students, headers=header, tablefmt='grid')

        return table

    def get_single_query(self, table_name=None, field_to_get=None, where_field=None, target_value=None):
        """
        Retrieve a single value from a database table based on a condition.

        :param table_name: The name of the table to retrieve data from.
        :param field_to_get: The field from which to retrieve the value.
        :param where_field: The field to use in the WHERE condition.
        :param target_value: The value to match in the WHERE condition.

        :return: The retrieved value from the specified field.
        """
        self.db_cursor.execute(f'select {field_to_get} from {table_name} where {where_field}=\"{target_value}\"')
        output = self.db_cursor.fetchall()

        return output[0][0]

    def insert_to_table(self, data, table):
        """
        Insert data into a specified database table.

        :param data: A dictionary containing column-value pairs to insert.
        :param table: The name of the table to insert data into.

        :return: None
        """
        field_list = ', '.join(data.keys())
        query = f'INSERT INTO {table} ({field_list}) VALUES {tuple(data.values())}'
        self.db_cursor.execute(query)
        self.db_connection.commit()
        print('Inserted data successfully')

    def close_connection(self):
        """
        Closes the database connection.

        :return: None
        """
        self.db_cursor.close()
        self.db_connection.close()

