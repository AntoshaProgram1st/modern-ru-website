// Рендеринг секції offers-section: топ-оффер + 19 додаткових карток
async function renderNewOffers() {
    const priorityContainer = document.getElementById('priorityOffer');
    const offersList = document.getElementById('offersList');
    if (!priorityContainer || !offersList) return;
    try {
        const res = await fetch('data/mfoList.json', {cache: 'no-store'});
        const data = await res.json();
        let mfoList = data.mfoList || [];
        // Сортуємо за priority (id), якщо є
        mfoList = mfoList.slice().sort((a, b) => {
            if (a.priority && b.priority) return a.priority - b.priority;
            if (a.priority) return -1;
            if (b.priority) return 1;
            return 0;
        });
        // Пріоритетний оффер
        if (mfoList.length > 0) {
            const top = mfoList[0];
            const url = top.customUrl || top.url || '#';
            priorityContainer.innerHTML = `
                <div class="priority-offer-card">
                    <div class="priority-offer-logo"><img src="/src/assets/images/mfo-logos/${top.logo}" alt="${top.name}"></div>
                    <div class="priority-offer-info">
                        <div class="priority-offer-title">${top.name}</div>
                        <div class="priority-offer-rate">Ставка: <b>${top.minRate || '—'}</b></div>
                        <div class="priority-offer-term">Срок: <b>${top.term || '—'}</b></div>
                        <div class="priority-offer-desc">Приоритетный оффер: максимальный шанс одобрения і лучшие условия для новых клиентов!</div>
                        <a href="${url}" class="btn-priority" target="_blank" rel="noopener">Оформить займ</a>
                    </div>
                </div>
            `;
        }
        // 19 додаткових офферів
        offersList.innerHTML = '';
        mfoList.slice(1, 20).forEach(mfo => {
            const url = mfo.customUrl || mfo.url || '#';
            offersList.innerHTML += `
                <div class="offer-simple-card">
                    <div class="offer-simple-logo"><img src="/src/assets/images/mfo-logos/${mfo.logo}" alt="${mfo.name}"></div>
                    <div class="offer-simple-title">${mfo.name}</div>
                    <div class="offer-simple-rate">Ставка: <b>${mfo.minRate || '—'}</b></div>
                    <div class="offer-simple-term">Срок: <b>${mfo.term || '—'}</b></div>
                    <a href="${url}" class="btn-simple" target="_blank" rel="noopener">Оформить займ</a>
                </div>
            `;
        });
    } catch (e) {
        priorityContainer.innerHTML = '';
        offersList.innerHTML = '<p style="color:#b00;font-size:1.1em;">Не вдалося завантажити список МФО.</p>';
    }
}
document.addEventListener('DOMContentLoaded', renderNewOffers);
