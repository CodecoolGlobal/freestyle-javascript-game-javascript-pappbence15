from flask import Flask, render_template, request
import user_handler

app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("index.html")


@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        try:
            username = request.form["username"]
            password = request.form["password"]
            correct_password = user_handler.get_users_password(username)[0]["password"]
            if bcrypt.checkpw(password.encode('utf-8'), correct_password.encode('utf-8')):
                session["username"] = username
                return redirect(url_for("/"))
            else:
                return render_template("index.html", failed=True)
        except IndexError:
            return render_template("index.html", failed=True)

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("username")
    return redirect(url_for("/"))


@app.route("/registration", methods=['POST', 'GET'])
def registration():
    if request.method == "POST":
        if request.form['password'] == request.form['repeat_password']:
            hashed_password = util.hash_password(request.form['password'])
            user_handler.register_user(request.form['user_name'], hashed_password)
            return redirect("/")
        return render_template('registration.html', error_message='Two passwords are not matching')
    return render_template("registration.html")


@app.route("/userpage", methods=['POST', 'GET'])
def user_page():
    return render_template("userpage.html")


@app.route("/game")
def game():
    return render_template("game.html")


if __name__ == '__main__':
    app.run(
        debug=True,
        port=8000
    )
