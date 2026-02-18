document.addEventListener('DOMContentLoaded', function () {
    const areaInput = document.getElementById('area');
    const totalPriceElem = document.getElementById('total-price');
    const totalDurationElem = document.getElementById('total-duration');
    const extraCheckboxes = document.querySelectorAll('.extra-checkbox');
    const calculateBtn = document.getElementById('calculate-price');

    function updatePrice() {
        let area = parseFloat(areaInput.value) || 0;

        // Min/Max
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

        // Arbeitsdauer berechnen
        const hoursPerM2 = parseFloat(areaInput.dataset.hoursPerM2) || 0;
        const totalHours = area * hoursPerM2;

        const hoursPerDay = 8;
        const totalDays = Math.ceil(totalHours / hoursPerDay);

        totalDurationElem.textContent = `${totalDays} Tage`;
    }

    calculateBtn.addEventListener('click', updatePrice);
});


//hover up effekt, google reviews
    document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("#c69 .google-review");

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add("show");
}
});
}, {
    threshold: 0.2
});

    elements.forEach(el => observer.observe(el));
});

