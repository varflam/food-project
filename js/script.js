window.addEventListener('DOMContentLoaded', () => {
    //Tabs

    const tabHeader = document.querySelector('.tabheader__items'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabItems = document.querySelectorAll('.tabheader__item');

    function removeTabContent() {
        tabContent.forEach(tab => {
            tab.classList.add('hidden');
            tab.classList.remove('visible', 'fade');
        });

        tabItems.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    removeTabContent();

    function showTabContent(i = 0) {
        tabContent[i].classList.remove('hidden');
        tabContent[i].classList.add('visible', 'fade');
        tabItems[i].classList.add('tabheader__item_active');
    }

    showTabContent();

    tabHeader.addEventListener('click', evt => {
        const target = evt.target;
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
          modalWindow = document.querySelector('.modal'),
          modalClose = modalWindow.querySelector('[data-close]');

    const closeModal = () => {
    modalWindow.classList.toggle('visible');
    document.body.style.overflow = '';
    };
    
    const openModal = () => {
        modalWindow.classList.toggle('visible');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    };
    
    modalBtn.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modalClose.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (evt) => {
        if (evt.target === modalWindow) {
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
    }, 5000);

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

    //Бэк-часть
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

});
