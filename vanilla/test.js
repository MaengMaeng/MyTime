/**
 * 나쁜 예
 */
function test1() {
    let temp = 0;
    for(let i = 1; i <= 10; i++){
        temp += i;
    }

    console.log(temp);
}


/**
 * 좋은 예
 */
function sumOneToTen() {
    let result = 0;
    for(let num = 1; num <= 10; num++){
        result += num;
    }
    
    return result;
}