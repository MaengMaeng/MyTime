const initSettingsModal = () => {
    const [settingsModal, settingsModalBody, settingsModalButtons] = createModal('설정', ['확인', '취소'], '400px', '300px');
    settingsModalBody.id = 'settings-modal-body';

    settingsModalButtons[0].addEventListener('click', () => {settingsModal.classList.add('hide');});
    settingsModalButtons[1].addEventListener('click', () => {settingsModal.classList.add('hide');}); 
    
    return settingsModal;
}