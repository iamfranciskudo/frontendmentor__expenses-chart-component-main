const chart = document.querySelector('.expenses__chart');

setChart().catch(error => console.error(error));

async function setChart() {
    const response = await fetch('../data.json');
    const data = await response.json();

    const expensesAll = data.map(expenses => {return expenses.amount});
    const max = Math.max(...expensesAll);

    for (expenses of data) {
        const barHeight = expenses.amount / max * 100;

        const bar = document.createElement('span');
        bar.classList.add('chart__bar');
        bar.style.height = `${barHeight}%`;

        if (expenses.amount != max) {
            bar.classList.add('bg-soft-red');
        } else {
            bar.classList.add('bg-cyan');
        }

        bar.setAttribute('data-day', expenses.day);
        bar.setAttribute('data-amount', `$${expenses.amount}`);

        chart.appendChild(bar);
    }
}