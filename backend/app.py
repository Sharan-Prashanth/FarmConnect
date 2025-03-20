from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define crop price data for 2021 to 2023
crop_prices = {
    "Paddy": [1816, 1806, 1802, 1785, 1748, 1727, 1730, 1753, 1774, 1886, 1910, 1910,
              1881, 1887, 1888, 1878, 1869, 1895, 1902, 1954, 1994, 2045, 2093, 2151,
              2133, 2120, 2100, 2092, 2102, 2136, 2182, 2211, 2260, 2319, 2345, 2374],

    "Wheat": [2065, 2071, 2079, 2143, 2151, 2143, 2059, 2093, 2138, 2190, 2207, 2213,
              2228, 2230, 2339, 2384, 2352, 2316, 2409, 2486, 2516, 2570, 2719, 2812,
              2934, 2709, 2593, 2533, 2555, 2582, 2595, 2658, 2702, 2741, 2818, 2825],

    "Jowar": [2461, 2525, 2528, 2505, 2520, 2474, 2363, 2367, 2313, 2212, 2258, 2355,
              2430, 2456, 2503, 2610, 2630, 2659, 2770, 2811, 2801, 2835, 3126, 3238,
              3345, 3397, 3380, 3344, 3338, 3443, 3644, 3698, 3804, 3756, 3917, 4033],

    "Bajra": [1658, 1642, 1647, 1642, 1654, 1672, 1716, 1793, 1797, 1842, 1945, 1992,
              2020, 2050, 2179, 2282, 2274, 2303, 2348, 2449, 2278, 2345, 2465, 2537,
              2581, 2557, 2615, 2610, 2572, 2598, 2617, 2666, 2614, 2634, 2776, 2807],

    "Maize": [1642, 1632, 1606, 1640, 1650, 1690, 1725, 1782, 1798, 1797, 1817, 1837,
              1891, 1947, 2052, 2131, 2146, 2138, 2180, 2251, 2221, 2180, 2225, 2285,
              2324, 2291, 2265, 2202, 2160, 2140, 2166, 2173, 2175, 2158, 2236, 2272],

    "Barley": [1728, 1764, 1704, 1791, 1735, 1826, 1849, 1923, 1983, 2053, 2095, 2185,
               2194, 2228, 2267, 2552, 2592, 2611, 2600, 2685, 2618, 2639, 2674, 2668,
               2769, 2698, 2432, 2150, 2117, 2119, 2110, 2111, 2157, 2211, 2219, 2201],

    "Ragi": [2822, 2890, 2916, 2918, 2903, 2876, 2917, 2886, 2820, 2823, 2883, 2951,
             2934, 2993, 3038, 2963, 3015, 2925, 2888, 2823, 2750, 2736, 2798, 2806,
             2869, 2884, 2945, 3048, 3017, 3073, 3193, 3343, 3369, 3427, 3520, 3610],

    "Gram": [5100, 5200, 5225, 5546, 5490, 5423, 5405, 5526, 5564, 5467, 5482, 5360,
             5440, 5406, 5457, 5354, 5265, 5239, 5308, 5368, 5282, 5302, 5313, 5346,
             5402, 5392, 5541, 5435, 5395, 5398, 5459, 5701, 6117, 6282, 6456, 6400],

    "Arhar": [6324, 6716, 6617, 6758, 6781, 6535, 6492, 6628, 6715, 6633, 6495, 6400,
              6520, 6529, 6500, 6411, 6279, 6317, 6755, 6900, 6842, 7146, 6945, 6974,
              7043, 7312, 7682, 7700, 8008, 8443, 8678, 9025, 9703, 9889, 10064, 9413],

    "Moong": [7561, 7712, 7832, 7975, 8225, 7696, 7295, 7456, 7457, 7596, 7505, 7350,
              7464, 7392, 7436, 7535, 7365, 7278, 7399, 7401, 7438, 7520, 7708, 7661,
              7901, 8045, 8403, 8497, 8402, 8504, 8562, 8633, 9224, 9154, 9175, 9147],

    "Masur": [5998, 6148, 6271, 6581, 6695, 6531, 6748, 7141, 7688, 7858, 7940, 7785,
              7800, 7693, 7652, 7672, 7601, 7465, 7580, 7571, 7315, 7332, 7379, 7404,
              7411, 7272, 7255, 6985, 6948, 6885, 6840, 6903, 7167, 7162, 7181, 7048],

    "Urad": [8039, 8192, 8215, 8256, 8436, 7953, 7627, 7729, 7871, 7708, 7694, 7637,
             7539, 7442, 7618, 7611, 7412, 7625, 7549, 7744, 7916, 7816, 7947, 8044,
             8076, 8125, 8329, 8342, 8476, 8711, 8753, 8842, 9257, 9127, 9525, 9341]
}


@app.route('/predict', methods=['GET'])
def predict():
    """
    API endpoint to predict crop prices for the next 12 months.
    Usage: /predict?crop=Paddy
    """
    crop_name = request.args.get("crop")  # Get crop name from request
    if not crop_name:
        return jsonify({"error": "Please provide a crop name as a query parameter, e.g., /predict?crop=Paddy"}), 400

    # Normalize crop name to title case to handle case sensitivity
    crop_name = crop_name.title()

    if crop_name not in crop_prices:
        return jsonify({"error": f"Crop '{crop_name}' not found. Available crops: {list(crop_prices.keys())}"}), 400

    # Prepare the data for Prophet
    dates = pd.date_range(start="2021-01-01", periods=36, freq="M")
    df = pd.DataFrame({"ds": dates, "y": crop_prices[crop_name]})

    # Train Prophet model
    model = Prophet()
    model.fit(df)

    # Create future dates for the next 12 months
    future = model.make_future_dataframe(periods=12, freq="M")

    # Generate forecast
    forecast = model.predict(future)

    # Extract predictions for validation (last 12 known months)
    actual_prices = df["y"].values[-12:]
    predicted_prices = forecast["yhat"].values[:36][-12:]  # Prophet predicts all data, so we slice last 12 months

    # Calculate evaluation metrics
    mae = mean_absolute_error(actual_prices, predicted_prices)
    rmse = np.sqrt(mean_squared_error(actual_prices, predicted_prices))
    r2 = r2_score(actual_prices, predicted_prices)

    # Extract last 12 months of predictions
    forecast_data = forecast[['ds', 'yhat']].tail(12)

    # Convert to list of dictionaries for JSON response
    result = {
        "predictions": forecast_data.to_dict(orient="records"),
        "metrics": {
            "MAE": round(mae, 2),
            "RMSE": round(rmse, 2),
            "R2_Score": round(r2, 2)
        }
    }

    return jsonify(result)


@app.route('/accuracy', methods=['GET'])
def calculate_accuracy():
    """
    API endpoint to compute average MAE, RMSE, and R2 score for all crops.
    Usage: /accuracy
    """
    total_mae = []
    total_rmse = []
    total_r2 = []

    for crop_name, prices in crop_prices.items():
        # Prepare data for Prophet
        dates = pd.date_range(start="2021-01-01", periods=36, freq="M")
        df = pd.DataFrame({"ds": dates, "y": prices})

        # Train Prophet model
        model = Prophet()
        model.fit(df)

        # Predict next 12 months
        future = model.make_future_dataframe(periods=12, freq="M")
        forecast = model.predict(future)

        # Extract actual and predicted prices
        actual_prices = df["y"].values[-12:]  # Last 12 known months
        predicted_prices = forecast["yhat"].values[:36][-12:]  # Last 12 predicted months

        # Calculate metrics
        mae = mean_absolute_error(actual_prices, predicted_prices)
        rmse = np.sqrt(mean_squared_error(actual_prices, predicted_prices))
        r2 = r2_score(actual_prices, predicted_prices)

        # Store values
        total_mae.append(mae)
        total_rmse.append(rmse)
        total_r2.append(r2)

    # Compute overall average metrics
    avg_mae = np.mean(total_mae)
    avg_rmse = np.mean(total_rmse)
    avg_r2 = np.mean(total_r2)

    result = {
        "overall_accuracy": {
            "Average_MAE": round(avg_mae, 2),
            "Average_RMSE": round(avg_rmse, 2),
            "Average_R2_Score": round(avg_r2, 2)
        }
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)