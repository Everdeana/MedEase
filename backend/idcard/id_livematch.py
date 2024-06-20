# 실시간 얼굴 촬영 후 신분증 유사도 대조
# id_dblist에 있는 업로드 된 신분증 사진 대조 후 id_hspface에 실시간 사진(날짜) 저장
import cv2
import numpy as np
import dlib
import time # 이거 추가 
from deepface import DeepFace
import matplotlib.pyplot as plt
import qrcode
from datetime import datetime

# Dlib 얼굴 탐지기와 얼굴 특징점 예측기 초기화
detector = dlib.get_frontal_face_detector()
#predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')  # Dlib의 사전 훈련된 모델 파일 필요
predictor = dlib.shape_predictor('/home/ai/ai/snowball/backend/idcard/shape_predictor_68_face_landmarks.dat')
# 웹캠 비디오 캡처 초기화
cap = cv2.VideoCapture(0)

# 중앙에 들어오는 조건을 위한 기준값 (얼굴 중앙이 화면 중앙에서 얼마나 떨어져 있는지)
center_threshold = 30
# 얼굴이 중앙에 머무른 시간을 저장할 변수
center_start_time = None
# 중앙에 머물러야 하는 최소 시간 (초)
min_center_time = 0.5

if not cap.isOpened():
    print("Error: Could not open webcam.")
else:
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame from webcam.")
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        if len(faces) > 0:
            face = faces[0]  # 첫 번째 얼굴만 고려
            x, y, w, h = face.left(), face.top(), face.width(), face.height()
            face_center = (x + w // 2, y + h // 2)

            # 얼굴 좌표 프린트
            print(f"실시간 얼굴 좌표: ({x}, {y})")

            # 화면의 중앙 좌표
            frame_center = (frame.shape[1] // 2, frame.shape[0] // 2)

            # 얼굴 중심과 화면 중심 간의 거리 계산
            distance_to_center = np.linalg.norm(np.array(face_center) - np.array(frame_center))
            print(f"중앙으로부터 거리: {distance_to_center}")

            if distance_to_center < center_threshold:
                if center_start_time is None:
                    center_start_time = time.time()
                else:
                    elapsed_time = time.time() - center_start_time
                    print(f"얼굴이 중앙에 머무른 시간: {elapsed_time:.2f}초")

                    if elapsed_time >= min_center_time:
                        # 현재 날짜와 시간 문자열로 생성
                        timestamp = datetime.now().strftime('%Y%m%d%H%M%S') # 이거랑 
                        save_path = f'./id_hspface/captured_face{timestamp}.jpg' # 이거랑 
                        cv2.imwrite(save_path, frame)
                        print(f"얼굴이 중앙에 1-2초 동안 머물렀습니다. 이미지가 저장되었습니다: {save_path}")

                        # 저장된 사진과 신분증 사진 비교
                        img_path = save_path
                        db_path = './id_dblist/'

                        try:
                            results = DeepFace.find(img_path=img_path,
                                                    db_path=db_path,
                                                    detector_backend='retinaface',
                                                    model_name='ArcFace')

                            if len(results) > 0:
                                # 첫 번째 데이터프레임 가져오기
                                result_df = results[0]
                                if not result_df.empty:
                                    # DataFrame의 첫 번째 행 확인
                                    first_result = result_df.iloc[0]
                                    print("First Result Type:", type(first_result))
                                    print("First Result Content:", first_result)

                                    # 'identity' 필드의 타입과 내용 확인
                                    res_img_path = first_result['identity']
                                    print("res_img_path Type:", type(res_img_path))
                                    print("res_img_path Content:", res_img_path)

                                    if isinstance(res_img_path, str):
                                        fig = plt.figure()
                                        rows = 1
                                        cols = 2
                                        ax1 = fig.add_subplot(rows, cols, 1)
                                        img = cv2.imread(img_path)
                                        ax1.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
                                        ax1.axis("off")

                                        res_img = cv2.imread(res_img_path)
                                        ax2 = fig.add_subplot(rows, cols, 2)
                                        ax2.imshow(cv2.cvtColor(res_img, cv2.COLOR_BGR2RGB))
                                        ax2.axis("off")
                                        plt.show()
                            
                                    else:
                                        print("res_img_path is not a valid string path")
                                else:
                                    print("유사한 얼굴을 찾지 못했습니다.")
                            else:
                                print("유사한 얼굴을 찾지 못했습니다.")

                        except Exception as e:
                            print("얼굴 분석에 실패했습니다:", e)

                        cap.release()
                        cv2.destroyAllWindows()
                        break
            else:
                center_start_time = None

            # 얼굴 사각형 및 특징점 그리기
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            shape = predictor(gray, face)
            landmarks = np.array([[shape.part(i).x, shape.part(i).y] for i in range(68)])
            for (lx, ly) in landmarks:
                cv2.circle(frame, (lx, ly), 1, (0, 0, 255), -1)
        else:
            center_start_time = None

        # 웹캠에 프레임 표시
        cv2.imshow('Live Face Detection', frame)

        # 'q' 키를 누르면 종료
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# 웹캠 및 창 해제
cap.release()
cv2.destroyAllWindows()