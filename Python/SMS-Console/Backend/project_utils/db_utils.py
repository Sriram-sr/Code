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
        cursor = connection.cursor()
        return connection, cursor

    def start_db_connection(self):
        """
        Starts the connection to database.

        :return: None
        """
        self.db_connection, self.db_cursor = self.connect_database()

    def get_select_query(self, table_name=None, header=None, use_header=None, where_field=None, target_value=None,
                         get_raw=None, get_map_data=None):
        """
        Executes a SELECT query on the specified table and retrieves all rows of data.

        :param table_name: The name of the table to retrieve data from.
        :param header: A list of column headers to display in the formatted table.
        :param use_header: Boolean field to use header as fields to retrieve.
        :param where_field: Name of the column which is used as where filter.
        :param target_value: Target field which used in where condition.
        :param get_raw: Boolean field used to return raw query output data without formatting.
        :param get_map_data: Boolean field to return mapped raw data with the headers.

        :return:  Formatted table containing the retrieved data.
        """
        if use_header:
            fields_str = ', '.join(header)
        else:
            fields_str = '*'
        query = f'select {fields_str} from {table_name}'
        if where_field:
            query = query + f' where {where_field}={target_value}'
        self.db_cursor.execute(query)
        retrieved_data = self.db_cursor.fetchall()
        if get_map_data:
            mapped_data_list = list()
            for row_data in retrieved_data:
                map_data = dict()
                for idx in range(len(header)):
                    map_data[header[idx]] = row_data[idx]
                mapped_data_list.append(map_data)
            return mapped_data_list
        if get_raw:
            return retrieved_data[0]
        table = tabulate(retrieved_data, headers=header, tablefmt='grid')

        return table

    def get_single_query(self, table_name=None, field_to_get=None, where_field=None, target_value=None, and_check=None,
                         and_field=None, and_target_value=None):
        """
        Retrieve a single value from a database table based on a condition.

        :param table_name: The name of the table to retrieve data from.
        :param field_to_get: The field from which to retrieve the value.
        :param where_field: The field to use in the WHERE condition.
        :param target_value: The value to match in the WHERE condition.
        :param and_check: Bool to check and in where query.
        :param and_field: The field after and condition.
        :param and_target_value: The value of and_filed.

        :return: The retrieved value from the specified field.
        """
        query = f'select {field_to_get} from {table_name} where {where_field}=\"{target_value}\"'
        if and_check:
            query += f' and {and_field}=\"{and_target_value}\"'
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

    def get_joined_query(self, from_table=None, fields=None, join_table=None, common_field=None, where_field=None,
                         where_table=None,
                         target_value=None, header=None
                         ):
        """

        :param from_table: Base table used in join query.
        :param fields: Fields to be fetched in the query.
        :param join_table: Join table used in the query.
        :param common_field: Common field that has been a part of both tables.
        :param where_field: where field in the query.
        :param where_table: where table which is third joining table.
        :param target_value: Target field of where field.
        :param header: A list of column headers to display in the formatted table.

        :return:  Formatted table containing the retrieved data.
        """
        joined_fields = ''
        for k, v in fields.items():
            for val in v:
                joined_fields += f'{k}.{val}, '
        joined_fields = joined_fields.rstrip(', ')
        query = f'''
        SELECT 
        {joined_fields}
        FROM
        {from_table}
        JOIN
        {join_table} ON {from_table}.{common_field} = {join_table}.{common_field}
        WHERE
        {where_table}.{where_field} = {target_value};
        '''
        self.db_cursor.execute(query)
        output = self.db_cursor.fetchall()
        table = tabulate(output, headers=header, tablefmt='grid')

        return table

    def execute_query(self, query, header, get_raw=None):
        """

        :param query: Query to be executed
        :param header: A list of column headers to display in the formatted table.
        :param get_raw: Boolean field used to return raw query output data without formatting.

        :return:  Formatted table containing the retrieved data.
        """
        self.db_cursor.execute(query)
        output = self.db_cursor.fetchall()
        if get_raw:
            return output[0]
        table = tabulate(output, headers=header, tablefmt='grid')

        return table

    def update_query(self, table_name, fields, where_field, target_value):
        """
        :param table_name: A table to update fields.
        :param fields: Fields to be updated.
        :param where_field: The field to use in the WHERE condition.
        :param target_value: The value to match in the WHERE condition.

        :return: None
        """
        set_clause = ', '.join([f"{key} = '{value}'" for key, value in fields.items()])
        where_clause = f"{where_field} = '{target_value}'"
        query = f"UPDATE {table_name} SET {set_clause} WHERE {where_clause};"
        self.db_cursor.execute(query)
        self.db_connection.commit()

    def close_connection(self):
        """
        Closes the database connection.

        :return: None
        """
        self.db_cursor.close()
        self.db_connection.close()
