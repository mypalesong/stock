// Stock price data (1 month - daily)
const dates = [
    '10/28', '10/29', '10/30', '10/31', '11/01',
    '11/04', '11/05', '11/06', '11/07', '11/08',
    '11/11', '11/12', '11/13', '11/14', '11/15',
    '11/18', '11/19', '11/20', '11/21', '11/22',
    '11/25', '11/26', '11/27', '11/28'
];

// SK Hynix stock prices (in KRW 1000s)
const hynixPrices = [
    165, 167, 164, 162, 168,
    171, 169, 173, 175, 172,
    174, 176, 178, 175, 177,
    179, 180, 178, 181, 179,
    182, 180, 177, 178.5
];

// Samsung Electronics stock prices (in KRW 1000s)
const samsungPrices = [
    73, 72.5, 74, 73.8, 72,
    71.5, 72.8, 73.5, 72.2, 71.8,
    72.5, 73, 71.5, 72, 71.2,
    70.5, 71.8, 72.5, 71, 70.8,
    71.5, 72, 71.8, 71.2
];

// Chart configuration
const chartConfig = {
    type: 'line',
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.8,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 13
                },
                bodyFont: {
                    size: 12
                },
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y.toLocaleString() + '원';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    maxRotation: 45,
                    minRotation: 45
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    callback: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        }
    }
};

// SK Hynix Chart
const hynixCtx = document.getElementById('hynixChart');
if (hynixCtx) {
    new Chart(hynixCtx, {
        ...chartConfig,
        data: {
            labels: dates,
            datasets: [{
                label: 'SK하이닉스',
                data: hynixPrices,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        }
    });
}

// Samsung Electronics Chart
const samsungCtx = document.getElementById('samsungChart');
if (samsungCtx) {
    new Chart(samsungCtx, {
        ...chartConfig,
        data: {
            labels: dates,
            datasets: [{
                label: '삼성전자',
                data: samsungPrices,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#ef4444',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        }
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.stock-section, .overview-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Display last updated time
const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
const dateInfo = document.querySelector('.date-info');
if (dateInfo) {
    dateInfo.textContent = `📅 업데이트: ${now.toLocaleDateString('ko-KR', options)}`;
}
