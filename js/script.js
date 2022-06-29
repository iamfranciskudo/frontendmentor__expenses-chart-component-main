const chart = document.querySelector('.expenses__chart');

getData().catch(error => console.error(error));

async function getData() {
    const response = await fetch('../data.json');
    const data = await response.json();

    const expensesAll = data.map(expenses => {return expenses.amount});
    const max = Math.max(...expensesAll);

    for (expenses of data) {
        let barElement = document.createElement('span');
        barElement.classList.add('chart__bar');

        const barHeight = expenses.amount / max * 100;
        barElement.style.height = `${barHeight}%`;

        if (expenses.amount != max) {
            barElement.classList.add('bg-soft-red');
        } else {
            barElement.classList.add('bg-cyan');
        }

        let dayElement = document.createElement('span');
        dayElement.innerHTML = expenses.day;

        barElement.appendChild(dayElement);
        chart.appendChild(barElement);
    }
}