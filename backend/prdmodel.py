import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import accuracy_score, classification_report

# 데이터 로드
data = pd.read_csv('./model/disease_symptoms_combined_1.csv')

# 데이터 전처리
# NaN 값을 빈 문자열로 대체
data.fillna('', inplace=True)

# 모든 증상 컬럼 추출
symptom_columns = data.columns[1:]

# 각 행의 증상 리스트를 만듦
data['Symptoms'] = data[symptom_columns].apply(lambda row: row[row != ''].tolist(), axis=1)

# 멀티 라벨 바이너리 인코딩
mlb = MultiLabelBinarizer()
symptoms_encoded = mlb.fit_transform(data['Symptoms'])

# 데이터프레임으로 변환
symptom_df = pd.DataFrame(symptoms_encoded, columns=mlb.classes_)

# 질병 컬럼 추가
symptom_df['Disease'] = data['Disease']

# 훈련 및 테스트 데이터 분할
X = symptom_df.drop('Disease', axis=1)
y = symptom_df['Disease']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 모델 학습
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# 예측
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# 새로운 증상으로 예측
def predict_disease(symptoms):
    input_data = pd.DataFrame([0]*len(mlb.classes_), index=mlb.classes_).T
    for symptom in symptoms:
        if symptom in input_data.columns:
            input_data[symptom] = 1
    probs = model.predict_proba(input_data)
    top3 = sorted(zip(model.classes_, probs[0]), key=lambda x: x[1], reverse=True)[:3]
    return top3

# 예측 예시
new_symptoms = ['호흡곤란', '협심증', '땀증가', '거식증', '가슴불편감']
predicted_diseases = predict_disease(new_symptoms)
print("Predicted Diseases:", predicted_diseases)
