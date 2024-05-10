from flask import request, make_response
from flask_restful import Resource
from flask import Response
from .utils import get_players, response_400

class Players(Resource):
    def route():
        return '/api/players'
    
    def get(self):
        team = request.args.get('team')
        
        response400 = response_400()
        if team is None:
            return response400
        else:
            players = get_players(team=team)
            return players

    

