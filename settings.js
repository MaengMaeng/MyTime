const initSettingsModal = (arr) => {
    const [settingsModal, settingsModalBody, settingsModalButtons] = createModal('설정', ['확인', '취소'], '400px', '300px');

    const bodyContainer = createElement('div', 'settings-body-container');

    for(let i = 0; i < arr.length; i++){
        const bodyElement = createElement('div', 'settings-body-element');
        
        const bodyBox = createElement('div', 'settings-body-box');
        bodyBox.style.backgroundColor = arr[i][1];
        
        const bodyBoxTextContainer = createElement('div', 'settings-body-box-text-container');

        const bodyBoxText = createElement('span', 'settings-body-box-text',arr[i][0]);

        bodyBoxTextContainer.appendChild(bodyBoxText);

        bodyElement.appendChild(bodyBox);
        bodyElement.appendChild(bodyBoxTextContainer);

        if(i !== 0){
            const removeButton = createElement('button', 'settings-remove-button', '<img src="./images/black-remove-button.png" />');

            bodyElement.appendChild(removeButton);
        }

        bodyContainer.appendChild(bodyElement);
    }
    
    const bodyPlusContainer = createElement('div', 'settings-body-plus-container');
    const bodyPlusImage = createElement('div', 'settings-plus-button', '<img src="./images/black-plus-button.jpg" />');
    const bodyPlusTextContainer = createElement('div', 'settings-plus-button-text-container');
    const bodyPlusText = createElement('span', 'settings-plus-button-text', '추가하기');

    bodyPlusTextContainer.appendChild(bodyPlusText);
    
    bodyPlusContainer.appendChild(bodyPlusImage);
    bodyPlusContainer.appendChild(bodyPlusTextContainer);

    bodyContainer.appendChild(bodyPlusContainer);

    settingsModalBody.appendChild(bodyContainer);


    settingsModalButtons[0].addEventListener('click', () => {settingsModal.classList.add('hide');});
    settingsModalButtons[1].addEventListener('click', () => {settingsModal.classList.add('hide');}); 
    
    return settingsModal;
}