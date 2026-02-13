// FinCalc India - Main Script

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle Icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Global Chart.js Defaults for Premium Look
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = "'Inter', system-ui, -apple-system, sans-serif";
        Chart.defaults.color = '#64748b'; // var(--text-body)
        Chart.defaults.scale.grid.color = '#f1f5f9'; // var(--border-subtle) but lighter

        // Tooltip Styling
        Chart.defaults.plugins.tooltip.backgroundColor = '#1e293b'; // var(--primary-light)
        Chart.defaults.plugins.tooltip.padding = 12;
        Chart.defaults.plugins.tooltip.cornerRadius = 8;
        Chart.defaults.plugins.tooltip.titleFont.weight = '600';
        Chart.defaults.plugins.tooltip.titleFont.size = 13;
        Chart.defaults.plugins.tooltip.bodyFont.size = 13;
        Chart.defaults.plugins.tooltip.displayColors = false; // Cleaner look
    }

    // Quick Access Dropdown (calc-select) logic
    const quickAccess = document.getElementById('quick-access');
    if (quickAccess) {
        quickAccess.addEventListener('change', (e) => {
            if (e.target.value) {
                window.location.href = e.target.value;
            }
        });
    }
});
