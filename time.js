const initTimeModal = (arr) => {
    const [timeModal, timeModalBody, timeModalButtons, timeModalHeaderText] = createModal('일정 추가', ['확인', '수정', '삭제', '취소'], '500px', '400px');
    timeModal.id = 'time-modal';

    timeModalButtons[0].classList.add('hide');
    timeModalButtons[1].classList.add('hide');
    timeModalButtons[2].classList.add('hide');

    const body = createElement('div', 'time-body');

    const leftDiv = createElement('div', 'left');

    const startTimeDiv = createElement('div', 'start-time');

    const startTimeSpan = createElement('span', 'start-time-span', '시작 시간 :');
    const startTimeInput = createElement('input', 'start-time-input');
    startTimeInput.id = 'start-time';
    startTimeInput.readOnly = true;

    startTimeDiv.appendChild(startTimeSpan);
    startTimeDiv.appendChild(startTimeInput);

    const endTimeDiv = createElement('div', 'end-time');

    const endTimeSpan = createElement('span', 'end-time-span', '마친 시간 :');
    const endTimeInput = createElement('input', 'end-time-input');
    endTimeInput.id = 'end-time'
    endTimeInput.type = 'number';
    
    endTimeDiv.appendChild(endTimeSpan);
    endTimeDiv.appendChild(endTimeInput);

    const typeDiv = createElement('div', 'type');
    
    const typeSpan = createElement('span', 'type-span', '분류 :');

    const typeSelectionContainer = createElement('div', 'type-selection-container');
    typeSelectionContainer.id = 'type-selection';

    // const typeSelection = createSelection(arr, 'type');

    // typeSelectionContainer.appendChild(typeSelection);

    typeDiv.appendChild(typeSpan);
    typeDiv.appendChild(typeSelectionContainer);

    leftDiv.appendChild(startTimeDiv);
    leftDiv.appendChild(endTimeDiv);
    leftDiv.appendChild(typeDiv);

    const rightDiv = createElement('div', 'right');

    const contentsSpan = createElement('span', 'contents-span', '내용');
    const contentsTextarea = createElement('textarea', 'contents-textarea');
    contentsTextarea.id = 'contents';

    rightDiv.appendChild(contentsSpan);
    rightDiv.appendChild(contentsTextarea);

    body.appendChild(leftDiv);
    body.appendChild(rightDiv);

    timeModalBody.appendChild(body);

    timeModalButtons[0].addEventListener('click', () => {
        const s = document.getElementById('start-time').value;
        const e = document.getElementById('end-time').value;
        const t = document.getElementById('type').value;
        const c = document.getElementById('contents').value;
        
        if(s && e && t){
            const startTime = Number(s);
            const endTime = Number(e);
            
            if(endTime && endTime > startTime && endTime <= 24){
                let currentDay = data[selectedWeek.getAttribute('data') * 1];
                for(let i = startTime; i < endTime; i++){
                    currentDay[i] = {type: t, contents: c, id: `${t}.${s}`};
                }
                
                setData();
                drawBox();

                document.getElementById('start-time').value = '';
                document.getElementById('end-time').value = '';
                document.getElementById('type').value = '';
                document.getElementById('contents').value = '';
                
                timeModalButtons[0].classList.add('hide');
                timeModal.classList.add('hide');
            }
            else{
                alert('전부 입력해주세요.');
            }
        }
    });

    timeModalButtons[1].addEventListener('click', () => {
        const s = document.getElementById('start-time').value;
        const e = document.getElementById('end-time').value;
        const t = document.getElementById('type').value;
        const c = document.getElementById('contents').value;
        
        if(s && e && t){
            const startTime = Number(s);
            const endTime = Number(e);
            
            if(endTime && endTime > startTime && endTime <= 24){
                let currentDay = data[selectedWeek.getAttribute('data') * 1];

                removeSelectedBox(currentDay);

                for(let i = startTime; i < endTime; i++){
                    currentDay[i] = {type: t, contents: c, id: `${t}.${s}`};
                }
                
                setData();
                drawBox();

                document.getElementById('start-time').value = '';
                document.getElementById('end-time').value = '';
                document.getElementById('type').value = '';
                document.getElementById('contents').value = '';
                
                timeModalButtons[1].classList.add('hide');
                timeModalButtons[2].classList.add('hide');
                timeModal.classList.add('hide');
            }
            else{
                alert('전부 입력해주세요.');
            }
        }
    });

    timeModalButtons[2].addEventListener('click', () => {
        if(confirm('정말 삭제하시겠습니까?')){
            let currentDay = data[selectedWeek.getAttribute('data') * 1];

            removeSelectedBox(currentDay);
            setData();
            drawBox();

            document.getElementById('start-time').value = '';
            document.getElementById('end-time').value = '';
            document.getElementById('type').value = '';
            document.getElementById('contents').value = '';
            
            timeModalButtons[1].classList.add('hide');
            timeModalButtons[2].classList.add('hide');
            timeModal.classList.add('hide');
        }
    }); 

    timeModalButtons[3].addEventListener('click', () => {
        document.getElementById('start-time').value = '';
        document.getElementById('end-time').value = '';
        document.getElementById('type').value = '';
        document.getElementById('contents').value = '';

        timeModalButtons[0].classList.add('hide');
        timeModalButtons[1].classList.add('hide');
        timeModalButtons[2].classList.add('hide');
        timeModal.classList.add('hide');
    }); 
    
    return {timeModal, timeModalButtons, timeModalHeaderText};
}