import { Fady } from "./fadymod.js";
const bodytube = document.querySelector("#bodytube");
const runButton = document.getElementById("runButton");
const inp = document.getElementById("url");
const fr = document.createElement("iframe");
const errMsg = document.querySelector("#errMsg");
const loading = document.querySelector(".loadDiv");
const thDiv = document.querySelector(".thDiv");
const thImg = document.querySelector(".thImg");
const thImgDiv = document.querySelector(".thImgDiv");
const vid_title = document.querySelector(".title");
const resInp = document.querySelector("#resInp");
const author = document.querySelector(".author");
const loadingInfo = document.querySelector(".loadbar.ytinfo");
let quality = "360p";
let response;
let fileSize;
let video_id;

if (bodytube) {
  const dropBox = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");
  const selectedQuality = document.getElementById("selectedQuality");

  // handel resolution
  dropBox.addEventListener("mouseover", () => {
    dropdownContent.classList.remove("hidden");
  });
  dropdownContent.addEventListener("click", (event) => {
    event.preventDefault();
    quality = event.target.getAttribute("data-quality");
    dropdownContent.classList.toggle("hidden");
    dropBox.innerHTML = `Select Quality: ${quality}`;
  });

  const youtubeUrlRegex =
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_\-]{11})$/;

  function isValidYoutubeUrl(url) {
    return youtubeUrlRegex.test(url);
  }

  // download video
  runButton.addEventListener("click", async () => {
    errMsg.classList.add("hidden");

    if (!isValidYoutubeUrl(inp.value)) {
      showMsg(
        errMsg,
        `<i class="fa fa-warning"></i> Invalid Youtube Video url <br> Try short id if link is valid`,
        "yellow"
      );
    } else {
      loading.classList.remove("hidden");
      try {
        response = await fetch(
          `/youtube?value=${inp.value}&resolution=${quality}`
        );
        if (!response.ok && response.status == 500) {
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
          `<i class="fa-regular fa-circle-xmark"></i> Can not Download try again (${response.status})`,
          "red"
        );
      }
    }
  });

  // input
  inp.addEventListener("keyup", async function () {
    let sizeDiv = document.querySelector(".author.siz");
    loadingInfo.classList.remove("hidden");

    video_id = inp.value.split("v=")[1].substring(0, 11);
    thImg.src = `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`;

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
          let authorName = data.author_name;
          vid_title.textContent = title;
          author.innerHTML = `<a href=${data.author_url} class="linkC">${authorName}</a>`;
          thDiv.classList.remove("hidden");
        });
    } catch (reason) {
      console.log(reason);
    }

    try {
      response = await (await fetch(`/size?value=${inp.value}`)).json();
      fileSize = response.size;
      loadingInfo.classList.add("hidden");
      if (fileSize.includes("Error")) {
        sizeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> can not get video size`;
      } else {
        sizeDiv.textContent = `${fileSize} MB`;
      }
      if (!response.ok) {
        sizeDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> can not get video size`;
        throw new Error("Python function failed");
      }
    } catch (reason) {
      console.log(reason);
    }
  });
}
export function showMsg(el, msg, des = "red") {
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

if (document.querySelector(".copyright p span")) {
  let fod = new Fady();
  fod.insertYear(document.querySelector(".copyright p span"));
}

console.log(`
 _ _ _     _                   
| | | |___| |___ ___ _____ ___ 
| | | | -_| |  _| . |     | -_|
|_____|___|_|___|___|_|_|_|___|
`);

if (inp) {
  selectInpsOnfocus([inp]);
  inp.focus();
}
