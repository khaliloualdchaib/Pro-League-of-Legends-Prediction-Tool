import pandas as pd
from tqdm import tqdm


# Replace 'file_path.csv' with the path to your CSV file
file_path = f'csv\{2024}_LoL_esports_match_data_from_OraclesElixir(1).csv'

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(file_path)

new_df = pd.DataFrame()
new_df['gameid'] = df.drop_duplicates(subset='gameid')['gameid']


def calculate_player_statistics(gameid,role,side,df):

    
    
    name = df[(df['gameid'] == gameid) & (df['position'] == role) & (df['side'] == side)]['playername'].iloc[0]
    champ = df[(df['gameid'] == gameid) & (df['position'] == role) & (df['side'] == side)]['champion'].iloc[0]
    name_champ = df[(df['playername'] == name) & (df['champion'] == champ)]
    gp = name_champ.shape[0]
    wr = round(name_champ['result'].mean(),2)
    if not name_champ['kills'].empty:
        kills = name_champ['kills'].iloc[0]
    else:
        kills = 0.0
    if not name_champ['kills'].empty:
        deaths = name_champ['deaths'].replace(0, 1).iloc[0]
    # Continue with your calculations using 'kills'
    else:
        deaths = 1.0
    kda = round(kills/deaths,2)

    return gp,wr,kda

for gameid in tqdm(new_df['gameid']):

    roles = ['top','jng','mid','bot','sup']
    sides = ['Blue','Red']

    for r in roles:
        for s in sides:
            result = df[(df['gameid'] == gameid) & (df['side'] == 'Blue')]['result'].iloc[0]
            gp,wr,kda = calculate_player_statistics(gameid,r,s,df)
            new_df.loc[new_df['gameid'] == gameid, s+r+"gp"] = gp
            new_df.loc[new_df['gameid'] == gameid, s+r+"wr"] = wr
            new_df.loc[new_df['gameid'] == gameid, s+r+"kda"] = kda
            new_df.loc[new_df['gameid'] == gameid, "result"] = result


new_df.to_csv('Player_statistics.csv', index=False)



def players_and_teams():
    # Filter data for players and teams
    players_data = df[df['position'] != 'team']
    teams_data = df[df['position'] == 'team']


    # Create a new DataFrame with only selected columns
    # Teamkills, teamdeaths maybe ?
    players_columns  = ['gameid', 'side', 'position', 'playername', 'playerid', 'teamname', 'teamid', 'champion', 'result', 'kills', 'deaths', 'assists', 'firstblood', 'firstbloodkill', 'firstbloodvictim', "golddiffat15"]
    teams_columns  = ['gameid', 'side', 'teamname', 'teamid', 'result', 'firstblood','team kpm', 'firstdragon', 'firstherald', 'firstbaron', 'firsttower' ]


    # Create DataFrames for players and teams
    players = players_data[players_columns]
    teams = teams_data[teams_columns]

    # Save the new DataFrame to a CSV file
    players.to_csv('players.csv', index=False)
    teams.to_csv('teams.csv', index=False)


