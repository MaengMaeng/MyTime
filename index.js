const app = () => {
    const target = document.getElementById('app');
    const elements = {};
    elements.target = target;
    const thisWeek = getWeek();

    const initHeader = (elements) => {
        const header = createElement('div', 'header');
        elements.header = header;

        const yearContainer = createElement('div', 'year-container');

        const year = createElement('span', 'year', '2020');
        elements.year = year;

        yearContainer.appendChild(year);
    
        const weekContainer = createElement('div', 'week-container');

        const prevButton = createElement('button', 'prev-button', '◀');
        elements.prevButton = prevButton;

        const nextButton = createElement('button', 'next-button', '▶');
        elements.nextButton = nextButton;

        const week = createElement('div', 'week');

        const startWeek = createElement('span', 'start-week', thisWeek[0]);
        elements.startWeek = startWeek;

        const divider = createElement('span', null, '~');

        const endWeek = createElement('span', 'end-week', thisWeek[6]);
        elements.endWeek = endWeek;

        week.appendChild(startWeek);
        week.appendChild(divider);
        week.appendChild(endWeek);
    
        weekContainer.appendChild(prevButton);
        weekContainer.appendChild(week);
        weekContainer.appendChild(nextButton);
    
        const settingsContainer = createElement('div', 'settings-container');

        const settingsButton = createElement('button', 'settings-button', '<img src="./images/black-settings-button.png" />');
        elements.settingsButton = settingsButton;

        settingsContainer.appendChild(settingsButton);

        header.appendChild(yearContainer);
        header.appendChild(weekContainer);
        header.appendChild(settingsContainer);
    
        return header;
    }

    const initBody = (elements) => {
        const bodyContainer = createElement('div', 'body-container');

        for(let i = 0; i < 7; i++){
            const dayContainer = createElement('div', 'day-container');

            const dayOfTheWeekContainer = createElement('div', 'day-of-week-container')

            const dayOfTheWeekText = createElement('div', i === 0 ? 'sun' : i === 6 ? 'sat' : null, dayOfTheWeek[i]);

            const dateText = createElement('div', 'date-text', thisWeek[i]);

            dayOfTheWeekContainer.appendChild(dayOfTheWeekText);
            dayOfTheWeekContainer.appendChild(dateText);

            const timeAndDividerContainer = createElement('div', 'time-and-divider-container');

            const timeContainer = createElement('div', 'time-container');

            for(let j = 0; j < 24; j++){
                timeContainer.appendChild(createElement('div', 'time'));
            }

            const hourDividerContainer = createElement('div', 'hour-divider-container')

            for(let j = 0; j <= 24; j++){
                hourDividerContainer.appendChild(createElement('div', 'hour-divider', j+''));
            }

            timeAndDividerContainer.appendChild(timeContainer);
            timeAndDividerContainer.appendChild(hourDividerContainer);

            dayContainer.appendChild(dayOfTheWeekContainer);

            dayContainer.appendChild(timeAndDividerContainer);

            bodyContainer.appendChild(dayContainer);
        }

        return bodyContainer;
    }

    target.appendChild(initHeader(elements));
    target.appendChild(initBody(elements));
}

app();