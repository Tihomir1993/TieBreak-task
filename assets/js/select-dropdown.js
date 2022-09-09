let dropdownResult = document.querySelector('.country');
let countryCode = document.getElementById('countryCode');
let options = document.querySelectorAll('.option div');
options.forEach(option => {
    option.addEventListener('click', function() {
        dropdownResult.value = this.dataset.name;
        countryCode.value = this.dataset.value;

    })
})
let dropdown = document.querySelector('.dropdown');
dropdown.onclick = function() {
    dropdown.classList.toggle('active');
}