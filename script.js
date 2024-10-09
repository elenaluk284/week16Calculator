const carModels = {
    Reno: ["Captur", "Duster", "Logan"],
    Opel: ["Astra", "Insignia", "Mokka"],
    Mazda: ["Mazda3", "CX-5", "MX-5"],
    Jaguar: ["F-Type", "I-Pace", "XE"]
};

document.getElementById('carBrand').addEventListener('change', function() {
    const brand = this.value;
    const modelSelect = document.getElementById('carModel');
    modelSelect.innerHTML = '';

    if (brand) {
        carModels[brand].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
});

const calculatePrice = () => {
    const brand = document.getElementById('carBrand').value;
    const engineVolume = parseFloat(document.getElementById('engineVolume').value);
    const condition = document.querySelector('input[name="carCondition"]:checked');
    const priceDisplay = document.getElementById('price');

    if (!brand || isNaN(engineVolume) || !condition) {
        priceDisplay.textContent = '0';
        return;
    }

    let basePrice = 0;
    switch (brand) {
        case "Reno":
            basePrice = 900000;
            break;
        case "Opel":
            basePrice = 1200000;
            break;
        case "Mazda":
            basePrice = 1500000;
            break;
        case "Jaguar":
            basePrice = 3000000;
            break;
    }

    // Дополнительные условия для расчета
    if (condition.value === "подержанный") {
        basePrice *= 0.8; // Уменьшаем цену на 20%
    }
    
    const price = basePrice + (engineVolume - 1) * 100000;
    priceDisplay.textContent = price.toFixed(2);
};

const carConditionInputs = document.querySelectorAll('input[name="carCondition"]');
carConditionInputs.forEach(input => {
    input.addEventListener('change', function() {
        document.getElementById('ownersRow').style.display = this.value === 'подержанный' ? 'table-row' : 'none';
        calculatePrice();
    });
});

document.querySelectorAll('input[type="radio"], select, #engineVolume').forEach(input => {
    input.addEventListener('change', calculatePrice);
});

document.getElementById('engineVolume').addEventListener('input', calculatePrice);
