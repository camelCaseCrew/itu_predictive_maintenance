import flask
import yaml
import os

emails = []
app = flask.Flask(__name__)

@app.route("/update/<email>", methods=["PUT"])
def update(email):
    emails.append(email)
    print("emails updated: ", emails)

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

@app.route("/ping", methods=["GET"])
def ping():
    print("pong")
    return "pong"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port, debug=True, host='0.0.0.0')