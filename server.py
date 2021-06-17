from flask import Flask, render_template, request, session, redirect, url_for
import user_handler
import util
import bcrypt
import os


app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')


@app.route("/")
def hello():
    biggest_wins = user_handler.get_biggest_wins()
    return render_template("index.html", session=session, biggest_wins=biggest_wins)


@app.route("/login", methods=['POST', 'GET'])
def login():
    biggest_wins = user_handler.get_biggest_wins()
    if request.method == "POST":
        try:
            username = request.form["username"]
            password = request.form["password"]
            correct_password = user_handler.get_users_password(username)[0]["password"]
            if bcrypt.checkpw(password.encode('utf-8'), correct_password.encode('utf-8')):
                session["username"] = username
                return redirect(url_for("hello"))
            else:
                return render_template("index.html", failed=True, session=session, biggest_wins=biggest_wins)
        except IndexError:
            return render_template("index.html", failed=True, session=session, biggest_wins=biggest_wins)

    return render_template("login.html", session=session, biggest_wins=biggest_wins)



@app.route("/logout")
def logout():
    session.pop("username")
    return redirect(url_for("hello"))


@app.route("/registration", methods=['POST', 'GET'])
def registration():
    if request.method == "POST":
        if request.form['password'] == request.form['repeat_password']:
            hashed_password = util.hash_password(request.form['password'])
            user_handler.register_user(request.form['user_name'], hashed_password)
            return redirect("/")
        return render_template('registration.html', error_message='Two passwords are not matching')
    return render_template("registration.html")


@app.route("/<username>", methods=['POST', 'GET'])
def user_page(username):
    username = session["username"]
    user_details = user_handler.get_users_details(username)[0]
    return render_template("userpage.html", username=username, user_details=user_details)


@app.route("/game")
def game():
    if "username" in session:
        username = session["username"]
        user_details = user_handler.get_users_details(username)[0]
        return render_template("game.html", user_details=user_details)
    else:
        biggest_wins = user_handler.get_biggest_wins()
        return render_template("index.html", not_logged_in=True, session=session, biggest_wins=biggest_wins)


@app.route("/rules")
def rules():
    return render_template("rules.html")


@app.route("/checkout", methods=["GET", "POST"])
def checkout():
    if request.method == "POST":
        username = session["username"]
        user_details = user_handler.get_users_details(username)[0]
        new_balance = request.form['balance']
        if int(request.form["win_this_round"]) > int(user_details["biggest_win"]):
            biggest_win = int(request.form["win_this_round"])
        else:
            biggest_win = int(user_details["biggest_win"])
        user_handler.checkout(new_balance, biggest_win, session["username"])

        return redirect(url_for("hello"))


@app.route("/add", methods=["GET", "POST"])
def add_money():
    if request.method == "POST":
        username = session["username"]
        user_details = user_handler.get_users_details(username)[0]
        added_money = int(request.form["added_money"])
        current_money = int(user_details["balance"])
        new_balance = current_money + added_money
        biggest_win = user_details["biggest_win"]
        user_handler.checkout(new_balance, biggest_win, username)
        return redirect("/user_page")


@app.route("/delete")
def delete_user():
    username = session["username"]
    user_handler.delete_user(username)
    return redirect(url_for("logout"))

  
if __name__ == '__main__':
    app.run(
        debug=True,
        port=8000
    )
