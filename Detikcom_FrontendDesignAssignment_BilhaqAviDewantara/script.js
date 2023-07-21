var maxLength = 200;
$('#message').keyup(function() {
  var textlen = maxLength - $(this).val().length;
  $('#rchars').text(textlen);
});

var uploadField = document.getElementById("file-upload");

uploadField.onchange = function() {
    if(this.files[0].size > 20000000){
       alert("Ukuran melebihi 20MB");
       this.value = "";
    };
};

$(document).on('click', '.upload-field', function(){
    var file = $(this).parent().parent().parent().find('.input-file');
    file.trigger('click');
  });
$(document).on('change', '.input-file', function(){
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});

$(document).ready(function() {
    $("#file1").fileinput({
        allowedFileExtensions: ["png", "jpg", "jpeg"]
    });
});

const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file1');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function () {
    inputFile.click();
})

inputFile.addEventListener('change', function () {
    const image = this.files[0]
    if(image.size < 200000 && this.width < 300) {
        const reader = new FileReader();
        reader.onload = ()=> {
        const allImg = imgArea.querySelectorAll('img');
        allImg.forEach(item=> item.remove());
        const imgUrl = reader.result;
        const img = document.createElement('img');
        img.src = imgUrl;
        imgArea.appendChild(img);
        imgArea.classList.add('active');
        imgArea.dataset.img = image.name;
    }
        reader.readAsDataURL(image);
    } else {
        alert("Ukuran file lebih dari 200KB");
    }
});

//Name
let nameInput = document.getElementById("name-input");
let nameError = document.getElementById("name-error");
let emptynameError = document.getElementById("empty-name");

//Email
let emailInput = document.getElementById("email");
let emailError = document.getElementById("email-error");
let emptyEmailError = document.getElementById("empty-email");

//Phone number
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");
const emptyPhoneError = document.getElementById("empty-phone");

//Message
let messageInput = document.getElementById("message");
let messageError = document.getElementById("message-error");
let emptymessageError = document.getElementById("empty-message");

//Valid
let validClasses = document.getElementsByClassName("valid");
let invalidClasses = document.getElementsByClassName("error");

//Text verification (if input contains only text)
const textVerify = (text) => {
  const regex = /^[a-zA-Z]{3,}$/;
  return regex.test(text);
};

//Email verification
const emailVerify = (input) => {
    const regex = /^[a-z0-9_]+@[a-z]{3,}\.[a-z\.]{3,}$/;
    return regex.test(input);
};

//Phone Number verification (if input contains only number)
const phoneVerify = (text) => {
    const regex = /^[0-9]{3,}$/;
    return regex.test(text);
};

//For empty input - accepts(input,empty error for that input and other errors)
const emptyUpdate = (
  inputReference,
  emptyErrorReference,
  otherErrorReference
) => {
  if (!inputReference.value) {
    //input is null/empty
    emptyErrorReference.classList.remove("hide");
    otherErrorReference.classList.add("hide");
    inputReference.classList.add("error");
  } else {
    //input has some content
    emptyErrorReference.classList.add("hide");
  }
};

//For error styling and displaying error message
const errorUpdate = (inputReference, errorReference) => {
  errorReference.classList.remove("hide");
  inputReference.classList.remove("valid");
  inputReference.classList.add("error");
};

//For no errors
const validInput = (inputReference) => {
  inputReference.classList.remove("error");
  inputReference.classList.add("valid");
};

//Name
nameInput.addEventListener("input", () => {
  if (textVerify(nameInput.value)) {
    //If verification returns true
    nameError.classList.add("hide");
    validInput(nameInput);
  } else {
    //for false
    errorUpdate(nameInput, nameError);
    //empty checker
    emptyUpdate(nameInput, emptynameError, nameError);
  }
});

//Email
emailInput.addEventListener("input", () => {
    if (emailVerify(emailInput.value)) {
        emailError.classList.add("hide");
        validInput(emailInput);
    } else {
        errorUpdate(emailInput, emailError);
        emptyUpdate(emailInput, emptyEmailError, emailError);
    }
});

// Phone
phoneInput.addEventListener("input", () => {
    if (phoneVerify(phoneInput.value)) {
    //If verification returns true
    phoneError.classList.add("hide");
    validInput(phoneInput);
    } else {
    //for false
    errorUpdate(phoneInput, phoneError);
    //empty checker
    emptyUpdate(phoneInput, emptyPhoneError, phoneError);
    }
});

//Message
messageInput.addEventListener("input", () => {
  if (textVerify(messageInput.value)) {
    messageError.classList.add("hide");
    validInput(messageInput);
  } else {
    errorUpdate(messageInput, messageError);
    emptyUpdate(messageInput, emptymessageError, messageError);
  }
});