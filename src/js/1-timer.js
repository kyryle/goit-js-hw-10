import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const input = document.querySelector("input#datetime-picker")
const btn = document.querySelector(".btn")
let daysLeft = document.querySelector('[data-days]')
let hoursLeft = document.querySelector('[data-hours]')
let minutesLeft = document.querySelector('[data-minutes]')
let secondsLeft = document.querySelector('[data-seconds]')
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
        if (selectedDates[0] <= new Date()) {
            iziToast.show({
    title: 'Error',
    message: 'Please choose a date in the future'
});
            btn.disabled = true;
        } else {
          btn.disabled = false;
          userSelectedDate = selectedDates
          // timeSum = userSelectedDate[0] - new Date()
          // totalTime = convertMs(timeSum)
          // console.log(totalTime)
  }},
};

flatpickr("#datetime-picker", options);

btn.addEventListener("click", (e) => {
  btn.disabled = true;
  input.disabled = true;
  timeSum = userSelectedDate[0] - new Date()
  totalTime = convertMs(timeSum)
  console.log(totalTime)
  let timer = setInterval(() => {
    daysLeft.textContent = String(totalTime.days)
    hoursLeft.textContent = String(totalTime.hours)
    minutesLeft.textContent = String(totalTime.minutes)
    secondsLeft.textContent = String(totalTime.seconds)
    timeSum -= 1000
    totalTime = convertMs(timeSum)
    addZero(convertMs)
    if (timeSum < 0) {
      clearInterval(timer)
      input.value = ""
      input.disabled = false;
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
  return {
    days: String(time.days).padStart(2, "0"),
    hours: String(time.hours).padStart(2, "0"),
    minutes: String(time.minutes).padStart(2, "0"),
    seconds: String(time.seconds).padStart(2, "0")
  }
}