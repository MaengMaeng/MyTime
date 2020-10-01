const app = () => {
    const target = document.getElementById('app');
    const elements = {};
    elements.target = target;

    const makeHeader = (elements) => {
        const header = document.createElement('div');
        header.classList.add('header');
        elements.header = header;

        const yearContainer = document.createElement('div');
        yearContainer.classList.add('year-container');

        const year = document.createElement('span');
        year.classList.add('year');
        year.innerHTML = '2020';
        elements.year = year;

        yearContainer.appendChild(year);
    
        const weekContainer = document.createElement('div');
        weekContainer.classList.add('week-container');

        const prevButton = document.createElement('button');
        prevButton.classList.add('prev-button');
        prevButton.innerHTML = '◀';
        elements.prevButton = prevButton;

        const nextButton = document.createElement('button');
        nextButton.classList.add('next-button');
        nextButton.innerHTML = '▶';
        elements.nextButton = nextButton;

        const week = document.createElement('div');
        week.classList.add('week');

        const startWeek = document.createElement('span');
        startWeek.classList.add('start-week');
        startWeek.innerHTML = '09.27';
        elements.startWeek = startWeek;

        const divider = document.createElement('span');
        divider.innerHTML = '~';
        const endWeek = document.createElement('span');
        endWeek.classList.add('end-week');
        endWeek.innerHTML = '10.08';
        elements.endWeek = endWeek;

        week.appendChild(startWeek);
        week.appendChild(divider);
        week.appendChild(endWeek);
    
        weekContainer.appendChild(prevButton);
        weekContainer.appendChild(week);
        weekContainer.appendChild(nextButton);
    
        const settingsContainer = document.createElement('div');
        settingsContainer.classList.add('settings-container');

        const settingsButton = document.createElement('button');
        settingsButton.classList.add('settings-button');
        settingsButton.innerHTML = '<img src="./images/black-settings-button.png" />'
        elements.settingsButton = settingsButton;

        settingsContainer.appendChild(settingsButton);

        header.appendChild(yearContainer);
        header.appendChild(weekContainer);
        header.appendChild(settingsContainer);
    
        return header;
    }

    const makeBody = (elements) => {
        const bodyContainer = document.createElement('div');
        bodyContainer.classList.add('body-container');
        
        const dayOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

        for(let i = 0; i < 7; i++){
            const dayContainer = document.createElement('div');
            dayContainer.classList.add('day-container');

            const dayOfTheWeekContainer = document.createElement('div');
            dayOfTheWeekContainer.classList.add('day-of-week-container');

            const dayOfTheWeekText = document.createElement('div');
            dayOfTheWeekText.classList.add('day-of-week-text');
            if(i === 0) dayOfTheWeekText.classList.add('sun');
            if(i === 6) dayOfTheWeekText.classList.add('sat');
            dayOfTheWeekText.innerHTML = dayOfTheWeek[i];

            const dateText = document.createElement('div');
            dateText.innerHTML = `09.${(27 + i)%29 + 1}`;
            dateText.classList.add('date-text');

            dayOfTheWeekContainer.appendChild(dayOfTheWeekText);
            dayOfTheWeekContainer.appendChild(dateText);

            const timeAndDividerContainer = document.createElement('div');
            timeAndDividerContainer.classList.add('time-and-divider-container');

            const timeContainer = document.createElement('div');
            timeContainer.classList.add('time-container');

            for(let j = 0; j < 24; j++){
                const time = document.createElement('div');
                time.classList.add('time');
    
                timeContainer.appendChild(time);
            }

            const hourDividerContainer = document.createElement('div');
            hourDividerContainer.classList.add('hour-divider-container');

            for(let j = 0; j <= 24; j++){
                const hourDivider = document.createElement('div');
                hourDivider.classList.add('hour-divider');
                hourDivider.innerHTML = j;

                hourDividerContainer.appendChild(hourDivider);
            }

            timeAndDividerContainer.appendChild(timeContainer);
            timeAndDividerContainer.appendChild(hourDividerContainer);

            dayContainer.appendChild(dayOfTheWeekContainer);

            dayContainer.appendChild(timeAndDividerContainer);

            bodyContainer.appendChild(dayContainer);
        }

        return bodyContainer;
    }

    target.appendChild(makeHeader(elements));
    target.appendChild(makeBody(elements));
}

app();