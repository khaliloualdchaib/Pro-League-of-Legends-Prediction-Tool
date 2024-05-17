import pandas as pd
from tqdm import tqdm


def players_and_teams(df):
    # Filter data for players and teams
    players_data = df[df['position'] != 'team']
    teams_data = df[df['position'] == 'team']

    # Create a new DataFrame with only selected columns
    players_columns  = ['gameid', 'side', 'position', 'playername', 'playerid', 'teamname', 'teamid', 'champion', 'result', 'kills', 'deaths', 'killsat10', 'deathsat10','killsat15', 'deathsat15', 'assists', 'firstblood', 'firstbloodkill', 'firstbloodvictim','golddiffat10', "golddiffat15",]
    teams_columns  = ['gameid', 'side', 'teamname', 'teamid', 'result', 'firstblood','team kpm', 'firstdragon', 'firstherald', 'firstbaron', 'firsttower' ]

    # Create DataFrames for players and teams
    players = players_data[players_columns]
    teams = teams_data[teams_columns]

    # Save the new DataFrame to a CSV file
    players.to_csv('players.csv', index=False)
    teams.to_csv('teams.csv', index=False)


def calculate_player_statistics(gameid,role,side,df):
    """
    Calculate statistics for a specific player with a specific champion in a specific role and side in a given game.

    Parameters:
    gameid (int): The ID of the game.
    role (str): The role of the player ('top', 'jng', 'mid', 'bot', 'sup').
    side (str): The side of the player ('Blue' or 'Red').
    df (pd.DataFrame): The DataFrame containing game data.

    Returns:
    tuple: A tuple containing the number of games played (gp), win rate (wr), and KDA (kda).
    """
    name = df[(df['gameid'] == gameid) & (df['position'] == role) & (df['side'] == side)]['playername'].iloc[0]
    champ = df[(df['gameid'] == gameid) & (df['position'] == role) & (df['side'] == side)]['champion'].iloc[0]
    name_champ = df[(df['playername'] == name) & (df['champion'] == champ)]
    gp = name_champ.shape[0]
    wr = round(name_champ['result'].mean(),2)
    kills = name_champ['kills'].mean()
    deaths = name_champ['deaths'].replace(0, 1).mean()
    kda = round(kills/deaths,2)

    return gp,wr,kda


def csv_players_statiscs(df):
    """
    Generate player statistics for each game and save them to a CSV file.

    Parameters:
    df (pd.DataFrame): The DataFrame containing game data.

    Returns:
    None
    """
    new_df = pd.DataFrame()
    new_df['gameid'] = df.drop_duplicates(subset='gameid')['gameid']

    roles = ['top','jng','mid','bot','sup']
    sides = ['Blue','Red']


    for gameid in tqdm(new_df['gameid']):
        game_data = {'gameid': gameid}
        
        for role in roles:
            for side  in sides:
                
                gp,wr,kda = calculate_player_statistics(gameid,role,side,df)
                game_data[f"{side}{role}gp"] = gp
                game_data[f"{side}{role}wr"] = wr
                game_data[f"{side}{role}kda"] = kda

        result = df[(df['gameid'] == gameid) & (df['side'] == 'Blue')]['result'].iloc[0]
        game_data['result'] = result

        new_df = pd.concat([new_df, pd.DataFrame(game_data, index=[0])], ignore_index=True)

    new_df = new_df.fillna(0)
    new_df.to_csv('Player_statistics.csv', index=False)



def calculate_player_statistics_first(gameid,role,side,df):
    """
    Calculate detailed statistics for a specific player in a specific role and side in a given game.

    Parameters:
    gameid (int): The ID of the game.
    role (str): The role of the player ('top', 'jng', 'mid', 'bot', 'sup').
    side (str): The side of the player ('Blue' or 'Red').
    df (pd.DataFrame): The DataFrame containing game data.

    Returns:
    tuple: A tuple containing the number of games played (gp), win rate (wr), KDA at 10 minutes (kda10), 
           KDA at 15 minutes (kda15), gold difference at 10 minutes (golddiffat10), 
           and gold difference at 15 minutes (golddiffat15).
    """
    player_data = df[(df['gameid'] == gameid) & (df['position'] == role) & (df['side'] == side)]
    name = player_data['playername'].iloc[0]
    champ = player_data['champion'].iloc[0]
    name_champ = df[(df['playername'] == name) & (df['champion'] == champ)]
    gp = name_champ.shape[0]
    wr = round(name_champ['result'].mean(), 2)

    golddiffat10 = round(name_champ['golddiffat10'].mean(),2)
    golddiffat15 = round(name_champ['golddiffat15'].mean(),2)

    killsat15 = name_champ['kills'].mean()
    deathsat15 = name_champ['deaths'].replace(0, 1).mean()
    kda15 = round(killsat15/deathsat15,2)

    killsat10 = name_champ['killsat10'].mean()
    deathsat10 = name_champ['deathsat10'].replace(0, 1).mean()
    kda10 = round(killsat10/deathsat10,2)

    return gp,wr,kda10,kda15,golddiffat10,golddiffat15


def players_statiscs_first(df):
    """
    Generate detailed player statistics for each game and save them to a CSV file.

    Parameters:
    df (pd.DataFrame): The DataFrame containing game data.

    Returns:
    None
    """
    new_df = pd.DataFrame(df['gameid'].drop_duplicates().reset_index(drop=True), columns=['gameid'])
    
    roles = ['top', 'jng', 'mid', 'bot', 'sup']
    sides = ['Blue', 'Red']
    
    for gameid in tqdm(new_df['gameid'], desc="Processing games"):
        game_data = {'gameid': gameid}
        
        for role in roles:
            for side in sides:
                gp, wr, kda10, kda15, golddiffat10, golddiffat15 = calculate_player_statistics_first(gameid, role, side, df)
                game_data[f"{side}{role}gp"] = gp
                game_data[f"{side}{role}wr"] = wr
                game_data[f"{side}{role}kda10"] = kda10
                game_data[f"{side}{role}kda15"] = kda15
                game_data[f"{side}{role}golddiffat10"] = golddiffat10
                game_data[f"{side}{role}golddiffat15"] = golddiffat15

        result = df[(df['gameid'] == gameid) & (df['side'] == 'Blue')]['result'].iloc[0]
        game_data['result'] = result
        
        firsttower_index = df[(df['gameid'] == gameid) & (df['side'] == 'Blue')]['firsttower'].first_valid_index()
        firsttower = "" if firsttower_index is None else df.at[firsttower_index, 'firsttower']

        firstblood_index = df[(df['gameid'] == gameid) & (df['side'] == 'Blue')]['firstblood'].first_valid_index()
        firstblood = "" if firstblood_index is None else df.at[firstblood_index, 'firstblood']

        firstherald_index = df[(df['gameid'] == gameid) & (df['side'] == 'Blue')]['firstherald'].first_valid_index()
        firstherald = "" if firstherald_index is None else df.at[firstherald_index, 'firstherald']

        firstbaron_index = df[(df['gameid'] == gameid) & (df['side'] == 'Blue')]['firstbaron'].first_valid_index()
        firstbaron = "" if firstbaron_index is None else df.at[firstbaron_index, 'firstbaron']

        firstdragon_index = df[(df['gameid'] == gameid) & (df['side'] == 'Blue')]['firstdragon'].first_valid_index()
        firstdragon = "" if firstdragon_index is None else df.at[firstdragon_index, 'firstdragon']
        
        game_data['firsttower'] = firsttower
        game_data['firstblood'] = firstblood
        game_data['firstherald'] = firstherald
        game_data['firstbaron'] = firstbaron
        game_data['firstdragon'] = firstdragon
        
        new_df = pd.concat([new_df, pd.DataFrame(game_data, index=[0])], ignore_index=True)

    new_df = new_df.fillna(0)
    new_df.to_csv('Player_statistics_first.csv', index=False)

# Replace 'file_path.csv' with the path to your CSV file
file_path = f'csv\{2024}_LoL_esports_match_data_from_OraclesElixir(1).csv'

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(file_path)

players_and_teams(df)
#csv_players_statiscs(df)
#players_statiscs_first(df)

