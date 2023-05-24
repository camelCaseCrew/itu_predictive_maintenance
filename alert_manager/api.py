import flask
import yaml
import os
import requests
import subprocess
from flask_cors import CORS

emails = ["camelcasecrew@gmail.com"]
app = flask.Flask(__name__)
CORS(app)

@app.route("/update/<email>", methods=["PUT"])
def update(email):

    print("Received PUT request for email " + email)

    if emails.__contains__(email):
        print("This email is already subscribed to alerts.")
        return {
            "message": "this email is already subscribed",
            "code": 400
        }

    emails.append(email)
    print("email added: ", email)

    with open("alertmanager.yml", "r") as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
    data.get("receivers")[0].get("email_configs")[0]["to"] = ', '.join(emails)
    
    print("data variable: ", data)

    with open("alertmanager.yml", "w") as f:
        yaml.dump(data, f)

    print("updated config file")

    subprocess.run(["kill", "-HUP", "$(pidof alertmanager)"])

    return {
        "message": "added email to list",
        "code": 200
    }

@app.route("/remove/<email>", methods=["DELETE"])
def remove(email):

    print("Received DELETE request for email " + email)

    if not emails.__contains__(email):
        print("Email is not subscribed to alerts")
        return {
            "message": "this email is not subscribed to alerts",
            "code": 400
        }
    
    emails.remove(email)
    print("email removed: ", email)

    if len(emails) == 0:
        emails.append("test@example.com")

    with open("alertmanager.yml", "r") as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
    data.get("receivers")[0].get("email_configs")[0]["to"] = ', '.join(emails)

    print("data variable: ", data)

    with open("alertmanager.yml", "w") as f:
        yaml.dump(data, f)
    print("updated config file")

    subprocess.run(["kill", "-HUP", "$(pidof alertmanager)"])

    return {
        "message": "removed email from list",
        "code": 200
    }

@app.route("/ping", methods=["GET"])
def ping():
    print("pong")
    return "pong"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port, debug=True, host='0.0.0.0')