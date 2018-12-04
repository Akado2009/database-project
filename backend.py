from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

import random
import json
import time


app = Flask(__name__)
CORS(app)

@app.route("/submit_genes/", methods=['POST'])
def submit_genes():
    data = json.loads(request.data)
    genes = data.get("genes")
    time.sleep(2)
    response = {
        "status": 200,
        "number_of_genes": random.randint(1, 100000)
    }

    return jsonify(response)

@app.route("/fetch_genes/", methods=['GET'])
def fetch_genes():
    time.sleep(2)
    genes = [
        {
            "label": "ATXN3",
        },
        {
            "label": "ITPK1",
        },
        {
            "label": "MIR494",
        },
        {
            "label": "ACIN1",
        },
        {
            "label": "OSGEP",
        }
    ]

    response = {
        "status": 200,
        "genes": genes
    }

    return jsonify(response)
