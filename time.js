const initTimeModal = (arr) => {
    const [timeModal, timeModalBody, timeModalButtons] = createModal('일정 추가', ['확인', '취소'], '500px', '400px');

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

    const typeSelection = createSelection(arr, 'type');
    typeSelection.style.width = '150px';

    typeDiv.appendChild(typeSpan);
    typeDiv.appendChild(typeSelection);

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

        if(s && e && t){
            let startTime = 0;
            for(let i = 0; i < parent.childNodes.length; i++){
                const data = parent.childNodes[i].getAttribute('data');
    
                if(i == document.getElementById('start-time').value){
                    break;
                }
    
                startTime += Number(data);
            }
    
            const endTime = Number(document.getElementById('end-time').value);
            
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
                newTime.style.background = arr[document.getElementById('type').value][1];
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
    
            document.getElementById('start-time').value = '';
            document.getElementById('end-time').value = '';
            document.getElementById('type').value = '';
            document.getElementById('contents').value = '';
    
            timeModal.classList.add('hide');
        }
    });

    timeModalButtons[1].addEventListener('click', () => {
        document.getElementById('start-time').value = '';
        document.getElementById('end-time').value = '';
        document.getElementById('type').value = '';
        document.getElementById('contents').value = '';

        timeModal.classList.add('hide');
    }); 
    
    return timeModal;
}