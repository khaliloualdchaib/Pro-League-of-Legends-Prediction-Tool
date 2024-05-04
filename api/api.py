from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import src
#from src.teams import Teams
#from src.utils import get_column_values_from_csv


app = Flask(__name__)

api = Api(app)
CORS(app)

api.add_resource(src.Teams, src.Teams.route())

if __name__ == "__main__":
    app.run(host="0.0.0.0")
