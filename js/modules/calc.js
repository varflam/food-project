function calc (resultSelector) {
    const result = document.querySelector(resultSelector);

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        localStorage.setItem('sex', 'female');
        sex = 'female';
    } 

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        localStorage.setItem('ratio', 1.375);
        ratio = 1.375;
    } 

    function initActiveClass(selector, activeClass) {
        let elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if(elem.getAttribute('data-calc') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initActiveClass('#gender div', 'calculating__choose-item_active');
    initActiveClass('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function calcStaticElements(selector, activeClass) {
            const elements = document.querySelectorAll(selector);

            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    const ratioValue = e.target.getAttribute('data-calc'),
                          sexValue = e.target.getAttribute('id');
                    if (ratioValue) {
                        ratio = +ratioValue;
                        localStorage.setItem('ratio', ratioValue);
                    } else {
                        sex = sexValue;
                        localStorage.setItem('sex', sexValue);
                    }
    
                console.log(ratio, sex);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    calcStaticElements('#gender div', 'calculating__choose-item_active');
    calcStaticElements('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcDynamicElements(selector) {
        let input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
    
                case 'weight':
                    weight = +input.value;
                    break;
    
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    calcDynamicElements('#height');
    calcDynamicElements('#weight');
    calcDynamicElements('#age');
}

export default calc;