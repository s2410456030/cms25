document.addEventListener('DOMContentLoaded', function () {
    const areaInput = document.getElementById('area');
    const totalPriceElem = document.getElementById('total-price');
    const totalDurationElem = document.getElementById('total-duration');
    const extraCheckboxes = document.querySelectorAll('.extra-checkbox');
    const calculateBtn = document.getElementById('calculate-price');

    function updatePrice() {
        let area = parseFloat(areaInput.value) || 0;

        // Min/Max validieren
        const min = parseFloat(areaInput.dataset.min);
        const max = parseFloat(areaInput.dataset.max);
        if (area < min) area = min;
        if (area > max) area = max;
        areaInput.value = area;

        // Basispreis
        const basePrice = parseFloat(areaInput.dataset.basePrice);
        let total = area * basePrice;

        // Extras pro m² berechnen
        extraCheckboxes.forEach(cb => {
            if(cb.checked) {
                const extraPrice = parseFloat(cb.dataset.price);
                total += area * extraPrice; // pro m²
            }
        });

        // Gesamtpreis anzeigen
        totalPriceElem.textContent = total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

        // Arbeitsdauer in Tagen berechnen
        const hoursPerM2 = parseFloat(areaInput.dataset.hoursPerM2) || 0;
        const totalHours = area * hoursPerM2;

        const hoursPerDay = 8; // Standardarbeitstag
        const totalDays = Math.ceil(totalHours / hoursPerDay);

        totalDurationElem.textContent = `${totalDays} Tage`;
    }

    // Berechnung nur beim Button-Klick
    calculateBtn.addEventListener('click', updatePrice);
});
