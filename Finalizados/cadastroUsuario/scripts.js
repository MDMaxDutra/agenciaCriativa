// ===== FUNÇÃO DE PREENCHEMENTO AUTOMÁTICO DO CEP =====
document.getElementById("cep").addEventListener("blur", function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById("rua").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                    mostrarToast("Endereço preenchido automaticamente!", "info");
                    salvarDados(); // salva automaticamente
                } else {
                    mostrarToast("CEP não encontrado!", "error");
                }
            })
            .catch(() => mostrarToast("Erro ao consultar CEP!", "error"));
    }
});

// ===== FUNÇÕES DE TOAST =====
function mostrarToast(mensagem, tipo = "info", duracao = 3000) {
    const container = document.getElementById("notificacoes");
    const icones = {
        success: "✔️",
        error: "❌",
        info: "ℹ️",
        warning: "⚠️"
    };

    const toast = document.createElement("div");
    toast.classList.add("toast", tipo);
    toast.innerHTML = `<span class="icone">${icones[tipo] || ""}</span> ${mensagem}`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add("mostrar"), 100);

    setTimeout(() => {
        toast.classList.remove("mostrar");
        setTimeout(() => container.removeChild(toast), 500);
    }, duracao);
}

// ===== FUNÇÕES DE SALVAR E RESTAURAR DADOS =====
function salvarDados() {
    const form = document.getElementById("cadastroForm");
    const dados = {};
    Array.from(form.elements).forEach(el => {
        if (el.name) dados[el.name] = el.value;
    });
    localStorage.setItem("cadastro", JSON.stringify(dados));
}

function restaurarDados() {
    const dados = JSON.parse(localStorage.getItem("cadastro"));
    if (dados) {
        const form = document.getElementById("cadastroForm");
        Object.keys(dados).forEach(key => {
            if (form.elements[key]) form.elements[key].value = dados[key];
        });
    }
}

// ===== EVENTOS DO FORMULÁRIO =====
document.getElementById("cadastroForm").addEventListener("submit", function(e) {
    e.preventDefault();
    salvarDados();
    mostrarToast("Cadastro salvo com sucesso!", "success");
});

document.getElementById("limparBtn").addEventListener("click", function() {
    document.getElementById("cadastroForm").reset();
    localStorage.removeItem("cadastro");
    mostrarToast("Dados do formulário limpos!", "warning");
});

// ===== CARREGAR DADOS AO INICIAR =====
document.addEventListener("DOMContentLoaded", restaurarDados);
