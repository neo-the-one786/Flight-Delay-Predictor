from flask import Flask, request, render_template
import pandas as pd
import pickle

app = Flask(__name__)

# Load the model from the pickle file
with open('Predictor.pkl', 'rb') as f:
    model = pickle.load(f)

# Load column names (make sure they match the ones used in your model training)
feature_columns = ['airline company', 'from', 'to', 'flight code', 'aircraft code',
                   'wind direction departure', 'wind direction arrival',
                   'departure_hour', 'arrival_hour',
                   'departure_day', 'arrival_day',
                   'departure_month', 'arrival_month',
                   'departure_year', 'arrival_year',
                   'delay departure', 'delay arrival',
                   'date', 'time']


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the form
    data = request.form.to_dict()

    # Convert data into DataFrame
    input_df = pd.DataFrame([data], columns=feature_columns)

    # Process input data
    if 'date' in input_df.columns:
        input_df['date'] = pd.to_datetime(input_df['date'], errors='coerce')
        input_df['date'] = input_df['date'].apply(lambda x: x.toordinal() if pd.notnull(x) else 0)

    if 'time' in input_df.columns:
        input_df['time'] = pd.to_datetime(input_df['time'], errors='coerce', format='%H:%M')
        input_df['time'] = input_df['time'].apply(lambda x: x.hour * 60 + x.minute if pd.notnull(x) else 0)

    # Ensure that all necessary columns are present and correctly formatted
    input_df.fillna(method='ffill', inplace=True)

    # Make prediction
    prediction = model.predict(input_df)[0]
    prediction_label = 'Delayed' if prediction == 1 else 'On time'

    return render_template('result.html', prediction=prediction_label)


if __name__ == '__main__':
    app.run(debug=True)
