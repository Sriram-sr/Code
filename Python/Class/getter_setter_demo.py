class DatabaseOperations:
    def __init__(self, host, password, key):
        self.db_host = host
        self.password = password
        self._secure_key = key

    def connect_database(self):
        return 'Connected to database'
    
    def get_secure_key(self):
        return self._secure_key
    
    def set_secure_key(self, new_key):
        self._secure_key = new_key

    secure_key = property(get_secure_key, set_secure_key)

db_client = DatabaseOperations('mycloudhosteddb.com', 'supersucerepassword', 'publickey')
# print(db_client.secure_key)
db_client.secure_key = 'SuperComplexKey'
# print(db_client.secure_key)