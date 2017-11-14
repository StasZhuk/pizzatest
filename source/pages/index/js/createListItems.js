// функция создание списка сотрудников из массива объектов
export default function createListPeople(data, container) {
    container.innerHTML = '';

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
                        <span class="btn-remove" data-id="${item.id}"><i class="fa fa-close"></i></span>`

        container.appendChild(li);
    });
}