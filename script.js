let currentBalance = 1000000000.00;

function formatCurrency(num) {
    return "₦" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function generateSessionID() {
    let result = '200007' + Math.floor(100000 + Math.random() * 900000);
    for (let i = 0; i < 18; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function executeTransfer() {
    const bankSelect = document.getElementById('bank-select');
    const accountInput = document.getElementById('account-number');
    const recipientInput = document.getElementById('recipient');
    const amountInput = document.getElementById('amount');
    const errorMsg = document.getElementById('error-message');

    const bank = bankSelect.value;
    const account = accountInput.value.trim();
    const recipient = recipientInput.value.trim();
    const amount = parseFloat(amountInput.value);

    errorMsg.innerText = "";

    if (!bank) { return errorMsg.innerText = "Please choose a beneficiary bank."; }
    if (account.length !== 10 || isNaN(account)) { return errorMsg.innerText = "Account number must be 10 digits."; }
    if (!recipient) { return errorMsg.innerText = "Please specify a recipient name."; }
    if (isNaN(amount) || amount <= 0) { return errorMsg.innerText = "Please specify a valid amount."; }
    if (amount > currentBalance) { return errorMsg.innerText = "Insufficient balance for this simulation."; }

    currentBalance -= amount;
    document.getElementById('balance-display').innerText = formatCurrency(currentBalance);

    const now = new Date();
    const options = { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    };
    const formattedDate = now.toLocaleDateString('en-GB', options).replace(/,/g, '');

    document.getElementById('receipt-amount').innerText = formatCurrency(amount);
    document.getElementById('receipt-bank').innerText = bank;
    document.getElementById('receipt-account').innerText = account;
    document.getElementById('receipt-recipient').innerText = recipient.toUpperCase();
    document.getElementById('receipt-time').innerText = formattedDate;
    document.getElementById('receipt-session').innerText = generateSessionID();

    document.getElementById('success-modal').classList.remove('hidden');

    accountInput.value = "";
    recipientInput.value = "";
    amountInput.value = "";
    bankSelect.value = "";
}

function closeModal() {
    document.getElementById('success-modal').classList.add('hidden');
}
