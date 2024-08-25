from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if request.method == 'POST':
        # Aquí iría la lógica para actualizar la configuración del usuario
        # Ejemplo: guardar el nombre, apellido, etc.
        # Puedes usar una base de datos para almacenar estos datos.
        print(request.form)
        return redirect(url_for('settings'))
    return render_template('settings.html')

if __name__ == '__main__':
    app.run(debug=True)
