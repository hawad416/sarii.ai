from model_base import construct_index, ask_ai
from IPython.display import display, Markdown
import os

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/home/data')
def get_data():
    # your Python code to retrieve data goes here
    data = {'response': ask_ai()}
    return jsonify(data)

if __name__ == '__main__':
    os.environ["OPENAI_API_KEY"] = "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"

    app.run(port=8080)
