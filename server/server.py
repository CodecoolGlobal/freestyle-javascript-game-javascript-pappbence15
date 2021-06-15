from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)


@app.route("/", methods=['POST', 'GET'])
def hello():
    return render_template("index.html")


@app.route("/login", methods=['POST', 'GET'])
def login():
    return render_template("login.html")


@app.route("/registration", methods=['POST', 'GET'])
def registration():
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
