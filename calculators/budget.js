// Budget Calculator Logic (50/30/20 Rule)

document.addEventListener('DOMContentLoaded', () => {
    const incomeInput = document.getElementById('monthly-income');
    const incomeRange = document.getElementById('monthly-income-range');

    // Results
    const needsVal = document.getElementById('needs-val');
    const wantsVal = document.getElementById('wants-val');
    const savingsVal = document.getElementById('savings-val');

    let chart;

    function syncInputs(input, range) {
        input.addEventListener('input', () => {
            range.value = input.value;
            calculateBudget();
        });
        range.addEventListener('input', () => {
            input.value = range.value;
            calculateBudget();
        });
    }

    syncInputs(incomeInput, incomeRange);

    function calculateBudget() {
        const income = parseFloat(incomeInput.value);

        if (isNaN(income)) return;

        const needs = income * 0.50;
        const wants = income * 0.30;
        const savings = income * 0.20;

        needsVal.textContent = '₹' + Math.round(needs).toLocaleString('en-IN');
        wantsVal.textContent = '₹' + Math.round(wants).toLocaleString('en-IN');
        savingsVal.textContent = '₹' + Math.round(savings).toLocaleString('en-IN');

        updateChart(needs, wants, savings);
    }

    function updateChart(needs, wants, savings) {
        const ctx = document.getElementById('budget-chart').getContext('2d');

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Needs (50%)', 'Wants (30%)', 'Savings (20%)'],
                datasets: [{
                    data: [needs, wants, savings],
                    backgroundColor: ['#3b82f6', '#f59e0b', '#16a34a'], // Blue, Amber, Green
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true }
                    }
                }
            }
        });
    }

    calculateBudget();
});
