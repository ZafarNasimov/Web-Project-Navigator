let ratingData;
const ratingColumnNames = ['bad', 'chats', 'good'];

document.addEventListener('DOMContentLoaded', async function () {
    try {
        ratingData = await fetchInitialData("http://localhost:5262/api/Ratings", ratingData);

        const weeksCount = calculateWeeksCount(ratingData);
        for (let i = 1; i <= weeksCount; i++) {
            const navLink = createNavLink(i, ratingColumnNames, ratingData);
            document.querySelector('.nav').appendChild(navLink);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});