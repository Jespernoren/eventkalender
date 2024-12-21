// Mock data för evenemang
const events = [
    { date: '2024-12-29', title: 'Prova på snowboard', location: 'Gesundaberget', description: 'Helg för barn 6-10 år att prova snowboard.' },
    { date: '2025-01-01', title: 'Quiksilver ROXY Radar', location: 'Sälen', description: 'Tävling för nya talanger 8-14 år.' },
    { date: '2025-02-20', title: 'Winter X Games', location: 'Aspen Mountain', description: 'En av världens största actionsportevenemang.' },
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
const eventListTitle = document.getElementById('event-list-title');

// Funktion för att generera kalendern
function generateCalendar(month, year) {
    calendarGrid.innerHTML = ''; // Rensa kalendern

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
        }

        calendarGrid.appendChild(dayCell);
    }

    updateEventList(month, year); // Uppdatera eventlistan
}

// Funktion för att uppdatera listan över event
function updateEventList(month = null, year = null) {
    eventListContainer.innerHTML = '';

    const today = new Date();

    // Filtrera event baserat på datum
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);

        // Visa alla kommande event som standard
        if (month === null && year === null) {
            return eventDate >= today;
        }

        // Visa event för den valda månaden och året
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    // Uppdatera rubriken baserat på visning
    if (month === null && year === null) {
        eventListTitle.textContent = 'Alla kommande events';
    } else {
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
        eventListTitle.textContent = `Kommande events i ${monthName} ${year}`;
    }

    // Om inga event hittas
    if (filteredEvents.length === 0) {
        eventListContainer.innerHTML = '<p>Inga event hittades.</p>';
        return;
    }

    // Skapa en lista över event
    filteredEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event-item');
        eventDiv.innerHTML = `
            <strong>${event.date}:</strong> ${event.title}<br>
            <em>${event.location}</em><br>
            <p>${event.description}</p>
        `;

        // Lägg till knappen för att läsa mer om eventet
        const infoButton = document.createElement('button');
        infoButton.textContent = "Klicka för att läsa mer";
        infoButton.classList.add('event-info-button');

        // Navigera till eventsidan när knappen klickas
        infoButton.addEventListener('click', () => {
            const queryString = `?date=${event.date}&title=${encodeURIComponent(event.title)}&location=${encodeURIComponent(event.location)}&description=${encodeURIComponent(event.description)}`;
            window.location.href = `event.html${queryString}`;
        });

        eventDiv.appendChild(infoButton); // Lägg till knappen till event-elementet
        eventListContainer.appendChild(eventDiv); // Lägg till eventet i listan
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

// Knapp för att gå tillbaka till idag och visa alla kommande event
backToTodayButton.addEventListener('click', () => {
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    generateCalendar(currentMonth, currentYear);
    updateEventList(); // Visa alla kommande event
});

// Initiera kalendern
generateCalendar(currentMonth, currentYear);
updateEventList();
