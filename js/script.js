//New task added
//Realized checked task property
//Realized edit task posibility
//Realized delete tasks posibility
//If task is checked,  it cant'be removed
//If task is checked, it remove to the end of list 
//Task can be edit. Realized posibility to escape task's change
//All tasks edit event saved in storage


let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let inputValue = '';
let inputField = null;
const addButton = document.querySelector('.add-button');

const updateValue = (evt) => {
  inputValue = evt.target.value;
};

const removeChild = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
};

const renderTask = () => {
  const tasksList = document.querySelector('.tasks__list');

  removeChild(tasksList);
  allTasks.forEach((item, index) => {
    const checkbox = document.createElement('input');
    const imageEdit = document.createElement('img');
    const imageDelete = document.createElement('img');
    const imageEscape = document.createElement('img');
    const imageDone = document.createElement('img');
    const container = document.createElement('li');
    const buttonEdit = document.createElement('button');
    const buttonDelete = document.createElement('button');
    const buttonEscape = document.createElement('button');
    const buttonDone = document.createElement('button');
    const textField = document.createElement('p');

    container.className = 'tasks__item';
    container.id = `task-${index}`;

    textField.id = `tasks__label-${index}`;
    textField.innerText = item.text;
    textField.className = item.isCheck ? 'text tasks__text tasks__text--done' : 'text tasks__text';
    textField.classList.add('tasks-text');

    checkbox.className = 'tasks__checkbox';
    checkbox.type = 'checkbox';
    checkbox.id = `tasks__checkbox-${index}`;
    checkbox.checked = item.isCheck;
    checkbox.onchange = () => onCheckboxChange(index);

    imageEdit.className = 'tasks__icon';
    imageEdit.src = 'img/edit.svg';
    imageEdit.width = '15';

    imageDelete.className = 'tasks__icon ';
    imageDelete.src = 'img/cross.svg';
    imageDelete.width = '15';

    imageEscape.className = 'tasks__icon';
    imageEscape.src = 'img/escape.svg';
    imageEscape.width = '15';

    imageDone.className = 'tasks__icon';
    imageDone.src = 'img/check.svg';
    imageDone.width = '15';

    buttonEdit.className = 'button tasks__button';
    buttonEdit.type = 'button';
    buttonEdit.onclick = () => onEditButtonClick(textField, index, container, buttonEdit, buttonEscape, buttonDelete, buttonDone);
    buttonEdit.appendChild(imageEdit);

    buttonDelete.className = 'button tasks__button';
    buttonDelete.type = 'button';
    buttonDelete.appendChild(imageDelete);
    buttonDelete.onclick = () => onDeleteButtonClick(index);

    buttonEscape.className = `button tasks__button tasks__button-escape-${index}`;
    buttonEscape.type = 'button';
    buttonEscape.appendChild(imageEscape);
    buttonEscape.onclick = () => onEscapeButtonClick();

    buttonDone.className = `button tasks__button tasks__button-done-${index}`;
    buttonDone.type = 'button';
    buttonDone.appendChild(imageDone);

    container.appendChild(checkbox);
    container.appendChild(textField);
    container.appendChild(buttonEdit);
    container.appendChild(buttonDelete);
    tasksList.appendChild(container);
  });
};

addButton.onclick = () => {
  onButtonClick();
}

const onButtonClick = () => {
  allTasks.push({
    text: inputValue,
    isCheck: false,
  })
  inputValue = '';
  inputField.value = '';
  allTasks.sort(compareFunction);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  renderTask();
};

const onCheckboxChange = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  allTasks.sort(compareFunction);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  renderTask();
};

const onEditButtonClick = (text, index, container, buttonEd, buttonEsc, buttonDel, buttonDn) => {
  if (!allTasks[index].isCheck) {
    const editTaskInput = document.createElement('input');

    editTaskInput.value = allTasks[index].text;
    editTaskInput.type = 'text';
    editTaskInput.className = 'input tasks-input-text';

    text.innerHTML = '';
    text.appendChild(editTaskInput);

    container.removeChild(buttonEd);
    container.removeChild(buttonDel);
    container.appendChild(buttonDn);
    container.appendChild(buttonEsc);


    const buttonDone = document.querySelector(`.tasks__button-done-${index}`);
    buttonDone.onclick = () => {
      onDoneButtonClick(editTaskInput, index, text, container, buttonEd, buttonEsc, buttonDel, buttonDn);
    }

    const escapeButton = document.querySelector(`.tasks__button-escape-${index}`);
    escapeButton.onclick = () => {
      onEscapeButtonClick(index, text, container, buttonEd, buttonDn, buttonEsc, buttonDel);
    }
  }
};

const onDoneButtonClick = (taskText, index, textField, container, buttonEd, buttonEsc, buttonDel, buttonDn) => {
  allTasks[index].text = taskText.value;

  localStorage.setItem('tasks', JSON.stringify(allTasks));

  textField.innerHTML = '';
  textField.innerText = allTasks[index].text;

  container.removeChild(buttonDn);
  container.removeChild(buttonEsc);
  container.appendChild(buttonEd);
  container.appendChild(buttonDel);
};

const onDeleteButtonClick = (index) => {
  allTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  renderTask();
};

const onEscapeButtonClick = (index, textField, container, buttonEd, buttonDn, buttonEsc, buttonDel) => {
  textField.innerHTML = '';
  textField.innerText = allTasks[index].text;

  container.removeChild(buttonDn);
  container.removeChild(buttonEsc);
  container.appendChild(buttonEd);
  container.appendChild(buttonDel);

}

const compareFunction = (itemA, itemB) => {
  if (itemA.isCheck && !itemB.isCheck) return 1;
  if (!itemA.isCheck && itemB.isCheck) return -1;
  if (!itemA.isCheck && !itemB.isCheck) return 0;
}

window.onload = () => {
  inputField = document.querySelector('.tasks-input');
  inputField.addEventListener('change', updateValue);
  renderTask();
};