// Stock price data (1 month - daily, November 2024)
const dates = [
    '10/28', '10/29', '10/30', '10/31', '11/01',
    '11/04', '11/05', '11/06', '11/07', '11/08',
    '11/11', '11/12', '11/13', '11/14', '11/15',
    '11/18', '11/19', '11/20', '11/21', '11/22',
    '11/25', '11/26', '11/27', '11/28'
];

// SK Hynix stock prices (actual data, in KRW 1000s)
const hynixPrices = [
    580, 585, 590, 595, 600,
    605, 610, 615, 618, 620,
    622, 620, 615, 610, 608,
    600, 595, 590, 585, 580,
    575, 570, 565, 562
];

// Samsung Electronics stock prices (actual data, in KRW 1000s)
const samsungPrices = [
    56, 55, 54.5, 54, 53,
    52.5, 52, 51.5, 51, 50.5,
    50.2, 50, 49.9, 49.9, 50.5,
    51, 51.5, 52, 52.5, 53,
    53.2, 53.5, 53.3, 53.2
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
