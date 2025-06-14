// Utility functions for the modern Russian website

export function getRandomComment() {
    const comments = [
        "Отличный сервис!",
        "Очень удобно и быстро.",
        "Рекомендую всем!",
        "Пользуюсь уже не первый раз.",
        "Супер, всё понравилось!"
    ];
    return comments[Math.floor(Math.random() * comments.length)];
}

export function validateInput(input) {
    if (input.value.trim() === "") {
        input.classList.add("error");
        return false;
    }
    input.classList.remove("error");
    return true;
}

export function clearForm(form) {
    form.reset();
}