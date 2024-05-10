from flask import request, make_response
from flask_restful import Resource
from flask import Response
from .utils import get_most_kills, response_400

class Most_kills(Resource):
    def route():
        return '/api/most_kills'
    
    def get(self):
        player = request.args.get('player')
        champ = request.args.get('champ')
        opponent = request.args.get('opponent')
        opponent_champ = request.args.get('opponent_champ')
        
        response400 = response_400()
        if player is None:
            return response400
        else:
            kills = get_most_kills(player=player,champ=champ,opponent=opponent,opponent_champ=opponent_champ)
            if kills is None:
                return response400
            return {"Most Kills" : kills}

    
