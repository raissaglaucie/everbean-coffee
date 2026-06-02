import requests
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def getWeatherRecommendation(request):
    lat = request.query_params.get('lat', '47.6062')  # Seattle default
    lon = request.query_params.get('lon', '-122.3321')

    api_key = os.getenv('WEATHER_API_KEY')

    try:
        url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=imperial'
        response = requests.get(url)
        data = response.json()

        temp_f = data['main']['temp']
        temp_c = (temp_f - 32) * 5 / 9
        description = data['weather'][0]['description']
        city = data['name']
        icon = data['weather'][0]['icon']

        # Coffee recommendation logic
        if temp_c < 5:
            recommendation = 'Hot Espresso'
            reason = "It's freezing! Warm up with a bold espresso"
            emoji = '☕'
            bg = '#1C0A00'
        elif temp_c < 12:
            recommendation = 'Cappuccino'
            reason = 'Cold day calls for a creamy cappuccino'
            emoji = '🍵'
            bg = '#3B1A08'
        elif temp_c < 18:
            recommendation = 'Vanilla Latte'
            reason = 'Perfect sweater weather — treat yourself!'
            emoji = '☕'
            bg = '#6B3A2A'
        elif temp_c < 24:
            recommendation = 'Americano'
            reason = 'Nice and balanced, just like today'
            emoji = '☕'
            bg = '#C4956A'
        elif temp_c < 30:
            recommendation = 'Iced Cold Brew'
            reason = "Warm out there — cool down with cold brew!"
            emoji = '🧊'
            bg = '#4A90D9'
        else:
            recommendation = 'Frozen Frappuccino'
            reason = "It's hot! You deserve something icy"
            emoji = '🧊'
            bg = '#2980B9'

        return Response({
            'city': city,
            'temp_c': round(temp_c, 1),
            'temp_f': round(temp_f, 1),
            'description': description,
            'icon': icon,
            'recommendation': recommendation,
            'reason': reason,
            'emoji': emoji,
            'bg': bg,
        })

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )