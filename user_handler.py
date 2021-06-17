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
        INSERT INTO users (user_name, password, balance, biggest_win)
        VALUES (%s, %s, %s, %s)
"""
    cursor.execute(query, (user_name, password, 5000, 0))


@connection_handler.connection_handler
def get_biggest_wins(cursor):
    query = """
        SELECT user_name, biggest_win
        FROM users
        ORDER BY biggest_win
        LIMIT 5
    """

    cursor.execute(query)
    return cursor.fetchall()

  
@connection_handler.connection_handler
def get_users_details(cursor, username):
    query = """
    SELECT * FROM users
    WHERE user_name = %s"""

    cursor.execute(query, (username,))
    return cursor.fetchall()

@connection_handler.connection_handler
def checkout(cursor, new_balance, biggest_win, username):
    query = """
    UPDATE users
    SET balance = %s,
        biggest_win = %s
    WHERE user_name = %s"""

    cursor.execute(query, (new_balance, biggest_win, username))
