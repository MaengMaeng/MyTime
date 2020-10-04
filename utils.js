const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if(className){
        if(Array.isArray(className)){
            for(let i = 0; i < className.length; i++){
                element.classList.add(className[i]);
            }
        }
        else{
            element.classList.add(className);
        }
    } 
    if(text) {
        if(tagName === 'span') element.innerText = text;
        else element.innerHTML = text;
    }

    return element;
}

const prefix = (str) => str.length === 1 ? `0${str}` : str;

const getWeek = (date = new Date()) => {
    date.setDate(date.getDate() - date.getDay());

    const result = [];
    result.push(`${prefix(date.getMonth() + 1)}.${prefix(date.getDate())}`)

    for(let i = 0; i < 6; i++){
        date.setTime(date.getTime() + oneDay);
        result.push(`${prefix(date.getMonth() + 1)}.${prefix(date.getDate())}`)
    }

    return result;
}