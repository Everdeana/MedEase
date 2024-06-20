import folium
from django.http import HttpResponse
from geopy.distance import geodesic
from .models import Hospital

def generate_map(request):
    # 사용자 위치 (임의의 예시 좌표, 실제로는 클라이언트에서 받아와야 함)
    user_location = (37.5665, 126.9780)  # 서울 시청 좌표

    # Folium 지도 객체 생성
    m = folium.Map(location=user_location, zoom_start=13)

    # 사용자 위치 마커 추가
    folium.Marker(
        location=user_location,
        popup="Your Location",
        icon=folium.Icon(color='blue')
    ).add_to(m)

    # 병원 위치 마커 추가
    hospitals = Hospital.objects.all()
    for hospital in hospitals:
        hospital_location = (hospital.latitude, hospital.longitude)
        folium.Marker(
            location=hospital_location,
            popup=f"{hospital.name}<br>{hospital.address}<br>Opening Hours: {hospital.opening_hours}",
            icon=folium.Icon(color='red')
        ).add_to(m)

    # 지도를 HTML로 변환
    map_html = m._repr_html_()
    return HttpResponse(map_html)
