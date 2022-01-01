// Ações de Modal -----------------------------------
let Modal = {
  open() {
    // Abrir modal adicionando classe "active";
    // Focar no primeiro input ao abrir modal;
    document.querySelector('.modal-overlay').classList.add('active');
    document.querySelector('[data-behavior="modalForm"] #name').focus();
  },

  close() {
    // Limpar os campos preenchidos ao fechar o modal (cancelar ou salvar);
    // Fechar o modal removendo a classe "active";
    Form.limparCampos();
    document.querySelector('.modal-overlay').classList.remove('active');
  }
}
// Ações de Modal -----------------------------------

// Local Storage API -----------------------------------
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("cronos.cursos:cursos")) || [];
  },

  set(cursos) {
    localStorage.setItem("cronos.cursos:cursos", JSON.stringify(cursos)); // Array -> String
  }
}
// Local Storage API -----------------------------------

// Lista de cursos iniciais -----------------------------------
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
// Lista de cursos iniciais -----------------------------------

// Funções CRUD para os cursos -----------------------------------
const Curso = {
  // Recupera valores do localStorage
  all: Storage.get(),

  add(curso) {
    Curso.all.unshift({
      ...curso,
      id: uuidv4()
    })

    App.reload();
  },

  destroy(cursoId) {
    const cursoEncontrado = Curso.all.find(curso => curso.id === cursoId);
    const indexDoCursoEncontrado = Curso.all.indexOf(cursoEncontrado); // poderíamos ter feito findIndex sem window.confirm;

    // Semáforo (if else com estrutura reduzida. Caso o usuário cancele, o sistema para o fluxo);
    if (!window.confirm(`Deseja excluir o curso: ${cursoEncontrado.nome}?`))
      return;

    Curso.all.splice(indexDoCursoEncontrado, 1);

    App.reload();
  },

  edit(cursoId) {
    const cursoEncontrado = Curso.all.find(curso => curso.id === cursoId);

    Form.setValues(cursoEncontrado);

    Modal.open();
  },

  update(cursoEditado) {
    const cursoId = cursoEditado.id;
    const cursoEncontrado = Curso.all.find(curso => curso.id === cursoId);

    Object.keys(cursoEditado).forEach(chave => cursoEncontrado[chave] = cursoEditado[chave]);

    // cursoEncontrado.nome = cursoEditado.nome;
    // cursoEncontrado.descricao = cursoEditado.descricao;
    // cursoEncontrado.imagem = cursoEditado.imagem;

    App.reload();
  }
}
// Funções CRUD para os cursos -----------------------------------

// Montando DOM -----------------------------------
const DOM = {
  // corpo da tabela (onde os cursos são inseridos);
  cursosTabela: document.querySelector('[data-behavior="tbodyCursos"]'), // convenção data-behavior para interagir com JS;

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
      <button class="btn btn-secondary m-1" onclick="Curso.edit('${curso.id}')">editar</button>
      <button class="btn btn-danger m-1" onclick="Curso.destroy('${curso.id}')">excluir</button>
    </td>
  </tr>
    `

    return htmlCursos
  },

  // limpar o html no Reload para não duplicar a informação. Idempotencia;
  limparHtmlTabela() {
    DOM.cursosTabela.innerHTML = "";
  }

}

// Montando DOM -----------------------------------

// Informações formulário -----------------------------------
const Form = {

  setValues(cursoEncontrado) {
    // Recuperando os valores do curso que será editado e colocoando-os no formulário;
    document.querySelector("#name").value = cursoEncontrado.nome;
    document.querySelector("#description").value = cursoEncontrado.descricao;
    document.querySelector('input[name="cursoId"]').value = cursoEncontrado.id; // Input hidden;
    document.querySelector(`input[value="${cursoEncontrado.imagem}"]`).checked = true;
  },

  getValues() {
    // Pegando os valores preenchidos no formulário;
    return {
      nome: document.querySelector("#name").value,
      descricao: document.querySelector("#description").value,
      imagem: document.querySelector('input[name="input-img"]:checked').value,
      id: document.querySelector('input[name="cursoId"]').value,
    }
  },

  limparCampos() {
    // Limpar input do nome;
    document.querySelector("#name").value = "";
    // Limpar input da descricao;
    document.querySelector("#description").value = "";
    // Retornar o valor checked pra img 1;
    document.getElementById("img-web").checked = true;
  },

  validarCampos(cursos) {
    // Valida se os campos nome e descricao estão preenchidos;
    // desestruturação;
    const { nome, descricao } = cursos;

    if (descricao.trim() === "" || nome.trim() === "") { // trim remove os espaços em branco;
      throw new Error("[Erro] Todos os campos devem ser preenchidos!")
    }
  },

  submit(event) {
    // Alterar comportamento padrão do submit;
    event.preventDefault();

    try {
      // Buscar valores do Form;
      const curso = Form.getValues();
      // Validando campos do Formulário;
      Form.validarCampos(curso);
      // Fechar o modal e limpar campos preenchidos;
      Modal.close();
      // Salvar ou editar o curso (ambos fazem o reload());
      if (curso.id) {
        Curso.update(curso)
      } else {
        Curso.add(curso)
      }
    } catch (error) {
      alert(error.message)
    }

  }
}
// Informações formulário -----------------------------------

// Funções iniciar App -----------------------------------
const App = {
  init() {
    // Montando html;
    Curso.all.forEach(DOM.addCurso);

    // Set storage;
    Storage.set(Curso.all);
  },
  reload() {
    DOM.limparHtmlTabela(); // idempotencia;
    App.init();
  }
}
// Funções iniciar App -----------------------------------

App.init();
