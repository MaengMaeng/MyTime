const initTimeModal = (arr) => {
    const [timeModal, timeModalBody, timeModalButtons] = createModal('일정 추가', ['확인', '수정', '취소'], '500px', '400px');
    timeModal.id = 'time-modal';

    timeModalButtons[0].classList.add('hide');
    timeModalButtons[1].classList.add('hide');

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
        timeModalButtons[0].classList.add('hide');

        const s = document.getElementById('start-time').value;
        const e = document.getElementById('end-time').value;
        const t = document.getElementById('type').value;
        const c = document.getElementById('contents').value;

        if(s && e && t){
            const startTime = Number(s);
            const endTime = Number(e);
            
            if(endTime && endTime > startTime && endTime <= 24){
                
                let currentDay = data[parent.getAttribute('data') * 1];
                for(let i = startTime; i < endTime; i++){
                    currentDay[i] = {type: t, contents: c, id: `${t}.${s}`};
                }
                
                console.log(currentDay);
                parent.innerHTML = '';

                let currentStartTime = 0, currentEndTime = 1, currentType = currentDay[0].type, currentId = currentDay[0].id;
                for(let i = 0; i < 24; i++){
                    if(i < 23){
                        if(currentDay[i + 1].type == 0 || currentId != currentDay[i + 1].id){
                            if(currentType == 0){
                                const newTime = createElement('div', ['time']);
                                newTime.addEventListener('click', (event) => {
                                    document.getElementById('start-time').value = i;
                                    parent = event.target.parentNode;
                        
                                    timeModalButtons[0].classList.remove('hide');
                                    timeModal.classList.remove('hide');
                                });

                                parent.appendChild(newTime);
                            }
                            else{
                                const newTime = createElement('div', ['time', 'checked']);
                                newTime.style.background = arr[currentType][1];
                                console.log(i, currentStartTime, currentEndTime);
                                newTime.style.width = `${16*(currentEndTime-currentStartTime) + 6*(currentEndTime-currentStartTime-1)}px`;

                                newTime.addEventListener('click', (event) => {
                                    timeModalButtons[1].classList.remove('hide');
                                    document.getElementById('time-modal').classList.remove('hide');
                                    document.getElementById('start-time').value = s;
                                    document.getElementById('end-time').value = e;
                                    document.getElementById('type').value = t;
                                    document.getElementById('contents').value = c;
                                });

                                parent.appendChild(newTime);
                            }

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
                        if(currentType == 0){
                            const newTime = createElement('div', ['time']);
                            newTime.addEventListener('click', (event) => {
                                document.getElementById('start-time').value = i;
                                parent = event.target.parentNode;
                    
                                timeModalButtons[0].classList.remove('hide');
                                timeModal.classList.remove('hide');

                            });
                            parent.appendChild(newTime);
                        }
                        else{
                            const newTime = createElement('div', ['time', 'checked']);
                            newTime.style.background = arr[currentType][1];
                            newTime.style.width = `${16*(currentEndTime-currentStartTime) + 6*(currentEndTime-currentStartTime-1)}px`;

                            newTime.addEventListener('click', (event) => {
                                timeModalButtons[1].classList.remove('hide');
                                document.getElementById('time-modal').classList.remove('hide');
                                document.getElementById('start-time').value = s;
                                document.getElementById('end-time').value = e;
                                document.getElementById('type').value = t;
                            });

                            parent.appendChild(newTime);
                        }
                    }
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
        timeModalButtons[1].classList.add('hide');
    });

    timeModalButtons[2].addEventListener('click', () => {
        document.getElementById('start-time').value = '';
        document.getElementById('end-time').value = '';
        document.getElementById('type').value = '';
        document.getElementById('contents').value = '';

        timeModalButtons[0].classList.add('hide');
        timeModalButtons[1].classList.add('hide');
        timeModal.classList.add('hide');
    }); 
    
    return {timeModal, timeModalButtons};
}