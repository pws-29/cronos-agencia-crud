// Ações de Modal
let Modal = {
  open() {
    // Abrir modal
    // Adicionar a classe "active" ao modal
    document.querySelector('.modal-overlay').classList.add('active');
    document.querySelector('[data-behavior="modalForm"] #name').focus();
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

  set(cursos) {
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

// CRUD curso
const Curso = {
  // Recupera valores do localStorage
  all: Storage.get(),

  add(curso) {
    Curso.all.push(curso) // adicionar curso no localStorage

    App.reload();
  },

  destroy(cursoId) {

    const cursoEncontrado = Curso.all.find(curso => curso.id === cursoId);
    const indexDoCursoEncontrado = Curso.all.indexOf(cursoEncontrado) // poderíamos ter feito findIndex sem window.confirm

    // Semáforo (if else com estrutura reduzida)
    if (!window.confirm(`Deseja excluir o curso: ${cursoEncontrado.nome}?`))
      return;

    Curso.all.splice(indexDoCursoEncontrado, 1);

    App.reload();
  },

  edit(cursoId) {


  },
}
// CRUD curso

// Montando DOM
const DOM = {
  // corpo da tabela (onde os cursos são inseridos)
  cursosTabela: document.querySelector('[data-behavior="tbodyCursos"]'), // refatorar data-behavior. classe apenas para estilizar

  addCurso(curso) {
    DOM.cursosTabela.innerHTML += DOM.innerHTMLCursos(curso);
  },

  innerHTMLCursos(curso) {
    const htmlCursos = `
    <tr>
    <td>${curso.nome}</td>
    <td><img src="${curso.imagem}" class="img-fluid" /></td>
    <td>${curso.descricao}</td>
    <td>
      <button class="btn btn-secondary m-1">editar</button>
      <button class="btn btn-danger m-1">excluir</button>
    </td>
  </tr>
    `

    return htmlCursos
  },

  // limpar o html no Reload para não duplicar a informação
  limparHtmlTabela() {
    DOM.cursosTabela.innerHTML = "";
  }

}

// Montando DOM

// Informações formulário
const Form = {
  getValues() {
    return {
      nome: document.querySelector("#name").value,
      descricao: document.querySelector("#description").value,
      imagem: document.querySelector('input[name="input-img"]:checked').value,
    }
  },

  limparCampos() {
    document.querySelector("#name").value = ""; // Limpar input do nome
    document.querySelector("#description").value = ""; // Limpar input da descricao
    document.getElementById("img-web").checked = true; // Retornar o valor checked pra img 1.
  },

  validarCampos(cursos) {
    // Valida se os campos nome e descricao estão preenchidos
    const { nome, descricao } = cursos; // desestruturação

    if (descricao.trim() === "" || nome.trim() === "") { // trim remove os espaços em branco
      throw new Error("[Erro] Todos os campos devem ser preenchidos!")
    }
  },

  submit(event) {
    // Alterar comportamento padrão do submit
    event.preventDefault();

    try {
      // Buscar valores do Form
      const curso = Form.getValues();
      // Validando campos do Formulário
      Form.validarCampos(curso);
      // Apagar campos do formulário
      Form.limparCampos();
      // Fechar o modal
      Modal.close();
      // Salvar curso e Reload
      Curso.add(curso)
    } catch (error) {
      alert(error.message)
    }

  }
}
// Informações formulário

// Funções iniciar App
const App = {
  init() {
    // Montando html
    Curso.all.forEach(DOM.addCurso);

    // Set storage
    Storage.set(Curso.all);
  },
  reload() {
    DOM.limparHtmlTabela();
    App.init();
  }
}
// Funções iniciar App

App.init();