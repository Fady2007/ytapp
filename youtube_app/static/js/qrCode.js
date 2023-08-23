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
let msgElement = document.querySelector("#errMsg");
let qrCode;
let input = document.querySelector("input");
let dataInp = document.querySelector(".title");
let thDiv = document.querySelector(".thDiv");
let qrimg = document.querySelector(".thImg");
const genBtn = document.querySelector("[data-gen]");
console.log(genBtn);
genBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (input.value.trim() == "") {
        return;
    }
    else {
        thDiv.classList.remove("hidden");
        qrimg.style.width = "250px";
        qrimg.style.height = "250px";
        try {
            qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input.value}`;
        }
        catch (reason) {
            throw new Error(reason);
        }
        qrimg.src = qrCode;
    }
}));
const downBtn = document.querySelector("[data-down]");
let response;
if (downBtn) {
    downBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            response = yield fetch(`/downloadQr?value=${input.value}`);
            if (response.status == 500) {
                showMsg(msgElement, `Can not Download (${response.status})`, "red");
            }
        }
        catch (reason) {
            showMsg(msgElement, `Can not Download (${response.status})`, "red");
        }
    }));
}
function showMsg(el, msg, des = "red") {
    el.classList.remove("hidden");
    el.classList.remove("errMsg");
    el.classList.remove("warnMsg");
    el.classList.remove("sucMsg");
    if (des == "red") {
        setTimeout(() => {
            el.classList.add("errMsg");
        }, 0);
    }
    else if (des == "green") {
        setTimeout(() => {
            el.classList.add("sucMsg");
        }, 0);
    }
    else if (des == "yellow") {
        setTimeout(() => {
            el.classList.add("warnMsg");
        }, 0);
    }
    el.innerHTML = msg;
}
