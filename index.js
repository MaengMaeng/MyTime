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
                const time = createElement('div', 'time');
                time.setAttribute('data', 1);
                timeContainer.appendChild(time);
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

    const initFooter = (elements) => {
        const footerContainer = createElement('div', 'footer-container');

        const arr = [['기본', '#ebedf0'], ['공부', '#9be9a8']];

        for(let i = 0; i < 2; i++){
            const footerElement = createElement('div', 'footer-element');

            const boxContainer = createElement('div', 'box-container');
            const box = createElement('div', 'box');
            box.style.backgroundColor = arr[i][1];
    
            const boxtTextContainer = createElement('div', 'box-text-container');
            const boxText = createElement('span', 'box-text', arr[i][0]);
    
            boxContainer.appendChild(box);
            boxtTextContainer.appendChild(boxText);
    
            footerElement.appendChild(boxContainer);
            footerElement.appendChild(boxtTextContainer);
    
            footerContainer.appendChild(footerElement);
        }

        return footerContainer;
    }

    target.appendChild(initHeader(elements));
    target.appendChild(initBody(elements));
    target.appendChild(initFooter(elements));

    const timeTest = document.getElementsByClassName('time');
    
    for(let i = 0; i < timeTest.length; i++){
        timeTest[i].addEventListener('click', (event) => {
            const parent = event.target.parentNode;
            let startTime = 0;
            for(let i = 0; i < parent.childNodes.length; i++){
                const data = parent.childNodes[i].getAttribute('data');

                if(parent.childNodes[i] === event.target){
                    break;
                }

                startTime += Number(data);
            }

            const endTime = Number(prompt(`${startTime}시 부터 몇시까지 하셨나요?`));
            
            if(endTime && endTime > startTime && endTime <= 24){
                let index = 0;
                for(let i = 0, time = 0, end = 24; time < end; i++){
                    const data = parent.childNodes[i].getAttribute('data');

                    if(startTime <= time && time < endTime){
                        parent.removeChild(parent.childNodes[i]);
                        i--;
                        index = i;
                    }

                    time += Number(data);
                }

                const newTime = createElement('div', ['time', 'checked']);
                newTime.setAttribute('data', endTime - startTime);
                newTime.style.width = `${16*(endTime-startTime) + 6*(endTime-startTime-1)}px`;

                if(startTime === 0 && endTime === 24){
                    parent.appendChild(newTime);
                }
                else if(startTime === 0){
                    parent.insertAdjacentElement('afterbegin', newTime);
                }
                else if(endTime === 24){
                    parent.insertAdjacentElement('beforeend', newTime);
                }
                else{
                    parent.childNodes[index].insertAdjacentElement('afterend', newTime);
                }
            }
        });
    }
}

app();