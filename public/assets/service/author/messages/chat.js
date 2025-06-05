const roomId = window.location.pathname.split('/').pop();
const socket = new WebSocket(`/api/v4/ws/${roomId}`);
const input = document.querySelector('#message');
const submit = document.querySelector('#submit');
const chatLog = document.querySelector('#chat-log');
