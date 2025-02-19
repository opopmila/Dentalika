document.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('adminAuthenticated')) {
        window.location.href = 'admin.html';
        return;
    }
    loadContent('home');
});

const defaultContent = {
    header: {
        logo: 'path/to/logo.png',
        phone: '+7 (XXX) XXX-XX-XX'
    },
    footer: {
        logo: 'path/to/logo.png',
        companyMenu: ['О нас', 'Наши специалисты', 'Отзывы', 'Контакты'],
        servicesMenu: ['Терапевтическая стоматология', 'Ортодонтия', 'Эстетическая стоматология', 'Имплантация', 'Хирургическая стоматология'],
        contactsMenu: ['Адрес', 'Телефон', 'Email', 'Время работы']
    }
};

let services = [
    {
        id: 1,
        name: 'Терапевтическая стоматология',
        description: 'Лечение зубов и десен',
        image: 'path/to/image.jpg',
        subServices: [
            { name: 'Лечение кариеса', price: '5000' },
            { name: 'Пломбирование', price: '4000' }
        ]
    },
    {
        id: 2,
        name: 'Ортодонтия',
        description: 'Исправление прикуса',
        image: 'path/to/image.jpg',
        subServices: [
            { name: 'Брекеты', price: '30000' },
            { name: 'Элайнеры', price: '40000' }
        ]
    }
];

let doctors = [
    {
        id: 1,
        name: 'Иванов Иван Иванович',
        specialization: 'Терапевт',
        description: 'Опыт работы 15 лет',
        photo: 'path/to/photo.jpg'
    }
];

let reviews = [
    {
        id: 1,
        service: 'Терапевтическая стоматология',
        name: 'Петров Петр',
        date: '2024-03-20',
        text: 'Отличное обслуживание'
    }
];

document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('adminAuthenticated');
    window.location.href = 'admin.html';
});

document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        const service = this.dataset.service;

        if (service) {
            loadServiceContent(service);
        } else if (page) {
            loadContent(page);
        }

        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
            submenu.classList.toggle('active');
        }
    });
});

function loadContent(page) {
    const contentArea = document.getElementById('contentArea');
    let content = '';

    switch(page) {
        case 'home':
            content = createHomeContent();
            break;
        case 'services':
            content = createServicesContent();
            break;
        case 'doctors':
            content = createDoctorsContent();
            break;
        case 'reviews':
            content = createReviewsContent();
            break;
        case 'contacts':
            content = createContactsContent();
            break;
        case 'privacy':
            content = createPrivacyContent();
            break;
        default:
            content = '<h2>Выберите раздел для редактирования</h2>';
    }

    contentArea.innerHTML = content;
    initializeEditors();
}

function loadServiceContent(serviceId) {
    const service = services.find(s => s.id === parseInt(serviceId));
    if (!service) return;

    const contentArea = document.getElementById('contentArea');
    const content = `
        <div class="editor-section">
            <h2>Редактирование услуги: ${service.name}</h2>
            <div class="edit-block">
                <div class="edit-field">
                    <label>Название услуги</label>
                    <input type="text" value="${service.name}" data-id="${service.id}">
                    <label>Описание</label>
                    <textarea>${service.description}</textarea>
                    <label>Изображение</label>
                    <input type="file">
                    <img src="${service.image}" alt="${service.name}" style="max-width: 200px;">
                </div>
            </div>

            <h3>Подуслуги</h3>
            <button class="add-subservice-btn action-button" data-service-id="${service.id}">Добавить подуслугу</button>
            <div class="subservices-list">
                ${service.subServices.map(sub => `
                    <div class="edit-block">
                        <div class="edit-field">
                            <label>Название</label>
                            <input type="text" value="${sub.name}">
                            <label>Цена</label>
                            <input type="text" value="${sub.price}">
                            <button class="delete-subservice-btn danger-button">Удалить</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="button-group">
                <button class="save-service-btn action-button">Сохранить изменения</button>
                <button class="delete-service-btn danger-button" data-id="${service.id}">Удалить услугу</button>
            </div>
        </div>
    `;

    contentArea.innerHTML = content;
    initializeEditors();
}

function createHomeContent() {
    return `
        <div class="editor-section">
            <h2>Редактирование главной страницы</h2>
            <div class="edit-block">
                <h3>Шапка сайта</h3>
                <div class="edit-field">
                    <label>Логотип</label>
                    <input type="file" class="logo-upload">
                    <label>Телефон</label>
                    <input type="text" value="${defaultContent.header.phone}">
                </div>
            </div>

            <div class="edit-block">
                <h3>Баннер</h3>
                <div class="edit-field">
                    <label>Заголовок</label>
                    <input type="text" placeholder="Заголовок баннера">
                    <label>Описание</label>
                    <textarea placeholder="Описание баннера"></textarea>
                </div>
            </div>

            <div class="edit-block">
                <h3>Блок услуг</h3>
                <div class="edit-field">
                    <label>Заголовок</label>
                    <input type="text" placeholder="Заголовок блока услуг">
                    <label>Изображение</label>
                    <input type="file">
                </div>
            </div>

            <div class="edit-block">
                <h3>О нас</h3>
                <div class="edit-field">
                    <label>Заголовок</label>
                    <input type="text" placeholder="Заголовок блока">
                    <label>Описание</label>
                    <textarea placeholder="Описание блока"></textarea>
                    <label>Изображение</label>
                    <input type="file">
                </div>
            </div>

            <div class="edit-block">
                <h3>Этапы лечения</h3>
                <div class="edit-field">
                    <label>Заголовок</label>
                    <input type="text" placeholder="Заголовок блока">
                    <label>Описание</label>
                    <textarea placeholder="Описание этапов"></textarea>
                </div>
            </div>

            <button class="save-changes-btn action-button">Сохранить изменения</button>
        </div>
    `;
}

function createServicesContent() {
    return `
        <div class="editor-section">
            <h2>Управление услугами</h2>
            <button class="add-service-btn action-button">Добавить услугу</button>
            <div class="services-list">
                ${services.map(service => `
                    <div class="service-item" data-id="${service.id}">
                        <h3>${service.name}</h3>
                        <div class="button-group">
                            <button class="edit-service-btn action-button" data-id="${service.id}">Редактировать</button>
                            <button class="delete-service-btn danger-button" data-id="${service.id}">Удалить</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function createDoctorsContent() {
    return `
        <div class="editor-section">
            <h2>Управление специалистами</h2>
            <button class="add-doctor-btn action-button">Добавить специалиста</button>
            <div class="doctors-list">
                ${doctors.map(doctor => `
                    <div class="edit-block" data-id="${doctor.id}">
                        <div class="edit-field">
                            <label>ФИО</label>
                            <input type="text" value="${doctor.name}">
                            <label>Специализация</label>
                            <input type="text" value="${doctor.specialization}">
                            <label>Описание</label>
                            <textarea>${doctor.description}</textarea>
                            <label>Фото</label>
                            <input type="file">
                            <img src="${doctor.photo}" alt="${doctor.name}" style="max-width: 200px;">
                            <div class="button-group">
                                <button class="save-doctor-btn action-button" data-id="${doctor.id}">Сохранить</button>
                                <button class="delete-doctor-btn danger-button" data-id="${doctor.id}">Удалить</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function createReviewsContent() {
    return `
        <div class="editor-section">
            <h2>Управление отзывами</h2>
            <button class="add-review-btn action-button">Добавить отзыв</button>
            <div class="reviews-list">
                ${reviews.map(review => `
                    <div class="edit-block" data-id="${review.id}">
                        <div class="edit-field">
                            <label>Услуга</label>
                            <select class="styled-select">
                                ${services.map(service => `
                                    <option value="${service.id}" ${review.service === service.name ? 'selected' : ''}>
                                        ${service.name}
                                    </option>
                                `).join('')}
                            </select>
                            <label>ФИО клиента</label>
                            <input type="text" value="${review.name}">
                            <label>Отзыв</label>
                            <textarea>${review.text}</textarea>
                            <label>Дата</label>
                            <input type="date" value="${review.date}">
                            <div class="button-group">
                                <button class="save-review-btn action-button" data-id="${review.id}">Сохранить</button>
                                <button class="delete-review-btn danger-button" data-id="${review.id}">Удалить</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function createContactsContent() {
    return `
        <div class="editor-section">
            <h2>Редактирование контактов</h2>
            <div class="edit-block">
                <div class="edit-field">
                    <label>Адрес</label>
                    <input type="text" placeholder="Адрес клиники">
                    <label>Телефон</label>
                    <input type="text" placeholder="Контактный телефон">
                    <label>Email</label>
                    <input type="email" placeholder="Email адрес">
                    <label>Время работы</label>
                    <input type="text" placeholder="Время работы">
                    <label>Координаты для карты</label>
                    <input type="text" placeholder="Широта">
                    <input type="text" placeholder="Долгота">
                </div>
            </div>
            <button class="save-changes-btn action-button">Сохранить изменения</button>
        </div>
    `;
}

function createPrivacyContent() {
    return `
        <div class="editor-section">
            <h2>Редактирование политики конфиденциальности</h2>
            <div class="edit-block">
                <div class="edit-field">
                    <textarea class="privacy-editor" rows="20" placeholder="Текст политики конфиденциальности"></textarea>
                </div>
                <button class="save-privacy-btn action-button">Сохранить</button>
            </div>
        </div>
    `;
}

function initializeEditors() {
    document.querySelectorAll('.edit-field input, .edit-field textarea, .edit-field select').forEach(field => {
        field.addEventListener('change', function() {
            console.log('Field updated:', field.value);
        });
    });

    // Save changes for home page and contacts
    document.querySelector('.save-changes-btn')?.addEventListener('click', function() {
        const formData = new FormData();
        document.querySelectorAll('.edit-field input, .edit-field textarea').forEach(field => {
            formData.append(field.name || field.id || 'field', field.value);
        });
        console.log('Saving changes:', Object.fromEntries(formData));
        alert('Изменения успешно сохранены');
    });

    // Service management
    document.querySelector('.add-service-btn')?.addEventListener('click', function() {
        const newService = {
            id: services.length + 1,
            name: 'Новая услуга',
            description: 'Описание услуги',
            image: 'path/to/default.jpg',
            subServices: []
        };
        services.push(newService);
        loadContent('services');
    });

    document.querySelectorAll('.edit-service-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            loadServiceContent(id);
        });
    });

    document.querySelectorAll('.save-service-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceBlock = this.closest('.editor-section');
            const serviceId = parseInt(serviceBlock.querySelector('[data-id]').dataset.id);
            const service = services.find(s => s.id === serviceId);
            
            if (service) {
                service.name = serviceBlock.querySelector('input[type="text"]').value;
                service.description = serviceBlock.querySelector('textarea').value;
                
                const subServices = [];
                serviceBlock.querySelectorAll('.subservices-list .edit-block').forEach(block => {
                    subServices.push({
                        name: block.querySelector('input[type="text"]').value,
                        price: block.querySelector('input[type="text"]:last-of-type').value
                    });
                });
                service.subServices = subServices;
                
                alert('Услуга успешно сохранена');
                loadContent('services');
            }
        });
    });

    document.querySelectorAll('.delete-service-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
                services = services.filter(s => s.id !== id);
                loadContent('services');
            }
        });
    });

    // Review management
    document.querySelector('.add-review-btn')?.addEventListener('click', function() {
        const newReview = {
            id: reviews.length + 1,
            service: services[0].name,
            name: 'Имя клиента',
            date: new Date().toISOString().split('T')[0],
            text: 'Текст отзыва'
        };
        reviews.push(newReview);
        loadContent('reviews');
    });

    document.querySelectorAll('.save-review-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const reviewBlock = this.closest('.edit-block');
            const review = reviews.find(r => r.id === id);
            
            if (review && reviewBlock) {
                review.service = reviewBlock.querySelector('select').value;
                review.name = reviewBlock.querySelector('input[type="text"]').value;
                review.text = reviewBlock.querySelector('textarea').value;
                review.date = reviewBlock.querySelector('input[type="date"]').value;
                
                alert('Отзыв успешно сохранен');
            }
        });
    });

    document.querySelectorAll('.delete-review-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
                reviews = reviews.filter(r => r.id !== id);
                loadContent('reviews');
            }
        });
    });
}