from powerful import Flask, render_template, request, get_video_size, jsonify, sayHello
import subprocess

app = Flask(__name__, static_folder="static")


sayHello()


@app.route("/")
def home():
    return render_template("youtubeDown/index.html", ti="ti")


@app.route("/about")
def about():
    return render_template("youtubeDown/about.html")


@app.route("/youtube")
def download():
    value = request.args.get("value", "")
    reso = request.args.get("resolution", "")
    result = subprocess.check_output(["python", "youtubeWeb.py", value, reso])
    return result


@app.route("/size")
def sizePage():
    video_url = request.args.get("value")
    video_size = get_video_size(video_url)
    return jsonify({"size": video_size})


@app.route("/qr")
def qrPage():
    return render_template("qrCode.html")


@app.route("/downloadQr")
def downQr():
    value = request.args.get("value", "")
    result = subprocess.check_output(["python", "qr.py", value])
    return result


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")


if __name__ == "__main__":
    app.run(debug=True, port=3000, host="0.0.0.0")
