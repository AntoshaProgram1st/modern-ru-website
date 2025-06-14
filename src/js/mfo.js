async function loadMfoList() {
    try {
        const response = await fetch('data/mfoList.json', {cache: 'no-store'});
        const data = await response.json();
        const mfoList = data.mfoList || [];
        const mfoGrid = document.getElementById('mfoGrid');
        if (!mfoGrid) return;
        mfoGrid.innerHTML = '';
        mfoList.slice(0, 20).forEach(mfo => {
            mfoGrid.innerHTML += `
                <div class="mfo-info-card">
                    <div class="mfo-info-title">${mfo.name ? mfo.name : ''}</div>
                    <div class="mfo-info-license">${mfo.license ? mfo.license : ''}${mfo.license && mfo.licenseDate ? ' от ' + mfo.licenseDate : ''}</div>
                    <div class="mfo-info-address">${mfo.address ? mfo.address : ''}</div>
                    <div class="mfo-info-innogrn">ИНН: ${mfo.inn ? mfo.inn : ''} / ОГРН: ${mfo.ogrn ? mfo.ogrn : ''}</div>
                    <div class="mfo-info-phone">Тел.: ${mfo.phone ? mfo.phone : ''}</div>
                </div>
            `;
        });
    } catch (error) {
        const mfoGrid = document.getElementById('mfoGrid');
        if (mfoGrid) mfoGrid.innerHTML = '<p style="color:#b00;font-size:1.1em;">Не вдалося завантажити список МФО.</p>';
    }
}
window.loadMfoList = loadMfoList;

function mfoSlug(name) {
    return name
        .toLowerCase()
        .replace(/ё/g, 'e')
        .replace(/ /g, '-')
        .replace(/,/g, '')
        .replace(/!/g, '')
        .replace(/"/g, '')
        .replace(/'/g, '')
        .replace(/«|»/g, '')
        .replace(/[^a-z0-9\-а-я]/gi, '')
        .replace(/-+/g, '-');
}

document.addEventListener('DOMContentLoaded', loadMfoList);

// Функція для автоскролу після квіза
window.scrollToOffers = function() {
    const offersSection = document.getElementById('offers');
    if (offersSection) {
        offersSection.scrollIntoView({ behavior: 'smooth' });
    }
};
