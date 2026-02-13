// SIP Calculator Logic

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('investment-amount');
    const amountRange = document.getElementById('investment-amount-range');

    const rateInput = document.getElementById('return-rate');
    const rateRange = document.getElementById('return-rate-range');

    const yearsInput = document.getElementById('time-period');
    const yearsRange = document.getElementById('time-period-range');

    const investedVal = document.getElementById('invested-val');
    const returnsVal = document.getElementById('returns-val');
    const totalVal = document.getElementById('total-val');

    let chart; // Chart instance

    // Sync inputs and ranges
    function syncInputs(input, range) {
        input.addEventListener('input', () => {
            range.value = input.value;
            calculateSIP();
        });
        range.addEventListener('input', () => {
            input.value = range.value;
            calculateSIP();
        });
    }

    syncInputs(amountInput, amountRange);
    syncInputs(rateInput, rateRange);
    syncInputs(yearsInput, yearsRange);

    function calculateSIP() {
        const P = parseFloat(amountInput.value);
        const r = parseFloat(rateInput.value);
        const n = parseFloat(yearsInput.value);

        if (isNaN(P) || isNaN(r) || isNaN(n)) return;

        const i = r / 12 / 100; // Monthly interest rate
        const months = n * 12; // Total months

        // SIP Formula: P * ({[1 + i]^n - 1} / i) * (1 + i)
        // Note: The common formula often cited is M = P * ({[1 + i]^n - 1} / i) * (1 + i) for beginning of period
        // OR M = P * ({[1 + i]^n - 1} / i) for end of period. 
        // Most Indian calculators use the "beginning of period" assumption or similar variations.
        // Let's use: FV = P * [ (1+i)^n - 1 ] / i * (1+i)

        const totalValue = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
        const investedAmount = P * months;
        const estReturns = totalValue - investedAmount;

        // Update DOM
        investedVal.textContent = '₹' + Math.round(investedAmount).toLocaleString('en-IN');
        returnsVal.textContent = '₹' + Math.round(estReturns).toLocaleString('en-IN');
        totalVal.textContent = '₹' + Math.round(totalValue).toLocaleString('en-IN');

        updateChart(investedAmount, estReturns);
    }

    function updateChart(invested, returns) {
        const ctx = document.getElementById('sip-chart').getContext('2d');

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Invested Amount', 'Est. Returns'],
                datasets: [{
                    data: [invested, returns],
                    backgroundColor: ['#e2e8f0', '#16a34a'], // Grey for invested, Green for returns
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
                        labels: {
                            usePointStyle: true,
                            font: {
                                family: "'Inter', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
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

    // Initial Calculation
    calculateSIP();
});
