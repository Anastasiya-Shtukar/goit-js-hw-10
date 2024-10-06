import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateTime = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('.timer-button');

let date = new Date();

const leftDays = document.querySelector('.value[data-days]');
const leftHours = document.querySelector('.value[data-hours]');
const leftMinutes = document.querySelector('.value[data-minutes]');
const leftSeconds = document.querySelector('.value[data-seconds]');

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
        position: 'topCenter',
      });
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(inputDateTime, options);

function addZeroSpan({ days, hours, minutes, seconds }) {
  leftDays.textContent = addLeadingZero(days);
  leftHours.textContent = addLeadingZero(hours);
  leftMinutes.textContent = addLeadingZero(minutes);
  leftSeconds.textContent = addLeadingZero(seconds);
}

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

startBtn.addEventListener('click', timer);

function timer(event) {
  event.preventDefault();
  startBtn.setAttribute('disabled', 'true');
  inputDateTime.setAttribute('disabled', 'true');
  const counter = setInterval(() => {
    const newDate = new Date();
    const ms = userSelectedDate - newDate;

    if (ms <= 0) {
      clearInterval(counter);
      startBtn.removeAttribute('disabled');
      inputDateTime.removeAttribute('disabled');
      return;
    }

    const leftTime = convertMs(ms);
    addZeroSpan(leftTime);
  }, 1000);

  return;
}
