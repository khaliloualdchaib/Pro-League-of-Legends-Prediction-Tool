from flask import request, make_response
from flask_restful import Resource
from flask import Response
from .utils import get_column_values_from_csv

class Teams(Resource):
    def route():
        return '/api/teams'
    
    def get(self):
        teams_column_index = 3 
        return get_column_values_from_csv(column_index=teams_column_index,teams=True)
            

    
