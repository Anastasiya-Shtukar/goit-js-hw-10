import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delay = document.querySelector('.input-delay');
const radioFulfilled = document.querySelector('.radio-fulfilled');
const radioRejected = document.querySelector('.radio-rejected');
const btnCreateNotification = document.querySelector(
  '.btn-create-notification'
);

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (radioFulfilled.checked === true) {
      resolve(`✅ Fulfilled promise in ${delay.value}ms`);
      return;
    } else {
      reject(`❌ Rejected promise in ${delay.value}ms`);
      return;
    }
  }, delay.value);
});

btnCreateNotification.addEventListener('click', event => {
  event.preventDefault();

  setTimeout(() => {
    if (radioFulfilled.checked) {
      izitoast.success({
        title: '',
        message: `✅ Fulfilled promise in ${delay.value}ms`,
        position: 'topRight',
      });
    } else {
      izitoast.error({
        title: '',
        message: `❌ Rejected promise in ${delay.value}ms`,
        position: 'topRight',
      });
    }

    promise
      .then(value => console.log(value))
      .catch(error => console.log(error));
  }, delay.value);
});
