const API_BASE = "https://crudcrud.com/api/52142bdbcae04e39a62367ec7349368e/clientes";

const form = document.getElementById("clienteForm");
const clientesList = document.getElementById("clientesList");

// Cadastrar Cliente
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    });

    if (response.ok) {
      form.reset();
      carregarClientes();
    } else {
      console.error("Erro ao cadastrar cliente");
    }
  } catch (error) {
    console.error("Erro de rede:", error);
  }
});

// Listar Clientes
async function carregarClientes() {
  clientesList.innerHTML = "";

  try {
    const response = await fetch(API_BASE);
    const clientes = await response.json();

    clientes.forEach((cliente) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${cliente.nome} - ${cliente.email}
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      `;
      clientesList.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
}

// Excluir Cliente
let clienteParaExcluir = null; // Guardar o id do cliente a ser excluído

const modal = document.getElementById("modalConfirm");
const btnConfirm = document.getElementById("btnConfirm");
const btnCancel = document.getElementById("btnCancel");

async function excluirCliente(id) {
  clienteParaExcluir = id;
  modal.style.display = "block"; // Mostrar o modal
}

// Se clicar em "Sim"
btnConfirm.addEventListener("click", async () => {
  if (!clienteParaExcluir) return;

  try {
    const response = await fetch(`${API_BASE}/${clienteParaExcluir}`, { method: "DELETE" });
    if (response.ok) {
      carregarClientes();
    } else {
      console.error("Erro ao excluir cliente");
    }
  } catch (error) {
    console.error("Erro de rede:", error);
  }

  modal.style.display = "none";
  clienteParaExcluir = null;
});

// Se clicar em "Cancelar"
btnCancel.addEventListener("click", () => {
  modal.style.display = "none";
  clienteParaExcluir = null;
});

// Fechar modal se clicar fora da caixa
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    clienteParaExcluir = null;
  }
});


// Carregar lista inicial
carregarClientes();
