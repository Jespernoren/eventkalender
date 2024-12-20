const calendar = document.getElementById('calendar');

// Mock data för events
const events = [
    { date: '2024-01-15', title: 'Prova på snowboard', location: 'Gesundaberget', description: 'Helg för barn 6-10 år att prova snowboard.' },
    { date: '2024-02-10', title: 'Quiksilver ROXY Radar', location: 'Sälen', description: 'Tävling för nya talanger 8-14 år.' },
    { date: '2024-02-20', title: 'Winter X Games', location: 'Aspen Mountain', description: 'En av världens största actionsportevenemang.' }
];

// Funktion för att generera kalendern
function generateCalendar(events) {
    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');

        eventDiv.innerHTML = `
            <p class="event-date">${event.date}</p>
            <h3 class="event-title">${event.title}</h3>
            <p>${event.location}</p>
            <p class="event-description">${event.description}</p>
        `;

        calendar.appendChild(eventDiv);
    });
}

// Generera kalendern
generateCalendar(events);
