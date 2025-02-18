/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button')

/*-------------------------------- Variables --------------------------------*/
let num1 = '';
let num2 = '';
let operator = '';

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector('.display')

/*----------------------------- display -----------------------------*/
display.innerText = '0';

/*----------------------------- Event Listeners -----------------------------*/
// for all buttons
buttons.forEach((button) => {
    button.addEventListener('click', (event) =>{
    const value = event.target.innerText;

    if(event.target.classList.contains('number')){
        if(!operator){
            num1 += value;
        }else{
            num2 += value;
        }
        //append to the display
        updateDisplay(num1 + (operator || '') + (num2 || ''));

    } else if (event.target.classList.contains('operator')){
        
        if (value === 'C'){ 
            //reset calc
            resetCalc();
        } else if ( num1 && !num2 ){
            //only num1 exist then it is operator
            operator = value;
            updateDisplay(num1 + operator)
        } else if( num1 && num2 ){
            result = calculate(Number(num1), Number(num2), operator);
            num1 = result.toString();
            num2 = '';
            operator = value;
            updateDisplay(num1 + operator);
        }
    } else if (event.target.classList.contains('equals')){
        result = calculate(Number(num1), Number(num2), operator);
        updateDisplay(result);
        num1 = result.toString();
        num2 = '';
        operator = '';
    }
});
});

/*-------------------------------- Functions --------------------------------*/
//calculate
const calculate = (num1, num2, operator) => {
    switch(operator){
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'Err'; // Avoid division by zero
        default: return '';
    }
};
//display
function updateDisplay(value){
    display.innerText = value;
};
//reset
function resetCalc(){
    num1 = '';
    num2 = '';
    operator = '';
    result = '';
    updateDisplay('0');
};
