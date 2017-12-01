from flask import Flask, send_from_directory, jsonify
from tools.telemetry import getCoords, copterConnect

app = Flask(__name__, static_url_path='', static_folder='./dist')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def default(e):
    return app.send_static_file('index.html')

@app.route('/api/getCoords', methods=['GET'])
def retreeveCoords():
    return jsonify(getCoords())

@app.route('/api/connect', methods=['POST'])
def telemConnect():
    return jsonify(copterConnect())

if __name__ == '__main__':
    app.run(debug=True)
