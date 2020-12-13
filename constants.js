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