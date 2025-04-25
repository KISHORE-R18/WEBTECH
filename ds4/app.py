from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecurekey123'  # Use a stronger secret in production

# Simulated user data
user = {
    'username': 'user1',
    'balance': 1000.00
}

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            amount = float(request.form['amount'])
            action = request.form['action']

            if amount <= 0:
                flash('Amount must be greater than 0!', 'danger')
            elif action == 'deposit':
                user['balance'] += amount
                flash(f'Deposited ${amount:.2f} successfully.', 'success')
            elif action == 'withdraw':
                if amount > user['balance']:
                    flash('Insufficient balance!', 'danger')
                else:
                    user['balance'] -= amount
                    flash(f'Withdrew ${amount:.2f} successfully.', 'success')
            else:
                flash('Invalid action.', 'danger')
        except ValueError:
            flash('Invalid amount entered.', 'danger')

        return redirect(url_for('index'))

    return render_template('index.html', user=user)

if __name__ == '__main__':
    app.run(debug=True)
