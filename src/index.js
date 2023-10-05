export const test = 5;

fetch('http://localhost:8001/test/', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title: 'titre', position: '500' }) }).then(response => response.json()).then( (data) => {
    alert(data.title);
})