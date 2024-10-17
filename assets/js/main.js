const digimonList = document.getElementById('digimonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let page = 0;
const pageSize = 10;

function digimonToHtml(digimon) {
    return `<li class="digimon ${digimon.attribute}">
        <span class="id">#${digimon.id}</span>
        <span class="name">${digimon.name}</span>

        <div class="detail">
            <ol class="attributes">
                ${digimon.attributes.map((attribute) => `<li class="attribute ${attribute}">${attribute}</li>`).join('')}
            </ol>

            <img src="${digimon.image}"
                alt=${digimon.name}>
        </div>
        </li>`
}

function loadDigimonItens(page, pageSize) {
    digiApi.getDigimons(page, pageSize).then((digimons = []) => {
        digimonList.innerHTML += digimons.map(digimonToHtml).join("")
    })
}

loadDigimonItens(page, pageSize)

loadMoreButton.addEventListener('click', () => {
    page++
    loadDigimonItens(page, pageSize)
})

