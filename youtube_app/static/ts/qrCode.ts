let msgElement = document.querySelector("#errMsg");
let qrCode;
let input = document.querySelector("input") as HTMLInputElement;
let dataInp = document.querySelector(".title") as HTMLElement;
let thDiv = document.querySelector(".thDiv") as HTMLElement;
let qrimg = document.querySelector(".thImg") as HTMLImageElement;
const genBtn = document.querySelector("[data-gen]") as HTMLButtonElement;
console.log(genBtn);

genBtn.addEventListener("click", async () => {
  if (input.value.trim() == "") {
    return;
  } else {
    thDiv.classList.remove("hidden");
    qrimg.style.width = "250px";
    qrimg.style.height = "250px";
    try {
      qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input.value}`;
    } catch (reason: any) {
      throw new Error(reason);
    }
    qrimg.src = qrCode;
  }
});

const downBtn = document.querySelector("[data-down]") as HTMLButtonElement;
let response: any;

if (downBtn) {
  downBtn.addEventListener("click", async () => {
    try {
      response = await fetch(`/downloadQr?value=${input.value}`);
      if (response.status == 500) {
        showMsg(msgElement, `Can not Download (${response.status})`, "red");
      }
    } catch (reason) {
      showMsg(msgElement, `Can not Download (${response.status})`, "red");
    }
  });
}

function showMsg(el: any, msg: string, des = "red") {
  el.classList.remove("hidden");
  el.classList.remove("errMsg");
  el.classList.remove("warnMsg");
  el.classList.remove("sucMsg");
  if (des == "red") {
    setTimeout(() => {
      el.classList.add("errMsg");
    }, 0);
  } else if (des == "green") {
    setTimeout(() => {
      el.classList.add("sucMsg");
    }, 0);
  } else if (des == "yellow") {
    setTimeout(() => {
      el.classList.add("warnMsg");
    }, 0);
  }
  el.innerHTML = msg;
}
