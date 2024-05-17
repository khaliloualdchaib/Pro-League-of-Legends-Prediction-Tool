import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.metrics import roc_auc_score
import matplotlib.pyplot as plt

# Replace 'file_path.csv' with the path to your CSV file
file_path = f'csv\Player_statistics.csv'

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(file_path)

df = df.fillna(0)
#print(df.isnull().any())


# Split the dataset into input features and the target variable
X = df.drop(['result', 'gameid'], axis=1)
Y = df['result']

Y = [0 if i == 1 else 1 for i in Y]

# Split the dataset into training and testing sets

# Calculate the index to split the data
split_index = int(0.8 * len(df))

# Split the data into training and testing sets
X_train, X_test = X[:split_index], X[split_index:]
y_train, y_test = Y[:split_index], Y[split_index:]


classifier = RandomForestClassifier()
classifier.fit(X_train, y_train)

predictions = classifier.predict(X_test)
# Assuming y_true and y_score are your true labels and predicted scores respectively
auc = roc_auc_score(y_test, predictions)

print("Area under the ROC curve (AUC):", auc)
print(classification_report(y_test, predictions))

# Get feature importances
feature_importances = classifier.feature_importances_

# Create a DataFrame to display feature importances
feature_importance_df = pd.DataFrame({'Feature': X_train.columns, 'Importance': feature_importances})

# Sort the DataFrame by importance
feature_importance_df = feature_importance_df.sort_values(by='Importance', ascending=False)

# Print or display the DataFrame
print(feature_importance_df)

# Assuming feature_importance_df contains your DataFrame with feature importances
# Plot feature importances
plt.figure(figsize=(10, 6))
plt.barh(feature_importance_df['Feature'], feature_importance_df['Importance'])
plt.xlabel('Importance')
plt.ylabel('Feature')
plt.title('Feature Importances')
plt.show()