let durationData;
const durationColumnNames = ['agents_chatting_duration', 'count', 'duration'];

document.addEventListener('DOMContentLoaded', async function () {
    try {
        durationData = await fetchInitialData("http://localhost:5262/api/Duration", durationData);

        console.log(durationData);

        const weeksCount = calculateWeeksCount(durationData);
        for (let i = 1; i <= weeksCount; i++) {
            const navLink = createNavLink(i, durationColumnNames, durationData);
            document.querySelector('.nav').appendChild(navLink);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});




