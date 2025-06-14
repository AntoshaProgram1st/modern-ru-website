// src/js/components/index.js

export function startQuiz() {
    const quizForm = document.getElementById('quizForm');
    if (quizForm) quizForm.style.display = 'block';
}

export function showOffers() {
    const offersSection = document.getElementById('offers');
    if (offersSection) offersSection.style.display = 'block';
}

export function submitReview() {
    const commentsDiv = document.getElementById('comments');
    const nameInput = document.querySelector('input[placeholder="Имя"]');
    const reviewInput = document.querySelector('textarea[placeholder="Ваш отзыв"]');
    if (!commentsDiv || !nameInput || !reviewInput) return;
    const newComment = document.createElement('div');
    newComment.textContent = `${nameInput.value}: ${reviewInput.value}`;
    commentsDiv.appendChild(newComment);
    nameInput.value = '';
    reviewInput.value = '';
}