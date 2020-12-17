const getData = (date) => {
    chrome.storage.sync.get(date, (items) => {
        document.getElementById('loading').style.display = 'block';

        data = items[date] || getInitData();

        console.log(date, items[date]);

        drawBox();

        document.getElementById('loading').style.display = 'none';
    })
};

const setData = () => {
    let items = {};
    items[DATE] = data;
    
    chrome.storage.sync.set(items, () => {
        console.log(items, '저장 되었습니다.');
    });
}

const getTypes = (callback, date) => {
    chrome.storage.sync.get('types', (items) => {
        document.getElementById('loading').style.display = 'block';

        types = items['types'] || getInitTypes();

        console.log(types, items['types']);

        document.getElementById('type-selection').innerHTML = '';
        document.getElementById('type-selection').appendChild(createSelection(types, 'type'));

        drawTypes();
        drawFooterTypes();

        callback(date);

        document.getElementById('loading').style.display = 'none';
    })
}

const setTypes = () => {
    let items = {types};

    chrome.storage.sync.set(items, () => {
        console.log(items, '저장 되었습니다.');
    });   
}

const drawDate = (left) => {
    if(left){
        today.setDate(today.getDate() - 7);
    }
    else{
        today.setDate(today.getDate() + 7);
    }
    
    thisWeek = getWeek(today);
    DATE = `${today.getFullYear()}.${thisWeek[0]}`

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
                        newTime.style.background = (types[currentType]||types[0])[1];
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
                    newTime.style.background = types[currentType][1];
                    newTime.style.width = `${16*(currentEndTime-currentStartTime) + 6*(currentEndTime-currentStartTime-1)}px`;
                }

                parent.appendChild(newTime);
            }
        }
    }
};

const drawTypes = () => {
    const bodyContainer = createElement('div', 'settings-body-container');

    for(let i = 0; i < types.length; i++){
        if(types[i][2]){
            const bodyElement = createElement('div', 'settings-body-element');
            
            const bodyBox = createElement('div', 'settings-body-box');
            bodyBox.style.backgroundColor = types[i][1];
            
            const bodyBoxTextContainer = createElement('div', 'settings-body-box-text-container');
    
            const bodyBoxText = createElement('span', 'settings-body-box-text',types[i][0]);
    
            bodyBoxTextContainer.appendChild(bodyBoxText);
    
            bodyElement.appendChild(bodyBox);
            bodyElement.appendChild(bodyBoxTextContainer);
    
            if(i !== 0){
                const removeButton = createElement('button', 'settings-remove-button');

                const removeButtonImg = createElement('img');
                removeButtonImg.src = "./images/black-remove-button.png";

                removeButton.appendChild(removeButtonImg);

                removeButton.setAttribute('data', i);
    
                removeButton.addEventListener('click', (event) => {
                    if(confirm('정말 삭제하시겠습니까?')){
                        let index = event.target.getAttribute('data') || event.target.parentNode.getAttribute('data') * 1;
                        types[index][2] = 0;
                        
                        setTypes();
    
                        drawTypes();
                        drawFooterTypes();
                    }
                });
    
                bodyElement.appendChild(removeButton);
            }
    
            bodyContainer.appendChild(bodyElement);
        }
    }
    
    const bodyPlusContainer = createElement('div', 'settings-body-plus-container');

    bodyPlusContainer.addEventListener('click', (event) => {
        document.getElementById('typeName').value = '';
        document.getElementById('colorPicker').value = '#000000';
        document.getElementById('colorPicker').style.borderRight = '30px solid #000000';

        elements.typesModalButtons[0].classList.remove('hide');
        elements.typesModal.classList.remove('hide');
    });

    const bodyPlusImage = createElement('div', 'settings-plus-button', '<img src="./images/black-plus-button.jpg" />');
    const bodyPlusTextContainer = createElement('div', 'settings-plus-button-text-container');
    const bodyPlusText = createElement('span', 'settings-plus-button-text', '추가하기');

    bodyPlusTextContainer.appendChild(bodyPlusText);
    
    bodyPlusContainer.appendChild(bodyPlusImage);
    bodyPlusContainer.appendChild(bodyPlusTextContainer);

    bodyContainer.appendChild(bodyPlusContainer);
    document.getElementById('settings-modal-body').innerHTML = '';
    document.getElementById('settings-modal-body').appendChild(bodyContainer);
}

const drawFooterTypes = () => {
    const footerContainer = document.getElementById('footer-container');
    footerContainer.innerHTML = '';

    for(let i = 0; i < types.length; i++){
        if(types[i][2]){
            const footerElement = createElement('div', 'footer-element');
            footerElement.setAttribute('data', i);

            footerElement.addEventListener('click', (event) => {
                let node = event.target;

                let footerElements = document.getElementsByClassName('footer-element');
                
                while(!node.classList.contains('footer-element')){
                    node = node.parentNode;
                }
                for(let i = 0; i < footerElements.length; i++){
                    if(node == footerElements[i]){
                        selectedType = footerElements[i].classList.contains('selected') ? 0 :  (node.getAttribute('data') * 1);
                        footerElements[i].classList.toggle('selected');
                    }
                    else{
                        footerElements[i].classList.remove('selected');
                    }
                }
            });

            const boxContainer = createElement('div', 'box-container');
            const box = createElement('div', 'box');
            box.style.backgroundColor = types[i][1];
    
            const boxtTextContainer = createElement('div', 'box-text-container');
            const boxText = createElement('span', 'box-text', types[i][0]);
    
            boxContainer.appendChild(box);
            boxtTextContainer.appendChild(boxText);
    
            footerElement.appendChild(boxContainer);
            footerElement.appendChild(boxtTextContainer);
    
            footerContainer.appendChild(footerElement);
        }
    }
}

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
            getData(DATE);
            // drawBox();
        });

        const nextButton = createElement('button', 'next-button', '▶');
        elements.nextButton = nextButton;
        nextButton.addEventListener('click', (event) => {
            drawDate(false);
            getData(DATE);
            // drawBox();
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
                        elements.timeModalButtons[2].classList.remove('hide');
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

            
            timeContainer.addEventListener('dragstart', (event) => {
                if(event.target.classList.contains('time')){
                    selectedWeek = event.target.parentNode;
                    selectedBox = event.target;

                    dragStart = event.target.getAttribute('start-time') * 1;
                    dragEnd = dragStart + 1;
                    event.target.style.background = types[selectedType][1];
                }
            });

            timeContainer.addEventListener('dragover', (event) => {
                if(event.target.classList.contains('time')){
                    if(selectedWeek == event.target.parentNode){
                        if(event.target.getAttribute('type') == 0 && event.target.getAttribute('start-time') == dragEnd){
                            dragEnd++;
                            selectedBox.style.width = `${16*(dragEnd-dragStart) + 6*(dragEnd-dragStart-1)}px`;
                            event.target.style.display = 'none';
                        }
                    }
                }
            });

            timeContainer.addEventListener('dragend', (event) => {
                document.getElementById('start-time').value = dragStart;
                document.getElementById('end-time').value = dragEnd;

                selectSelection(selectedType);

                elements.timeModalHeader.innerHTML = '일정 추가';
                elements.timeModalButtons[0].classList.remove('hide');
                elements.timeModal.classList.remove('hide');
            });

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
        footerContainer.id = 'footer-container';

        return footerContainer;
    }

    target.appendChild(initHeader(elements));
    target.appendChild(initBody(elements));

    // getData(DATE);

    target.appendChild(initFooter(elements));

    elements.settingsModal = initSettingsModal(types);
    target.appendChild(elements.settingsModal);

    getTypes(getData, DATE);

    const {typesModal, typesModalButtons, typesModalHeaderText} = initTypesModal();
    elements.typesModal = typesModal;
    elements.typesModalButtons = typesModalButtons;
    target.appendChild(elements.typesModal);

    initColorPicker();

    const {timeModalHeaderText, timeModal, timeModalButtons} = initTimeModal(types);
    elements.timeModalHeader = timeModalHeaderText;
    elements.timeModal = timeModal;
    elements.timeModalButtons = timeModalButtons;

    target.appendChild(elements.timeModal);
}

let today = new Date();
let thisWeek = getWeek();

let DATE = `${today.getFullYear()}.${thisWeek[0]}`;
let data;

let selectedWeek;
let selectedBox;
let selectedType = 0;

let dragStart;
let dragEnd;

const elements = {};
let types;

app();
