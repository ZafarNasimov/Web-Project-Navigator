let tagsData;

// Function to display data in the table
function displayTagsDataInTable() {
    const tableBody = document.querySelector('#Table tbody');
    tableBody.innerHTML = '';

    // Iterate over the records and add rows to the table
    Object.keys(tagsData.records).forEach(date => {
        Object.keys(tagsData.records[date]).forEach(name => {
            const value = tagsData.records[date][name];

            const row = tableBody.insertRow();

            const dateCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const valueCell = row.insertCell(2);

            dateCell.textContent = date;
            nameCell.textContent = name;
            valueCell.textContent = value;
        });
    });

    const totalRow = tableBody.insertRow();
    const totalCell = totalRow.insertCell(0);
    totalCell.textContent = 'Total';

    const totalValues = {
        'value': 0,
    };

    // Iterate over the records to calculate the total
    Object.keys(tagsData.records).forEach(date => {
        Object.keys(tagsData.records[date]).forEach(name => {
            const value = tagsData.records[date][name];
            totalValues['value'] += value;
        });
    });

    // Populate the total row with the calculated total
    totalRow.insertCell(1);
    const totalColumnCell = totalRow.insertCell(2);
    totalColumnCell.textContent = totalValues['value'];

    document.getElementById('Table').classList.remove('hidden-table');
}

//Function to display data weekwise
function displayTagsDataForWeek(weekNumber) {
    const tableBody = document.querySelector('#Table tbody');
    tableBody.innerHTML = '';

    if (!tagsData || !tagsData.records) {
        console.error('Invalid or incomplete tagsData structure');
        return; 
    }

    // Calculate the start and end dates for the selected week
    const fromDate = new Date(tagsData.request.filters.from);
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const startOfWeek = new Date(fromDate.getTime() + (weekNumber - 1) * 7 * millisecondsInDay);
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * millisecondsInDay);

    // Iterate over the records for the selected week and add rows to the table
    Object.keys(tagsData.records).forEach(date => {
        const currentDate = new Date(date);

        if (currentDate >= startOfWeek && currentDate <= endOfWeek) {
            Object.keys(tagsData.records[date]).forEach(name => {
                const value = tagsData.records[date][name];

                const row = tableBody.insertRow();

                const dateCell = row.insertCell(0);
                const nameCell = row.insertCell(1);
                const valueCell = row.insertCell(2);

                dateCell.textContent = date;
                nameCell.textContent = name;
                valueCell.textContent = value;
            });
        }
    });

    const totalRow = tableBody.insertRow();
    const totalCell = totalRow.insertCell(0);
    totalCell.textContent = 'Total';

    const totalValues = {
        'value': 0,
    };

    // Iterate over the records for the selected week to calculate the total
    Object.keys(tagsData.records).forEach(date => {
        const currentDate = new Date(date);

        if (currentDate >= startOfWeek && currentDate <= endOfWeek) {
            Object.keys(tagsData.records[date]).forEach(name => {
                const value = tagsData.records[date][name];
                totalValues['value'] += value;
            });
        }
    });

    // Populate the total row with empty cells for date and name, and then the calculated total
    totalRow.insertCell(1);  // Empty cell for date

    const totalColumnCell = totalRow.insertCell(2);
    totalColumnCell.textContent = totalValues['value'];

    document.getElementById('Table').classList.remove('hidden-table');
}

function createTagsNavLink(weekNumber) {
    const navLink = document.createElement('a');
    navLink.className = 'nav-link btn-primary';
    navLink.href = `#week${weekNumber}`;
    navLink.textContent = `Week ${weekNumber}`;

    // Add a click event listener to trigger displayDataForWeek
    navLink.addEventListener('click', function (event) {
        event.preventDefault();
        console.log(tagsData);

        displayTagsDataForWeek(weekNumber);
    });

    const navItem = document.createElement('li');
    navItem.className = 'nav-item';
    navItem.appendChild(navLink);

    return navItem;
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        tagsData = await fetchInitialData("https://localhost:7146/api/Tags", tagsData);

        const weeksCount = calculateWeeksCount(tagsData);
        for (let i = 1; i <= weeksCount; i++) {
            const navLink = createTagsNavLink(i);
            document.querySelector('.nav').appendChild(navLink);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

