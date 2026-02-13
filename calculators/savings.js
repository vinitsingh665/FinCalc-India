// Savings Goal Calculator Logic

document.addEventListener('DOMContentLoaded', () => {
    const goalInput = document.getElementById('goal-amount');
    const goalRange = document.getElementById('goal-amount-range');

    const yearsInput = document.getElementById('time-period');
    const yearsRange = document.getElementById('time-period-range');

    const rateInput = document.getElementById('return-rate');
    const rateRange = document.getElementById('return-rate-range');

    const monthlyReqEl = document.getElementById('monthly-req');
    const totalInvEl = document.getElementById('total-inv');
    const totalIntEl = document.getElementById('total-int');

    function syncInputs(input, range) {
        input.addEventListener('input', () => {
            range.value = input.value;
            calculateGoal();
        });
        range.addEventListener('input', () => {
            input.value = range.value;
            calculateGoal();
        });
    }

    syncInputs(goalInput, goalRange);
    syncInputs(yearsInput, yearsRange);
    syncInputs(rateInput, rateRange);

    function calculateGoal() {
        const FV = parseFloat(goalInput.value);
        const years = parseFloat(yearsInput.value);
        const r = parseFloat(rateInput.value);

        if (isNaN(FV) || isNaN(years) || isNaN(r)) return;

        const months = years * 12;
        const i = r / 12 / 100;

        // SIP Formula for FV: FV = P * ( (1+i)^n - 1 ) / i * (1+i)
        // We need P.
        // P = FV / [ ( (1+i)^n - 1 ) / i * (1+i) ]

        let P = 0;
        if (i === 0) {
            P = FV / months;
        } else {
            const factor = ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
            P = FV / factor;
        }

        const totalInvested = P * months;
        const totalInterest = FV - totalInvested;

        monthlyReqEl.textContent = '₹' + Math.round(P).toLocaleString('en-IN');
        totalInvEl.textContent = '₹' + Math.round(totalInvested).toLocaleString('en-IN');
        totalIntEl.textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    }

    calculateGoal();
});
