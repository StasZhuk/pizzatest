// валидация формы
function validate(name, phone, birthday) {
    var flag = 0;
    if (name.value == '') {
        flag = -1;
        console.warn('невернор указано имя');
        createWarning(name);
    }

    if (phone.value.length != 17) {
        flag = -1;
        console.warn('невернор указано телефон');
        createWarning(phone);
    }

    if (birthday.value.length != 10) {
        flag = -1;
        console.warn('невернор указана дата');
        createWarning(birthday);
    }

    if (flag < 0) return false

    return true;
}

// Создание подсказок для инпутов
function createWarning(elem) {
    var span = document.createElement('SPAN');

    span.innerHTML = 'неверно заполнено поле';
    span.classList.add('warning');

    elem.parentElement.appendChild(span);
    elem.classList.add('wrong-input');

    setTimeout(() => {
        elem.parentElement.removeChild(span);
        elem.classList.remove('wrong-input');
    }, 3000);
}

export {validate, createWarning}