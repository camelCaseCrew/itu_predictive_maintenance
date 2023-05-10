import flask
import yaml
import os
import requests

emails = []
app = flask.Flask(__name__)

@app.route("/update/<email>", methods=["PUT"])
def update(email):
    emails.append(email)
    print("emails added: ", email)

    with open("alertmanager.yml", "r") as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
    data.get("receivers")[0].get("email_configs")[0]["to"] = ', '.join(emails)
    print("data variable: ", data)

    with open("alertmanager.yml", "w") as f:
        yaml.dump(data, f)
    print("update config file")
    return {
        "message": "added email to list",
        "code": 200
    }

@app.route("/remove/<email>", methods=["DELETE"])
def remove(email):
    if not emails.__contains__(email):
        print("This email is not already subscribed to alerts.")
        return {
            "message": "Bad Request: This email is not already subscribed to alerts.",
            "code": 400
        }
    
    emails.pop(email)
    print("email removed: ", email)

    with open("alertmanager.yml", "r") as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
    data.get("receivers")[0].get("email_configs")[0]["to"] = ', '.join(emails)
    print("data variable: ", data)

    with open("alertmanager.yml", "w") as f:
        yaml.dump(data, f)
    print("update config file")
    return {
        "message": "Removed email from list",
        "code": 200
    }

@app.route("/ping", methods=["GET"])
def ping():
    print("pong")
    return "pong"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port, debug=True, host='0.0.0.0')