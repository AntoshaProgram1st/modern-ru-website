const reviewsData = [
    { fio: "Иванова Мария", comment: "Быстро получила займ, несмотря на небольшие просрочки в прошлом. Очень довольна сервисом!" },
    { fio: "Петров Алексей", comment: "Оформил займ за 5 минут, деньги пришли сразу на карту. Спасибо!" },
    { fio: "Сидорова Ольга", comment: "Очень удобный сервис, всё понятно и просто. Рекомендую друзьям!" },
    { fio: "Коваленко Дмитрий", comment: "Получил одобрение даже с плохой кредитной историей. Отлично!" },
    { fio: "Григорьева Анна", comment: "Спасибо за помощь! Деньги пришли быстро, условия прозрачные." },
    { fio: "Мельник Сергей", comment: "Не ожидал такой скорости! Оформил ночью, деньги получил утром." },
    { fio: "Васильева Татьяна", comment: "Сервис реально помогает, когда срочно нужны деньги. Спасибо!" },
    { fio: "Романенко Андрей", comment: "Все честно, без скрытых комиссий. Очень доволен!" },
    { fio: "Кузнецова Наталья", comment: "Оформила займ онлайн, всё прошло гладко. Буду обращаться ещё!" },
    { fio: "Семенов Артем", comment: "Удобный калькулятор, быстрое одобрение. Рекомендую!" },
    { fio: "Литвиненко Оксана", comment: "Сервис помог выбрать лучший вариант займа. Спасибо за консультацию!" },
    { fio: "Гаврилюк Виктор", comment: "Деньги получил за 10 минут, сервис супер!" },
    { fio: "Морозова Елена", comment: "Очень вежливая поддержка, помогли разобраться с документами." },
    { fio: "Данилюк Павел", comment: "Сомневался, но всё прошло отлично. Деньги получил быстро." },
    { fio: "Кравченко Светлана", comment: "Сервис выручил в трудной ситуации. Спасибо!" },
    { fio: "Ткаченко Игорь", comment: "Оформление простое, процент низкий. Всё понравилось." },
    { fio: "Бондаренко Юлия", comment: "Рекомендую всем, кто ищет быстрый займ!" },
    { fio: "Шевченко Максим", comment: "Очень доволен, деньги пришли в течение 15 минут." },
    { fio: "Захарова Марина", comment: "Сервис помог даже с просрочками. Спасибо!" },
    { fio: "Гончаренко Олег", comment: "Всё прозрачно, никаких скрытых платежей. Отлично!" },
    { fio: "Смирнов Артем", comment: "Оформил заявку ночью, деньги пришли утром. Удобно!" },
    { fio: "Волкова Ирина", comment: "Спасибо за быструю помощь!" },
    { fio: "Дьяченко Павел", comment: "Сервис понятный, всё просто и быстро." },
    { fio: "Кириллова Алина", comment: "Получила займ без лишних вопросов. Рекомендую!" },
    { fio: "Горбунов Владислав", comment: "Очень доволен, всё честно и прозрачно." },
    { fio: "Соловьева Мария", comment: "Быстрое одобрение, приятная поддержка." },
    { fio: "Климов Евгений", comment: "Сервис реально работает!" },
    { fio: "Павлова Оксана", comment: "Спасибо за помощь в сложной ситуации." },
    { fio: "Кузьмин Артем", comment: "Деньги пришли за 7 минут!" },
    { fio: "Семенова Дарья", comment: "Очень довольна, буду советовать друзьям." },
    { fio: "Гордеев Илья", comment: "Сервис помог выбрать лучшее предложение." },
    { fio: "Мартынова Светлана", comment: "Всё понравилось, спасибо!" },
    { fio: "Калинина Анна", comment: "Оформила займ онлайн, всё быстро и удобно." },
    { fio: "Сергеев Павел", comment: "Спасибо за оперативность!" },
    { fio: "Гаврилова Мария", comment: "Очень довольна сервисом!" },
    { fio: "Киселев Артем", comment: "Быстро, удобно, без лишних вопросов." },
    { fio: "Савельева Ольга", comment: "Сервис помог даже с плохой историей." },
    { fio: "Коновалов Дмитрий", comment: "Спасибо за помощь!" },
    { fio: "Миронова Екатерина", comment: "Очень быстрое одобрение!" }
];

function randomDate() {
    const start = new Date(2020, 0, 1).getTime();
    const end = new Date(2025, 5, 30).getTime();
    const date = new Date(start + Math.random() * (end - start));
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
}

function getRandomReviews(count = 8) {
    const arr = reviewsData.map(r => ({ ...r, date: randomDate() }));
    arr.sort(() => Math.random() - 0.5);
    return arr.slice(0, count).sort((a, b) => {
        const [da, ma, ya] = a.date.split('.').map(Number);
        const [db, mb, yb] = b.date.split('.').map(Number);
        return new Date(yb, mb - 1, db) - new Date(ya, ma - 1, da);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const reviewsGrid = document.getElementById('reviewsGrid');
    let reviews = getRandomReviews(8);
    const maxToShow = 8;

    function getAvatar(name) {
        if (!name) return '<span>👤</span>';
        const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
        return `<span>${initials}</span>`;
    }

    function renderReviews() {
        if (!reviewsGrid) return;
        reviewsGrid.innerHTML = '';
        reviews.slice(0, maxToShow).forEach(r => {
            reviewsGrid.innerHTML += `
                <div class="review-card">
                    <div class="review-avatar">${getAvatar(r.fio)}</div>
                    <div class="review-content">
                        <div class="review-author">${r.fio}</div>
                        <div class="review-text">${r.comment}</div>
                        <div class="review-date">${r.date || ''}</div>
                    </div>
                </div>
            `;
        });
    }

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fio = this.fio.value.trim();
            const comment = this.comment.value.trim();
            if (!fio || !comment) return;
            const date = new Date().toLocaleDateString('ru-RU');
            reviews.unshift({fio, comment, date});
            renderReviews();
            this.reset();
            const success = document.getElementById('reviewSuccess');
            if (success) {
                success.style.display = 'block';
                setTimeout(() => { success.style.display = 'none'; }, 2000);
            }
        });
    }

    renderReviews();
});
