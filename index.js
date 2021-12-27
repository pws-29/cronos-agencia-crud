// Ações de Modal
let Modal = {
  open() {
    // Abrir modal
    // Adicionar a classe "active" ao modal
    document.querySelector('.modal-overlay').classList.add('active');
  },

  close() {
    // Fechar modal
    // Remover a classe "active" do modal
    document.querySelector('.modal-overlay').classList.remove('active');
  }
}
// Ações de Modal

// Local Storage API
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("cronos.cursos:cursos")) || [];
  },

  set() {
    localStorage.setItem("cronos.cursos:cursos", JSON.stringify(cursos)); // Array -> String
  }
}
// Local Storage API

// Lista Cursos
let cursos = [
  {
    id: 1,
    nome: "Desenvolvimento Web",
    descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti.",
    imagem: "./imagens/ilustra-web.png",
  },
  {
    id: 2,
    nome: "Marketing Digital",
    descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti.",
    imagem: "./imagens/ilustra-marketing.png",
  },
  {
    id: 3,
    nome: "Consultoria UX",
    descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti.",
    imagem: "./imagens/ilustra-ux.png",
  },
]
// Lista Cursos

// Informações formulário
const Form = {
  getValues() {
    return {
      nome: document.querySelector("#name").value,
      descricao: document.querySelector("#description").value,
      imagem: document.querySelector('input[name="input-img"]:checked').value,
    }
  },

  submit(event) {
    // Alterar comportamento padrão do submit
    event.preventDefault();

    // Buscar valores do Form
    const Cursos = Form.getValues();
    // Fechar o modal
    Modal.close();
    console.log(Cursos);
  }
}

// Informações formulário
