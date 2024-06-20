# 얼굴인식이 어려울 시 QR 인식
# 생성된 QR을 카메라에 인식 시키면 id_capture에 있는 QR해쉬와 매칭 후 승인
import cv2
from pyzbar.pyzbar import decode
import hashlib
import os

def read_qr_code():
    # 카메라 초기화
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame from webcam.")
            break

        # QR 코드 디코드
        decoded_objects = decode(frame)

        if decoded_objects:
            for obj in decoded_objects:
                qr_data = obj.data.decode('utf-8')  # QR 코드 내부 데이터 추출
                print("QR 코드 내용:", qr_data)
                
                # 접두사 "Hash: "를 제거하여 순수한 해시값 추출
                if qr_data.startswith("Hash: "):
                    qr_data = qr_data.replace("Hash: ", "")

                # QR 코드 데이터를 기반으로 이미지 파일 이름 설정
                image_filename = f"./id_capture/{qr_data}.png"
                print("QR 코드에 해당하는 이미지 파일 이름:", image_filename)
                
                # 해당 경로에 파일이 존재하는지 확인
                if os.path.isfile(image_filename):
                    print("일치합니다.")
                    # 이미지 파일 로드 및 표시
                    img = cv2.imread(image_filename)
                    cv2.imshow('QR Image', img)
                    cv2.waitKey(0)
                    cv2.destroyAllWindows()
                else:
                    print("해당 QR 코드에 대한 이미지 파일을 찾을 수 없습니다.")

            # QR 코드가 인식되면 카메라 해제 후 종료
            cap.release()
            cv2.destroyAllWindows()
            break

        # 웹캠에 프레임 표시
        cv2.imshow('Webcam', frame)

        # 'q' 키를 누르면 종료
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # 웹캠 및 창 해제
    cap.release()
    cv2.destroyAllWindows()

# QR 코드 읽기 함수 호출
read_qr_code()
