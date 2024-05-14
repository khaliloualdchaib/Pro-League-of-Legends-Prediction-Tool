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
        print(opponent_game_with_champ_ids)
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

def counter_pick(champ,opp_champ):

    csv_file = "src/csv/players.csv"
    
    df = pd.read_csv(csv_file)

    data_champ = df[(df['champion'] == champ)]

    avg_golddif = data_champ['golddiffat15'].mean()

    # Get the game IDs where the champ played
    champ_game_ids = set(df[df['champion'] == champ]['gameid'].unique())

    # Get the game IDs where the opp_champ played
    opp_champ_game_ids = set(df[df['champion'] == opp_champ]['gameid'].unique())

    # Calculate the inner join of game IDs
    inner_join_game_ids = champ_game_ids.intersection(opp_champ_game_ids)

    data_champ_vs = df[(df['champion'] == champ)  & df['gameid'].isin(inner_join_game_ids)]
    
    avg_golddif_champ = data_champ_vs['golddiffat15'].mean()

    result = 0

    maximum = sys.maxsize
    minimum = -sys.maxsize - 1

    # Between -300 and 0
    if avg_golddif >= avg_golddif_champ and avg_golddif_champ + 300 >= avg_golddif:
        result = 0
    # Between 0 and 300
    elif avg_golddif <= avg_golddif_champ and avg_golddif + 300 >= avg_golddif_champ:
        result = 0
    # Between -300 and -700
    elif avg_golddif >= avg_golddif_champ + 300 and avg_golddif_champ + 700 >= avg_golddif:
        result = -0.10
    # Between 300 and 700
    elif avg_golddif + 300 <= avg_golddif_champ and avg_golddif + 700 > avg_golddif_champ:
        result = 0.10
    # Between -700 and -infinity
    elif avg_golddif >= avg_golddif_champ + 700 and avg_golddif_champ + minimum >= avg_golddif:
        result = -0.20
    # Between 700 and infinity
    elif avg_golddif + 700 <= avg_golddif_champ and avg_golddif + maximum > avg_golddif_champ:
        result = 0.20

    return result





