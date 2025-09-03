# 📝 CRUD de Clientes com CrudCrud

Aplicação web simples para **cadastrar, listar e excluir clientes** usando a [API do CrudCrud](https://crudcrud.com/).  
Projeto feito para praticar o consumo de APIs com **Fetch API**.

---

## 📂 Estrutura do Projeto
```
/crud-clientes
  ├── index.html   # Interface da aplicação
  ├── scripts.js   # Código JS para consumir a API
  └── styles.css   # Estilos básicos (opcional)
```

---

## ⚙️ Funcionalidades
- **Cadastrar Cliente**: Inserir nome e e-mail e salvar na API.  
- **Listar Clientes**: Mostrar todos os clientes cadastrados.  
- **Excluir Cliente**: Remover um cliente pelo botão "Excluir".  

---

## 🚀 Como Executar
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/crud-clientes.git
   ```
2. Abra o arquivo `index.html` no navegador.  

---

## 🔑 Configuração da API
O CrudCrud gera um **endpoint único e temporário (24h)**.  
No arquivo `scripts.js`, substitua a constante `API_BASE` pela sua URL do CrudCrud:

```javascript
const API_BASE = "https://crudcrud.com/api/SEU_ENDPOINT_AQUI/clientes";
```

---

## 🛠️ Tecnologias Utilizadas
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Fetch API**
- **CrudCrud**

---

## 📸 Demonstração
- Formulário para cadastrar clientes  
- Lista de clientes cadastrados  
- Botão de exclusão individual  

---

## 📌 Observações
- O endpoint do CrudCrud expira a cada 24h. Sempre que expirar, gere um novo e substitua em `scripts.js`.  
- Recomendado testar as requisições também pelo DevTools (`F12 → Network`).  

---
👨‍💻 Desenvolvido para fins de estudo.
