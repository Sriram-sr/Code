from sqlalchemy import create_engine, text


def get_connection_string():
    user = 'root'
    host = 'localhost'
    database = 'playground'
    password = 'sriram'
    database_url = 'mysql://{}:{}@{}/{}'.format(user, password, host, database)

    return database_url


CONNECTION_URL = get_connection_string()

engine = create_engine(CONNECTION_URL)

with engine.connect() as conn:
    result = conn.execute(text("select 'anything'"))
    print(result.all())


# https://docs.sqlalchemy.org/en/20/tutorial/index.html
# https://docs.sqlalchemy.org/en/20/tutorial/dbapi_transactions.html
