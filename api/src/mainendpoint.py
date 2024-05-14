from flask import request, make_response
from flask_restful import Resource
from flask import Response
from .utils import response_400, get_most_kills

class MainEndpoint(Resource):
    def route():
        return '/api/main'
    
    def get(self):

        responsejson = {
        "First Blood": None,
        "First Tower": None,
        "First Drake": None,
        "Most Kills": None,
        "Winning Team": None
        } 

        response400 = response_400()
      
        return responsejson

    

