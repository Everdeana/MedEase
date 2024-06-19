import joblib
import pandas as pd

# 모델 및 인코더 로드
loaded_model = joblib.load('./model/disease_prediction_model.joblib')
loaded_mlb = joblib.load('./model/mlb.joblib')

# 새로운 증상으로 예측 함수
def predict_disease(symptoms, model, mlb):
    input_data = pd.DataFrame([0]*len(mlb.classes_), index=mlb.classes_).T
    for symptom in symptoms:
        if symptom in input_data.columns:
            input_data[symptom] = 1
    probs = model.predict_proba(input_data)
    top3 = sorted(zip(model.classes_, probs[0]), key=lambda x: x[1], reverse=True)[:3]
    return top3

# 예측 예시
new_symptoms = ['호흡곤란', '협심증', '땀증가', '거식증', '가슴불편감']
predicted_diseases = predict_disease(new_symptoms, loaded_model, loaded_mlb)
print("Predicted Diseases:", predicted_diseases)
