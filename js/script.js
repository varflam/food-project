window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    
    const tabHeader = document.querySelector('.tabheader__items'),
          tabItems = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent');

    let removeTabContent = function() {
        tabContent.forEach(tab => {
            tab.classList.add('hidden', 'fade');
            tab.classList.remove('visible');
        });

        tabItems.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    removeTabContent();

    let showTabContent = function(i = 0) {
        tabContent[i].classList.add('visible');
        tabContent[i].classList.remove('hidden');
        tabItems[i].classList.add('tabheader__item_active');
    };

    showTabContent();

    tabHeader.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabItems.forEach((item, i) => {
                if (target == item) {
                    removeTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //Timer

    let deadline = '2021-01-09';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 * 60) % 60),
            seconds  = Math.floor((t / 1000) % 60);

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'seconds': seconds,
                'minutes': minutes
            };
    }
    
    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock();
        
        function updateClock() {
            let t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal
    const modalBtn = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal');

    const closeModal = () => {
    modalWindow.classList.remove('visible');
    modalWindow.classList.add('hidden');
    document.body.style.overflow = '';
    };
    
    const openModal = () => {
        modalWindow.classList.add('visible');
        modalWindow.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    };
    
    modalBtn.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modalWindow.addEventListener('click', (evt) => {
        if (evt.target === modalWindow || evt.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && modalWindow.classList.contains('visible')) {
            closeModal();
        }
    });

    let modalTimerId = setTimeout(() => {
        openModal();
    }, 50000);

    const showModalByScroll = () => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        });
    };

    //Cards

    class FoodCard {
        constructor (name, descr, src, alt, price, parentSelector, ...classes) {
            this.name = name;
            this.descr = descr;
            this.src = src;
            this.alt = alt;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.name}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;

        this.parent.append(element);
        }
    }
    
    new FoodCard(
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '"img/tabs/elite.jpg"',
        '"elite"',
        9,
        '.menu .container',
        'menu__item'
    ).render();

    new FoodCard(
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        'img/tabs/vegy.jpg',
        '"vegy"',
        9,
        '.menu .container',
        'menu__item'
    ).render();

    new FoodCard(
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '"img/tabs/elite.jpg"',
        '"elite"',
        9,
        '.menu .container',
        'menu__item'
    ).render();
    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
    //Thanks window
    const modalDialog = document.querySelector('.modal__dialog'); 
    const showThanksModal = function (message) { 
        modalDialog.classList.add('hidden');
        openModal();

        let thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        modalWindow.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.remove('hidden');
            modalDialog.classList.add('visible');
            closeModal();
        }, 4000);
    };
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
});

