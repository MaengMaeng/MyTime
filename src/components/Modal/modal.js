const createModal = (headerText, buttonTexts, width, height) => {
    const modalContainer = createElement('div', 'modal-container');
    modalContainer.classList.add('hide');
    
    const modalBackground = createElement('div', 'modal-background');
    const modalContents = createElement('div', 'modal-contents');

    modalContents.style.width = `${width}`;
    modalContents.style.height = `${height}`;
    
    const modalHeader = createElement('div', 'modal-header');
    const modalHeaderTextContainer = createElement('div', 'modal-header-text-container');
    const modalHeaderText = createElement('span', 'modal-header-text');
    modalHeaderText.innerText = headerText;

    modalHeaderTextContainer.appendChild(modalHeaderText);
    modalHeader.appendChild(modalHeaderTextContainer);

    const modalBody = createElement('div', 'modal-body');
    
    const modalFooter = createElement('div', 'modal-footer');
    
    const modalButtons = [];
    for(let i = 0; i < buttonTexts.length; i++){
        const buttonContainer = createElement('div', 'modal-button-container');
        const button = createElement('button', 'modal-button');
        button.innerText = buttonTexts[i];

        buttonContainer.appendChild(button);
        modalFooter.appendChild(buttonContainer);

        modalButtons.push(button);
    }

    modalContents.appendChild(modalHeader);
    modalContents.appendChild(modalBody);
    modalContents.appendChild(modalFooter);

    modalContainer.appendChild(modalBackground);
    modalContainer.appendChild(modalContents);

    return [modalContainer,  modalBody, modalButtons, modalHeaderText];
}