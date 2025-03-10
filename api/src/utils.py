import csv
import json
import pandas as pd
from flask import make_response
import sys
import joblib

roles = ['top', 'jng', 'mid', 'bot', 'sup']
sides = ['Blue', 'Red']

def get_column_values_from_csv(column_index, teams):
    if teams:
        csv_file = "src/csv/teams.csv"
    else:
        csv_file = "src/csv/players.csv"

    values = set()
    with open(csv_file, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        
        # Skip the header row
        next(csv_reader)
        
        for row in csv_reader:
            if len(row) > column_index:  # Ensure the row has the specified column
                value = row[column_index]  # Get the value from the specified column
                if value.strip():  # Check if the value is not empty
                    values.add(value.strip())
    values = list(values)
    return {"teams": values}



def get_players(team):
    csv_file = "src/csv/players.csv"
    
    df = pd.read_csv(csv_file)

    returnjson = {
        "top" : [],
        "jng" : [],
        "mid" : [],
        "bot" : [],
        "sup" : []
    }

    players = set(df[df['teamname'] == team]['playername'])
    for i in list(players):
        position = df[df['playername'] == i]['position'].unique()
        returnjson[position[0]].append(i)
    
    return returnjson



def response_400():
    response_content = {
            "status" : "400",
            "data" : None
        }
    
    return make_response(response_content)



def calculate_player_stats(player_name, champion):
    """
    Calculate player statistics including KDA at 10 and 15 minutes, gold difference at 10 and 15 minutes, and win rate.

    Parameters:
    player_name (str): Name of the player.
    champion (str): Name of the champion.
    df (pd.DataFrame): DataFrame containing the game data.

    Returns:
    tuple: A tuple containing KDA at 10 minutes, KDA at 15 minutes, gold difference at 10 minutes,
           gold difference at 15 minutes, and win rate.
    """

    csv_file = "src/csv/players.csv"

    df = pd.read_csv(csv_file)

    player_data = df[(df['playername'] == player_name) & (df['champion'] == champion)]

    if player_data.empty:
        
        return 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    
    
    kills = player_data['kills'].mean()
    assists = player_data['assists'].mean()
    deaths = player_data['deaths'].mean()
    #print("player: ", player_name, "champion: ", champion)
    #print("kills: ", kills,"assists: ", assists, "deaths: ", deaths)
    if deaths == 0:
        tmpdeaths = 1
    else:
        tmpdeaths = deaths
    kda = round( (kills + assists) / tmpdeaths, 2)

    kills10 = player_data['killsat10'].mean()
    assists10 = player_data['assistsat10'].mean()
    deaths10 = player_data['deathsat10'].replace(0, 1).mean()
    kda10 = round((kills10 + assists10) / deaths10, 2)

    kills15 = player_data['killsat15'].mean()
    assists15 = player_data['assistsat15'].mean()
    deaths15 = player_data['deathsat15'].replace(0, 1).mean()
    kda15 = round((kills15 + assists15) / deaths15, 2)

    golddiffat10 = round(player_data['golddiffat10'].mean(), 2)
    golddiffat15 = round(player_data['golddiffat15'].mean(), 2)
    earned_gpm = round(player_data['earned gpm'].mean(), 2)

    wr = round(player_data['result'].mean() * 100, 2)
    gp = player_data.shape[0]

    return kda, kda15, kda10, golddiffat10, golddiffat15, wr, gp, earned_gpm, kills, assists, deaths


def get_predictions(team1Players,team1Champs, team2Players, team2Champs, prediction_target):
    """
    Get predictions for the specified player and champion using the saved model.

    Parameters:
    team1Players (list): Name of the players in order ('top','jng','mid','bot','sup') of Blue side.
    team1Champs (str): Name of the champions in order ('top','jng','mid','bot','sup') of Blue side.
    team2Players (list): Name of the players in order ('top','jng','mid','bot','sup') of Red side.
    team2Champs (str): Name of the champions in order ('top','jng','mid','bot','sup') of Red side.

    Returns:
    str: Predicted outcome ('Win' or 'Loss' for binary predictions).
    """
    # Load the saved model
    model_filename = f"src/Models/{prediction_target}_model.pkl"

    classifier = joblib.load(model_filename)

    # Initialize the input_data DataFrame with one row
    input_data = pd.DataFrame(index=[0])

    players = []
    champs = []

    newroles = []
    newsides = sides * 5

    for i in range(len(team1Players)):
        newroles.append(roles[i])
        newroles.append(roles[i])
        players.append(team1Players[i])
        champs.append(team1Champs[i])
        players.append(team2Players[i])
        champs.append(team2Champs[i])
    
    for i in range(len(players)):
        #print(i)
        kda, kda15, kda10, golddiffat10, golddiffat15, wr, gp, _, _, _ , _ = calculate_player_stats(players[i], champs[i])
        input_data[f"{newsides[i]}{newroles[i]}gp"] = gp
        input_data[f"{newsides[i]}{newroles[i]}wr"] = wr
        if prediction_target == 'result':
            input_data[f"{newsides[i]}{newroles[i]}kda"] = kda
        else:
            input_data[f"{newsides[i]}{newroles[i]}kda10"] = kda10
            input_data[f"{newsides[i]}{newroles[i]}kda15"] = kda15
            input_data[f"{newsides[i]}{newroles[i]}golddiffat10"] = golddiffat10
            input_data[f"{newsides[i]}{newroles[i]}golddiffat15"] = golddiffat15

    # Make predictions
    prediction = classifier.predict(input_data)

    return int(prediction[0])  # Return raw prediction if not binary


def load_feature_importance(prediction_target):
    """
    Load the feature importance CSV for a given prediction target.

    Parameters:
    prediction_target (str): The target variable for prediction ('firstbaron','firsttower','result').

    Returns:
    DataFrame: The feature importance DataFrame.
    """
    feature_importance_filename = f"src/Models/{prediction_target}_feature_importance.json"
    with open(feature_importance_filename, 'r') as f:
        return json.load(f)

def player_only_statistics(player_name):
    csv_file = "src/csv/players.csv"

    df = pd.read_csv(csv_file)

    player_data = df[(df['playername'] == player_name)]
    
    player_stats = []

    for index, row in player_data.iterrows():
        tmp = row['deaths']
        if tmp == 0:
            tmp = 1
        kda = (row['kills'] + row['assists'])/tmp
        player_stats.append(kda)

    return player_stats