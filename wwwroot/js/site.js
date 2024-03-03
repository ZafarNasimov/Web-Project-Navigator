function calculateWeeksCount(data) {
    if (!data) {
        console.error('Invalid or incomplete Data structure');
        return 0;
    }

    const fromDate = new Date(data.request.filters.from);
    const toDate = new Date(data.request.filters.to);

    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const weeksCount = Math.ceil((toDate - fromDate) / millisecondsInWeek);

    return weeksCount;
}

function createNavLink(weekNumber, columnNames, data) {
    const navLink = document.createElement('a');
    navLink.className = 'nav-link btn-primary';
    navLink.href = `#week${weekNumber}`;
    navLink.textContent = `Week ${weekNumber}`;

    // Add a click event listener to trigger displayDataForWeek
    navLink.addEventListener('click', async function (event) {
        event.preventDefault();
        console.log(data);
        await displayDataForWeek(data, columnNames, weekNumber); 
    });

    const navItem = document.createElement('li');
    navItem.className = 'nav-item';
    navItem.appendChild(navLink);

    return navItem;
}

async function fetchInitialData(apiUrl, targetData) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (targetData) {
            Object.assign(targetData, data); // Assign the fetched data to targetData
        }

        return data; // Return the fetched data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Throw the error for handling in the calling code
    }
}

async function displayDataForWeek(data, columnNames, weekNumber) {
    // Check if data is available
    if (!data || !data.records) {
        console.error('Invalid or incomplete data structure');
        return;
    }

    const tableBody = document.querySelector('#Table tbody');
    tableBody.innerHTML = '';

    // Filter records for the specified week
    const weekRecords = Object.keys(data.records)
        .filter(recordKey => {
            const recordDate = new Date(recordKey);
            const weekStartDate = new Date(data.request.filters.from);
            weekStartDate.setDate(weekStartDate.getDate() + (weekNumber - 1) * 7);
            const weekEndDate = new Date(weekStartDate);
            weekEndDate.setDate(weekEndDate.getDate() + 7);

            return recordDate >= weekStartDate && recordDate < weekEndDate;
        })
        .map(recordKey => ({ date: new Date(recordKey), record: data.records[recordKey] }));

    // Iterate over the records for the specified week and add rows to the table
    weekRecords.forEach(record => {
        const row = tableBody.insertRow();
        const cells = [];

        // Format date as 'YYYY-MM-DD'
        const formattedDate = record.date.toISOString().split('T')[0];
        cells.push(formattedDate);

        // Populate cells based on columnNames
        columnNames.forEach(columnName => {
            cells.push(record.record[columnName]);
        });

        // Add cells to the row
        cells.forEach((cellText, index) => {
            const cell = row.insertCell(index);
            cell.textContent = cellText;
        });
    });

    // Calculate and display the total for weekRecords
    const totalRow = tableBody.insertRow();
    const totalCell = totalRow.insertCell(0);
    totalCell.textContent = 'Total';

    const totalValues = {};
    columnNames.forEach(columnName => {
        totalValues[columnName] = 0;
    });

    weekRecords.forEach(record => {
        columnNames.forEach(columnName => {
            totalValues[columnName] += record.record[columnName];
        });
    });

    // Add total cells to the total row
    columnNames.forEach((columnName, index) => {
        const totalColumnCell = totalRow.insertCell(index + 1);
        totalColumnCell.textContent = totalValues[columnName];
    });

    document.getElementById('Table').classList.remove('hidden-table');
}

function displayDataInTable(data, columnNames) {
    const tableBody = document.querySelector('#Table tbody');
    tableBody.innerHTML = '';

    // Iterate over the records and add rows to the table
    Object.keys(data.records).forEach(recordKey => {
        const record = data.records[recordKey];

        // Create a new table row
        const row = tableBody.insertRow();

        // Populate the row cells with record data
        const nameCell = row.insertCell(0);
        const cells = columnNames.map((columnName, index) => {
            const cell = row.insertCell(index + 1);
            cell.textContent = record[columnName];
            return cell;
        });

        nameCell.textContent = recordKey;
    });

    const totalRow = tableBody.insertRow();
    const totalCell = totalRow.insertCell(0);
    totalCell.textContent = 'Total';

    const totalValues = {};

    columnNames.forEach(columnName => {
        totalValues[columnName] = 0;
    });

    const numColumns = columnNames.length;

    for (let i = 1; i <= numColumns; i++) {
        Object.values(data.records).forEach(record => {
            totalValues[columnNames[i - 1]] += record[columnNames[i - 1]];
        });

        const totalColumnCell = totalRow.insertCell(i);
        totalColumnCell.textContent = totalValues[columnNames[i - 1]];
    }

    // Show the table by removing the 'hidden-table' class
    document.getElementById('Table').classList.remove('hidden-table');
}
