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
    const savedData = localStorage.getItem(KEY_LOCAL_STORAGE);
    if (!savedData) return;
    formData = JSON.parse(savedData);
    Object.entries(formData).forEach(([key, val]) => {
      if (form.elements[key]) {
        form.elements[key].value = val;
      }
    });
  } catch (error) {
    console.error(error.message);
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
