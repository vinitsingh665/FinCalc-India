// Income Tax Calculator Logic (FY 2025-26)

document.addEventListener('DOMContentLoaded', () => {
    const incomeInput = document.getElementById('annual-income');
    const incomeRange = document.getElementById('annual-income-range');

    // Deductions (mainly for Old Regime comparison)
    const deductionsInput = document.getElementById('deductions');
    const ageSelect = document.getElementById('age-group');

    // Results
    const newTaxEl = document.getElementById('new-tax-val');
    const oldTaxEl = document.getElementById('old-tax-val');
    const benefitEl = document.getElementById('tax-benefit');

    // Sync Inputs
    function syncInputs(input, range) {
        input.addEventListener('input', () => {
            range.value = input.value;
            calculateTax();
        });
        range.addEventListener('input', () => {
            input.value = range.value;
            calculateTax();
        });
    }

    syncInputs(incomeInput, incomeRange);
    deductionsInput.addEventListener('input', calculateTax);
    ageSelect.addEventListener('change', calculateTax);

    function calculateNewRegimeTax(income) {
        // Standard Deduction for New Regime FY 25-26
        const stdDed = 75000;
        const taxableIncome = Math.max(0, income - stdDed);

        // Rebate u/s 87A: If taxable income <= 12,00,000, tax is 0.
        // wait, let's calculate tax first then apply rebate logic if applicable.
        // Actually, for New Regime FY25-26, if taxable income <= 12L, tax is zero.

        if (taxableIncome <= 700000) {
            return 0;
        }

        let tax = 0;

        // Slabs FY 2025-26
        // 0-4L: Nil
        // 4L-8L: 5%
        // 8L-12L: 10%
        // 12L-16L: 15%
        // 16L-20L: 20%
        // 20L-24L: 25%
        // >24L: 30%

        if (taxableIncome > 2400000) {
            tax += (taxableIncome - 2400000) * 0.30;
            tax += 400000 * 0.25; // 20-24L
            tax += 400000 * 0.20; // 16-20L
            tax += 400000 * 0.15; // 12-16L
            tax += 400000 * 0.10; // 8-12L
            tax += 400000 * 0.05; // 4-8L
        } else if (taxableIncome > 2000000) {
            tax += (taxableIncome - 2000000) * 0.25;
            tax += 400000 * 0.20;
            tax += 400000 * 0.15;
            tax += 400000 * 0.10;
            tax += 400000 * 0.05;
        } else if (taxableIncome > 1600000) {
            tax += (taxableIncome - 1600000) * 0.20;
            tax += 400000 * 0.15;
            tax += 400000 * 0.10;
            tax += 400000 * 0.05;
        } else if (taxableIncome > 1200000) {
            tax += (taxableIncome - 1200000) * 0.15;
            tax += 400000 * 0.10;
            tax += 400000 * 0.05;
        }

        // Add Cess
        return tax * 1.04;
    }

    function calculateOldRegimeTax(income, deductions, age) {
        // Standard Deduction
        const stdDed = 50000;
        const taxableIncome = Math.max(0, income - stdDed - deductions);

        // Rebate u/s 87A: If taxable income <= 5,00,000, tax is 0.
        if (taxableIncome <= 500000) {
            return 0;
        }

        let tax = 0;
        let basicExemption = 250000;

        if (age === '60-80') basicExemption = 300000;
        if (age === '80+') basicExemption = 500000;

        // Old Slabs
        // 0 - Basic: Nil
        // Basic - 5L: 5%
        // 5L - 10L: 20%
        // > 10L: 30%

        if (taxableIncome > 1000000) {
            tax += (taxableIncome - 1000000) * 0.30;
            tax += (1000000 - 500000) * 0.20;
            if (500000 > basicExemption) {
                tax += (500000 - basicExemption) * 0.05;
            }
        } else if (taxableIncome > 500000) {
            tax += (taxableIncome - 500000) * 0.20;
            if (500000 > basicExemption) {
                tax += (500000 - basicExemption) * 0.05;
            }
        } else if (taxableIncome > basicExemption) {
            tax += (taxableIncome - basicExemption) * 0.05;
        }

        // Add Cess
        return tax * 1.04;
    }

    function calculateTax() {
        const income = parseFloat(incomeInput.value) || 0;
        const deductions = parseFloat(deductionsInput.value) || 0;
        const age = ageSelect.value;

        const newTax = calculateNewRegimeTax(income);
        const oldTax = calculateOldRegimeTax(income, deductions, age);

        newTaxEl.textContent = '₹' + Math.round(newTax).toLocaleString('en-IN');
        oldTaxEl.textContent = '₹' + Math.round(oldTax).toLocaleString('en-IN');

        if (newTax < oldTax) {
            benefitEl.textContent = `New Regime saves you ₹${Math.round(oldTax - newTax).toLocaleString('en-IN')}`;
            benefitEl.style.color = '#16a34a';
        } else if (oldTax < newTax) {
            benefitEl.textContent = `Old Regime saves you ₹${Math.round(newTax - oldTax).toLocaleString('en-IN')}`;
            benefitEl.style.color = '#16a34a';
        } else {
            benefitEl.textContent = 'Both regimes have same tax liability';
            benefitEl.style.color = '#4b5563';
        }
    }

    calculateTax();
});
