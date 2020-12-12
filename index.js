const initData = (date) => {
    if(!date){
        const weekArr = [];
    
        for(let day = 0; day < 7; day++){
            const dayArr = [];
    
            for(let hour = 0; hour < 24; hour++){
                dayArr.push({type : 0, contents : '', id : 0});
            }
    
            weekArr.push(dayArr);
        }

        return weekArr;
    }
    else{
        // 데이터 받아오는 부분

        return [];
    }
};

const drawDate = (left) => {
    if(left){
        today.setDate(today.getDate() - 7);
    }
    else{
        today.setDate(today.getDate() + 7);
    }

    console.log(today);

    thisWeek = getWeek(today);
    data = initData();

    elements.year.innerHTML = today.getFullYear();
    elements.startWeek.innerHTML = thisWeek[0];
    elements.endWeek.innerHTML = thisWeek[6];

    let dateText = document.getElementsByClassName('date-text');
    for(let i = 0; i < dateText.length; i++){
        dateText[i].innerHTML = thisWeek[i];
    }
}

const drawBox = () => {
    const boxContainers = document.getElementsByClassName('time-container');

    for(let i = 0; i < 7; i++){
        let parent = boxContainers[i];

        parent.innerHTML = '';

        let dateIndex = parent.getAttribute('data') * 1;
        let currentDay = data[dateIndex];

        let currentStartTime = 0, currentEndTime = 1, currentType = currentDay[0].type, currentId = currentDay[0].id;
        for(let i = 0; i < 24; i++){
            if(i < 23){
                if(currentDay[i + 1].type == 0 || currentId != currentDay[i + 1].id){
                    const newTime = createElement('div', ['time']);
                    newTime.setAttribute('type', currentType);
                    newTime.setAttribute('start-time', currentStartTime);
                    newTime.setAttribute('end-time', currentEndTime);

                    if(currentType != 0){
                        newTime.style.background = arr[currentType][1];
                        newTime.style.width = `${16*(currentEndTime-currentStartTime) + 6*(currentEndTime-currentStartTime-1)}px`;
                    }

                    parent.appendChild(newTime);
    
                    currentStartTime = i + 1;
                    currentEndTime = currentStartTime + 1;
                    currentType = currentDay[currentStartTime].type;
                    currentId = currentDay[currentStartTime].id; 
                }
                else{
                    currentEndTime++;
                }
            }
            else{
                const newTime = createElement('div', ['time']);
                newTime.setAttribute('type', currentType);
                newTime.setAttribute('start-time', currentStartTime);
                newTime.setAttribute('end-time', currentEndTime);

                if(currentType !== 0){
                    newTime.style.background = arr[currentType][1];
                    newTime.style.width = `${16*(currentEndTime-currentStartTime) + 6*(currentEndTime-currentStartTime-1)}px`;
                }

                parent.appendChild(newTime);
            }
        }
    }
};

const removeSelectedBox = (currentDay) => {
    const startTime = selectedBox.getAttribute('start-time') * 1;
    const endTime = selectedBox.getAttribute('end-time') * 1;

    for(let i = startTime; i < endTime; i++){
        currentDay[i] = {type : 0, contents : '', id : 0};
    }
};
 
const app = () => {
    const target = document.getElementById('app');
    elements.target = target;

    const initHeader = () => {
        const header = createElement('div', 'header');
        elements.header = header;

        const yearContainer = createElement('div', 'year-container');

        const year = createElement('span', 'year', '2020');
        elements.year = year;

        yearContainer.appendChild(year);
    
        const weekContainer = createElement('div', 'week-container');

        const prevButton = createElement('button', 'prev-button', '◀');
        elements.prevButton = prevButton;
        prevButton.addEventListener('click', (event) => {
            drawDate(true);
            drawBox();
        });

        const nextButton = createElement('button', 'next-button', '▶');
        elements.nextButton = nextButton;
        nextButton.addEventListener('click', (event) => {
            drawDate(false);
            drawBox();
        });

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

        settingsButton.addEventListener('click', () => {
            elements.settingsModal.classList.remove('hide');
        });

        settingsContainer.appendChild(settingsButton);

        header.appendChild(yearContainer);
        header.appendChild(weekContainer);
        header.appendChild(settingsContainer);
    
        return header;
    }

    const initBody = () => {
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
            timeContainer.setAttribute('data', i);
            timeContainer.addEventListener('click', (event) => {
                if(event.target.classList.contains('time')){
                    selectedWeek = event.target.parentNode;
                    selectedBox = event.target;

                    if(event.target.getAttribute('type') == 0){
                        //기본 박스
                        document.getElementById('start-time').value = event.target.getAttribute('start-time') * 1;
                        document.getElementById('start-time').readOnly = true;

                        elements.timeModalHeader.innerHTML = '일정 추가';
                        elements.timeModalButtons[0].classList.remove('hide');
                        elements.timeModal.classList.remove('hide');
                    }
                    else{
                        //입력된 박스
                        elements.timeModalButtons[1].classList.remove('hide');
                        document.getElementById('time-modal').classList.remove('hide');
                        
                        let dateIndex = event.target.parentNode.getAttribute('data') * 1;
                        let index = event.target.getAttribute('start-time') * 1;
                        document.getElementById('start-time').readOnly = false;

                        let currentData = data[dateIndex][index]; 

                        elements.timeModalHeader.innerHTML = '일정 수정';
                        document.getElementById('start-time').value = index;
                        document.getElementById('end-time').value = event.target.getAttribute('end-time') * 1;
                        document.getElementById('type').value = currentData.type;
                        document.getElementById('contents').value = currentData.contents;
                    }
                }
            })
            
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

    const initFooter = () => {
        const footerContainer = createElement('div', 'footer-container');

        for(let i = 0; i < arr.length; i++){
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
    drawBox();
    target.appendChild(initFooter(elements));

    elements.settingsModal = initSettingsModal(arr);
    target.appendChild(elements.settingsModal);

    const {timeModalHeaderText, timeModal, timeModalButtons} = initTimeModal(arr);
    elements.timeModalHeader = timeModalHeaderText;
    elements.timeModal = timeModal;
    elements.timeModalButtons = timeModalButtons;

    target.appendChild(elements.timeModal);
}

let today = new Date();
let data = initData();
let thisWeek = getWeek();
let selectedWeek;
let selectedBox;

const elements = {};
const arr = [['기본', '#ebedf0'], ['공부', '#9be9a8'], ['게임', '#87CEFA'], ['운동', '#BA55D3']];

app();