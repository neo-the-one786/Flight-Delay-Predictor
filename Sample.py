import pandas as pd
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
import numpy as np

# Load the data
df = pd.read_csv("./M1_final.csv")
print(df.head())


def time_to_minutes(t):
    if pd.isna(t) or t == 'NaN' or t == '':
        return 0
    h, m = map(int, t.split(':'))
    return h * 60 + m


# # Apply the function to the relevant columns
# df['delay departure'] = df['delay departure'].apply(time_to_minutes)
# df['scheduled departure'] = df['scheduled departure'].apply(time_to_minutes)
# df['actual departure'] = df['actual departure'].apply(time_to_minutes)
#
# # Extract features from the date column
# df['date'] = pd.to_datetime(df['date'], format='%d-%m-%Y')
# df['day_of_week'] = df['date'].dt.dayofweek
# df['day_of_month'] = df['date'].dt.day
# df['month'] = df['date'].dt.month
# df['year'] = df['date'].dt.year
#
# # Extract features from the time column
# df['time'] = df['time'].apply(time_to_minutes)
#
# # Drop the original 'date' and 'time' columns
# df = df.drop(columns=['date', 'time'])

# Handle categorical variables
categorical = ['OP_UNIQUE_CARRIER', 'TAIL_NUM', 'DEST', 'Wind', 'Condition']
df = pd.get_dummies(df, columns=categorical, drop_first=True)

print(df.head())

# Check for NaN values and fill them with the mean of the column
df.fillna(df.mean(), inplace=True)

# Prepare the feature and target variables
features = [x for x in df.columns if x != 'DEP_DELAY']
X = df[features]
y = df['DEP_DELAY']

# Split the data
xTrain, xTest, yTrain, yTest = train_test_split(X, y, train_size=0.8, random_state=42)

# Further split the training data for evaluation
n = int(len(xTrain) * 0.8)
xTrain_fit, xTrain_eval, yTrain_fit, yTrain_eval = xTrain[:n], xTrain[n:], yTrain[:n], yTrain[n:]

model = XGBRegressor(n_estimators=500, learning_rate=0.0025, verbosity=1, random_state=55, reg_lambda=0.2,
                     min_split_loss=375)
model.fit(xTrain_fit, yTrain_fit, eval_set=[(xTrain_eval, yTrain_eval)], verbose=True)

yTrain_pred = model.predict(xTrain)
yTest_pred = model.predict(xTest)

print("\n\nGradient Boosted Tree:")
print(
    f"Metrics train:\n\tRMSE: {np.sqrt(mean_squared_error(yTrain, yTrain_pred)):.4f}\n\tMAE: {mean_absolute_error(yTrain, yTrain_pred):.4f}\n\tR2: {r2_score(yTrain, yTrain_pred):.4f}")
print(
    f"Metrics test:\n\tRMSE: {np.sqrt(mean_squared_error(yTest, yTest_pred)):.4f}\n\tMAE: {mean_absolute_error(yTest, yTest_pred):.4f}\n\tR2: {r2_score(yTest, yTest_pred):.4f}")
