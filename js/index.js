// Importando a biblioteca dayjs
// Função que formata a data recebida
const formatador = (data) => { 
    return { 
      dia: { // Formatação do dia
        numerico: dayjs(data).format('DD'), // Formato numérico do dia
        semana: { // Formatação do dia da semana
          curto: dayjs(data).format('ddd'), // Formato curto do dia da semana
          longo: dayjs(data).format('dddd'), // Formato longo do dia da semana
        }
      },
      mes: dayjs(data).format('MMMM'), // Formatação do mês
      hora: dayjs(data).format('HH:mm') // Formatação da hora
    }
  };
  
  // Objeto atividade
  const atividade = {
    nome: "Sair", // Nome da atividade
    data: new Date("2024-04-08 10:00"), // Data da atividade
    finalizada: true // Estado da atividade (finalizada)
  };
  
  // Lista de atividades
  let atividades = [
    atividade, 
    {
      nome : 'Academia em grupo', // Nome da atividade
      data: new Date("2024-07-09 12:00"), // Data da atividade
      finalizada: false // Estado da atividade (não finalizada)
    },
    {
      nome: 'Gamming session', // Nome atividade
      data: new Date("2024-07-09 16:00"), // Data da atividade
      finalizada: true // Estado da atividade (finalizada)
    },
  ]
  
  // Função para criar item de atividade
  const criarItemDeAtividade = (atividade) => {
  
    /*
     concluirAtividade(event): Adiciona evento para marcar atividade como concluída
     value="${atividade.data}": Data da atividade 
    */
    let input = `
      <input 
      onchange="concluirAtividade(event)" 
      value="${atividade.data}" 
      type="checkbox" 
    ` 
  
    // Verifica se a atividade está finalizada
    if(atividade.finalizada) { 
      input += 'checked' // Marca o checkbox como checado
    }
  
    input += '>' // Fecha o input
   
    // Formata a data da atividade
    const formatar = formatador(atividade.data)
    return `
      <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>
        ${formatar.dia.semana.longo},
        dia ${formatar.dia.numerico} 
        de ${formatar.mes} 
        às ${formatar.hora}h
        </time>
      </div>
    `
  };
  
  // Função para atualizar a lista de atividades
  const atualizarListaDeAtividades = () => {
    // Seleciona a seção no HTML
    const section = document.querySelector('section') 
    // Limpa o conteúdo da seção
    section.innerHTML = '' 
    // Verifica se a lista de atividades está vazia
    if(atividades.length == 0) { 
      // Mostra mensagem de nenhuma atividade cadastrada
      section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>` 
      return 
    }
  
    // Itera sobre a lista de atividades
    for(let atividade of atividades) { 
      // Adiciona cada atividade formatada na seção
      section.innerHTML += criarItemDeAtividade(atividade) 
    }
  };
  
  // Chama a função para atualizar a lista de atividades
  atualizarListaDeAtividades() 
  
  const salvarAtividade = (event) => {
    // Previne o comportamento padrão do formulário
    event.preventDefault() 
    // Obtém os dados do formulário
    const dadosDoFormulario = new FormData(event.target) 
    // Obtém o nome da atividade
    const nome = dadosDoFormulario.get('atividade') 
    // Obtém o dia da atividade
    const dia = dadosDoFormulario.get('dia') 
    // Obtém a hora da atividade
    const hora = dadosDoFormulario.get('hora') 
    // Junta dia e hora em uma única string
    const data = `${dia} ${hora}` 
    
    const novaAtividade = {
      nome, // Nome da nova atividade
      data, // Data da nova atividade
      finalizada: false // Estado inicial da nova atividade (não finalizada)
    }
  
    // Verifica se já existe uma atividade na mesma data e hora
    const atividadeExiste = atividades.find((atividade) => {
      return atividade.data == novaAtividade.data 
    })
  
    // Se a atividade já existir
    if(atividadeExiste) { 
      // Mostra alerta de conflito de data/hora
      return alert('Dia/Hora não disponível') 
    }
  
    // Adiciona a nova atividade à lista de atividades
    atividades = [novaAtividade, ...atividades] 
    // Atualiza a lista de atividades no HTML
    atualizarListaDeAtividades() 
  };
  
  // Array de dias disponíveis
  const criarDiasSelecao = () => {
    const dias = [
      "2024-02-28",
      "2024-02-29",
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
    ]
    
    // Inicializa string para opções de seleção de dias
    let diasSelecao = '' 
    
    // Itera sobre o array de dias
    for(let dia of dias) { 
      // Formata cada dia
      const formatar = formatador(dia) 
      // Formata a string do dia
      const diaFormatado = `
      ${formatar.dia.numerico}
      de ${formatar.mes}
      ` 
      // Adiciona a opção de seleção de dia
      diasSelecao += `
      <option value="${dia}">${diaFormatado}</option>
      ` 
    }
  
    // Adiciona as opções de dias no select do formulário
    document.querySelector('select[name="dia"]')
    .innerHTML = diasSelecao 
  };
  
  // Chama a função para criar as opções de seleção de dias
  criarDiasSelecao(); 
  
  // Inicializa string para opções de seleção de horas
  const criarHorasSelecao = () => {
    let horasDisponiveis = '' 

    // Itera de 6 até 22 (horas do dia)
    for(let i = 6; i < 23; i++) { 
      // Formata a hora com dois dígitos
      const hora = String(i).padStart(2, '0') 
      
      // Adiciona a opção da hora cheia
      horasDisponiveis += `
      <option value="${hora}:00">${hora}:00</option>
      ` 
      
      // Adiciona a opção da meia hora
      horasDisponiveis += `
      <option value="${hora}:30">${hora}:30</option>
      ` 
    }
  
    // Adiciona as opções de horas no select do formulário
    document.querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis 
  };

  // Chama a função para criar as opções de seleção de horas
  criarHorasSelecao(); 
  
  // Obtém o input que disparou o evento
  const concluirAtividade = (event) => {
    const input = event.target 
    
    // Obtém o valor (data) do input
    const dataDesteInput = input.value 
    
    // Encontra a atividade correspondente à data do input
    const atividade = atividades.find((atividade) => {
      return atividade.data == dataDesteInput 
    })
  
    // Se a atividade não for encontrada
    if(!atividade) { 
      return 
    }
  
    // Alterna o estado da atividade (finalizada/não finalizada)
    atividade.finalizada = !atividade.finalizada 
  };
  