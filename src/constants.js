const dayOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const oneDay = 24 * 60 * 60 * 1000;
const getInitData = () => {
    const weekArr = [];
    
    for(let day = 0; day < 7; day++){
        const dayArr = [];

        for(let hour = 0; hour < 24; hour++){
            dayArr.push({type : 0, contents : '', id : 0});
        }

        weekArr.push(dayArr);
    }

    return weekArr;
}

const getInitTypes = () => {
    return [['기본', '#ebedf0', 1], ['공부', '#9be9a8', 1], ['게임', '#87CEFA', 1], ['운동', '#BA55D3', 1]];
}

const SETTINGS_BUTTON = './src/images/grey-settings-button.png';
const SETTINGS_PLUS_BUTTON = './src/images/grey-plus-button3.png';
const SETTINGS_REMOVE_BUTTON = './src/images/grey-remove-button3.png';
