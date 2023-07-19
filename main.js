// goal: when a user selects a message option and then clicks the “Receive Message” button, the user sees a random message from the list of possible messages for that category
// goal: When the message appears, the mediation icon disappears from the message area
//select the button.
// When that button is clicked, get the value of the radio button was clicked.
// if mantra or affirmation was clicked, remove the image
// if mantra was clicked, loop through the mantra array and display the message at random index into the message area
// if affirmation was clicked, loop through the affirmation array and display the random index into the message area.

//QUESTION: Why can't I access the arrays globally?

//QUERYING THE DOM
//form
var messageBtn = document.querySelector(".recieve-message-btn");
var affirmationRadio = document.getElementById("affirmation");
var mantraRadio = document.getElementById("mantra");
//meditation icon
var medIcon = document.querySelector(".meditation-icon");
//message
var messageDisplay = document.querySelector(".message-text");
//hidden btn
var clearBtn = document.querySelector(".clear-btn");

//EVENT LISTENERS
messageBtn.addEventListener("click", getMessage);
clearBtn.addEventListener("click", clearMessage);
//FUNCTIONS
function clearMessage() {
  messageDisplay.innerText = "";
  clearBtn.classList.add("hidden");
  medIcon.classList.remove("hidden");
}

function getMessage() {
  var randNumMantras = getRandomIndex(mantrasArr);
  var randNumAffirmations = getRandomIndex(affirmationsArr);
  clearBtn.classList.remove("hidden");
  medIcon.classList.add("hidden");
  if (messageDisplay.classList.contains("hidden")) {
    messageDisplay.classList.remove("hidden");
  }
  if (mantraRadio.checked == true) {
    for (var i = 0; i < mantrasArr.length; i++) {
      messageDisplay.innerText = mantrasArr[randNumMantras];
    }
  } else if (affirmationRadio.checked == true) {
    for (var i = 0; i < affirmationsArr.length; i++) {
      messageDisplay.innerText = affirmationsArr[randNumAffirmations];
    }
  } else if (
    affirmationRadio.checked == false &&
    mantraRadio.checked == false
  ) {
    messageDisplay.classList.add("hidden");
    medIcon.classList.remove("hidden");
    clearBtn.classList.add("hidden");
    alert("Please select which type of message you would like to recieve :)");
  }
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
