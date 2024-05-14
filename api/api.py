from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import src


app = Flask(__name__)

api = Api(app)
CORS(app)

api.add_resource(src.Teams, src.Teams.route())
api.add_resource(src.Most_kills, src.Most_kills.route())
api.add_resource(src.Players, src.Players.route())
api.add_resource(src.MainEndpoint, src.MainEndpoint.route())

if __name__ == "__main__":
    app.run(host="0.0.0.0")
