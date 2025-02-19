const testimonials = [
    {
        service: 'Услуга: Имплантация зубов',
        name: 'Анна П.',
        date: '11.01.2025',
        text: 'Отличная клиника! Врачи очень внимательные и профессиональные. Рекомендую всем!'
    },
    {
        service: 'Услуга: Эстетическое лечение',
        name: 'Дмитрий К.',
        date: '23.12.2024',
        text: 'Спасибо большое за качественное лечение. Теперь улыбаюсь без стеснения!'
    },
    {
        service: 'Услуга: Терапевтический осмотр',
        name: 'Ольга С.',
        date: '21.12.2024',
        text: 'Приятная атмосфера и высокий уровень обслуживания. Буду рекомендовать друзьям!'
    },
    {
        service: 'Услуга: Эстетическое лечение',
        name: 'Мария И.',
        date: '20.12.2024',
        text: 'Я давно искала хорошего стоматолога, и наконец нашла! В Dentalika мне сделали отбеливание зубов, и я очень довольна результатом. Спасибо!'
    },
    {
        service: 'Услуга: Терапевтический осмотр',
        name: 'Сергей В.',
        date: '19.11.2024',
        text: 'Очень рад, что выбрал Dentalika для лечения зубов. Врачи профессионалы, а обслуживание на высоте. Рекомендую!'
    },
    {
        service: 'Услуга: Ортодонтия',
        name: 'Екатерина Н.',
        date: '11.11.2024',
        text: 'Мне поставили брекеты, и я уже вижу результаты. Врачи очень внимательные и всегда готовы ответить на вопросы. Спасибо!'
    }
];

class TestimonialsSlider {
    constructor() {
        this.currentIndex = 0;
        this.track = document.querySelector('.slider-track');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.dotsContainer = document.querySelector('.dots');

        this.init();
        this.bindEvents();
        this.updateDots();
    }

    init() {
        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="comment-card__name">
                    <p class="service">${testimonial.service}</p>
                </div>
                <div class="header">
                    <span class="name">${testimonial.name}</span>
                    <span class="date">${testimonial.date}</span>
                </div>
                <div class="comment-card__txt">
                    <p class="text">${testimonial.text}</p>
                </div>
            `;
            this.track.appendChild(card);
        });

        for (let i = 0; i < 4; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            this.dotsContainer.appendChild(dot);
        }
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => {
            this.prev();
            this.updateButtonStyles(this.prevBtn);
        });
        this.nextBtn.addEventListener('click', () => {
            this.next();
            this.updateButtonStyles(this.nextBtn);
        });
    }

    updateButtonStyles(clickedButton) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => button.classList.remove('active'));
        clickedButton.classList.add('active');
    }

    updateSliderPosition() {
        const offset = -this.currentIndex * (100 / 3);
        this.track.style.transform = `translateX(${offset}%)`;
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', Math.floor(this.currentIndex / 1) === index);
        });
    }

    next() {
        if (this.currentIndex >= testimonials.length - 3) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.updateSliderPosition();
        this.updateDots();
    }

    prev() {
        if (this.currentIndex <= 0) {
            this.currentIndex = testimonials.length - 3;
        } else {
            this.currentIndex--;
        }
        this.updateSliderPosition();
        this.updateDots();
    }
}

new TestimonialsSlider();