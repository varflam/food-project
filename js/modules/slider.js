function slider ({container, slider, nextArr, prevArr, totalCount, currentCount, wrapper, field}) {
    const slides = document.querySelectorAll(slider),
        slide = document.querySelector(container),
        prev = document.querySelector(prevArr),
        next = document.querySelector(nextArr),
        total = document.querySelector(totalCount),
        current = document.querySelector(currentCount),
        sliderWrapper = document.querySelector(wrapper),
        sliderInner = document.querySelector(field),
        width = window.getComputedStyle(sliderWrapper).width,
        maxOffset = removeLetters(width);

    let slideIndex = 1,
        offset = 0,
        indicator = document.createElement('ul'),
        dots = [];

    function removeLetters(str) {
        return +str.replace(/\D/g, '');
    }

    indicator.classList.add('carousel__indicator');
    indicator.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slide.append(indicator);

    slide.style.position = 'relative';

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        indicator.append(dot);
        dots.push(dot);
    }

    function setSlideNum () {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent =  `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent =  slideIndex;
        }
    }
    setSlideNum();
    
    sliderInner.style.width = 100 * slides.length + '%';
    slides.forEach(slide => slide.style.width = width);
    sliderInner.style.cssText += 'display: flex; transition: all 0.3s;';
    sliderWrapper.style.overflow = 'hidden';

    function changeDots () {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    next.addEventListener('click', () => {
        if (offset == maxOffset * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += maxOffset;
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setSlideNum();
        changeDots();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = maxOffset * (slides.length - 1);
        } else {
            offset -= maxOffset;
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setSlideNum();
        changeDots();
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
    
            offset = maxOffset * (slideTo - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;
    
        setSlideNum();
        changeDots();
        });
    });
}

export default slider;