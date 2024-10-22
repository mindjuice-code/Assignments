const unitOptions = {
    length: ['meters', 'kilometers', 'miles', 'inches', 'feet'],
    weight: ['grams', 'kilograms', 'pounds', 'ounces'],
    temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
};

const conversionFactors = {
    length: {
        meters: { meters: 1, kilometers: 0.001, miles: 0.000621371, inches: 39.3701, feet: 3.28084 },
        kilometers: { meters: 1000, kilometers: 1, miles: 0.621371, inches: 39370.1, feet: 3280.84 },
        miles: { meters: 1609.34, kilometers: 1.60934, miles: 1, inches: 63360, feet: 5280 },
        inches: { meters: 0.0254, kilometers: 0.0000254, miles: 1 / 63360, inches: 1, feet: 1 / 12 },
        feet: { meters: 0.3048, kilometers: 0.0003048, miles: 1 / 5280, inches: 12, feet: 1 }
    },
    weight: {
        grams: { grams: 1, kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274 },
        kilograms: { grams: 1000, kilograms: 1, pounds: 2.20462, ounces: 35.274 },
        pounds: { grams: 453.592, kilograms: 0.453592, pounds: 1, ounces: 16 },
        ounces: { grams: 28.3495, kilograms: 0.0283495, pounds: 0.0625, ounces: 1 }
    },
    temperature: {
        Celsius: { Celsius: v => v, Fahrenheit: v => v * 9/5 + 32, Kelvin: v => v + 273.15 },
        Fahrenheit: { Celsius: v => (v - 32) * 5/9, Fahrenheit: v => v, Kelvin: v => (v - 32) * 5/9 + 273.15 },
        Kelvin: { Celsius: v => v - 273.15, Fahrenheit: v => (v - 273.15) * 9/5 + 32, Kelvin: v => v }
    }
};

document.getElementById('category').addEventListener('change', updateUnits);
document.getElementById('input_box').addEventListener('input', convert);
document.getElementById('unitFrom').addEventListener('change', convert);
document.getElementById('unitTo').addEventListener('change', convert);

function updateUnits() {
    const category = document.getElementById('category').value;
    const unitFrom = document.getElementById('unitFrom');
    const unitTo = document.getElementById('unitTo');

    unitFrom.innerHTML = '';
    unitTo.innerHTML = '';

    unitOptions[category].forEach(unit => {
        const optionFrom = document.createElement('option');
        optionFrom.value = unit;
        optionFrom.text = unit;
        unitFrom.add(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = unit;
        optionTo.text = unit;
        unitTo.add(optionTo);
    });
    convert();
}

function convert() {
    const category = document.getElementById('category').value;
    const unitFrom = document.getElementById('unitFrom').value;
    const unitTo = document.getElementById('unitTo').value;
    const inputValue = parseFloat(document.getElementById('input_box').value);

    let outputValue;

    if (category === 'temperature') {
        outputValue = conversionFactors[category][unitFrom][unitTo](inputValue);
    } else {
        outputValue = (inputValue * conversionFactors[category][unitFrom][unitTo]).toFixed(2);
    }

    document.getElementById('result_box').value = isNaN(outputValue) ? '' : outputValue;
}

function clearInput() {
    document.getElementById('input_box').value = '';
    document.getElementById('result_box').value = '';
}

document.addEventListener('DOMContentLoaded', updateUnits);
