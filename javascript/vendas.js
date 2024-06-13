document.addEventListener("DOMContentLoaded", () => {
    const barcode1Input = document.getElementById("barcode1");
    const barcode2Input = document.getElementById("barcode2");
    const checkButton = document.getElementById("check-button");
    const resultElement = document.getElementById("result");

    checkButton.addEventListener("click", () => {
        const barcode1 = barcode1Input.value.trim();
        const barcode2 = barcode2Input.value.trim();

        if (barcode1 === barcode2) {
            resultElement.textContent = "Os códigos de barras são iguais.";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = "Os códigos de barras são diferentes.";
            resultElement.style.color = "red";
        }
    });
});
