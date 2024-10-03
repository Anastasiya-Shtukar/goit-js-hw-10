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
    if (radioFulfilled.checked) {
      resolve(
        izitoast.success({
          title: '',
          message: `✅ Fulfilled promise in ${delay.value}ms`,
          position: 'topRight',
        })
      );
      return;
    } else if (radioRejected.checked) {
      reject(
        izitoast.error({
          title: '',
          message: `❌ Rejected promise in ${delay.value}ms`,
          position: 'topRight',
        })
      );
      return;
    }
  }, delay.value);
});

btnCreateNotification.addEventListener('click', event => {
  event.preventDefault();
  promise.then(value => value).catch(error => console.log(error));
  console.log(radioFulfilled.checked);
  izitoast.success({
    title: '',
    message: `✅ Fulfilled promise in ${delay.value}ms`,
  });
  izitoast.error({
    title: '',
    message: `❌ Rejected promise in ${delay.value}ms`,
    position: 'topRight',
  });
});
