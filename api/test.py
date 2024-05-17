from src.utils import get_column_values_from_csv, get_players, calculate_player_stats, get_predictions



#print(get_most_kills("Jojopyun"))
#print(get_column_values_from_csv(3,True))
#print(get_players("G2 Esports"))
#print(counter_pick("Sion","Gwen"))
#print(calculate_player_stats(player_name="Faker",champion="Ahri"))

team1Players = ["Sniper","River","Quid","Meech","Eyla"]
team1Champs = ["Riven","Vi","Yone","Seraphine","Karma"]
team2Players = ["fNb","Aegis","Grevthar","Brance","JoJo"]
team2Champs = ["K'Sante","Jax","Neeko","Aphelios","Nautilus"]

print(get_predictions(team1Players=team1Players,team1Champs=team1Champs,team2Players=team2Players,team2Champs=team2Champs,prediction_target="result"))