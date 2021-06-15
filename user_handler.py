import connection_handler


@connection_handler.connection_handler
def get_all_users(cursor):
    query = """
    SELECT user_name FROM users
    ORDER BY user_name ASC"""

    cursor.execute(query)
    return cursor.fetchall()

def get_users_password(cursor, username):
    query = """
    SELECT password FROM users
    WHERE user_name = %s"""

    cursor.execute(query, (username,))
    return cursor.fetchall()