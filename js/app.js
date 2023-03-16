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
        if(a === '' && b === '') {
            a = '0';
            resultField.innerHTML = '0';
        }
    }
    if(b !== '' && a !== ''){
        b = b.slice(0, -1);
        resultField.innerHTML = b;
        if(a !== '' && b === '') {
            b = '0';
            resultField.innerHTML = '0';
        }
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
            a += key;
            resultField.innerHTML = a;
            // Удаление класса orange buttons
            for(let i = 0; i < container.children.length; i++){
                container.children[i].classList.remove('active');
            }
            event.target.classList.add('active');
        } else if (a!== '' && b!== '' && finish){
            b += key;
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
        if(a === '' || a === '0'){
            resultField.innerHTML = '0';
        } else if(a !== ''){
            resultField.innerHTML = a;
        }
            // Вычисления +
        if(sign === '+'){
            if(a !=='' && b === ''){
                resultField.innerHTML = a;
                a = Number(a);
            } else if(a !=='' && b !== ''){
                a = Number(a) + Number(b);
                resultField.innerHTML = a;
            } else if(a !=='' && b !== '' && finish){
                b = '';
                a = Number(a) + Number(b);
                resultField.innerHTML = a;
                finish = true;
            } 
        b = '';
        finish = true;
        }
        
            // Вычисления -
        if(sign === '–'){
            if(a !=='' && b === ''){
                resultField.innerHTML = a;
                a = Number(a);
            } else if(a !=='' && b !== ''){
                a = Number(a) - Number(b);
                resultField.innerHTML = a;
                b = '';
                finish = true;
            } else if(a !=='' && b !== '' && finish){
                b = '';
                a = Number(a) - Number(b);
                resultField.innerHTML = a;
                finish = true;
            } 
        b = '';
        finish = true;
        }
        
            // Вычисления x
        if(sign === 'x'){
            if(a !=='' && b === ''){
                resultField.innerHTML = a;
                a = Number(a);
            } else if(a !=='' && b !== ''){
                a = Number(a) * Number(b);
                resultField.innerHTML = a;
                b = '';
                finish = true;
            } else if(a !=='' && b !== '' && finish){
                b = '';
                a = Number(a) * Number(b);
                resultField.innerHTML = a;
                finish = true;
            }
        b = '';
        finish = true;
        }

            // Вычисления /
        if(sign === '÷'){
            for(let i = 0; i < container.children.length; i++){
                container.children[i].classList.remove('active');
            }
            event.target.classList.add('active');
            if(a !=='' && b === ''){
                resultField.innerHTML = a;
                a = Number(a);
            } else if(a !=='' && b !== ''){
                a = Number(a) / Number(b);
                resultField.innerHTML = a;
                b = '';
            } else if(a !=='' && b !== '' && finish){
                b = '';
                a = Number(a) / Number(b);
                resultField.innerHTML = a;
                finish = true;
            }
        b = '';
        finish = true;
        }
        

        for(let i = 0; i < container.children.length; i++){
            container.children[i].classList.remove('active');
        }
        event.target.classList.add('active');
        if(a !== '' && b !== '' && sign !== ''){
            sign = key;
            resultField.innerHTML = a;
        }
        console.log(a, b, sign);
        return;
    }  
     
    // Равно
    if(key === '═'){
        if(a === '' || a === '0'){
            resultField.innerHTML = '0';
        } else if(b ==='') b = a;
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


