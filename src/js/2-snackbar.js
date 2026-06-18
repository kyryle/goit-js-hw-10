import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const input = document.querySelector("input[name='delay']")
const resRadioCheck = document.querySelector("input[value='fulfilled']")
const rejRadioCheck = document.querySelector("input[value='rejected']")
const form = document.querySelector("form.form")
let delay = 0
let promiseResult 
input.addEventListener("input", e => {
    delay = input.value
    console.log(delay)
});
resRadioCheck.addEventListener("click", e => {
    promiseResult = true
    console.log(promiseResult)
});
rejRadioCheck.addEventListener("click", e => {
    promiseResult = false
    console.log(promiseResult)
});
form.addEventListener("submit", e => {
    e.preventDefault()
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            if (promiseResult) {
                res(delay)
            } else {
                rej(delay)
            }
        }, delay)
    })
    
    promise.then(res => {
                iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`
                })
            }).catch(rej => {
                iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`
                })
})
})