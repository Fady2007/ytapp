const runButton = document.getElementById("runButton");
const inp = document.getElementById("url");
const fr = document.createElement("iframe");
const errMsg = document.querySelector("#errMsg");
const loading = document.querySelector(".loadDiv");
const thDiv = document.querySelector(".thDiv");
const thImg = document.querySelector(".thImg");
const vid_title = document.querySelector(".title");
const resInp = document.querySelector("#resInp");
let quality = "360p";

const dropBox = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");
const selectedQuality = document.getElementById("selectedQuality");

selectInpsOnfocus([inp]);
inp.focus();

dropBox.addEventListener("mouseover", () => {
  dropdownContent.classList.remove("hidden");
});
dropdownContent.addEventListener("click", (event) => {
  event.preventDefault();
  quality = event.target.getAttribute("data-quality");
  dropdownContent.classList.toggle("hidden");
  dropBox.innerHTML = `Select Quality: ${quality}`;
});

runButton.addEventListener("click", async () => {
  loading.classList.remove("hidden");
  errMsg.classList.add("hidden");

  try {
    const response = await fetch(
      `/youtube?value=${inp.value}&resolution=${quality}`
    );
    if (!response.ok && response.status != 500) {
      throw new Error("Python function failed");
    }
    loading.classList.add("hidden");
    showMsg(
      errMsg,
      `<i class="fa-regular fa-circle-check"></i> Successfully downloaded video`,
      "green"
    );
  } catch (error) {
    loading.classList.add("hidden");
    console.error(error);
    showMsg(
      errMsg,
      `<i class="fa-regular fa-circle-xmark"></i> Can not Download try again!`,
      "red"
    );
  }
});

inp.addEventListener("keyup", async function () {
  let apiUrl =
    "https://www.youtube.com/oembed?url=" +
    encodeURIComponent(inp.value) +
    "&format=json";

  try {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let title = data.title;
        let thumbnailUrl = data.thumbnail_url;
        vid_title.textContent = title;
        thDiv.classList.remove("hidden");
      });
  } catch (reason) {
    console.log(reason);
  }

  video_id = inp.value.split("v=")[1].substring(0, 11);
  thImg.src = `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`;
});

function showMsg(el, msg, des = "red") {
  el.classList.remove("hidden");
  el.classList.remove("errMsg");
  el.classList.remove("sucMsg");
  if (des == "red") {
    el.classList.add("errMsg");
  } else if (des == "green") {
    el.classList.add("sucMsg");
  }
  el.innerHTML = msg;
}

function fadeout(el, time) {
  el.classList.add("fade-out");
  setTimeout(() => {
    el.remove();
  }, time);
}

function selectInpsOnfocus(arrInps) {
  arrInps.forEach((inp) => {
    inp.onfocus = () => {
      inp.select();
    };
  });
}
