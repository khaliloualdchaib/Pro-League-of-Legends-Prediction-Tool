import pandas as pd

# Replace 'file_path.csv' with the path to your CSV file
file_path = f'csv\{2024}_LoL_esports_match_data_from_OraclesElixir(1).csv'

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(file_path)


# Filter data for players and teams
players_data = df[df['position'] != 'team']
teams_data = df[df['position'] == 'team']


# Create a new DataFrame with only selected columns
# Teamkills, teamdeaths maybe ?
players_columns  = ['gameid', 'side', 'position', 'playername', 'playerid', 'teamname', 'teamid', 'champion', 'result', 'kills', 'deaths', 'assists', 'firstblood', 'firstbloodkill', 'firstbloodvictim']
teams_columns  = ['gameid', 'side', 'teamname', 'teamid', 'result', 'firstblood','team kpm', 'firstdragon', 'firstherald', 'firstbaron', 'firsttower' ]


# Create DataFrames for players and teams
players = players_data[players_columns]
teams = teams_data[teams_columns]

# Save the new DataFrame to a CSV file
players.to_csv('players.csv', index=False)
teams.to_csv('teams.csv', index=False)