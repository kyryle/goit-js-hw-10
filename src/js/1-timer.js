import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const btn = document.querySelector(".btn")
let daysLeft = document.querySelector('.timer[data-days]')
let hoursLeft = document.querySelector('.timer[data-hours]')
let minutesLeft = document.querySelector('.timer[data-minutes]')
let secondsLeft = document.querySelector('.timer[data-seconds]')
let userSelectedDate = []
let timeSum = 0
let totalTime = {}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < new Date()) {
            iziToast.show({
    title: 'Error',
    message: 'Please choose a date in the future'
});
            btn.disabled = true;
        } else {
          btn.disabled = false;
          btn.style.pointerEvents = 'auto'
          userSelectedDate = selectedDates
          timeSum = userSelectedDate[0] - new Date()
          totalTime = convertMs(timeSum)
          console.log(totalTime)
  }},
};

flatpickr("#datetime-picker", options);

btn.addEventListener("click", (e) => {
  btn.disabled = true;
  btn.style.pointerEvents = 'none'
  let timer = setInterval(() => {
    daysLeft.textContent = totalTime.days
    hoursLeft.textContent = totalTime.hours
    minutesLeft.textContent = totalTime.minutes
    secondsLeft.textContent = totalTime.seconds
    timeSum - 1000
    convertMs(timeSum)
    addZero(convertMs)
    if (convertMs(timeSum) < 1) {
      clearInterval(timer)
      btn.disabled = false;
      btn.style.pointerEvents = 'auto'
    }
  },1000)
})


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

function addZero(time) {
  time.days.padStart(2, "0")
  time.hours.padStart(2, "0")
  time.minutes.padStart(2, "0")
  time.seconds.padStart(2, "0")
}