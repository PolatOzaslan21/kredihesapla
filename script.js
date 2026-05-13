function calculateLoan() {
  const amount = parseFloat(document.getElementById("amount").value);
  const monthlyRate = parseFloat(document.getElementById("rate").value) / 100;
  const months = parseInt(document.getElementById("months").value);
  const errorMsg = document.getElementById("error-msg");
  const result = document.getElementById("result");

  if (!amount || !monthlyRate || !months || amount <= 0 || monthlyRate <= 0) {
    errorMsg.style.display = "block";
    result.classList.remove("show");
    return;
  }
  errorMsg.style.display = "none";

  // Eşit taksit (anüite) formülü: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthly = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const total = monthly * months;
  const interest = total - amount;

  document.getElementById("result-monthly").textContent = formatCurrency(monthly) + " TL";
  document.getElementById("result-total").textContent = formatCurrency(total) + " TL";
  document.getElementById("result-interest").textContent = formatCurrency(interest) + " TL";

  result.classList.add("show");
}

function formatCurrency(value) {
  return value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") calculateLoan();
});