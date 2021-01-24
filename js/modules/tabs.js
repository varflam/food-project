function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabHeader = document.querySelector(tabsParentSelector),
          tabItems = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabsContentSelector);

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
        tabItems[i].classList.add(activeClass);
    };

    showTabContent();

    tabHeader.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabItems.forEach((item, i) => {
                if (target == item) {
                    removeTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;