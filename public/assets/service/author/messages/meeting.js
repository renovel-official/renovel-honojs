const startButton = document.querySelector('#start-meeting');
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const absoluteUrl = window.location.origin;

startButton.addEventListener('click', async () => {
    /** @type { import('ably').Realtime } */
    const ably = new Ably.Realtime({ authUrl: ABLY_AUTH_URL });

    ably.connection.once('connected', () => {
        
    });
});

/** @type { import('ably').Realtime } */
const ably = new Ably.Realtime({ authUrl: ABLY_AUTH_URL });