"use strict";

const display = document.querySelector(".display");
const btnsNum = document.querySelectorAll(".btn-num");
const btnsMain = document.querySelectorAll(".btn-main");
const btnsOperator = document.querySelectorAll(".btn-operator");
const btnsCommand = document.querySelectorAll(".btn-command");
const btnEquals = document.querySelector(".equals");
const btnClear = document.querySelector(".clear");
const btnDelete = document.querySelector(".delete");

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

const totalOngoing = function (total) {
	display.textContent = total;
	numSelectionA = total;
};

const init = function () {
	numCurr = [];
	numSelectionA = undefined;
	numSelectionB = undefined;
	opSelection = undefined;
	total = undefined;
	display.textContent = 0;
};

const backSpace = function () {
	if (!numCurr[0]) return;
	numCurr.pop();
	display.textContent = numCurr.join("");
};

btnsNum.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		let selection = e.target.textContent;
		// to prevent multiple decimal points in user entry
		if (numCurr.includes(".") && selection === ".") return;

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
	});
});

btnsOperator.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		let selection = e.target.textContent;

		// to make sure equal isn't clicked without a number first to total
		if (selection === "=" && !numSelectionA) return;

		// Reset to continue calculations if operator clicked after an equal has totalled.
		equalClicked = false;

		if (numSelectionA) numSelectionB = +numCurr.join("");
		if (!numSelectionA) numSelectionA = +numCurr.join("");
		numCurr = [];

		// Checks to see if an operator is the inital operator or part of an ongoing calculation.
		if (opSelection && selection !== "=") {
			total = operate(numSelectionA, opSelection, numSelectionB);
			opSelection = selection;
		}
		if (!opSelection && selection) {
			opSelection = selection;
			total = operate(numSelectionA, opSelection, numSelectionB);
		}

		if (selection === "=") {
			total = operate(numSelectionA, opSelection, numSelectionB);
			console.log(numSelectionA, opSelection, numSelectionB);
			opSelection = undefined;
			equalClicked = true;
			totalOngoing(total);
		}

		if (total) {
			totalOngoing(total);
		}
	});
});

btnClear.addEventListener("click", init);

btnDelete.addEventListener("click", backSpace);

display.textContent = 0;
