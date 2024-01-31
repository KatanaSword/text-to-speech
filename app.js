const textInput = document.querySelector("#text");
const submitBtn = document.querySelector("#submit-btn");
const audioPlayer = document.querySelector("#audio-player");
const language = document.querySelector("#language");

const serverLanguagesURL =
  "https://text-to-speech27.p.rapidapi.com/speech/lang";
const serverAudioURL = "https://text-to-speech27.p.rapidapi.com/speech";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1102bac83cmshccfefeea8285b57p102e25jsn4d76687d8ada",
    "X-RapidAPI-Host": "text-to-speech27.p.rapidapi.com",
  },
};

let langCodes = [];
let languages = [];

function AudioURL(text, lang) {
  return `${serverAudioURL}?text=${text}&lang=${lang}`;
}

function errorHandler(error) {
  console.log(error);
}

function selectLanguage() {
  language.innerHTML = "";
  langCodes.forEach((item1, index) => {
    const item2 = languages[index];
    const option = document.createElement("option");
    option.setAttribute("value", item1);
    option.innerText = item2;
    language.appendChild(option);

    if (item1 === "en") {
      option.setAttribute("selected", "true");
    }
  });
}

function getLanguages() {
  fetch(serverLanguagesURL, options)
    .then((response) => response.json())
    .then((json) => {
      langCodes = Object.keys(json);
      languages = Object.values(json);
      selectLanguage();
    })
    .catch(errorHandler);
}
window.addEventListener("load", getLanguages);

function playAudio(audioUrl) {
  fetch(audioUrl, options)
    .then((response) => response.blob())
    .then((blob) => {
      const getAudioURL = URL.createObjectURL(blob);
      audioPlayer.src = getAudioURL;
      audioPlayer.play();
    })
    .catch(errorHandler);
}

function clickHandler() {
  if (textInput.value.trim()) {
    const text = textInput.value;
    const currentIndex = language.selectedIndex;
    const lang = langCodes[currentIndex];
    const audioUrl = AudioURL(text, lang);
    playAudio(audioUrl);
  }
  textInput.value = "";
}
submitBtn.addEventListener("click", clickHandler);
