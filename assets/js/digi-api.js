const digiApi = {}

function convertApiToDigimon(digimonDetail) {
    const digimon = new Digimon
    digimon.id = digimonDetail.id
    digimon.name = digimonDetail.name

    const attributes = digimonDetail.attributes.map((attributeslot) => attributeslot.attribute)
    const [attribute] = attributes

    digimon.attributes = attributes

    digimon.attribute = attribute

    digimon.image = digimonDetail.images[0].href

    return digimon
}

digiApi.getDigimonsDetail = (digimon) => {
    return fetch(digimon.href)
        .then((response => response.json()))
        .then(convertApiToDigimon)
}

digiApi.getDigimons = (page = 0, pageSize = 10) => {
    const url = `https://digi-api.com/api/v1/digimon?page=${page}&pageSize=${pageSize}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.content)
        .then((digimons) => digimons.map(digiApi.getDigimonsDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((digimonsDetails) => digimonsDetails)
}

digiApi.getDetail = (id) => {
    const url = `https://digi-api.com/api/v1/digimon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then((digimon) => digimon)
}