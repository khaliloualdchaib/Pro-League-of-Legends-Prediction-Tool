import csv
import json
import pandas as pd
from flask import make_response
import sys

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


def get_most_kills(player,champ = None,opponent = None,opponent_champ = None):
    csv_file = "src/csv/players.csv"
    
    df = pd.read_csv(csv_file)

    # Filter the DataFrame for the specified player
    data = df[df['playername'] == player]

    if champ and opponent is None and opponent_champ is None:
        data = df[(df['playername'] == player) & (df['champion'] == champ)]

    elif opponent and opponent_champ is None and champ is None:
        # Get the game IDs where the opponent played
        opponent_game_ids = df[df['playername'] == opponent]['gameid'].unique()
        # Filter the DataFrame for the specified player, champion, and opponent games
        data = df[(df['playername'] == player) & df['gameid'].isin(opponent_game_ids)]

    elif opponent and opponent_champ is None:
        # Get the game IDs where the opponent played
        opponent_game_ids = df[df['playername'] == opponent]['gameid'].unique()
        # Filter the DataFrame for the specified player, champion, and opponent games
        data = df[(df['playername'] == player) & (df['champion'] == champ) & df['gameid'].isin(opponent_game_ids)]

    elif opponent_champ:
        # Get the game IDs where the opponent played the opponent_champ
        opponent_game_with_champ_ids = df[(df['playername'] == opponent) & (df['champion'] == opponent_champ)]['gameid'].unique()
        data = df[(df['playername'] == player) & (df['champion'] == champ) & df['gameid'].isin(opponent_game_with_champ_ids)]
    
    # Group the data by player name and calculate the average kills
    
    average_kills = data['kills'].mean()
    
    return average_kills

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
        return None
    
    kills = player_data['kills'].mean()
    deaths = player_data['deaths'].replace(0, 1).mean()
    kda = round(kills / deaths, 2)

    kills10 = player_data['killsat10'].mean()
    deaths10 = player_data['deathsat10'].replace(0, 1).mean()
    kda10 = round(kills10 / deaths10, 2)

    kills15 = player_data['killsat15'].mean()
    deaths15 = player_data['deathsat15'].replace(0, 1).mean()
    kda15 = round(kills15 / deaths15, 2)

    golddiffat10 = round(player_data['golddiffat10'].mean(), 2)
    golddiffat15 = round(player_data['golddiffat15'].mean(), 2)

    wr = round(player_data['result'].mean() * 100, 2)
    gp = player_data.shape[0]

    return kda, kda15, kda10, golddiffat10, golddiffat15, wr, gp