import './index.scss';
import 'normalize.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import list from './employees.json';
import {dataParse, sortByData, sortByName, cloneArr} from './sortFunc';
import { mask, setCursorPosition} from './maskInput';
import Card from './cardPeople';

    // Элементы управения
let appCont = document.getElementById('list-persons'),
    btnName = document.getElementById('sort-name'),
    btnBirth = document.getElementById('sort-birthday'),
    btnReset = document.getElementById('reset'),
    checkbox = document.getElementById('checkbox'),
    select = document.getElementById('select'),
    sortArr = [],
    activeItem,

    // Элементы попап Формы
    formWrap = document.querySelector('.form-wrap'),
    nameInput = formWrap.querySelector('[name="name"]'),
    phoneInput = formWrap.querySelector('[name="phone"]'),
    dataInput = formWrap.querySelector('[name="data"]'),
    selectInput = document.getElementById('select-create'),
    checkboxInput = document.getElementById('checkbox-create'),
    
    btnSave = formWrap.querySelector('.btn-success'),
    btnCreate = document.getElementById('create');

window.addEventListener("DOMContentLoaded", function () {
    // создаем список
    createListPeople(list);

    // клонируем массив
    sortArr = cloneArr(list);

    // кнопка сортировки по имени
    btnName.addEventListener('click', () => {
        sortByProperty(btnName, btnBirth, sortByName);

        createListPeople(sortArr);
    });

    // кнопка сортировки по дате
    btnBirth.addEventListener('click', () => {
        sortByProperty(btnBirth, btnName, sortByData);

        createListPeople(sortArr);
    });

    // кнопка сброса всех параметров
    btnReset.addEventListener('click', () => {
        resetAll();

        createListPeople(list);
    });

    // сортировка чекбокс
    checkbox.addEventListener('change', () => {
        reCheck(list);
        reSelect(sortArr);
        reSort();

        createListPeople(sortArr);
    });

    // сортировка выпадающий список
    select.addEventListener('change', () => {
        reSelect(list);
        reCheck(sortArr);
        reSort();

        createListPeople(sortArr);
    });


    // удаление карточки
    appCont.addEventListener('click', e => {
        var target = e.target;
        
        if (target.classList.contains('btn-close')) {
            var id = target.getAttribute('data-id');

            list.splice(id - 1, 1);

            list.map((item, i) => {
                return item.id = i + 1;
            });

            reSelect(list);
            reCheck(sortArr);
            reSort();

            createListPeople(sortArr);
        }
    }, false);

    // Попап формы редактирования и создания карточек
    document.body.addEventListener('click', (e) => {
        var target = e.target;

        // клик по карточке
        if (target.tagName === "LI" || target.id === "create") {
            var title = formWrap.querySelector('h3'),
                btn = formWrap.querySelector('.btn-success'),
                index = target.dataset.indexList,
                card = list[index];

            if (!formWrap.classList.contains('active')) formWrap.classList.add('active');

            // если клик по карточке создаем попап для редоктирования
            if (target.tagName === "LI") {
                title.innerHTML = "Редактирование карточки";
                btn.innerHTML = "Сохранить";
                btn.id = 'change';

                formWrap.children[0].setAttribute('data-index-card', index);

                nameInput.value = card.name;
                phoneInput.value = card.phone;
                dataInput.value = card.birthday;

                for (var i = 0; i < selectInput.options.length; i++) {
                    if (selectInput.options[i].value === card.role) selectInput.options[i].selected = true;
                }

                if (card.isArchive === true) checkboxInput.checked = true;

            } else {  // если клик по кнопке СОЗДАТЬ, создаем попап для новой карточки                
                title.innerHTML = "Создание карточки";
                btn.innerHTML = "Создать";
                btn.id = 'create-card';

                nameInput.value = '';
                phoneInput.value = '';
                dataInput.value = '';
                selectInput.options[0].selected = true;
                checkboxInput.checked = false;
            }
        }

        if (target.classList.contains('form-wrap')) formWrap.classList.remove('active');
    });

    btnSave.addEventListener('click', (e) => {
        var target = e.target,
            index = target.parentElement.parentElement.dataset.indexCard,
            card = list[index];

        if (btnSave.id == 'change') {

            if (validate(nameInput, phoneInput, dataInput)) {
                card.name = nameInput.value;
                card.phone = phoneInput.value;
                card.birthday = dataInput.value;
                card.isArchive = checkboxInput.checked;

                for (var i = 0; i < selectInput.options.length; i++) {
                    if (selectInput.options[i].selected == true) card.role = selectInput.options[i].value;
                }

                formWrap.classList.remove('active');

                console.log('карточка отредактирована');

                reCheck(list);
                reSelect(sortArr);
                reSort();

                createListPeople(sortArr);
            }
        } else if (btnSave.id === 'create-card') {

            for (var i = 0; i < selectInput.options.length; i++) {
                if (selectInput.options[i].selected === true) {
                    var activeSelect = selectInput.options[i];
                }
            }
            console.log(list.length);
            if (validate(nameInput, phoneInput, dataInput)) {
                var newCard = new Card(nameInput.value, activeSelect.value, phoneInput.value, dataInput.value, checkboxInput.checked, list.length + 1);

                list.push(newCard);

                console.log('новая карточка создана');
                formWrap.classList.remove('active');                

                reCheck(list);
                reSelect(sortArr);
                reSort();

                createListPeople(sortArr);
            }
        }
    });

    btnCreate.addEventListener('click', e => {
        var title = formWrap.querySelector('h3'),
            btn = formWrap.querySelector('.btn-success');

        title.innerHTML = "Создание карточки";
        btn.innerHTML = "Создать";
        btn.id = 'create';
    });

    // события маски ипута телефон
    phoneInput.addEventListener("input", mask, false);
    phoneInput.addEventListener("focus", mask, false);
    phoneInput.addEventListener("blur", mask, false);

    // события маски ипута дата рождения
    dataInput.addEventListener("input", mask, false);
    dataInput.addEventListener("focus", mask, false);
    dataInput.addEventListener("blur", mask, false);
});

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

// функция создание списка сотрудников из массива объектов
function createListPeople(data) {
    appCont.innerHTML = '';

    data.forEach(item => {
        let role,
            li = document.createElement('LI');

        if (item.role === "driver") role = 'Водитель';
        else if (item.role === "waiter") role = 'Оффициант';
        else role = 'Повар';

        li.classList.add('list-item');
        li.setAttribute('data-index-list', item.id - 1);
        li.innerHTML = `<span>Сотрудник: ${item.name}</span>
                        <span>Должность: ${role}</span>
                        <span>Телефон: ${item.phone}</span>
                        <span class="btn-close" data-id="${item.id}"><i class="fa fa-close"></i></span>`

        appCont.appendChild(li);
    });
}

// функция пересортировки
function reSort() {
    if (btnName.getAttribute('data-sort') == 'forward')
        sortArr.sort(sortByName);
    else if (btnName.getAttribute('data-sort') == 'reverse')
        sortArr.sort(sortByName).reverse();

    if (btnBirth.getAttribute('data-sort') == 'forward')
        sortArr.sort(sortByData);
    else if (btnBirth.getAttribute('data-sort') == 'reverse')
        sortArr.sort(sortByData).reverse();
}

// функция создания массива объектов чекбокса
function reCheck(arr) {
    if (checkbox.checked)
        sortArr = arr.filter(item => item.isArchive);
    else
        sortArr = cloneArr(arr);
}

// функция создания массива объектов выпадающего списка
function reSelect(arr) {
    let activeOpt;

    for (let i = 0; i < select.options.length; i++) {
        var option = select.options[i];

        if (option.selected)
            activeOpt = option.value;
    }

    if (activeOpt != 'all')
        sortArr = arr.filter(item => item.role == activeOpt);
    else
        sortArr = cloneArr(arr);
}

// Сброс всех параметров
function resetAll() {
    btnName.setAttribute('data-sort', false);
    btnBirth.setAttribute('data-sort', false);
    checkbox.checked = false;
    select.options[0].selected = true;
}

// фенкция сортировки по параметрам имя или дата
function sortByProperty(propSort, propUnsort, funcSort) {
    if (propSort.getAttribute('data-sort') === 'false') {
        propUnsort.setAttribute('data-sort', false);
        propSort.setAttribute('data-sort', 'forward');

        sortArr.sort(funcSort);
    } else {
        sortArr.reverse();

        if (propSort.getAttribute('data-sort') === "reverse")
            propSort.setAttribute('data-sort', 'forward');
        else
            propSort.setAttribute('data-sort', 'reverse');
    }
}