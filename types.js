const initTypesModal = () => {
    const [typesModal, typesModalBody, typesModalButtons, typesModalHeaderText] = createModal('분류 추가', ['확인', '수정', '취소'], '500px', '400px');
    typesModal.id = 'types-modal';

    typesModalButtons[0].classList.add('hide');
    typesModalButtons[1].classList.add('hide');
    
    const typesNameContainer = createElement('div', 'types-name-container');

    const typesNameSpanContainer = createElement('div', 'types-name-span-container');
    const typesNameSpan = createElement('span', 'types-name-span', '이름 : ');

    typesNameSpanContainer.appendChild(typesNameSpan);

    const typesNameInputContainer = createElement('div', 'types-name-input-container');
    const typesNameInput = createElement('input', 'types-name-input');
    typesNameInput.id = 'typeName';

    typesNameInputContainer.appendChild(typesNameInput);

    typesNameContainer.appendChild(typesNameSpanContainer);
    typesNameContainer.appendChild(typesNameInputContainer);

    const typesColorContainer = createElement('div', 'types-color-container');

    const typesColorSpanContainer = createElement('div', 'types-color-span-container');
    const typesColorSpan = createElement('span', 'types-color-span', '색 : ');

    typesColorSpanContainer.appendChild(typesColorSpan);

    const typesColorInputContainer = createElement('div', 'types-color-input-container');
    const typesColorInput = createElement('input', ['inp', 'types-color-input']);
    typesColorInput.id = 'colorPicker';

    const typesColorPalette = createElement('div', 'palette');
    typesColorPalette.id = 'colorPalette';

    typesColorInputContainer.appendChild(typesColorInput);
    typesColorInputContainer.appendChild(typesColorPalette);
    
    typesColorContainer.appendChild(typesColorSpanContainer);
    typesColorContainer.appendChild(typesColorInputContainer);

    typesModalBody.appendChild(typesNameContainer);
    typesModalBody.appendChild(typesColorContainer);
        
    typesModalButtons[0].addEventListener('click', () => {
        let name = document.getElementById('typeName').value;
        let color = document.getElementById('colorPicker').value;
        types.push([name, color, 1]);
    
        setTypes();
        
        document.getElementById('type-selection').innerHTML = '';
        document.getElementById('type-selection').appendChild(createSelection(types, 'type'));
        
        drawTypes();
        drawFooterTypes();

        elements.typesModal.classList.add('hide');
    });

    typesModalButtons[1].addEventListener('click', () => {
        let name = document.getElementById('typeName').value;
        let color = document.getElementById('colorPicker').value;
        types[selectedType] = [name, color, 1];
    
        setTypes();
        
        document.getElementById('type-selection').innerHTML = '';
        document.getElementById('type-selection').appendChild(createSelection(types, 'type'));
        
        drawBox();
        drawTypes();
        drawFooterTypes();

        elements.typesModal.classList.add('hide');
    });

    typesModalButtons[2].addEventListener('click', () => {
        typesModalButtons[0].classList.add('hide');
        typesModalButtons[1].classList.add('hide');
        typesModal.classList.add('hide');
    }); 
    
    return {typesModal, typesModalButtons, typesModalHeaderText};
}