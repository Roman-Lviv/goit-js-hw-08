import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

let formData = {};
const KEY_LOCAL_STORAGE = 'feedback-form-state';

const saveFormState = e => {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(formData));
};

const restoreFormState = () => {
  try {
    const saveData = localStorage.getItem(KEY_LOCAL_STORAGE);
    if (!savedData) return;
    formData = JSON.parse(saveData);
    Object.entries(formData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({ massage }) {
    console.log(message);
  }
};

form.addEventListener('input', throttle(saveFormState, 500));

document.addEventListener('DOMContentLoaded', restoreFormState);

form.addEventListener('submit', e => {
  e.preventDefault();

  localStorage.removeItem(KEY_LOCAL_STORAGE);

  console.log(formData);
  formData = {};
  e.target.reset();
});
