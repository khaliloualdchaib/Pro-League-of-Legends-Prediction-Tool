from flask import request, jsonify
from flask_restful import Resource
import json
from .utils import response_400, get_most_kills

class MainEndpoint(Resource):
    def route():
        return '/api/main'
    
    def get(self):
        try:
            team1Players = json.loads(request.args.get('team1Players'))
            team1Champs = json.loads(request.args.get('team1Champs'))
            team2Players = json.loads(request.args.get('team2Players'))
            team2Champs = json.loads(request.args.get('team2Champs'))

            print("Team 1 Players:", team1Players)
            print("Team 1 Champs:", team1Champs)
            print("Team 2 Players:", team2Players)
            print("Team 2 Champs:", team2Champs)

            responsejson = {
                "First Blood": None,
                "First Tower": None,
                "First Drake": None,
                "Most Kills": None,
                "Winning Team": None
            } 

            return jsonify(responsejson)
        
        except Exception as e:
            print("Error:", e)
            return response_400()
