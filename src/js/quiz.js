(function () {
    // КОНФІГУРАЦІЯ КВІЗУ
    const quizSteps = [
        {
            name: 'age',
            title: 'Укажите ваш возраст',
            options: [
                { value: '18-25', icon: '👶', label: '18-25 лет' },
                { value: '26-35', icon: '👨', label: '26-35 лет' },
                { value: '36-50', icon: '🧔', label: '36-50 лет' },
                { value: '51+', icon: '👴', label: '51+ лет' }
            ]
        },
        {
            name: 'amount',
            title: 'Сумма займа',
            options: [
                { value: 'до 10 000 ₽', icon: '💸', label: 'до 10 000 ₽' },
                { value: '10 000 – 30 000 ₽', icon: '💰', label: '10 000 – 30 000 ₽' },
                { value: '30 000 – 50 000 ₽', icon: '🪙', label: '30 000 – 50 000 ₽' },
                { value: '50 000+ ₽', icon: '🏦', label: '50 000+ ₽' }
            ]
        },
        {
            name: 'term',
            title: 'На какой срок нужен займ?',
            options: [
                { value: 'до 7 дней', icon: '⏳', label: 'до 7 дней' },
                { value: '7-30 дней', icon: '📅', label: '7-30 дней' },
                { value: '1-6 месяцев', icon: '🗓️', label: '1-6 месяцев' },
                { value: '6+ месяцев', icon: '📆', label: '6+ месяцев' }
            ]
        },
        {
            name: 'purpose',
            title: 'Цель займа',
            options: [
                { value: 'на покупки', icon: '🛒', label: 'На покупки' },
                { value: 'на оплату услуг', icon: '💡', label: 'На оплату услуг' },
                { value: 'на погашение кредита', icon: '💳', label: 'Погашение кредита' },
                { value: 'другое', icon: '❓', label: 'Другое' }
            ]
        }
    ];

    let currentStep = 0;
    let answers = {};
    const quizModal = document.getElementById('quizModal');
    const quizContainer = quizModal ? quizModal.querySelector('.quiz-container') : null;
    const quizProgress = quizModal ? quizModal.querySelector('.progress') : null;

    function renderStep() {
        if (!quizContainer) return;
        if (currentStep >= quizSteps.length) {
            quizContainer.style.display = 'none';
            showResultContainer();
            // Додаємо явне відображення WOW-контейнера
            const resultEl = document.getElementById('quizResultContainer');
            if (resultEl) resultEl.style.display = '';
            return;
        } else {
            quizContainer.style.display = '';
            removeResultContainer();
        }
        const step = quizSteps[currentStep];
        let html = `<div class="quiz-header">
            <div class="progress-bar"><div class="progress" id="quizProgress" style="width:${Math.round(((currentStep+1)/quizSteps.length)*100)}%"></div></div>
        </div>`;
        html += `<div class="quiz-step" data-step="${currentStep+1}">
            <h3>${step.title}</h3>
            <div class="options-grid">`;
        step.options.forEach(opt => {
            html += `<label class="option-card">
                <input type="radio" name="${step.name}" value="${opt.value}" ${answers[step.name]===opt.value?'checked':''}>
                <div class="card-content">
                    <span class="card-icon">${opt.icon}</span>
                    <span>${opt.label}</span>
                </div>
            </label>`;
        });
        html += `</div></div>`;
        quizContainer.innerHTML = html;
    }

    // WOW-результат у окремому контейнері
    function showResultContainer() {
        let resultEl = document.getElementById('quizResultContainer');
        if (!resultEl) {
            resultEl = document.createElement('div');
            resultEl.id = 'quizResultContainer';
            resultEl.className = 'quiz-result-container wow';
            quizModal.appendChild(resultEl);
        }
        resultEl.style.display = '';
        fetch('data/mfoList.json')
            .then(r => r.json())
            .then(data => {
                const mfo = (data.mfoList && data.mfoList.length) ? data.mfoList[0] : null;
                if (!mfo) return;
                const url = mfo.customUrl || mfo.url || '#';
                resultEl.innerHTML = `
                    <button class="quiz-close-btn" aria-label="Закрыть">×</button>
                    <div class="quiz-result-top">
                        <div class="quiz-result-mfo"><img src="../assets/images/mfo-logos/${mfo.logo}" alt="${mfo.name}"></div>
                        <div class="quiz-result-title">${mfo.name}</div>
                        <div class="quiz-result-desc">Лучший выбор для вас! Минимальная ставка, быстрое одобрение и удобное оформление.</div>
                        <div class="quiz-result-adv-list"></div>
                        <a href="${url}" class="btn-primary quiz-get-loan-btn" target="_blank" rel="noopener">Получить займ</a>
                        <button class="quiz-show-all-btn">Показать все МФО</button>
                    </div>
                `;
                resultEl.querySelector('.quiz-close-btn').onclick = closeQuiz;
                resultEl.querySelector('.quiz-get-loan-btn').onclick = function() {
                    window.location.hash = '#offers';
                    closeQuiz();
                };
                resultEl.querySelector('.quiz-show-all-btn').onclick = function() {
                    closeQuiz();
                    document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
                };
            });
    }
    function removeResultContainer() {
        const resultEl = document.getElementById('quizResultContainer');
        if (resultEl) resultEl.style.display = 'none';
    }

    function closeQuiz() {
        if (quizModal) quizModal.classList.remove('active');
        document.body.classList.remove('quiz-modal-open');
        currentStep = 0;
        answers = {};
    }

    function openQuiz() {
        if (quizModal) {
            quizModal.classList.add('active');
            document.body.classList.add('quiz-modal-open');
            currentStep = 0;
            answers = {};
            renderStep();
        }
    }

    window.startQuiz = openQuiz;

    // Делегування подій для квізу
    if (quizModal) {
        quizModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('quiz-close-btn')) {
                closeQuiz();
            }
            if (e.target.classList.contains('quiz-back-btn')) {
                if (currentStep > 0) {
                    currentStep--;
                    renderStep();
                }
            }
            if (e.target === quizModal) {
                closeQuiz();
            }
        });
        quizModal.addEventListener('change', function(e) {
            const step = quizSteps[currentStep];
            if (e.target.name === step.name) {
                answers[step.name] = e.target.value;
                currentStep++;
                renderStep();
            }
        });
    }
})();
