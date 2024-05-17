import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.metrics import roc_auc_score
import matplotlib.pyplot as plt
import joblib



def get_feature_importance(classifier, X_train):
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

def pre_process(drop,result,first=False):
    # Replace 'file_path.csv' with the path to your CSV file
    if first:
        file_path = f'csv\Player_statistics_first.csv'
    else:
        file_path = f'csv\Player_statistics.csv'

    df = pd.read_csv(file_path)

    if first:
        df = df.dropna()

    # Split the dataset into input features and the target variable
    X = df.drop(drop, axis=1)
    Y = df[result]

    # Split the dataset into training and testing sets

    # Calculate the index to split the data
    split_index = int(0.8 * len(df))

    # Split the data into training and testing sets
    X_train, X_test = X[:split_index], X[split_index:]
    y_train, y_test = Y[:split_index], Y[split_index:]

    return X_train, y_train, X_test, y_test

def win_prediction():
    print("Win Prediction Results\n")

    X_train, y_train, X_test, y_test = pre_process(['result', 'gameid'],'result',first=False)

    classifier = RandomForestClassifier()
    classifier.fit(X_train, y_train)

    predictions = classifier.predict(X_test)
    auc = roc_auc_score(y_test, predictions)

    print("Area under the ROC curve (AUC):", auc)
    print(classification_report(y_test, predictions))

def first_tower_prediction():
    print("First Tower Prediction Results\n")

    X_train, y_train, X_test, y_test = pre_process(['firsttower', 'gameid', "firstbaron", 'firstherald', 'firstdragon','firstblood','result'],'firsttower',first=True)

    classifier = RandomForestClassifier()
    classifier.fit(X_train, y_train)

    predictions = classifier.predict(X_test)
    auc = roc_auc_score(y_test, predictions)

    print("Area under the ROC curve (AUC):", auc)
    print(classification_report(y_test, predictions))

    get_feature_importance(classifier=classifier,X_train=X_train)

def first_blood_prediction():
    print("First Blood Prediction Results\n")
 

    X_train, y_train, X_test, y_test = pre_process(['firstblood', 'gameid',"firstdragon","firstherald","firstbaron","firsttower","result"],'firstblood',first=True)

    classifier = RandomForestClassifier()
    classifier.fit(X_train, y_train)

    predictions = classifier.predict(X_test)
    auc = roc_auc_score(y_test, predictions)

    print("Area under the ROC curve (AUC):", auc)
    print(classification_report(y_test, predictions))


def first_baron_prediction():
    print("First Baron Prediction Results\n")
 

    X_train, y_train, X_test, y_test = pre_process(['firstbaron', 'gameid','firsttower','firstherald', 'firstdragon','firstblood','result'],'firstbaron',first=True)

    classifier = RandomForestClassifier()
    classifier.fit(X_train, y_train)

    predictions = classifier.predict(X_test)
    auc = roc_auc_score(y_test, predictions)

    print("Area under the ROC curve (AUC):", auc)
    print(classification_report(y_test, predictions))

    get_feature_importance(classifier=classifier,X_train=X_train)

def first_dragon_prediction():
    print("First Dragon Prediction Results\n")
 

    X_train, y_train, X_test, y_test = pre_process(['firstbaron', 'gameid','firsttower','firstherald', 'firstdragon','firstblood','result'],'firstdragon',first=True)

    classifier = RandomForestClassifier()
    classifier.fit(X_train, y_train)

    predictions = classifier.predict(X_test)
    auc = roc_auc_score(y_test, predictions)

    print("Area under the ROC curve (AUC):", auc)
    print(classification_report(y_test, predictions))


def train_and_evaluate_model(prediction_target, feature_list, first=False):
    """
    Train a RandomForestClassifier model, evaluate its performance, and print the results.

    Parameters:
    prediction_target (str): The target variable for prediction.
    feature_list (list): List of features to be used for training the model.
    first (bool): Whether it's the first prediction target (default is False).

    Returns:
    None
    """
    print(f"{prediction_target.capitalize()} Prediction Results\n")

    X_train, y_train, X_test, y_test = pre_process(feature_list + ['result'], prediction_target, first=first)

    classifier = RandomForestClassifier()
    classifier.fit(X_train, y_train)

    # Save the trained model to a file
    model_filename = f"Models\{prediction_target}_model.pkl"
    joblib.dump(classifier, model_filename)
    print(f"Trained model saved to {model_filename}")

    predictions = classifier.predict(X_test)
    auc = roc_auc_score(y_test, predictions)

    print("Area under the ROC curve (AUC):", auc)
    print(classification_report(y_test, predictions))

    #get_feature_importance(classifier=classifier, X_train=X_train)


def make_models():
    # Define prediction targets and associated features
    prediction_targets = {
        'result': ['result', 'gameid'],
        'firsttower': ['firsttower', 'gameid', 'firstbaron', 'firstherald', 'firstdragon', 'firstblood', 'result'],
        #'firstblood': ['firstblood', 'gameid', 'firstdragon', 'firstherald', 'firstbaron', 'firsttower', 'result'],
        'firstbaron': ['firstbaron', 'gameid', 'firsttower', 'firstherald', 'firstdragon', 'firstblood', 'result'],
        #'firstdragon': ['firstdragon', 'gameid', 'firsttower', 'firstherald', 'firstbaron', 'firstblood', 'result']
    }

    # Train and evaluate models for each prediction target
    for target, features in prediction_targets.items():
        train_and_evaluate_model(target, features, first=(target != 'result'))


