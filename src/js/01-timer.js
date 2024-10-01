import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputDateTime = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('.timer-button');

let date = new Date();
console.log(date.getTime());

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let userSelectedDateGetTime = selectedDates[0];
    console.log(userSelectedDateGetTime.getTime());

    if (userSelectedDateGetTime.getTime() <= date.getTime()) {
      startBtn.setAttribute('disabled', 'true');
      return window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

let userSelectedDate = inputDateTime.textContent;
console.log(userSelectedDate);

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

startBtn.addEventListener('click', event => {
  event.preventDefault();
});

flatpickr(inputDateTime, options);
