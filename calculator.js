"use strict";

const display = document.querySelector(".display");
const btnsNum = document.querySelectorAll(".btn-num");
const btnsMain = document.querySelectorAll(".btn-main");
const btnsOperator = document.querySelectorAll(".btn-operator");
const btnsCommand = document.querySelectorAll(".btn-command");
const btnClear = document.querySelector(".clear");
display.textContent = 0;
let numCurr = [];
let numSelectionA;
let numSelectionB;
let opSelection;
let opSelectionB;
let total;
let equalClicked;

const add = function (a, b) {
	let total = a + b;
	return total % 1 !== 0 ? +total.toFixed(2) : total;
};

const subtract = function (a, b) {
	let total = a - b;
	return total % 1 !== 0 ? +total.toFixed(2) : total;
};

const multiply = function (a, b) {
	let total = a * b;
	return total % 1 !== 0 ? +total.toFixed(2) : total;
};

const divide = function (a, b) {
	if (b === 0) return;

	let total = a / b;
	return total % 1 !== 0 ? +total.toFixed(2) : total;
};

const operate = function (a, operator, b) {
	if (typeof a !== "number" || typeof b !== "number") return;
	if (
		operator !== "+" &&
		operator !== "-" &&
		operator !== "*" &&
		operator !== "/"
	)
		return;
	if (operator === "+") return add(a, b);
	if (operator === "-") return subtract(a, b);
	if (operator === "*") return multiply(a, b);
	if (operator === "/") return divide(a, b);
};

const init = function () {
	numCurr = [];
	numSelectionA = undefined;
	numSelectionB = undefined;
	opSelection = undefined;
	total = undefined;
	display.textContent = 0;
};

btnsMain.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		let selection = e.target.textContent;
		// to prevent multiple decimal points in user entry
		if (numCurr.includes(".") && selection === ".") return;
		if (e.target.classList.contains("btn-num")) {
			selection = selection === "." ? selection : +selection;
			numCurr.push(selection);
			display.textContent = numCurr.join("");

			// To prevent carryover of values if a number is clicked
			//instead of another operator after equal has given a total
			if (equalClicked) {
				total = undefined;
				numSelectionA = undefined;
				numSelectionB = undefined;
			}
		} else {
			// Reset to continue calculations if operator clicked after an equal has totalled.
			equalClicked = false;

			numSelectionA
				? (numSelectionB = +numCurr.join(""))
				: (numSelectionA = +numCurr.join(""));

			if (e.target.classList.contains("btn-operator")) {
				if (opSelection) {
					total = operate(numSelectionA, opSelection, numSelectionB);
					opSelection = selection;
				} else {
					opSelection = selection;
					if (numSelectionA && opSelection && numSelectionB) {
						total = operate(numSelectionA, opSelection, numSelectionB);
					}
				}
			}
			numCurr = [];
			if (e.target.classList.contains("equals")) {
				total = operate(numSelectionA, opSelection, numSelectionB);
				opSelection = undefined;
				equalClicked = true;
			}

			if (total) {
				display.textContent = total;
				numSelectionA = total;
			}
		}
	});
});

btnClear.addEventListener("click", init);

// Need to fix decimal function
