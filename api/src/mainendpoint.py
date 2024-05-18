from flask import request, jsonify
from flask_restful import Resource
import json
from .utils import response_400, load_feature_importance, get_predictions, calculate_player_stats
class MainEndpoint(Resource):
    def route():
        return '/api/main'
    

    def prediction_page(self, team1Players, team1Champs, team2Players, team2Champs):
        importance = ['firstbaron','firsttower','result']
        predictions = {}
        predictions["importance"] = {}
        predictions["classifications"] = {}


        team1Players_list = list(team1Players.values())
        team1Champs_list = list(team1Champs.values())
        team2Players_list = list(team2Players.values())
        team2Champs_list = list(team2Champs.values())

        for pred in importance:
            predictions["importance"][pred] = load_feature_importance(pred)

            classification = get_predictions(team1Players_list, team1Champs_list, team2Players_list, team2Champs_list, pred)
            predictions["classifications"][pred] = classification
        
        return predictions
    
    def playerStats_page(self, team1Players, team1Champs, team2Players, team2Champs):
        playerStats = {}
        
    
    def get(self):
        try:
            team1Players = json.loads(request.args.get('team1Players'))
            team1Champs = json.loads(request.args.get('team1Champs'))
            team2Players = json.loads(request.args.get('team2Players'))
            team2Champs = json.loads(request.args.get('team2Champs'))

            

            responsejson = {
                "predictions": self.prediction_page(team1Players, team1Champs, team2Players, team2Champs)
            } 

            return jsonify(responsejson)
        
        except Exception as e:
            print("Error:", e)
            return response_400()
