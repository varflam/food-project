import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelectors, modalTimerId) {
    const forms = document.querySelectorAll(formSelectors);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


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
        openModal('.modal', modalTimerId);

        let thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.remove('hidden');
            modalDialog.classList.add('visible');
            closeModal('.modal');
        }, 4000);
    };
    fetch('http://localhost:3000/menu')
        .then(data => data.json());
}

export default forms;