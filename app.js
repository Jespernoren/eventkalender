// Globala variabler för aktuell månad och år
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Mock data för evenemang
const events = [
    { date: '2024-01-15', title: 'Prova på snowboard', location: 'Gesundaberget', description: 'Helg för barn 6-10 år att prova snowboard.' },
    { date: '2024-02-10', title: 'Quiksilver ROXY Radar', location: 'Sälen', description: 'Tävling för nya talanger 8-14 år.' },
    { date: '2024-02-20', title: 'Winter X Games', location: 'Aspen Mountain', description: 'En av världens största actionsportevenemang.' },
];

// Hämta HTML-element
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

// Funktion för att generera kalendern
function generateCalendar(month, year) {
    // Rensa kalendern
    calendarGrid.innerHTML = '';

    // Visa aktuell månad och år
    currentMonthElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Hämta antalet dagar i månaden
    const firstDay = new Date(year, month, 1).getDay(); // Vilken veckodag månaden startar på
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Lägg till tomma rutor för dagar innan månadens start
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }

    // Lägg till rutor för varje dag i månaden
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;

        // Kontrollera om det finns ett event på detta datum
        const eventDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const event = events.find(e => e.date === eventDate);

        if (event) {
            dayCell.classList.add('event');
            dayCell.addEventListener('click', () => {
                // Visa mer information om eventet
                alert(`Evenemang: ${event.title}\nDatum: ${event.date}\nPlats: ${event.location}\nBeskrivning: ${event.description}`);
            });
        }

        calendarGrid.appendChild(dayCell);
    }
}

// Navigeringsknappar
prevMonthButton.addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextMonthButton.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Generera kalendern för aktuell månad
generateCalendar(currentMonth, currentYear);
