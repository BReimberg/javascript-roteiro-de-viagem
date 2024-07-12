// Importa biblioteca dayjs
const formatador = (data) => {
  return {
    // Formatar o dia em número
    dia: {
      numerico: dayjs(data).format('DD'),
      // Formatar o dia da semana em forma curta e longa
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    // Formatar o mês
    mes: dayjs(data).format('MMMM'),
    // Formatar a hora
    hora: dayjs(data).format('HH:mm')
  };
};
// End Import

// Objeto de atividade
const atividade = {
  nome: "Almoço",
  data: new Date("2024-04-08 10:00"),
  finalizada: true
};
// End Objeto de atividade

// Lista de atividades
let atividades = [
  atividade,
  {
    nome : 'Academia em grupo',
    data: new Date("2024-07-09 12:00"),
    finalizada: false
  },
  {
    nome: 'Gamming session',
    data: new Date("2024-07-09 16:00"),
    finalizada: true
  },
];
// End Lista de atividades

// Função para criar um item de atividade
const criarItemDeAtividade = (atividade) => {
  // Cria o input do checkbox para concluir atividade
  let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox"
  `; 

  // Marca o checkbox se a atividade estiver finalizada
  if (atividade.finalizada) {
    input += 'checked';
  }

  input += '>';

  // Formata a data da atividade
  const formatar = formatador(atividade.data);
  // Retorna o HTML do item de atividade
  return `
    <div class="card-bg">
      ${input}

      <div>
        <svg class="active" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.50008 9.00002L8.16675 10.6667L11.5001 7.33335M17.3334 9.00002C17.3334 13.6024 13.6025 17.3334 9.00008 17.3334C4.39771 17.3334 0.666748 13.6024 0.666748 9.00002C0.666748 4.39765 4.39771 0.666687 9.00008 0.666687C13.6025 0.666687 17.3334 4.39765 17.3334 9.00002Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <svg class="inactive" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.41664 0.818364C8.46249 0.615965 9.53745 0.615965 10.5833 0.818364M10.5833 17.1817C9.53745 17.3841 8.46249 17.3841 7.41664 17.1817M13.6741 2.10086C14.5587 2.70022 15.3197 3.46409 15.9158 4.35086M0.818303 10.5834C0.615904 9.53751 0.615904 8.46255 0.818303 7.4167M15.8991 13.6742C15.2998 14.5588 14.5359 15.3198 13.6491 15.9159M17.1816 7.4167C17.384 8.46255 17.384 9.53751 17.1816 10.5834M2.1008 4.32586C2.70016 3.44131 3.46403 2.68026 4.3508 2.0842M4.3258 15.8992C3.44124 15.2998 2.6802 14.536 2.08414 13.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <span>${atividade.nome}</span>
      </div>

      <time class="short">
      ${formatar.dia.semana.curto}.
      ${formatar.dia.numerico}<br>
      ${formatar.hora}
      </time>
      <time class="full">
      ${formatar.dia.semana.longo}, 
      dia ${formatar.dia.numerico} 
      de ${formatar.mes} 
      às ${formatar.hora}h
      </time>
    </div>
  `;
};
// End Função para criar um item de atividade

// Função para atualizar a lista de atividades
const atualizarListaDeAtividades = () => {
  // Seleciona o elemento <section> no DOM
  const section = document.querySelector('section');
  section.innerHTML = '';

  //Verificar se a lista está vazia
  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
    return;
  }
  // Itera sobre cada atividade e adiciona ao DOM
  for (let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade);
  }
};
// End Função para atualizar a lista de atividades

// Chama a função para atualizar a lista de atividades ao carregar a página
atualizarListaDeAtividades();

// Função para salvar uma nova atividade
const salvarAtividade = (event) => {
  event.preventDefault();
  const dadosDoFormulario = new FormData(event.target);

  // Obtém os valores do formulário
  const nome = dadosDoFormulario.get('atividade');
  const dia = dadosDoFormulario.get('dia');
  const hora = dadosDoFormulario.get('hora');
  const data = `${dia} ${hora}`;

  // Cria um novo objeto de atividade
  const novaAtividade = {
    nome,
    data,
    finalizada: false
  };

  // Verifica se já existe uma atividade na mesma data/hora
  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data;
  });
  if (atividadeExiste) {
    return alert('Dia/Hora não disponível');
  }

  // Adiciona a nova atividade à lista e atualiza a lista de atividades
  atividades = [novaAtividade, ...atividades];
  atualizarListaDeAtividades();
};
// End Função para salvar uma nova atividade

// Função para criar as opções de dias no formulário
const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ];

  let diasSelecao = '';

  // Itera sobre cada dia e cria a opção no formulário
  for (let dia of dias) {
    const formatar = formatador(dia);
    const diaFormatado = `
    ${formatar.dia.numerico}
    de ${formatar.mes}
    `;
    diasSelecao += `
    <option value="${dia}">${diaFormatado}</option>
    `;
  }
  document.querySelector('select[name="dia"]')
    .innerHTML = diasSelecao;
};
// End Função para criar as opções de dias no formulário

// Chama a função para criar as opções de dias
criarDiasSelecao();

// Função para criar as opções de horas no formulário
const criarHorasSelecao = () => {
  let horasDisponiveis = '';

  // Itera sobre cada hora do dia e cria a opção no formulário
  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, '0');
    horasDisponiveis += `
    <option value="${hora}:00">${hora}:00</option>
    `;
    horasDisponiveis += `
    <option value="${hora}:30">${hora}:30</option>
    `;
  }

  document.querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis;
};
// End Função para criar as opções de horas no formulário

// Chama a função para criar as opções de horas
criarHorasSelecao();

// Função para concluir uma atividade
const concluirAtividade = (event) => {
  const input = event.target;
  const dataDesteInput = input.value;

  // Encontra a atividade correspondente
  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput;
  });

  if (!atividade) {
    return;
  }

  atividade.finalizada = !atividade.finalizada;
};
// End Função para concluir uma atividade