let loanForm;
let amount;
let interest;
let years;
let monthlyPayment;
let totalPayment;
let totalInterest

function findElements() {
	loanForm = document.querySelector('#loan-form');
	amount = document.querySelector('#amount');
	interest = document.querySelector('#interest');
	years = document.querySelector('#years');
	monthlyPayment = document.querySelector('#monthly-payment');
	totalPayment = document.querySelector('#total-payment');
	totalInterest = document.querySelector('#total-interest');
}

function calculateResult(event) {
	const principal = parseFloat(amount.value);
	const calculateInterest = parseFloat(interest.value) / 100 /12;
	const calculatedPayments = parseFloat(years.value) * 12;
	//Compute mounthly payments
	const x = Math.pow(1 + calculateInterest, calculatedPayments);
	const monthly = (principal * x * calculateInterest) / (x - 1);

		if (isFinite(monthly)) {
			monthlyPayment.value = monthly.toFixed(2);
			totalPayment.value = (monthly * calculatedPayments).toFixed(2);
			totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
		}
		else {
			showError('Please, check your numbers');
		}

	event.preventDefault();
}

function showError(error) {
	const errorDiv = document.createElement('div');
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');
	errorDiv.classList = 'alert alert-danger';
	errorDiv.appendChild(document.createTextNode(error));
	card.insertBefore(errorDiv, heading);
	setTimeout(clearError, 3000);
}

function clearError() {
	document.querySelector('.alert').remove();
}

function subscribe() {
	loanForm.addEventListener('submit', calculateResult)
}

function init() {
	findElements();
	subscribe();
}

window.onload = init;