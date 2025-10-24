// Dom elements
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const getBtn = document.getElementById("result-btn");
const resultSpans = document.querySelectorAll('.result span'); // [years, months, days]

getBtn.addEventListener("click", (e) => {
    e.preventDefault();

    
    if (!checkRequired([day, month, year])) return;

    
    const dVal = parseInt(day.value, 10);
    const mVal = parseInt(month.value, 10);
    const yVal = parseInt(year.value, 10);

    
    const monthOk = validateMonth(month);
    const yearOk = validateYear(year);
    const dayOk = validateDay(day, mVal, yVal);

    if (!(monthOk && yearOk && dayOk)) return;

    
    const birthDate = new Date(yVal, mVal - 1, dVal);
    const today = new Date();
    if (birthDate > today) {
        showError(year, 'Birth date cannot be in the future');
        return;
    }

    
    const age = calculateAge(dVal, mVal, yVal);
    if (age) {
        resultSpans[0].textContent = age.years;
        resultSpans[1].textContent = age.months;
        resultSpans[2].textContent = age.days;
    }
});

function checkRequired(inputArray) {
    let isValid = true;

    inputArray.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `${formatFieldName(input)} is required`);
            isValid = false;
        } else {
            
            const wrapper = input.parentElement;
            wrapper.classList.remove('error');
            const small = wrapper.querySelector('small');
            if (small) small.innerText = '';
        }
    });

    return isValid;
}

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const dmyGroup = input.parentElement;
    dmyGroup.classList.remove('success');
    dmyGroup.classList.add('error');
    const small = dmyGroup.querySelector('small');
    if (small) small.innerText = message;
}

function showSuccess(input) {
    const dmyGroup = input.parentElement;
    dmyGroup.classList.remove('error');
    dmyGroup.classList.add('success');
    const small = dmyGroup.querySelector('small');
    if (small) small.innerText = '';
}


function isLeapYear(y) {
    if (isNaN(y)) return false;
    return (y % 4 === 0) && (y % 100 !== 0 || y % 400 === 0);
}

function daysInMonth(m, y) {
    if (m === 2) return isLeapYear(y) ? 29 : 28;
    if ([4, 6, 9, 11].includes(m)) return 30;
    return 31;
}

function validateMonth(monthInput) {
    const m = parseInt(monthInput.value, 10);
    if (isNaN(m)) {
        showError(monthInput, 'Month must be a number');
        return false;
    }
    if (m < 1 || m > 12) {
        showError(monthInput, 'Month must be between 1 and 12');
        return false;
    }
    showSuccess(monthInput);
    return true;
}

function validateYear(yearInput) {
    const y = parseInt(yearInput.value, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(y)) {
        showError(yearInput, 'Year must be a number');
        return false;
    }
    if (y < 1) {
        showError(yearInput, 'Year must be a positive number');
        return false;
    }
    if (y > currentYear) {
        showError(yearInput, 'Year cannot be in the future');
        return false;
    }
    showSuccess(yearInput);
    return true;
}

function validateDay(dayInput, monthVal, yearVal) {
    const d = parseInt(dayInput.value, 10);
    if (isNaN(d)) {
        showError(dayInput, 'Day must be a number');
        return false;
    }

    let maxDays = 31;
    if (!isNaN(monthVal) && monthVal >= 1 && monthVal <= 12) {
        maxDays = daysInMonth(monthVal, yearVal);
    }

    if (d < 1 || d > maxDays) {
        showError(dayInput, `Day must be between 1 and ${maxDays}`);
        return false;
    }

    showSuccess(dayInput);
    return true;
}


function calculateAge(d, m, y) {
    const birth = new Date(y, m - 1, d);
    const today = new Date();

    if (birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        /
        const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += prevMonthLastDay;
        months -= 1;
    }

    if (months < 0) {
        months += 12;
        years -= 1;
    }

    return { years, months, days };
}