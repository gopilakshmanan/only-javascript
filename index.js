//attach bootstrap & font awesome
const bootstrapStyle = document.createElement('link');
bootstrapStyle.rel = 'stylesheet';
bootstrapStyle.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css';
bootstrapStyle.integrity = "sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2";
bootstrapStyle.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(bootstrapStyle);

const fontAwesomeStyle = document.createElement('link');
fontAwesomeStyle.rel = 'stylesheet';
fontAwesomeStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
document.head.appendChild(fontAwesomeStyle);

const bootstrapJq = document.createElement('script');
bootstrapJq.setAttribute('src','https://code.jquery.com/jquery-3.5.1.slim.min.js');
bootstrapJq.integrity = "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj";
bootstrapJq.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(bootstrapJq);

const bootstrapJs = document.createElement('script');
bootstrapJs.setAttribute('src','https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js');
bootstrapJs.integrity = "sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx";
bootstrapJs.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(bootstrapJs);

//build the form with events
const listGroup = document.createElement('div');
listGroup.className = 'list-group'

const listContainer = document.createElement('div');
listContainer.className = 'col-md'
listContainer.innerHTML = '<h2>TODO List</h2>'
listContainer.appendChild(listGroup)

const titleLabel = document.createElement('label')
titleLabel.innerText = 'Title'
titleLabel.setAttribute('for', 'titleInput')

const titleInput = document.createElement('input')
titleInput.type = 'text'
titleInput.className = 'form-control'
titleInput.placeholder = 'Enter task title'
titleInput.id = 'titleInput'

const titleGroup = document.createElement('div')
titleGroup.className = 'form-group'
titleGroup.appendChild(titleLabel)
titleGroup.appendChild(titleInput)

const descriptionLabel = document.createElement('label')
descriptionLabel.innerText = 'Description'
descriptionLabel.setAttribute('for', 'descriptionInput')

const descriptionInput = document.createElement('textarea')
descriptionInput.type = 'text'
descriptionInput.className = 'form-control'
descriptionInput.rows = 3
descriptionInput.id = 'descriptionInput'

const descriptionGroup = document.createElement('div')
descriptionGroup.className = 'form-group'
descriptionGroup.appendChild(descriptionLabel)
descriptionGroup.appendChild(descriptionInput)

const btnSave = document.createElement('button');
btnSave.className = 'btn btn-info';
btnSave.style = 'margin-right: 3px;'
btnSave.innerHTML = '<i class="fa fa-save"></i>';
btnSave.addEventListener('click', event => {
    event.preventDefault();
    if (modifingKey == -1) {
        todoList.push({
            title: titleInput.value,
            detail: descriptionInput.value
        });
    } else {
        todoList[modifingKey].title = titleInput.value;
        todoList[modifingKey].detail = descriptionInput.value;
        addEditH2.innerHTML = 'Add TODO'
        modifingKey = -1;
    }
    localStorage.setItem('items', JSON.stringify(todoList))
    resetFrom();
    displayList();
});

const form = document.createElement('form')
form.appendChild(titleGroup)
form.appendChild(descriptionGroup)
form.appendChild(btnSave)

const addEditH2 = document.createElement('h2')
addEditH2.innerHTML = 'Add TODO'

const formContainer = document.createElement('div');
formContainer.className = 'col-md'
formContainer.appendChild(addEditH2)
formContainer.appendChild(form)

const rowDiv = document.createElement('div');
rowDiv.className = 'row'
rowDiv.appendChild(listContainer);
rowDiv.appendChild(formContainer);

const containerDiv = document.createElement('div');
containerDiv.className = 'container';
containerDiv.appendChild(rowDiv)
document.body.appendChild(containerDiv);

var todoList = JSON.parse(localStorage.getItem('items'))
var modifingKey = -1;
if (todoList == null) todoList = [];

let resetFrom = function() {
    titleInput.value = '';
    descriptionInput.value = '';
}

let displayList = function() {
    listGroup.innerHTML = '';

    todoList.forEach(function(value, key) {
        const h5 = document.createElement('h5');
        h5.className = 'mb-1';
        h5.textContent = value.title;

        const btnEdit = document.createElement('button');
        btnEdit.className = 'btn btn-info';
        btnEdit.style = 'margin-right: 3px;'
        btnEdit.innerHTML = '<i class="fa fa-edit"></i>';
        btnEdit.addEventListener('click', function() {
            titleInput.value = todoList[key].title;
            descriptionInput.value = todoList[key].detail;
            addEditH2.innerHTML = 'Edit TODO'
            modifingKey = key
        });

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn btn-danger';
        btnDelete.innerHTML = '<i class="fa fa-trash"></i>';
        btnDelete.addEventListener('click', function() {
            var r = confirm("Are you sure to delete '" + todoList[key].title + "'?");
            if (r == true) {
                todoList.splice(key, 1);
                localStorage.setItem('items', JSON.stringify(todoList))
                displayList();
            }
        });

        const buttons = document.createElement('small');
        buttons.appendChild(btnEdit);
        buttons.appendChild(btnDelete);

        const content = document.createElement('div');
        content.className = 'd-flex w-100 justify-content-between'
        content.appendChild(h5)
        content.appendChild(buttons)

        const p = document.createElement('p');
        p.textContent = value.detail;

        const a = document.createElement('a');
        a.href = '#';
        a.className = 'list-group-item list-group-item-action flex-column align-items-start';
        a.appendChild(content);
        a.appendChild(p);

        listGroup.appendChild(a);
    });

    if (todoList.length == 0) {
        const small = document.createElement('small');
        small.innerText = 'The list is empty';

        const a = document.createElement('a');
        a.href = '#';
        a.className = 'list-group-item list-group-item-action flex-column align-items-start';
        a.appendChild(small);

        listGroup.appendChild(a);
    }
};

displayList();
