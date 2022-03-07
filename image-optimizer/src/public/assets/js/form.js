"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// when the HTML is fully loaded execute this code
window.onload = () => {
    // when a file is uploaded it executes uploadedFile() and updates the text that displays the amount of files uploaded
    const files = document.getElementById("fileLoad");
    files.addEventListener("change", () => {
        uploadedFile("fileLoad", "file-selected");
    });
    // link the width range and the width number so they change when the other does
    // set the regex filter to the width number to avoid wrong numbers
    const widthSlider = document.getElementById("widthSlider");
    const widthNumber = document.getElementById("widthNumber");
    updateInputs(widthSlider, widthNumber, 1000);
    // link the height range and the height number so they change when the other does
    // set the regex filter to the height number to avoid wrong numbers
    const heightSlider = document.getElementById("heightSlider");
    const heightNumber = document.getElementById("heightNumber");
    updateInputs(heightSlider, heightNumber, 1000);
    // link the compression range and the compression number so they change when the other does
    // set the regex filter to the compression number to avoid wrong numbers
    const compressionSlider = document.getElementById("compressionSlider");
    const compressionNumber = document.getElementById("compressionNumber");
    updateInputs(compressionSlider, compressionNumber, 100);
    // get the from from the HTML
    const form = document.getElementById("form");
    // reset the form so it doesn't contain any files when you reload the page
    form.reset();
    // when the form is submitted it cancels the operation and executes makeRequest() to fetch the data
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        makeRequest(form);
    });
};
// sets the listeners of the sliders and number inputs to change each other
function updateInputs(slider, number, type) {
    slider.addEventListener("input", () => {
        // update the number.value with the slider.value
        number.value = slider.value;
    });
    number.addEventListener("input", () => {
        // apply regex to the number to avoid unwanted inputs
        numberRegex(number, type);
        // update the slider.value with the number.value
        slider.value = number.value;
    });
}
// apply regex and input control to the "number: HTMLInputElement"
function numberRegex(number, type) {
    // on event keydown
    number.addEventListener("keydown", (e) => {
        // check if the key is one of the allowed values
        // if it isn't allowed prevent the key input
        if (!(e.key == "0" || e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4" || e.key == "5" || e.key == "6" || e.key == "7" || e.key == "8" || e.key == "9" || e.key == "Backspace")) {
            e.preventDefault();
        }
        // if it is allowed but it's a "Backspace" prevent the key input if the number lenght is 1
        else {
            if (e.key == "Backspace" && /^[1-9]{1}$/.test(number.value)) {
                e.preventDefault();
            }
        }
    });
    // the regex that will check if the number is valid
    let regex = type == 100 ? /^[1-9]{1}[0-9]{0,2}/ : /^[1-9]{1}[0-9]{0,4}/;
    // limits the number to be between 1 and 10000
    if (parseInt(number.value) > 10000) {
        number.value = "10000";
    }
    else if (parseInt(number.value) < 1) {
        number.value = "1";
    }
    // check if number.value is a valid input
    let numberValidated = number.value.match(regex);
    if (numberValidated) {
        number.value = number.value ? ((regex.test(number.value)) ? (numberValidated[0]) : "1") : "1";
    }
}
// displays in the form the amount of uploaded files
function uploadedFile(id, textId) {
    // get the files input and the text that indicates how many files did you upload
    let files = document.getElementById(id).files;
    let text = document.getElementById(textId);
    // it sets the text of textId as the number of files plus the string
    // if the files contain 0 or more than 1 object it says "files", if not it says "file"
    text.innerText = files ? (files.length > 1 || files.length == 0 ? files.length + " files selected" : files.length + " file selected") : "0 files selected";
}
// make the request to the server
function makeRequest(form) {
    return __awaiter(this, void 0, void 0, function* () {
        // send the form through a POST request to the server and when you get the response download it
        download(yield sendForm(new FormData(form)));
    });
}
// make the fetch request
function sendForm(form) {
    return __awaiter(this, void 0, void 0, function* () {
        // fetch the form
        const sendForm = yield fetch('/upload', {
            method: 'POST',
            body: form
        });
        // return the response
        return sendForm.json();
    });
}
// download the data 
function download(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // download the response of the sendForm() request
        //create a link element
        const a = document.createElement("a");
        //set the href as the data
        a.href = yield data.data;
        // set the default name of the downloaded file
        a.download = "images.zip";
        // add the link element to the body of the HTML
        document.body.appendChild(a);
        // execute download
        a.click();
        // remove the link element from the body of the HTML
        document.body.removeChild(a);
    });
}
