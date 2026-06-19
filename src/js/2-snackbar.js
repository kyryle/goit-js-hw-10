import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const input = document.querySelector("input[name='delay']")
const state = document.querySelector("fieldset")
const form = document.querySelector("form.form") 
let delay = 0
let promiseResult
input.addEventListener("input", e => {
    delay = input.value
    console.log(delay)
    return delay
});
state.addEventListener("change", e => {
    if (e.target.value === "fulfilled") {
        return promiseResult = true
    } else {
        return promiseResult = false
    }
})
form.addEventListener("submit", e => {
    e.preventDefault()
    delay = input.value
    if (promiseResult === true) {
        promiseResult = true
    } else {
        promiseResult = false
    }
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
    message: `✅ Fulfilled promise in ${res}ms`
                })
            }).catch(rej => {
                iziToast.show({
    message: `❌ Rejected promise in ${rej}ms`
                })
})
})