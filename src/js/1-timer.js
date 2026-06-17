import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const btn = document.querySelector(".btn")
let userSelectedDate = []
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates < new Date) {
            window.alert("Please choose a date in the future")
            btn.disabled = true;
        } else
            btn.disabled = false;
            userSelectedDate = selectedDates
  },
};

flatpickr("#datetime-picker", options);