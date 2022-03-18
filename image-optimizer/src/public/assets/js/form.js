var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// when the HTML is fully loaded execute this code
window.onload = function () {
    // when a file is uploaded it executes uploadedFile() and updates the text that displays the amount of files uploaded
    var files = document.getElementById("fileLoad");
    files.addEventListener("change", function () {
        uploadedFile("fileLoad", "file-selected");
    });
    // link the width range and the width number so they change when the other does
    // set the regex filter to the width number to avoid wrong numbers
    var widthSlider = document.getElementById("widthSlider");
    var widthNumber = document.getElementById("widthNumber");
    updateInputs(widthSlider, widthNumber, 1000);
    // link the height range and the height number so they change when the other does
    // set the regex filter to the height number to avoid wrong numbers
    var heightSlider = (document.getElementById("heightSlider"));
    var heightNumber = (document.getElementById("heightNumber"));
    updateInputs(heightSlider, heightNumber, 1000);
    // link the compression range and the compression number so they change when the other does
    // set the regex filter to the compression number to avoid wrong numbers
    var compressionSlider = (document.getElementById("compressionSlider"));
    var compressionNumber = (document.getElementById("compressionNumber"));
    updateInputs(compressionSlider, compressionNumber, 100);
    // get the from from the HTML
    var form = document.getElementById("form");
    // reset the form so it doesn't contain any files when you reload the page
    form.reset();
    // when the form is submitted it cancels the operation and executes makeRequest() to fetch the data
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        makeRequest(form);
    });
};
// sets the listeners of the sliders and number inputs to change each other
function updateInputs(slider, number, type) {
    slider.addEventListener("input", function () {
        // update the number.value with the slider.value
        number.value = slider.value;
    });
    number.addEventListener("input", function () {
        // apply regex to the number to avoid unwanted inputs
        numberRegex(number, type);
        // update the slider.value with the number.value
        slider.value = number.value;
    });
}
// apply regex and input control to the "number: HTMLInputElement"
function numberRegex(number, type) {
    // on event keydown
    number.addEventListener("keydown", function (e) {
        // check if the key is one of the allowed values
        // if it isn't allowed prevent the key input
        if (!(e.key == "0" ||
            e.key == "1" ||
            e.key == "2" ||
            e.key == "3" ||
            e.key == "4" ||
            e.key == "5" ||
            e.key == "6" ||
            e.key == "7" ||
            e.key == "8" ||
            e.key == "9" ||
            e.key == "Backspace")) {
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
    var regex = type == 100 ? /^[1-9]{1}[0-9]{0,2}/ : /^[1-9]{1}[0-9]{0,4}/;
    // limits the number to be between 1 and 10000
    if (parseInt(number.value) > 10000) {
        number.value = "10000";
    }
    else if (parseInt(number.value) < 1) {
        number.value = "1";
    }
    // check if number.value is a valid input
    var numberValidated = number.value.match(regex);
    if (numberValidated) {
        number.value = number.value
            ? regex.test(number.value)
                ? numberValidated[0]
                : "1"
            : "1";
    }
}
// displays in the form the amount of uploaded files
function uploadedFile(id, textId) {
    // get the files input and the text that indicates how many files did you upload
    var files = document.getElementById(id).files;
    var text = document.getElementById(textId);
    // it sets the text of textId as the number of files plus the string
    // if the files contain 0 or more than 1 object it says "files", if not it says "file"
    text.innerText = files
        ? files.length > 1 || files.length == 0
            ? files.length + " files selected"
            : files.length + " file selected"
        : "0 files selected";
}
// make the request to the server
function makeRequest(form) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // send the form through a POST request to the server and when you get the response download it
                    _a = download;
                    return [4 /*yield*/, sendForm(new FormData(form))];
                case 1:
                    // send the form through a POST request to the server and when you get the response download it
                    _a.apply(void 0, [_b.sent()]);
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    });
}
// make the fetch request
function sendForm(form) {
    return __awaiter(this, void 0, void 0, function () {
        var sendForm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/upload", {
                        method: "POST",
                        body: form
                    })];
                case 1:
                    sendForm = _a.sent();
                    // return the response
                    return [2 /*return*/, sendForm.json()];
            }
        });
    });
}
// download the data
function download(data) {
    return __awaiter(this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = document.createElement("a");
                    //set the href as the data
                    _a = a;
                    return [4 /*yield*/, data.data];
                case 1:
                    //set the href as the data
                    _a.href = _b.sent();
                    // set the default name of the downloaded file
                    a.download = "images.zip";
                    // add the link element to the body of the HTML
                    document.body.appendChild(a);
                    // execute download
                    a.click();
                    // remove the link element from the body of the HTML
                    document.body.removeChild(a);
                    return [2 /*return*/];
            }
        });
    });
}
