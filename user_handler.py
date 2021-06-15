import connection_handler


@connection_handler.connection_handler
def get_all_users(cursor):
    query = """
    SELECT user_name FROM users
    ORDER BY user_name ASC"""

    cursor.execute(query)
    return cursor.fetchall()


@connection_handler.connection_handler
def get_users_password(cursor, username):
    query = """
    SELECT password FROM users
    WHERE user_name = %s"""

    cursor.execute(query, (username,))
    return cursor.fetchall()


@connection_handler.connection_handler
def register_user(cursor, user_name, password):
    query = """
        INSERT INTO users (user_name, password, balance)
        values (%s, %s, %s)
"""
    cursor.execute(query, (user_name, password, 5000))
