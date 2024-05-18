from flask import request, jsonify
from flask_restful import Resource
import json
from .utils import response_400, load_feature_importance
class MainEndpoint(Resource):
    def route():
        return '/api/main'
    
    def get(self):
        try:
            team1Players = json.loads(request.args.get('team1Players'))
            team1Champs = json.loads(request.args.get('team1Champs'))
            team2Players = json.loads(request.args.get('team2Players'))
            team2Champs = json.loads(request.args.get('team2Champs'))

            importance = ['firstbaron','firsttower','result']

            predictions = {}
            predictions["importance"] = {}

            for pred in importance:
                predictions["importance"][pred] = load_feature_importance(pred)

            responsejson = {
                "predictions": predictions
            } 

            return jsonify(responsejson)
        
        except Exception as e:
            print("Error:", e)
            return response_400()
