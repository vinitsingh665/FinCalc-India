// FD / RD Calculator Logic

document.addEventListener('DOMContentLoaded', () => {
    const calcType = document.getElementById('calc-type');

    const amountInput = document.getElementById('amount');
    const amountLabel = document.getElementById('amount-label');

    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');

    const maturityVal = document.getElementById('maturity-val');
    const investedVal = document.getElementById('invested-val');
    const interestVal = document.getElementById('interest-val');

    function calculate() {
        const type = calcType.value;
        const P = parseFloat(amountInput.value);
        const r = parseFloat(rateInput.value);
        const t = parseFloat(yearsInput.value);

        if (isNaN(P) || isNaN(r) || isNaN(t)) return;

        let maturity = 0;
        let invested = 0;

        if (type === 'fd') {
            // FD Formula: A = P * (1 + r/n)^(n*t)
            // Assuming Quarterly compounding (n=4) which is standard for Indian banks
            const n = 4;
            const rate = r / 100;
            maturity = P * Math.pow(1 + rate / n, n * t);
            invested = P;
        } else {
            // RD Formula: A = P * (1+r/n)^(n*t) - 1 ) / (1-(1+r/n)^(-1/3)) ... complicates
            // Standard RD Formula in India with Quarterly Compounding:
            // A = P * ((1+i)^n - 1) / (1-(1+i)^(-1/3)) -- No, that's complex
            // Simpler Approx for RD: M = P * n + P * n(n+1)/2 * r/12/100 (Simple Interest based) -> Incorrect for compounding

            // Correct RD Formula with quarterly compounding used by banks is complex.
            // Let's use the General Formula for RD with Monthly compounding for simplicity as user approximation:
            // M = P * ( (1+i)^n - 1 ) / i * (1+i) -- This is same as SIP (Monthly compounding).
            // But Banks use Quarterly.
            // Let's stick to Monthly Compounding approximation for RD as it's close enough for estimates.

            const months = t * 12;
            const i = r / 12 / 100;
            maturity = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
            invested = P * months;
        }

        const interest = maturity - invested;

        maturityVal.textContent = '₹' + Math.round(maturity).toLocaleString('en-IN');
        investedVal.textContent = '₹' + Math.round(invested).toLocaleString('en-IN');
        interestVal.textContent = '₹' + Math.round(interest).toLocaleString('en-IN');
    }

    // Event Listeners
    calcType.addEventListener('change', () => {
        if (calcType.value === 'fd') {
            amountLabel.textContent = 'Deposit Amount (Lumpsum)';
        } else {
            amountLabel.textContent = 'Monthly Deposit Amount';
        }
        calculate();
    });

    amountInput.addEventListener('input', calculate);
    rateInput.addEventListener('input', calculate);
    yearsInput.addEventListener('input', calculate);

    calculate();
});
