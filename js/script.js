import tabs from './modules/tabs';
import calc from './modules/calc';
import card from './modules/card';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import modal from './modules/modal';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    let modalTimerId = setTimeout(() => {
        openModal('.modal', modalTimerId);
    }, 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc('.calculating__result span');
    card();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slider: '.offer__slide',
        prevArr: '.offer__slider-prev',
        nextArr: '.offer__slider-next',
        totalCount: '#total',
        currentCount: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    timer('.timer', '2021-06-11');
    modal('[data-modal]', '.modal', modalTimerId);
});

