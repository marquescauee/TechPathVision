from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import AttributeSerializer
from .models import Attribute 

@api_view(['GET'])
def get_attributes(request):
    attributes = Attribute.objects.all()
    serializer = AttributeSerializer(attributes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def send_attributes(request):
    data = request.data

    if isinstance(data, list):
        serializer = AttributeSerializer(data=data, many=True)
    elif isinstance(data, dict):
        serializer = AttributeSerializer(data=[data], many=True)
    else:
        return Response({"detail": "Invalid format. Expected a list or a single attribute."}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)