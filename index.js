// SIDEBAR ANIMATION

const toggleBtn = document.getElementById('toggle');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    sidebar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if(e.target.id !== 'sidebar' && e.target.id !== 'toggle'){
        toggleBtn.classList.remove('active');
        sidebar.classList.remove('active');
    };
});

// FETCH COIN TABLE

const urlApi = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';

window.addEventListener('DOMContentLoaded', async () => {
    const data = await handleFetch();
    handleTableData(data);
    handleColorPrice()
});

async function handleFetch(){
    const response = await fetch(urlApi);
    return await response.json();
};

const tableBody = document.getElementById('table-body-container');
const templateTable = document.getElementById('template-table-coin').content;
const fragment = document.createDocumentFragment();

const handleTableData = (data) => {
    data.forEach(coin => {
        // console.log(coin);
        templateTable.querySelector('.data-id').textContent = coin.market_cap_rank;
        templateTable.querySelector('.data-icon').src = coin.image;
        templateTable.querySelector('.data-name').textContent = coin.name;
        templateTable.querySelector('.data-symbol').textContent = `${coin.symbol.toUpperCase()}`;
        templateTable.querySelector('.data-price').textContent = `$${coin.current_price.toLocaleString('en-US')}`;
        templateTable.querySelector('.data-price-change').textContent = `${coin.price_change_percentage_24h.toPrecision(3)}%`;
        templateTable.querySelector('.data-market-cap').textContent = `$${coin.market_cap.toLocaleString('en-US')}`;
        const clone = templateTable.cloneNode(true);
        fragment.appendChild(clone);
    })
    tableBody.appendChild(fragment);
}

// HANDLE GREEN OR RED VALUE

const handleColorPrice = () => {
    let pricePercentage = tableBody.querySelectorAll('.data-price-change');
    pricePercentage.forEach(value => {
        let values = parseInt(value.innerHTML);
        if(values > 0){
            value.style.color = 'green';
        } else {
            value.style.color = 'red';
        }
    })
}
    