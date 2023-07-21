//QUERYING THE DOM

var messageBtn = document.querySelector(".recieve-message-btn");
var affirmationRadio = document.getElementById("affirmation");
var mantraRadio = document.getElementById("mantra");
//meditation icon
var medIcon = document.querySelector(".meditation-icon");
//message
var messageDisplay = document.querySelector(".message-text");
//hidden btn
var clearBtn = document.querySelector(".clear-btn");
//add my own message btn
var addMyMessage = document.querySelector(".add-message-btn");
//personalized form
var addMessageForm = document.querySelector(".add-message-form");
//submit my message button
var submitMessageBtn = document.querySelector(".submit-msg-btn");
//select dropdown
var messageCategory = document.getElementById("message-category");
//message input field
var messageInput = document.getElementById("message-input");
//heart icon
var heartIcon = document.querySelector(".heart-icon");
//fave display
var faveDisplay = document.querySelector(".fave-display");
//delete fave x
var deleteFaveX = document.querySelector(".delete-fave");
//login-btn
var loginBtn = document.querySelector(".login-sign-in");
//login-name-value:
var nameInput = document.querySelector(".login-input");
//welcome message
var welcomeMsg = document.querySelector(".welcome");
// names favourites:
var namesFave = document.querySelector(".names-favorites");
// view favourites:
var viewFaves = document.querySelector(".view-favorites");
// signout
var signOut = document.querySelector(".sign-out");
//go home
var goHome = document.querySelector(".go-home");

//pages
var page0Login = document.querySelector(".PAGE0-LOGIN");
var page1Home = document.querySelector(".PAGE1-HOME");
var page2Faves = document.querySelector(".PAGE2-FAVES");
// click x
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
function goHomePage() {
  page0Login.classList.add("hidden");
  page1Home.classList.remove("hidden");
  page2Faves.classList.add("hidden");
}

function viewFaveClick() {
  page0Login.classList.add("hidden");
  page1Home.classList.add("hidden");
  page2Faves.classList.remove("hidden");
}
function signOutFunc() {
  page0Login.classList.remove("hidden");
  page1Home.classList.add("hidden");
  page2Faves.classList.add("hidden");
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
    page0Login.classList.add("hidden");
    page1Home.classList.remove("hidden");
    page2Faves.classList.add("hidden");
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
  var randNumMantras = getRandomIndex(mantrasArr);
  var randNumAffirmations = getRandomIndex(affirmationsArr);
  heartIcon.classList.remove("hidden");
  medIcon.classList.add("hidden");
  clearBtn.classList.remove("hidden");
  if (messageDisplay.classList.contains("hidden")) {
    messageDisplay.classList.remove("hidden");
  }
  if (mantraRadio.checked) {
    messageDisplay.innerText = mantrasArr[randNumMantras];
  } else if (affirmationRadio.checked) {
    messageDisplay.innerText = affirmationsArr[randNumAffirmations];
  } else if (!affirmationRadio.checked && !mantraRadio.checked) {
    messageDisplay.classList.add("hidden");
    medIcon.classList.remove("hidden");
    clearBtn.classList.add("hidden");
    heartIcon.classList.add("hidden");
    alert("Please select which type of message you would like to recieve :)");
  }
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
