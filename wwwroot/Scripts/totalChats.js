let totalChatsData;
const chatsColumnNames = ['total'];

document.addEventListener('DOMContentLoaded', async function () {
    try {
        totalChatsData = await fetchInitialData("http://localhost:5262/api/TotalChats", totalChatsData);

        const weeksCount = calculateWeeksCount(totalChatsData);
        for (let i = 1; i <= weeksCount; i++) {
            const navLink = createNavLink(i, chatsColumnNames, totalChatsData);
            document.querySelector('.nav').appendChild(navLink);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});