//Dom elements

const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const getBtn = document.getElementById("result-btn");

 
getBtn.addEventListener("click" , (e) => {
    e.preventDefault();

    const required = checkRequired([day,month,year]);
});

function checkRequired(inputArray) {
    let isVaild = true

    inputArray.forEach(input => {
        if(input.value.trim() === ""){
           showError(input, `${formatFieldName(input)} is Required`);
           isVaild = false;

        }else{
            showSuccess(input)
        }
    });
}

function formatFieldName (input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError (input,message) {
     const dmyGroup = input.parentElement;
     dmyGroup.className = "inbox error";
     const small = dmyGroup.querySelector("small");
     small.innerText = message;
}
function showSuccess(input){
    const dmyGroup = input.parentElement;
    dmyGroup.className = "inbox success";
}