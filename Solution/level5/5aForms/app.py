from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

# Function to insert data into the database
def insert_data(data):
    print("You are in insert_data - > ", data)

# Home route with the form
@app.route('/', methods=['GET', 'POST'])
def home():
    data = request.form.get('data')
    print("The data is", data)
    insert_data(data)  # Insert the data into the database
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)