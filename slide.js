const apiTrending = 'https://api.coingecko.com/api/v3/search/trending';

window.addEventListener('DOMContentLoaded', async () => {
    const data = await handleFetch();
    const dataArray = data.coins
    // console.log(dataArray)
    handleDataSlide(dataArray)
});

async function handleFetch(){
    const response = await fetch(apiTrending);
    return await response.json();
};

const templateSlider = document.getElementById('template-slider').content;
const containerSlider = document.getElementById('container-template-slider');
const fragment = document.createDocumentFragment();

const handleDataSlide = (data) => {
    data.map(coin => {
        console.log(coin.item);
        templateSlider.querySelector('.image-slider').src = coin.item.small;
        const clone = templateSlider.cloneNode(true);
        return fragment.appendChild(clone)       
    });
    containerSlider.appendChild(fragment)
}


