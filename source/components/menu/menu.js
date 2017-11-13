export default function () {
    var form = document.createElement("FORM");
    form.className = 'form';
    form.id = 'form-create';
    form.innerHTML =   `<h3 class="form__heading"></h3>
                        <label><span>Имя:</span>
                        <input type="text" name="name" placeholder="Иван Иванов" class="form-control"/>
                        </label>
                        <label><span>Телефон:</span>
                            <input id="input-phone" type="text" name="phone" placeholder="+7 (999) 999 9999" class="form-control"/>
                        </label>
                        <label><span>Дата рождения:</span>
                            <input id="input-data" type="text" name="data" placeholder="12.12.1999" class="form-control"/>
                        </label>
                        <select id="select-create" class="form-control form__select">
                            <option value="cook" selected="selected">Повар</option>
                            <option value="waiter">Оффициант</option>
                            <option value="driver">Водитель</option>
                        </select>
                        <div class="form__status"><span>Статус: </span>
                            <label class="form-check-label">
                            <input id="checkbox-create" type="checkbox" name="check-create" class="form-check-input"/><span>в архиве</span>
                            </label>
                        </div>
                        <div class="btn-wrap text-right">
                            <button type="button" id="" class="btn btn-success">Сохранить</button>
                        </div>`
        
    return form;
};