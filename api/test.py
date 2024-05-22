from src.utils import get_column_values_from_csv, get_players, calculate_player_stats, get_predictions, load_feature_importance, player_only_statistics



#print(get_most_kills("Jojopyun"))
#print(get_column_values_from_csv(3,True))
#print(get_players("G2 Esports"))
#print(counter_pick("Sion","Gwen"))
#print(calculate_player_stats(player_name="Faker",champion="Ahri"))

#team2Players = ["Zeus","Oner","Faker","Gumayusi","Keria"]
#team2Champs = ["K'Sante","Viego","Taliyah","Varus","Nautilius"]
#team1Players = ["Bin","Xun","knight","Elk","ON"]
#team1Champs = ["Camille","Xin Zhao","Neeko","Senna","Orn"]

#print(get_predictions(team1Players=team1Players,team1Champs=team1Champs,team2Players=team2Players,team2Champs=team2Champs,prediction_target="result"))
#print(get_predictions(team1Players=team1Players,team1Champs=team1Champs,team2Players=team2Players,team2Champs=team2Champs,prediction_target="firsttower"))
#print(get_predictions(team1Players=team1Players,team1Champs=team1Champs,team2Players=team2Players,team2Champs=team2Champs,prediction_target="firstbaron"))


print(player_only_statistics("Impact")[0])
print(player_only_statistics("Sniper")[0])