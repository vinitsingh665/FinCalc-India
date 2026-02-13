// EMI Calculator Logic

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('loan-amount');
    const amountRange = document.getElementById('loan-amount-range');

    const rateInput = document.getElementById('interest-rate');
    const rateRange = document.getElementById('interest-rate-range');

    const tenureInput = document.getElementById('loan-tenure');
    const tenureRange = document.getElementById('loan-tenure-range');

    const emiVal = document.getElementById('emi-val');
    const interestVal = document.getElementById('interest-val');
    const totalVal = document.getElementById('total-val');

    let chart;

    function syncInputs(input, range) {
        input.addEventListener('input', () => {
            range.value = input.value;
            calculateEMI();
        });
        range.addEventListener('input', () => {
            input.value = range.value;
            calculateEMI();
        });
    }

    syncInputs(amountInput, amountRange);
    syncInputs(rateInput, rateRange);
    syncInputs(tenureInput, tenureRange);

    function calculateEMI() {
        const P = parseFloat(amountInput.value);
        const R_annual = parseFloat(rateInput.value);
        const N_years = parseFloat(tenureInput.value);

        if (isNaN(P) || isNaN(R_annual) || isNaN(N_years)) return;

        const R = R_annual / 12 / 100; // Monthly Rate
        const N = N_years * 12; // Months

        // Formula: E = P * R * (1+R)^N / ((1+R)^N - 1)

        let emi = 0;
        if (R === 0) {
            emi = P / N;
        } else {
            emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        }

        const totalPayable = emi * N;
        const totalInterest = totalPayable - P;

        emiVal.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
        interestVal.textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
        totalVal.textContent = '₹' + Math.round(totalPayable).toLocaleString('en-IN');

        updateChart(P, totalInterest);
    }

    function updateChart(principal, interest) {
        const ctx = document.getElementById('emi-chart').getContext('2d');

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Principal Amount', 'Total Interest'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ['#e2e8f0', '#ea580c'], // Grey vs Orange
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) {
                                    label += '₹' + Math.round(context.parsed).toLocaleString('en-IN');
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    calculateEMI();
});
