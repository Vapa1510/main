from flask import Flask, request, jsonify, render_template, redirect, url_for
import joblib
import numpy as np

# Initialize the Flask app
app = Flask(__name__)

# Load the pre-trained model and scaler
model = joblib.load('best_xgb_model.pkl')
scaler = joblib.load('scaler.pkl')  # Only if you are using a scaler

@app.route('/survey_main')
def survey_main():
    return render_template('survey_main.html')

@app.route('/result')
def result():
    prediction = request.args.get('prediction')
    return render_template('result.html', prediction=prediction)

@app.route('/')
def index():
    # Render the HTML page with a form to enter feature values
    return render_template('home.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract data from the request form (for HTML form input) or JSON (if using API call)
        data = request.get_json() if request.is_json else request.form
        features = [
            float(request.form.get('pH', 0)),
            float(request.form.get('hardness', 0)),
            float(request.form.get('sulfates', 0)),
            float(request.form.get('conductivity', 0)),
            float(request.form.get('Solids', 0)),
            float(request.form.get('turbidity', 0)),
            float(request.form.get('Halomethanes', 0)),
            float(request.form.get('Organic Carbon', 0)),
            float(request.form.get('Chloramine', 0))
        ]
        
        # Convert features to a NumPy array and scale if scaler exists
        input_data = np.array([features])
        input_data_scaled = scaler.transform(input_data) if scaler else input_data

        # Predict with the model
        prediction = model.predict(input_data_scaled)
        
        # Return the prediction result
        return redirect(url_for('result', prediction=int(prediction[0])))
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
