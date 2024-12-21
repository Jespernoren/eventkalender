// Hämta query string från URL
const params = new URLSearchParams(window.location.search);

// Hämta data från query string
const eventTitle = params.get('title');
const eventDate = params.get('date');
const eventLocation = params.get('location');
const eventDescription = params.get('description');

// Sätt innehåll på sidan
document.getElementById('event-title').textContent = eventTitle || 'Event';
document.getElementById('event-date').textContent = `Datum: ${eventDate}`;
document.getElementById('event-location').textContent = `Plats: ${eventLocation}`;
document.getElementById('event-description').textContent = eventDescription;
