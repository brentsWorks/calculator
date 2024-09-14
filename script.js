let numOne, numTwo;
let operator;

const numPadBtns = document.querySelectorAll(".buttonGrid.numPad");
const inputContent = document.querySelector(".inputContent");
let displayContent = "";

/* 
This function adds display-responsivity for each numpad button (decimal, 0-9).
*/
numPadBtns.forEach((button) => {
  button.addEventListener('click', () => {
    displayContent += button.textContent;
	inputContent.textContent = displayContent;
	// if buttonPressed (class), listen until operator input to collect first #
	// then collect operator & reset buttonPressed, listen for second
	// num input, and listen for =
  });
});


/*
This function adds functionality for our DEL (backspace) and CLR buttons.
*/
const funcBtns = document.querySelectorAll(".buttonGrid.func");
funcBtns.forEach((button) => {
	if (button.id == "clearButton") {
		button.addEventListener('click', () => {
			displayContent = "";
			inputContent.textContent = "0";
			return;
		})
	} else if (button.id == "deleteButton") {
		button.addEventListener('click', () => {
			if (displayContent.length > 1) {
				displayContent = displayContent.substring(0, displayContent.length-1);
				inputContent.textContent = displayContent;
			} else if (displayContent.length == 1) {
				displayContent = "";
				inputContent.textContent = 0;
			}
			return;
		})
	}
})

const add = function (numOne, numTwo) {
	return numOne+numTwo;
}

const subtract = function (numOne, numTwo) {
	return numOne-numTwo;
}

const multiply = function (numOne, numTwo) {
	return numOne*numTwo;
}

const divide = function (numOne, numTwo) {
	return numOne/numTwo;
}

const operate = function (numOne, numTwo, operator) {
	switch (operator) {
		case '+':
			return add(numOne, numTwo);
		case '-':
			return subtract(numOne, numTwo);
		case '*':
			return multiply(numOne, numTwo);
		case '/':
			return divide(numOne, numTwo);
	}
	return ;
}
