import throttle from 'lodash.throttle';

const emailInput = document.querySelector("[name='email']");
const messageInput = document.querySelector("[name='message']");
const form = document.querySelector('.feedback-form');

function saveInput() {
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const data = {
    email,
    message,
  };

  try {
    const stringedData = JSON.stringify(data);
    localStorage.setItem('feedback-form-state', stringedData);
  } catch (error) {
    console.log('stringedData error: ' + error);
  }
}

const throttleSave = throttle(saveInput, 500);

emailInput.addEventListener('input', throttleSave);
messageInput.addEventListener('input', throttleSave);
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const sentData = {
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };
  if (sentData.email === '' || sentData.message === '') {
    alert('Both fields must be filled before sending');
  } else {
    console.log(sentData);
    localStorage.removeItem('feedback-form-state');
    emailInput.value = null;
    messageInput.value = null;
  }
}

try {
  const parsedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (parsedData.email !== '' || parsedData.message !== '') {
    emailInput.value = parsedData.email;
    messageInput.value = parsedData.message;
  }
} catch (error) {
  console.log('parsedData error: ' + error);
}
