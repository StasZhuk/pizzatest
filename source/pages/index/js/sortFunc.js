// функция копирования массива
function cloneArr(arr) {
    var newArr = [];

    arr.forEach((item) => {
        newArr.push(item);
    });

    return newArr;
}

// функция сортировки массива по имени
function sortByName(a, b) {
    if (a.name > b.name)
        return 1;
    else if (a.name < b.name)
        return -1;

    return 0;
}

// функция сортировки массива по дате
function sortByData(a, b) {
    a = dataParse(a.birthday);
    b = dataParse(b.birthday);

    if (a > b)
        return 1;
    else if (a < b)
        return -1;

    return 0;
}

// функция парсит дату
function dataParse(data) {
    return Date.parse(data.split('.').reverse().join('-'))
}

// фенкция сортировки по параметрам имя или дата
function sortByProperty(propSort, propUnsort, funcSort, sortArr) {
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

export {dataParse, sortByData, sortByName, cloneArr, sortByProperty}