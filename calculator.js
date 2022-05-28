"use strict";

const display = document.querySelector(".display");
const btnsNum = document.querySelectorAll(".btn-num");
const btnsMain = document.querySelectorAll(".btn-main");
const btnsOperator = document.querySelectorAll(".btn-operator");
const btnsCommand = document.querySelectorAll(".btn-command");
const btnEquals = document.querySelector(".equals");
const btnClear = document.querySelector(".clear");
display.textContent = 0;
let numCurr = [];
let numSelectionA;
let numSelectionB;
let opSelection;
let total;
const add = function (a, b) {
	return a + b;
};

const subtract = function (a, b) {
	return a - b;
};

const multiply = function (a, b) {
	return a * b;
};

const divide = function (a, b) {
	return a / b;
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
	console.log(numSelectionA, numSelectionB, opSelection, total);
};

btnsMain.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		let selection = e.target.textContent;
		if (e.target.classList.contains("btn-num")) {
			selection = +selection;
			numCurr.push(selection);
			display.textContent = numCurr.join("");
		} else {
			numSelectionA
				? (numSelectionB = +numCurr.join(""))
				: (numSelectionA = +numCurr.join(""));
			if (e.target.classList.contains("btn-operator")) {
				opSelection = selection;
			}
			numCurr = [];
			total = operate(numSelectionA, opSelection, numSelectionB);
			if (total) {
				display.textContent = total;
				numSelectionA = total;
			}
		}
	});
});

btnClear.addEventListener("click", init);

// need to solve click of equal sign followed by num not starting over.
// it is related to the if(total) code.
