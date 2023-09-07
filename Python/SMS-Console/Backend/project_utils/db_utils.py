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

    def get_select_query(self, table_name=None, header=None, use_header=None):
        """
        Executes a SELECT query on the specified table and retrieves all rows of data.

        :param table_name: The name of the table to retrieve data from.
        :param header: A list of column headers to display in the formatted table.
        :param use_header: Boolean field to use header as fields to retrieve.

        :return:  Formatted table containing the retrieved data.
        """
        if use_header:
            fields_str = ', '.join(header)
        else:
            fields_str = '*'
        query = f'select {fields_str} from {table_name}'
        self.db_cursor.execute(query)
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
        query = f'select {field_to_get} from {table_name} where {where_field}=\"{target_value}\"'
        self.db_cursor.execute(query)
        output = self.db_cursor.fetchall()

        return output[0][0]

    def insert_to_table(self, data, table_name):
        """
        Insert data into a specified database table.

        :param data: A dictionary containing column-value pairs to insert.
        :param table_name: The name of the table to insert data into.

        :return: None
        """
        field_list = ', '.join(data.keys())
        query = f'INSERT INTO {table_name} ({field_list}) VALUES {tuple(data.values())}'
        self.db_cursor.execute(query)
        self.db_connection.commit()
        print('Inserted data successfully')

    def check_entry_existence(self, table_name=None, where_field=None, target_value=None):
        """
        To check if specific entry is present in a table based on some values.

        :param table_name: The name of the table to retrieve data from.
        :param where_field: The field to use in the WHERE condition.
        :param target_value: The value to match in the WHERE condition.

        :return: Int value 1/0 based on entry's existence.


        """
        query = f'SELECT EXISTS(SELECT 1 FROM {table_name} WHERE {where_field} = {target_value})'
        self.db_cursor.execute(query)
        output = self.db_cursor.fetchall()

        return output[0][0]

    def close_connection(self):
        """
        Closes the database connection.

        :return: None
        """
        self.db_cursor.close()
        self.db_connection.close()

