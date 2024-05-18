const apiKey = '95ca4e33dc93a733c20fb18d5d06749a';  // Substitua pela sua chave de API do OpenWeatherMap
const apiUrl = `https://api.openweathermap.org/data/2.5/alerts?appid=${apiKey}&lang=pt`;

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherAlerts();
});

function fetchWeatherAlerts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const alertContainer = document.getElementById('alert-container');
            alertContainer.innerHTML = '';
            
            if (data.alerts && data.alerts.length > 0) {
                data.alerts.forEach(alert => {
                    const alertElement = document.createElement('div');
                    alertElement.className = 'alert';
                    alertElement.innerHTML = `
                        <h2>${alert.event}</h2>
                        <p><strong>Início:</strong> ${new Date(alert.start * 1000).toLocaleString()}</p>
                        <p><strong>Fim:</strong> ${new Date(alert.end * 1000).toLocaleString()}</p>
                        <p>${alert.description}</p>
                    `;
                    alertContainer.appendChild(alertElement);
                });
            } else {
                alertContainer.innerHTML = '<p>Nenhum alerta ativo no momento.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar alertas de clima:', error);
            document.getElementById('alert-container').innerHTML = '<p>Erro ao carregar os alertas. Tente novamente mais tarde.</p>';
        });
}
