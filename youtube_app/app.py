from powerful import Flask, render_template, download_video, request
import subprocess

app = Flask(__name__, static_folder="static")


@app.route("/")
def home():
    return render_template("youtubeDown/index.html", ti="ti")


@app.route("/youtube")
def download():
    value = request.args.get("value", "")
    reso = request.args.get("resolution", "")
    result = subprocess.check_output(["python", "youtubeWeb.py", value, reso])
    return result


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
