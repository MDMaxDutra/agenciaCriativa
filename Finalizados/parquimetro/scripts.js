class Parquimetro {
    constructor(tabelaPrecos) {
        // Ordena do maior preço para o menor
        this.tabelaPrecos = tabelaPrecos.sort((a, b) => b.preco - a.preco);
    }

    calcular(valor) {
        if (valor < 1) {
            return { mensagem: "Valor insuficiente", tempo: 0, troco: valor };
        }

        // Encontra a maior faixa que o valor cobre
        let faixaEscolhida = this.tabelaPrecos.find(faixa => valor >= faixa.preco);

        if (!faixaEscolhida) {
            return { mensagem: "Valor insuficiente", tempo: 0, troco: valor };
        }

        let troco = parseFloat((valor - faixaEscolhida.preco).toFixed(2));

        return { 
            mensagem: `Tempo adquirido: ${faixaEscolhida.tempo} min`, 
            tempo: faixaEscolhida.tempo, 
            troco: troco
        };
    }
}

// Criar instância com tabela de preços
const tabelaPrecos = [
    { preco: 1.00, tempo: 30 },
    { preco: 1.75, tempo: 60 },
    { preco: 3.00, tempo: 120 }
];
const parquimetro = new Parquimetro(tabelaPrecos);

// Eventos de interface
document.getElementById("btnCalcular").addEventListener("click", () => {
    const valor = parseFloat(document.getElementById("valor").value);
    const resultado = parquimetro.calcular(valor);

    const divResultado = document.getElementById("resultado");
    if (resultado.tempo > 0) {
        divResultado.innerHTML = `
            <p>${resultado.mensagem}</p>
            <p>Troco: R$ ${resultado.troco.toFixed(2)}</p>
        `;
    } else {
        divResultado.innerHTML = `<p style="color:red;">${resultado.mensagem}</p>`;
    }
});
