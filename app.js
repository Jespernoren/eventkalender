// Mock data för evenemang
const events = [
    { date: '2024-01-15', title: 'Prova på snowboard', location: 'Gesundaberget', description: 'Helg för barn 6-10 år att prova snowboard.' },
    { date: '2024-02-10', title: 'Quiksilver ROXY Radar', location: 'Sälen', description: 'Tävling för nya talanger 8-14 år.' },
    { date: '2024-02-20', title: 'Winter X Games', location: 'Aspen Mountain', description: 'En av världens största actionsportevenemang.' },
];

// Globala variabler för aktuell månad och år
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Hämta HTML-element
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const backToTodayButton = document.getElementById('back-to-today');
const eventListContainer = document.getElementById('events-container');

// Funktion för att generera kalendern
function generateCalendar(month, year) {
    // Rensa kalendern
    calendarGrid.innerHTML = '';

    // Visa aktuell månad och år
    currentMonthElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Hämta antalet dagar i månaden
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Lägg till tomma rutor för dagar innan månadens start
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty-cell');
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
                alert(`Evenemang: ${event.title}\nDatum: ${event.date}\nPlats: ${event.location}\nBeskrivning: ${event.description}`);
            });
        }

        calendarGrid.appendChild(dayCell);
    }

    updateEventList(month, year);
}

// Funktion för att uppdatera listan över aktiva event
function updateEventList(month, year) {
    eventListContainer.innerHTML = '';

    const activeEvents = events
        .filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === month && eventDate.getFullYear() === year;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (activeEvents.length === 0) {
        eventListContainer.innerHTML = '<p>Inga aktiva event för denna månad.</p>';
        return;
    }

    activeEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event-item');
        eventDiv.textContent = `${event.date}: ${event.title}`;
        eventListContainer.appendChild(eventDiv);
    });
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

// Knapp för att gå tillbaka till idag
backToTodayButton.addEventListener('click', () => {
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    generateCalendar(currentMonth, currentYear);
});

// Generera kalendern för aktuell månad
generateCalendar(currentMonth, currentYear);
