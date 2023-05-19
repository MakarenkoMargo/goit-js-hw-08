import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formEmail = document.querySelector('input');
const formMassage = document.querySelector('textarea');

const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = getData() || {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

onPageLoad();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onPageLoad() {
  const savedData = getData();
  if (savedData) {
    const { email, message } = savedData;
    if (email) {
      formEmail.value = email;
    }
    if (message) {
      formMassage.value = message;
    }
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
function getData() {
  const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
  return savedData === null
    ? undefined
    : JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
}
