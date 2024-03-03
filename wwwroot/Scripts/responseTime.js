let responseTimeData;
const responseColumnNames = ['count', 'responseTime'];

document.addEventListener('DOMContentLoaded', async function () {
    try {
        responseTimeData = await fetchInitialData("https://localhost:7146/api/ResponseTime", responseTimeData);

        const weeksCount = calculateWeeksCount(responseTimeData);
        for (let i = 1; i <= weeksCount; i++) {
            const navLink = createNavLink(i, responseColumnNames, responseTimeData);
            document.querySelector('.nav').appendChild(navLink);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});