// Script conforme atualizado anteriormente
const digimonDetailContainer = document.getElementById('digimonDetail');

// Recupera os dados do localStorage
const selectedDigimon = JSON.parse(localStorage.getItem('selectedDigimon'));

if (selectedDigimon) {
    const descriptionEn = selectedDigimon.descriptions?.find(desc => desc.language === 'en_us')?.description || 'Não há informações';
    const attributesList = selectedDigimon.attributes?.map(attr => `<li class="${attr.attribute}">${attr.attribute}</li>`).join('') || 'Não há informações';
    const priorEvolutionsList = selectedDigimon.priorEvolutions?.map(evo => `
           <div class="evolution-box">
               <img src="${evo.image}" alt="${evo.digimon}" class="evo-image">
               <span>${evo.digimon}</span>
           </div>
       `).join('') || 'Não há informações';
    const nextEvolutionsList = selectedDigimon.nextEvolutions?.map(evo => `
           <div class="evolution-box">
               <img src="${evo.image}" alt="${evo.digimon}" class="evo-image">
               <span>${evo.digimon}</span>
               ${evo.condition ? `<span class="condition">(${evo.condition})</span>` : ''}
           </div>
       `).join('') || 'Não há informações';
    const skillsList = selectedDigimon.skills?.map(skill => `
           <li class="skill-box">
               <strong>${skill.skill || 'Não há informações'}</strong>: ${skill.description || 'Não há informações'}
           </li>
       `).join('') || 'Não há informações';

    digimonDetailContainer.innerHTML = `
           <div class="detail-card ${selectedDigimon.attributes[0]?.attribute || 'undefined'}">
               <button id="backButton" class="back-button">
                    <i class="fas fa-home"></i>
                </button>

               <h1>${selectedDigimon.name || 'Não há informações'}</h1>
               <span class="id">#${selectedDigimon.id || 'Não há informações'}</span>
               <div class="detail">
                   <img src="${selectedDigimon.images[0]?.href || '#'}" alt="${selectedDigimon.name || 'Não há informações'}" class="item-image">
                   <p><strong>Tipo:</strong> ${selectedDigimon.types?.map(type => type.type).join(', ') || 'Não há informações'}</p>
                   <p><strong>Atributos:</strong>
                       <ul class="attributes">${attributesList}</ul>
                   </p>
                   <p><strong>Descrição:</strong> ${descriptionEn}</p>
                   <p><strong>Evoluções Anteriores:</strong>
                       <div class="evolution-list">${priorEvolutionsList}</div>
                   </p>
                   <p><strong>Próximas Evoluções:</strong>
                       <div class="evolution-list">${nextEvolutionsList}</div>
                   </p>
                   <p><strong>Habilidades:</strong>
                       <ul class="skills">${skillsList}</ul>
                   </p>
               </div>
           </div>
       `;
} else {
    digimonDetailContainer.innerHTML = '<p>Detalhes não encontrados.</p>';
}

// Remove o item do localStorage após usar
localStorage.removeItem('selectedDigimon');

// Adiciona funcionalidade ao botão "Voltar"
document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = 'index.html'; // Substitua 'index.html' pela sua página inicial
});