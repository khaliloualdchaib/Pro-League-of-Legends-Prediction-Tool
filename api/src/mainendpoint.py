from flask import request, make_response
from flask_restful import Resource
from flask import Response
from .utils import response_400

class MainEndpoint(Resource):
    def route():
        return '/api/main'
    
    def get(self):
        
        response400 = response_400()
     
        return response400

    

