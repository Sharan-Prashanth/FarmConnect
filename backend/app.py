from flask import Flask, request, jsonify
import pandas as pd
from prophet import Prophet

app = Flask(__name__)

# Define crop price data for 2022 and 2023
crop_prices = {
    "Paddy": [1881, 1887, 1888, 1878, 1869, 1895, 1902, 1954, 1994, 2045, 2093, 2151,
              2133, 2120, 2100, 2092, 2102, 2136, 2182, 2211, 2260, 2319, 2345, 2374],

    "Rice": [3675, 3673, 3680, 3699, 3695, 3729, 3800, 3862, 3965, 3996, 4011, 4001,
             4044, 4061, 4097, 4120, 4133, 4169, 4249, 4327, 4370, 4408, 4406, 4426],

    "Wheat": [2228, 2230, 2339, 2384, 2352, 2316, 2409, 2486, 2516, 2570, 2719, 2812,
              2934, 2709, 2593, 2533, 2555, 2582, 2595, 2658, 2702, 2741, 2818, 2825],

    "Ragi": [2934, 2993, 3038, 2963, 3015, 2925, 2888, 2823, 2750, 2736, 2798, 2806,
             2869, 2884, 2945, 3048, 3017, 3073, 3193, 3343, 3369, 3427, 3520, 3610],

    "Maize": [1891, 1947, 2052, 2131, 2146, 2138, 2180, 2251, 2221, 2180, 2225, 2285,
              2324, 2291, 2265, 2202, 2160, 2140, 2166, 2173, 2175, 2158, 2236, 2272],

    "Tomato": [1889, 1450, 1255, 2088, 4270, 3866, 1898, 1937, 2976, 3102, 1639, 1228,
               1363, 1477, 1564, 1252, 1371, 2885, 8302, 6765, 1849, 1494, 2506, 2449],

    "Potato": [1241, 1230, 1335, 1397, 1632, 1814, 1989, 2057, 2029, 2172, 1807, 1486,
               1183, 993, 964, 1170, 1330, 1423, 1569, 1583, 1569, 1604, 1586, 1405],

    "Onion": [2536, 2649, 1805, 1413, 1326, 1591, 1618, 1673, 1623, 2084, 1945, 1911,
              1777, 1365, 1279, 1239, 1288, 1430, 1755, 2130, 2448, 3070, 4232, 3361],

    "Groundnut": [5708, 5707, 5764, 5849, 5959, 5948, 6063, 6161, 6146, 6065, 6076, 6316,
                  6605, 6730, 6734, 6662, 6666, 6667, 6770, 6780, 6709, 6679, 6614, 6698]
}

@app.route('/predict', methods=['GET'])
def predict():
    """
    API endpoint to predict crop prices for the next 12 months.
    Usage: /predict?crop=Rice
    """
    crop_name = request.args.get("crop")  
    if not crop_name:
        return jsonify({"error": "Please provide a crop name as a query parameter, e.g., /predict?crop=Rice"}), 400
    
    if crop_name not in crop_prices:
        return jsonify({"error": f"Crop '{crop_name}' not found. Available crops: {list(crop_prices.keys())}"}), 400


    dates = pd.date_range(start="2023-01-01", periods=24, freq="M")
    df = pd.DataFrame({"ds": dates, "y": crop_prices[crop_name]})


    model = Prophet()
    model.fit(df)

    
    future = model.make_future_dataframe(periods=12, freq="M")


    forecast = model.predict(future)


    forecast_data = forecast[['ds', 'yhat']].tail(12)
    

    result = forecast_data.to_dict(orient="records")

    return jsonify(result)

if __name__ == '_main_':
    app.run(debug=True)