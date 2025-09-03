// app.js → Código principal
import { Cliente, ClienteService } from "./classes.js";
import { criarElemento } from "./utils.js";

const API_BASE = "https://crudcrud.com/api/7b36bccd7b034853b6cb30e327cbca1e/clientes";
const clienteService = new ClienteService(API_BASE);

const form = document.getElementById("clienteForm");
const clientesList = document.getElementById("clientesList");
const modal = document.getElementById("modalConfirm");
const btnConfirm = document.getElementById("btnConfirm");
const btnCancel = document.getElementById("btnCancel");

let clienteParaExcluir = null;

// === Eventos ===
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) return alert("Preencha todos os campos!");

  const cliente = new Cliente(nome, email);
  await clienteService.cadastrar(cliente);

  form.reset();
  carregarClientes();
});

// Carregar clientes na tela
async function carregarClientes() {
  clientesList.innerHTML = "";

  const clientes = await clienteService.listar();

  // usando map() para transformar a lista em elementos DOM
  clientes.map(cliente => {
    const li = criarElemento("li", {}, 
      `${cliente.nome} - ${cliente.email}`,
      criarElemento("button", { onClick: () => abrirModal(cliente._id) }, "Excluir")
    );
    clientesList.appendChild(li);
  });
}

// Modal de exclusão
function abrirModal(id) {
  clienteParaExcluir = id;
  modal.style.display = "flex";
}

btnConfirm.addEventListener("click", async () => {
  if (clienteParaExcluir) {
    await clienteService.excluir(clienteParaExcluir);
    carregarClientes();
  }
  fecharModal();
});

btnCancel.addEventListener("click", fecharModal);

function fecharModal() {
  modal.style.display = "none";
  clienteParaExcluir = null;
}

// Fechar modal clicando fora
window.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

// Inicializar
carregarClientes();
