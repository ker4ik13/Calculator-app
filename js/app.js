let orangeButtons = document.querySelectorAll('.orange__button'),
    controlButton = document.querySelector('.control__button'),
    number = document.querySelector('.number'),
    calcButton = document.querySelector('.calc__button'),
    numbers = document.querySelectorAll('.number'),
    resultField = document.getElementById('result__field'),
    resultFieldValue = resultField.value,
    a = '',
    b = '',
    sign = '',
    finish = false,
    container = document.querySelector('.container'),
    zero = document.getElementById('zero');

const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const action = ['+', '–', '÷', 'x'];


/* Clear */
function clearAll(){
    a = '';
    b = '';
    sign = '';
    finish = false;
    resultField.innerHTML = '0';
    for(let i = 0; i < container.children.length; i++){
        container.children[i].classList.remove('active');
    }
}
clear.addEventListener('click', () => {
    clearAll();
})


resultField.addEventListener('click', () => {
    if(a !== '' && b === ''){
        a = a.slice(0, -1);
        resultField.innerHTML = a;
        console.log(a);
    }
    if(b !== '' && a !== ''){
        b = b.slice(0, -1);
        resultField.innerHTML = b;
        console.log(a);
    }
})


container.addEventListener('click', (event) => {
    const key = event.target.textContent;

    

    if(!event.target.classList.contains('calc__button')) return;
    if(event.target.classList.contains('clear')) return;

    /* Если нажаты 0-9 или . */
    if(digit.includes(key)){
        if(key === '0' && (a === '' || a === '0') && b === ''){
            resultField.innerHTML = '0';
        } else if(b === '' && sign === ''){
            a+=key;
            resultField.innerHTML = a;
            
            // Удаление класса orange buttons
            for(let i = 0; i < container.children.length; i++){
                container.children[i].classList.remove('active');
            }
            event.target.classList.add('active');
        } else if (a!== '' && b!== '' && finish){
            b = key;
            finish = false;
            resultField.innerHTML = b;
        } else if((a === '' || a === '0') && b === ''){
            resultField.innerHTML = '0';
        } else {
            b += key;
            resultField.innerHTML = b;
        }
        return;
    }
        // Если нажаты + - / *
     if(action.includes(key)){
        sign = key;
        resultField.innerHTML = a;

        for(let i = 0; i < container.children.length; i++){
            container.children[i].classList.remove('active');
        }
        event.target.classList.add('active');
        if(a !== '' && b !== '' && sign !== ''){
            sign = key;
            resultField.innerHTML = a;
        }
        return;
    }  
    // Равно

    if(key === '═'){
        if(b==='') b = a;
        switch(sign){
            case '+':
                a = (+a) + (+b);
                break;
            case '–':
                a = (a - b);
                break;
            case '÷':
                if(b==='0'){
                    resultField.innerHTML = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                } 
                a = (a / b);
                break;
            case 'x':
                a = (a * b);
                break;
        }
        for(let i = 0; i < container.children.length; i++){
            container.children[i].classList.remove('active');
        }
        finish = true;
        resultField.innerHTML = a;
    }

    if(key === '%'){
        if(b === ''){
            a = a / 100;
        }
       if(b !== ''){
        b = (b / 100)
        b = b * b;
        a = a + b;
       }
    }
    finish = true;
    resultField.innerHTML = a;
})


