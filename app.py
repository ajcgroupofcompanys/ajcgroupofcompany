from flask import Flask, render_template, request, redirect, url_for
import smtplib
from email.mime.text import MIMEText

# Import prices dictionary or define it here
prices = {
    'product1': 100,  # Example price
    'product2': 200,  # Example price
}

app = Flask(__name__, template_folder='templates')  # Adjusted the template folder path


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/send_email', methods=['POST'])
def send_email():
    # Extract data from the form
    name = request.form['name']
    email = request.form['email']
    item_count = int(request.form['itemCount'])
    products = []

    # Collect product data
    for i in range(1, item_count + 1):
        product = request.form.get(f'product{i}')
        quantity = request.form.get(f'quantity{i}')
        if product and quantity:
            products.append((product, int(quantity)))

    # Calculate total cost
    total_cost = sum(prices.get(product, 0) * quantity for product, quantity in products)

    # Email content
    body = f"Order from {name}\nEmail: {email}\n\n"
    for product, quantity in products:
        body += f"Product: {product}, Quantity: {quantity}\n"
    body += f"\nTotal Cost: Rs {total_cost}"

    # Send email (adjust credentials)
    msg = MIMEText(body)
    msg['Subject'] = f"New Order from {name}"
    msg['From'] = 'your_email@gmail.com'
    msg['To'] = 'ajcgroupofcompany41@gmail.com'

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:  # Corrected port to 587
            server.starttls()
            server.login('your_email@gmail.com', 'your_password')  # Replace with real credentials
            server.sendmail(msg['From'], [msg['To']], msg.as_string())
    except Exception as e:
        print(f"Error: {e}")

    return redirect(url_for('home'))


@app.route('/send_feedback', methods=['POST'])
def send_feedback():
    # Extract feedback data
    phone = request.form['phone']
    feedback = request.form['feedback']

    # Store feedback logic or email it (left empty for now)
    print(f"Feedback received from {phone}: {feedback}")

    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)


