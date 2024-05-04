from flask import Flask, jsonify

app = Flask(__name__)

# Sample data
sample_data = {
    "message": "Hello, world!",
    "numbers": [1, 2, 3, 4, 5],
    "person": {
        "name": "John Doe",
        "age": 30,
        "city": "New York"
    }
}

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(sample_data)

if __name__ == '__main__':
    app.run(debug=True)