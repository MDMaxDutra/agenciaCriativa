// classes.js → Definição das classes

export class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

export class ClienteService {
  constructor(apiBase) {
    this.apiBase = apiBase;
  }

  async listar() {
    const res = await fetch(this.apiBase);
    return res.json();
  }

  async cadastrar(cliente) {
    const res = await fetch(this.apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    return res.json();
  }

  async excluir(id) {
    return fetch(`${this.apiBase}/${id}`, { method: "DELETE" });
  }
}
