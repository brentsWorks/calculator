let userInputOne = "";
let userInputTwo = "";
let userOperator = "";

const numPadBtns = document.querySelectorAll(".buttonGrid.numPad");
const inputContent = document.querySelector(".inputContent");
let displayContent = "";

let isDecimal = false;

/* 
This function adds display-responsivity for each numpad button (decimal, 0-9).
*/
numPadBtns.forEach((button) => {
  button.addEventListener('click', () => {
	if (button.id == "decimalButton") {
		if (isDecimal) {
			return;
		} else {
			isDecimal = true;
		}
	}
    displayContent += button.textContent;
	inputContent.textContent = displayContent;
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
			userInputOne = "";
			userInputTwo = "";
			isDecimal = false;
			return;
		});
	} else if (button.id == "deleteButton") {
		button.addEventListener('click', () => {
			if (displayContent.length > 1) {
				displayContent = displayContent.substring(0, displayContent.length-1);
				inputContent.textContent = displayContent;
			} else if (displayContent.length == 1) {
				displayContent = "";
				inputContent.textContent = 0;
				userInputOne = "";
				userInputTwo = "";
				isDecimal = false;
			}
			return;
		});
	}
});


/*
This function maps button ID's to operator symbols for function call ease.
*/
const mapOperator = function (buttonID) {
	switch(buttonID) {
		case 'moduloButton':
			return '%';
		case 'divideButton':
			return '/';
		case 'timesButton':
			return '*';
		case 'subtractButton':
			return '-';
		case 'additionButton':
			return '+';
	}
	return ;
}


/*
This functon serves as a second half of input capture and operation functionality.
Includes work for final calculations and logic for continued arithmetic.
*/
const calcButton = document.getElementById("calculateButton");
calcButton.addEventListener("click", () => {
	let result;
	if (userInputOne == "" || userOperator == "" ) {
		// If first half of calculation has not happened, disregard click
		return;
	} else {
		// Otherwise we capture our 2nd input and perform our calculations
		userInputTwo = parseFloat(displayContent);
		if ((userInputOne == 0 || userInputTwo == 0) && userOperator == "/") {
			alert("You may not divide 0 by any number, or divide any number by 0!");
			return;
		}
		result = operate(userInputOne, userInputTwo, userOperator);
		inputContent.textContent = result;
		// Calculation is displayed and second input is cleared, first input set to result
		userInputOne = result;
		userInputTwo = "";
	}
})


/*
This function adds half of input capture and operation functionality. (Excludes calculation)
*/
const opButtons = document.querySelectorAll(".buttonGrid.math");
opButtons.forEach((button) => {
	if (button.getAttribute("class") == "buttonGrid math operator") {
		button.addEventListener("click", () => {
			// if userInputOne empty, capture first input and operator
			if (userInputOne == "") {
				userInputOne = parseFloat(displayContent); 		
			}
			userOperator = mapOperator(button.id);		// map buttonID to operator symbol
			displayContent = "";
		})
	}
})


/*
These functions integrate simple numeric calculation functionality into our calculator.
*/
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

const modulo = function (numOne, numTwo) {
	return numOne%numTwo;
}


/*
The operator function serves as a median for carrying out each mathematic calculation 
between two numbers based on a given operator, all provided as user input in this case.
*/
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
		case '%':
			return modulo(numOne, numTwo);
	}
	return;
}
