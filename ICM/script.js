function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;

    if (isNaN(weight) || isNaN(height)) {
        alert('Por favor, ingresa valores válidos.');
        return;
    }

    const bmi = weight / (height * height);
    let category = '';

    if (bmi < 18.5) {
        category = 'Bajo peso';
    } else if (bmi < 24.9) {
        category = 'Normal';
    } else if (bmi < 29.9) {
        category = 'Sobrepeso';
    } else {
        category = 'Obesidad';
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Tu IMC es ${bmi.toFixed(2)} (${category}).`;
}
