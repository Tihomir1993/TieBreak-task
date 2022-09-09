var mydata = JSON.parse(placeholder);
var errorData = JSON.parse(errorMessages)

Object.keys(mydata).filter((elem) => {
    document.getElementsByName([elem])[0].placeholder = mydata[elem];
})

function isEmptyField(payload, errorMessage) {
    let isValid = true
    Object.keys(payload).filter((element) => {
        if (!payload[element]) {
            errorMessage[element].innerHTML = errorData.emptyField
            isValid = false
        }
    })
    return isValid;
}

function isValidEmail(value) {
    let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    return !isValidEmail ? false : true;
}

function validateFullName(value) {
    let regName = /^([A-Z][a-zA-Z]{2,19})+\s([A-Z][A-Za-z]{2,19})*$/g.test(value);
    return !regName ? false : true;
}

function isValidPhoneNumber(value, minLength, maxLength) {
    let isValid = true
    let regexValid = new RegExp(/^(\d*)(\d{0,2})?$/)
    let phoneNumber = document.getElementsByName('phone')[0].value;
    if (regexValid.test(value)) {
        if (parseInt(phoneNumber.charAt(0)) != 0) {
            isValid = errorData.errorPhoneZero;
        } else if (value.length < minLength || value.length >= maxLength) {
            isValid = errorData.limitDigits;
        } else {
            isValid = true
        }
    } else {
        isValid = errorData.onlyDigits;
    }
    return isValid
}

let btnSubmit = document.querySelector('.btn-submit');
btnSubmit.addEventListener('click', function() {
    let getValueFromUser = {}
    getValueFromUser.fullname = document.getElementsByName('fullname')[0].value
    getValueFromUser.email = document.getElementsByName('email')[0].value
    getValueFromUser.phone = document.getElementsByName('phone')[0].value
    getValueFromUser.country = document.getElementById('country').value;
    getValueFromUser.terms = document.getElementsByName('terms')[0].checked
    let errorMessage = {}

    errorMessage.fullname = document.querySelector('.error-fullname');
    errorMessage.email = document.querySelector('.error-email');
    errorMessage.phone = document.querySelector('.error-phone');
    errorMessage.country = document.querySelector('.error-country');
    errorMessage.terms = document.querySelector('.error-terms');
    Object.keys(errorMessage).filter((el) => {
        errorMessage[el].innerHTML = null;
    })
    if (isEmptyField(getValueFromUser, errorMessage)) {
        if (isValidPhoneNumber(getValueFromUser.phone, 5, 10) !== true) {
            errorMessage.phone.innerHTML = isValidPhoneNumber(getValueFromUser.phone, 5, 10)
        }
        if (!isValidEmail(getValueFromUser.email)) {
            errorMessage.email.innerHTML = errorData.errorEmail;
        }
        if (!validateFullName(getValueFromUser.fullname)) {
            errorMessage.fullname.innerHTML = errorData.errorFullname;
        }
    }
})