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
        settingsButton.innerHTML = '≡';
        elements.settingsButton = settingsButton;

        settingsContainer.appendChild(settingsButton);

        header.appendChild(yearContainer);
        header.appendChild(weekContainer);
        header.appendChild(settingsContainer);
    
        return header;
    }

    target.appendChild(makeHeader(elements));
}

app();