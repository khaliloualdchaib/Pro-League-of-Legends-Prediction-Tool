from flask import request, jsonify
from flask_restful import Resource
import json
from .utils import response_400, load_feature_importance, get_predictions, calculate_player_stats, player_only_statistics
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
    
    def getplayerStats(self, team1Players, team1Champs, team2Players, team2Champs):
        playerStats = {
            "Team1": {
                "Top": {},
                "Jungle":{},
                "Mid":{},
                "Bottom": {},
                "Support": {}
            },
            "Team2": {
                "Top": {},
                "Jungle":{},
                "Mid":{},
                "Bottom": {},
                "Support": {}
            }
        }
        for team in playerStats:
            for role in playerStats[team]:
                if team == "Team1":
                    kda, kda15, kda10, golddiffat10, golddiffat15, wr, gp, earned_gpm, kills, assists, deaths = calculate_player_stats(team1Players[role], team1Champs[role])                   
                else:
                    kda, kda15, kda10, golddiffat10, golddiffat15, wr, gp, earned_gpm, kills, assists, deaths = calculate_player_stats(team2Players[role], team2Champs[role])
                playerStats[team][role] = {
                    "kda" : kda, 
                    "kda15": kda15, 
                    "kda10": kda10, 
                    "golddiffat10": golddiffat10, 
                    "golddiffat15": golddiffat15, 
                    "Winrate": wr, 
                    "PlayedGames": gp, 
                    "GPM": earned_gpm, 
                    "Kills": kills, 
                    "Assists": assists, 
                    "Deaths": deaths
                }
        return playerStats

    def recentPage(self, team1Players, team2Players):
        matches = {
            "Team1": {},
            "Team2": {}
        }
        for role in team1Players:
            matches["Team1"][role] = player_only_statistics(team1Players[role])
        for role in team2Players:
            matches["Team2"][role] = player_only_statistics(team2Players[role])
        return matches
                
    
    def get(self):
        team1Players = json.loads(request.args.get('team1Players'))
        team1Champs = json.loads(request.args.get('team1Champs'))
        team2Players = json.loads(request.args.get('team2Players'))
        team2Champs = json.loads(request.args.get('team2Champs'))

        

        responsejson = {
            "predictions": self.prediction_page(team1Players, team1Champs, team2Players, team2Champs),
            "playerStats": self.getplayerStats(team1Players, team1Champs, team2Players, team2Champs),
            "recentGames": self.recentPage(team1Players, team1Players)
        } 

        return jsonify(responsejson)