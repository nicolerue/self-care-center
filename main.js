//QUERYING THE DOM

var messageBtn = document.querySelector(".recieve-message-btn");
var affirmationRadio = document.getElementById("affirmation");
var mantraRadio = document.getElementById("mantra");
var medIcon = document.querySelector(".meditation-icon");
var messageDisplay = document.querySelector(".message-text");
var clearBtn = document.querySelector(".clear-btn");
var addMyMessage = document.querySelector(".add-message-btn");
var addMessageForm = document.querySelector(".add-message-form");
var submitMessageBtn = document.querySelector(".submit-msg-btn");
var messageCategory = document.getElementById("message-category");
var messageInput = document.getElementById("message-input");
var heartIcon = document.querySelector(".heart-icon");
var faveDisplay = document.querySelector(".fave-display");
var deleteFaveX = document.querySelector(".delete-fave");
var loginBtn = document.querySelector(".login-sign-in");
var nameInput = document.querySelector(".login-input");
var welcomeMsg = document.querySelector(".welcome");
var namesFave = document.querySelector(".names-favorites");
var viewFaves = document.querySelector(".view-favorites");
var signOut = document.querySelector(".sign-out");
var goHome = document.querySelector(".go-home");
var page0Login = document.querySelector(".PAGE0-LOGIN");
var page1Home = document.querySelector(".PAGE1-HOME");
var page2Faves = document.querySelector(".PAGE2-FAVES");

//EVENT LISTENERS
messageBtn.addEventListener("click", getMessage);
clearBtn.addEventListener("click", clearMessage);
addMyMessage.addEventListener("click", openForm);
submitMessageBtn.addEventListener("click", submitMessage);
heartIcon.addEventListener("click", favoriteMessage);
loginBtn.addEventListener("click", login);
signOut.addEventListener("click", signOutFunc);
viewFaves.addEventListener("click", viewFaveClick);
goHome.addEventListener("click", goHomePage);
faveDisplay.addEventListener("click", deleteFaveMsg);

//FUNCTIONS

function hide(element) {
  element.classList.add("hidden");
}

function unhide(element) {
  element.classList.remove("hidden");
}

function goHomePage() {
  hide(page0Login);
  hide(page2Faves);
  unhide(page1Home);
}

function viewFaveClick() {
  hide(page0Login);
  hide(page1Home);
  unhide(page2Faves);
}
function signOutFunc() {
  hide(page1Home);
  hide(page2Faves);
  unhide(page0Login);
  location.reload();
}

function login(event) {
  event.preventDefault();
  heartIcon.classList.remove("fill-red");
  if (nameInput.value === "") {
    alert("Please type in your name! :)");
  } else {
    welcomeMsg.innerText = `Welcome ${nameInput.value}!`;
    namesFave.innerText = `✨${nameInput.value}'s Favourite Messages✨`;
    nameInput.value = "";
    hide(page0Login);
    hide(page2Faves);
    unhide(page1Home);
  }
}

function favoriteMessage() {
  heartIcon.classList.add("fill-red");
  var randomNum = Date.now();
  var faveObj = {
    message: messageDisplay.innerText,
    id: randomNum,
  };
  favesArr.push(faveObj);
  const h2 = document.createElement("h2");
  h2.textContent = faveObj.message;
  h2.id = randomNum;
  faveDisplay.appendChild(h2);

  const deleteX = document.createElement("deleteX");
  deleteX.textContent = "X";
  deleteX.classList.add("delete-fave");
  deleteX.id = randomNum;
  h2.appendChild(deleteX);
}

function deleteFaveMsg(e) {
  faveDisplay.innerHTML = "";
  for (var i = 0; i < favesArr.length; i++) {
    if (e.target.id == favesArr[i].id) {
      console.log(favesArr[i].id);
      favesArr.splice(i, 1);
    }
  }
  for (var i = 0; i < favesArr.length; i++) {
    const h2 = document.createElement("h2");
    h2.textContent = favesArr[i].message;
    h2.id = favesArr[i].id;
    faveDisplay.appendChild(h2);

    const deleteX = document.createElement("deleteX");
    deleteX.textContent = "X";
    deleteX.classList.add("delete-fave");
    deleteX.id = favesArr[i].id;
    h2.appendChild(deleteX);
  }
}

function submitMessage(event) {
  event.preventDefault();
  heartIcon.classList.remove("fill-red");
  if (messageCategory.value === "choose" || messageInput.value === "") {
    alert(
      "please select a message type and write your message into the text box :)"
    );
  } else if (messageCategory.value === "affirmation") {
    medIcon.classList.add("hidden");
    messageDisplay.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
    heartIcon.classList.remove("hidden");
    messageDisplay.innerText = messageInput.value;
    affirmationsArr.push(messageInput.value);
  } else if (messageCategory.value === "mantra") {
    medIcon.classList.add("hidden");
    messageDisplay.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
    heartIcon.classList.remove("hidden");
    messageDisplay.innerText = messageInput.value;
    mantrasArr.push(messageInput.value);
  }
}

function openForm() {
  if (addMessageForm.classList.contains("hide-form")) {
    addMessageForm.classList.remove("hide-form");
    addMyMessage.textContent = "close X";
  } else {
    addMessageForm.classList.add("hide-form");
    addMyMessage.textContent = "Add My Own Message";
    messageInput.value = "";
  }
}

function clearMessage() {
  heartIcon.classList.remove("fill-red");
  messageDisplay.innerText = "";
  clearBtn.classList.add("hidden");
  heartIcon.classList.add("hidden");
  medIcon.classList.remove("hidden");
}

function getMessage() {
  heartIcon.classList.remove("fill-red");
  heartIcon.classList.remove("hidden");
  medIcon.classList.add("hidden");
  clearBtn.classList.remove("hidden");
  if (messageDisplay.classList.contains("hidden")) {
    messageDisplay.classList.remove("hidden");
  }

  function checkArrLength(arr) {
    if (arr.length === 0) {
      messageDisplay.innerText =
        "You've read all the messages for the day :) You can refresh the page to see them again or add your own!";
    }
  }
  checkArrLength(mantrasArr);
  checkArrLength(affirmationsArr);

  function checkReadMantras(originalArr, readArr) {
    for (let i = 0; i < originalArr.length; i++) {
      for (let j = 0; j < readArr.length; j++) {
        if (originalArr[i] === readArr[j]) {
          originalArr.splice(i, 1);
        }
      }
    }
  }
  checkReadMantras(mantrasArr, mantrasArrRead);
  checkReadMantras(affirmationsArr, affirmationsArrRead);
  function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  var randNumMantras = getRandomIndex(mantrasArr);
  var randNumAffirmations = getRandomIndex(affirmationsArr);

  if (mantraRadio.checked && mantrasArr.length > 0) {
    messageDisplay.innerText = mantrasArr[randNumMantras];
    mantrasArrRead.push(messageDisplay.innerText);
  } else if (affirmationRadio.checked && affirmationsArr.length > 0) {
    messageDisplay.innerText = affirmationsArr[randNumAffirmations];
    affirmationsArrRead.push(messageDisplay.innerText);
  } else if (!affirmationRadio.checked && !mantraRadio.checked) {
    messageDisplay.classList.add("hidden");
    medIcon.classList.remove("hidden");
    clearBtn.classList.add("hidden");
    heartIcon.classList.add("hidden");
    alert("Please select which type of message you would like to recieve :)");
  }
}
