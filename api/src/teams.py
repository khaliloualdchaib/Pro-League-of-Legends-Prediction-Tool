from flask import request, make_response
from flask_restful import Resource
from flask import Response
from .utils import get_column_values_from_csv

class Teams(Resource):
    def route():
        return '/api/teams'
    
    def get(self):

        return get_column_values_from_csv(3,teams=True)
            

    
