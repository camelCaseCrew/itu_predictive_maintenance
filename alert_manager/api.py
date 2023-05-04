import flask
import os

emails = []

@app.route("/<email>")
def update(email):
    emails.append(email)
    