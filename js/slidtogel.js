document.addEventListener('DOMContentLoaded', function () {
    const commentCards = document.querySelectorAll('.comment-card');
    const btn = document.querySelector('.btn');
    const btnText = btn.querySelector('.text');
    let visibleCards = 6;
    let allCardsVisible = false;

    commentCards.forEach((card, index) => {
        if (index >= visibleCards) {
            card.style.display = 'none';
        }
    });

    btn.addEventListener('click', function () {
        if (!allCardsVisible) {
            for (let i = visibleCards; i < visibleCards + 6 && i < commentCards.length; i++) {
                commentCards[i].style.display = 'flex';
            }
            visibleCards += 6;
            if (visibleCards >= commentCards.length) {
                allCardsVisible = true;
                btnText.textContent = 'Скрыть отзывы';
            }
        } else {
            commentCards.forEach((card, index) => {
                if (index >= 6) {
                    card.style.display = 'none';
                }
            });
            visibleCards = 6;
            allCardsVisible = false;
            btnText.textContent = 'Смотреть ещё';
        }
    });
});