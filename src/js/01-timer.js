import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateTime = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('.timer-button');

let date = new Date();
let dateGetTime = date.getTime();

let userSelectedDate;
let userSelectedDateGetTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    userSelectedDateGetTime = userSelectedDate.getTime();
    console.log(userSelectedDateGetTime);

    if (userSelectedDateGetTime <= date.getTime()) {
      startBtn.setAttribute('disabled', 'true');

      return izitoast.error({
        title: '',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(inputDateTime, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

startBtn.addEventListener('click', event => {
  event.preventDefault();

  function timer() {
    let ms = userSelectedDateGetTime - dateGetTime;
    let objectConvertMs = convertMs(ms);
    ms = ms - 1000;
    objectConvertMs;
    days.textContent = objectConvertMs.days;
    hours.textContent = objectConvertMs.hours;
    minutes.textContent = objectConvertMs.minutes;
    seconds.textContent = objectConvertMs.seconds;
    if (ms <= 0) {
      clearInterval(counter);
      return;
    }
  }
  const counter = setInterval(timer, 1000);

  return;
});
