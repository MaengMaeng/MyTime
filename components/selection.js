const resetSelection = () => {
    document.getElementById('default-div').innerHTML = '<span>분류를 선택해주세요.</span>';
    document.getElementById('type').value = '';

    let options = document.getElementById('type-selection').getElementsByClassName('option');
    for(let i = 0; i < options.length; i++){
        options[i].classList.remove('selected');
    }
}

const selectSelection = (type) => {
    if(type){
        let options = document.getElementById('type-selection').getElementsByClassName('option');
    
        document.getElementById('type').value = type;
        for(let i = 0; i < options.length; i++){
            if(options[i].getAttribute('data') == type){
                document.getElementById('default-div').innerHTML = options[i].innerHTML;
                options[i].classList.add('selected');
                break;
            }
        }
    }
}

const createSelection = (arr, id) => {
    const selectionDiv = createElement('div', 'selection');

    const selectionInput = createElement('input', 'selection-input');
    selectionInput.type = 'hidden';
    selectionInput.id = id;

    const selectedDiv = createElement('div', 'selected-div');

    const defaultDiv = createElement('div', 'default-div', '<span>분류를 선택해주세요.</span>');
    defaultDiv.id = 'default-div';

    const selectionImg = createElement('img', 'selection-img');
    selectionImg.src = '../images/black-down-button.png'

    selectedDiv.addEventListener('click', (event) => {
        for(let i = 0; i < options.length; i++){
            options[i].classList.toggle('hide');
        }
    });

    document.getElementsByTagName('body')[0].addEventListener('click', (event) => {
        if(event.target != selectedDiv){
            for(let i = 0; i < options.length; i++){
                options[i].classList.add('hide');
            }   
        }
    });

    selectedDiv.appendChild(defaultDiv);
    selectedDiv.appendChild(selectionImg);

    const menuDiv = createElement('div', 'menu-div');
    const options = [];
    for(let i = 1; i < arr.length; i++){
        if(arr[i][2]){
            const option = createElement('div', 'option');
            options.push(option);
            option.classList.add('hide');
            option.setAttribute('data', i);

            const optionBox = createElement('div', 'option-box');
            optionBox.style.backgroundColor = arr[i][1];
            
            const optionSpanDiv = createElement('div', 'option-span-div');
            const optionSpan = createElement('span', 'option-span',arr[i][0]);
    
            optionSpanDiv.appendChild(optionSpan);
    
            option.appendChild(optionBox);
            option.appendChild(optionSpanDiv);
    
            option.addEventListener('click', (event) => {
                if(defaultDiv.innerHTML != option){
                    defaultDiv.innerHTML = option.innerHTML;
                    selectionInput.value = i;
    
                    for(let i = 0; i < options.length; i++){
                        options[i].classList.remove('selected');
                    }
                    option.classList.add('selected');
                }
            })
    
            menuDiv.appendChild(option);
        }
    }

    selectionDiv.appendChild(selectionInput);
    selectionDiv.appendChild(selectedDiv);

    selectionDiv.appendChild(menuDiv);


    return selectionDiv;
}