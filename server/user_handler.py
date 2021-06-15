import connection_handler


@connection_handler.connection_handler
def get_all_users(cursor):
    query = """
    SELECT user_name FROM users
    ORDER BY user_name ASC"""

    cursor.execute(query)
    return cursor.fetchall()