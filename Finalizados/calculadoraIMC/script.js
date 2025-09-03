document.getElementById("calcular").addEventListener("click", function () {
    const pesoInput = document.getElementById("peso").value.trim();
    const alturaInput = document.getElementById("altura").value.trim();
    const valorImcEl = document.getElementById("valor-imc");
    const classificacaoEl = document.getElementById("classificacao");

    const peso = parseFloat(pesoInput.replace(",", "."));
    const altura = parseFloat(alturaInput.replace(",", "."));

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        valorImcEl.textContent = "IMC: —";
        classificacaoEl.textContent = "Classificação: Insira valores válidos.";
        classificacaoEl.className = "";
        return;
    }

    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2);

    valorImcEl.textContent = `IMC: ${imcFormatado}`;

    let classificacao = "";
    let classeCss = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        classeCss = "classificacao-below";
    } else if (imc < 25) {
        classificacao = "Peso normal";
        classeCss = "classificacao-normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        classeCss = "classificacao-over";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
        classeCss = "classificacao-obesity";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
        classeCss = "classificacao-obesity";
    } else {
        classificacao = "Obesidade grau III";
        classeCss = "classificacao-obesity";
    }

    classificacaoEl.textContent = `Classificação: ${classificacao}`;
    // ajustar classes para cor
    classificacaoEl.className = classeCss;

    const min = 15;
    const max = 45; // escala de 15 a 45+
    let percentual = ((imc - min) / (max - min)) * 100;
    if (percentual < 0) percentual = 0;
    if (percentual > 100) percentual = 100;
    marcador.style.left = `${percentual}%`;
    marcadorText.textContent = imcFormatado;
});
