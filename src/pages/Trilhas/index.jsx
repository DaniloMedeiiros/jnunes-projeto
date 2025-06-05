import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function PaginaTrilhaCompleta() {
  // Estados do menu e modais
  const [menuAberto, setMenuAberto] = useState(true);
  const [caixaAberta, setCaixaAberta] = useState({
    notificacao: false,
    perfil: false
  });
  const [modalVisivel, setModalVisivel] = useState({
    dados: false,
    senha: false,
    termos: false
  });
  const [senhaVisivel, setSenhaVisivel] = useState({
    atual: false,
    nova: false,
    confirmacao: false
  });

  // Estados do carrossel
  const [currentIndexAndamento, setCurrentIndexAndamento] = useState(0);
  const [currentIndexDisponiveis, setCurrentIndexDisponiveis] = useState(0);

  const navigate = useNavigate();
  const notificacaoBoxRef = useRef(null);
  const perfilBoxRef = useRef(null);
  const modalDadosRef = useRef(null);
  const modalSenhaRef = useRef(null);
  const modalTermosRef = useRef(null);
  const carrosselAndamentoRef = useRef(null);
  const carrosselDisponiveisRef = useRef(null);

  // Dados das trilhas
  const [trilhasEmAndamento] = useState([
{ 
    id: 1, 
    titulo: "Segurança no Canteiro de Obras Básico", 
    progresso: 100, 
    concluido: true 
  },
  { 
    id: 2, 
    titulo: "Manuseio de Ferramentas Elétricas", 
    progresso: 27 
  },
  { 
    id: 3, 
    titulo: "EPIs - Equipamentos de Proteção Individual", 
    progresso: 27 
  },
  { 
    id: 4, 
    titulo: "Primeiros Socorros em Obras", 
    progresso: 27 
  },
  { 
    id: 9, 
    titulo: "Prevenção de Quedas em Altura", 
    progresso: 50 
  },
  { 
    id: 10, 
    titulo: "Sinalização de Segurança", 
    progresso: 75 
  }
  ]);

  const [trilhasDisponiveis] = useState([
{ 
    id: 5, 
    titulo: "NR-35 - Trabalho em Altura" 
  },
  { 
    id: 6, 
    titulo: "NR-10 - Segurança em Eletricidade" 
  },
  { 
    id: 7, 
    titulo: "Combate a Incêndios" 
  },
  { 
    id: 8, 
    titulo: "Movimentação de Cargas" 
  },
  { 
    id: 11, 
    titulo: "Gestão de Resíduos na Construção" 
  },
  { 
    id: 12, 
    titulo: "Ergonomia no Canteiro de Obras" 
  }
  ]);

  // Funções do menu e modais
  const toggleMenu = () => setMenuAberto(!menuAberto);

  const toggleCaixa = (tipo) => {
    setCaixaAberta(prev => ({
      notificacao: tipo === 'notificacao' ? !prev.notificacao : false,
      perfil: tipo === 'perfil' ? !prev.perfil : false
    }));
  };

  const toggleModal = (tipo) => {
    setModalVisivel(prev => ({
      ...prev,
      [tipo]: !prev[tipo],
      perfil: false
    }));
  };

  const toggleSenha = (tipo) => {
    setSenhaVisivel(prev => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
    setCaixaAberta({ ...caixaAberta, perfil: false });
  };

  // Funções do carrossel
  const navegarCarrossel = (direcao, tipoTrilha) => {
    if (tipoTrilha === 'andamento') {
      const novoIndex = direcao === 'proximo' 
        ? (currentIndexAndamento + 1) % trilhasEmAndamento.length
        : (currentIndexAndamento - 1 + trilhasEmAndamento.length) % trilhasEmAndamento.length;
      setCurrentIndexAndamento(novoIndex);
      
      if (carrosselAndamentoRef.current) {
        const cardWidth = carrosselAndamentoRef.current.children[0]?.offsetWidth || 300;
        carrosselAndamentoRef.current.scrollTo({
          left: novoIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    } else {
      const novoIndex = direcao === 'proximo' 
        ? (currentIndexDisponiveis + 1) % trilhasDisponiveis.length
        : (currentIndexDisponiveis - 1 + trilhasDisponiveis.length) % trilhasDisponiveis.length;
      setCurrentIndexDisponiveis(novoIndex);
      
      if (carrosselDisponiveisRef.current) {
        const cardWidth = carrosselDisponiveisRef.current.children[0]?.offsetWidth || 300;
        carrosselDisponiveisRef.current.scrollTo({
          left: novoIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  // Função para navegar para detalhes da trilha
  const handleCardClick = (trilhaId, tipoTrilha) => {
    navigate(`/trilha/${trilhaId}`, { 
      state: { 
        tipo: tipoTrilha,
        progresso: trilhasEmAndamento.find(t => t.id === trilhaId)?.progresso || 0
      } 
    });
  };

  return (
    <div className="trilha-container">
      {/* Background */}
      <div className="trilha-background"></div>

      {/* Menu Lateral */}
      <div className={`trilha-menu-lateral ${menuAberto ? '' : 'trilha-menu-fechado'}`}>
        <div className="trilha-logo-container">
          <img 
            src="src/imagens/logo-aberta.png" 
            className={`trilha-logo trilha-logo-aberta ${menuAberto ? 'trilha-visivel' : 'trilha-escondido'}`} 
            alt="Logo"
          />
          <img 
            src="src/imagens/logo-fechada.png" 
            className={`trilha-logo trilha-logo-fechada ${!menuAberto ? 'trilha-visivel' : 'trilha-escondido'}`} 
            alt="Logo"
          />
          <button id="trilha-toggle-menu" onClick={toggleMenu}>
            <img 
              src="src/imagens/seta-voltar.png" 
              alt="Toggle Menu" 
              className={`trilha-seta ${menuAberto ? '' : 'trilha-invertida'}`} 
            />
          </button>
        </div>

        <ul className="trilha-menu-itens">
          <li>
            <a href="/dashboard">
              <img src="src/imagens/icone-home.png" alt="Página Inicial" className="trilha-icone-menu" />
              {menuAberto && <span>Página Inicial</span>}
            </a>
          </li>
          <li>
            <a href="/trilhas">
              <img src="src/imagens/icone-trilha.png" alt="Trilhas" className="trilha-icone-menu" />
              {menuAberto && <span>Trilhas</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/imagens/icone-certificados.png" alt="Certificados" className="trilha-icone-menu" />
              {menuAberto && <span>Certificados</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/imagens/icone-desafios.png" alt="Desafios" className="trilha-icone-menu" />
              {menuAberto && <span>Desafios</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/imagens/icone-loja.png" alt="Loja" className="trilha-icone-menu" />
              {menuAberto && <span>Loja</span>}
            </a>
          </li>
        </ul>
      </div>

      {/* Top Bar */}
      <div className="trilha-topbar">
        <input 
          type="search" 
          placeholder="Buscar..." 
          className="trilha-busca"
        />

        <div className="trilha-icones-superiores">
          <div 
            className="trilha-icone"
            onClick={(e) => {
              e.stopPropagation();
              toggleCaixa('notificacao');
            }}
          >
            <img src="src/imagens/notificacao.png" alt="Notificação" />
          </div>
          <div 
            className="trilha-icone"
            onClick={(e) => {
              e.stopPropagation();
              toggleCaixa('perfil');
            }}
          >
            <img src="src/imagens/perfil.png" alt="Perfil" />
          </div>
          <div className="trilha-icone">
            <img src="src/imagens/infeite.png" alt="Infeite" />
          </div>
        </div>

        {caixaAberta.notificacao && (
          <div 
            ref={notificacaoBoxRef}
            className="trilha-box-notificacao"
            onClick={e => e.stopPropagation()}
          >
            <div className="trilha-box-header">Notificações</div>
            <ul className="trilha-mensagens">
              <li><span className="trilha-ponto-vermelho">•</span> Nova mensagem de sistema</li>
              <li><span className="trilha-ponto-vermelho">•</span> Atualização de perfil disponível</li>
              <li><span className="trilha-ponto-vermelho">•</span> Novo evento agendado</li>
            </ul>
            <a href="#" className="trilha-link-limpar">Limpar Mensagens</a>
          </div>
        )}

        {caixaAberta.perfil && (
          <div 
            ref={perfilBoxRef}
            className="trilha-box-perfil"
            onClick={e => e.stopPropagation()}
          >
            <div className="trilha-perfil-header">Perfil</div>
            <div className="trilha-foto-perfil">
              <img src="src/imagens/icon-perfil.jpg" alt="Foto de Perfil" />
            </div>
            <div className="trilha-moedas-e-pontos">
              <div className="trilha-moedas">
                <img src="src/imagens/icone-moeda.png" alt="Moeda" />
                1200
              </div>
              <div className="trilha-pontos">
                <img src="src/imagens/icone-ponto.png" alt="Ponto" />
                850
              </div>
            </div>
            <button 
              className="trilha-perfil-opcao"
              onClick={() => toggleModal('dados')}
            >
              <img src="src/imagens/icone-perfil-dados.png" alt="Meus Dados" />
              <span>Meus Dados</span>
            </button>
            <button 
              className="trilha-perfil-opcao"
              onClick={() => toggleModal('senha')}
            >
              <img src="src/imagens/icone-perfil-seguranca.png" alt="Segurança" />
              <span>Segurança</span>
            </button>
            <button 
              className="trilha-perfil-opcao"
              onClick={() => toggleModal('termos')}
            >
              <img src="src/imagens/icone-perfil-termos.png" alt="Termos" />
              <span>Termos e Condições</span>
            </button>
            <button 
              className="trilha-perfil-opcao trilha-logout-btn"
              onClick={handleLogout}
            >
              <img src="src/imagens/icone-logout.png" alt="Logout" />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo Principal com Carrossel */}
      <div className="trilha-conteudo-principal">
        {/* TRILHAS EM ANDAMENTO */}
        <div className="trilha-secao-carrossel">
          <div className="trilha-secao-cabecalho">
            <h2 className="trilha-secao-titulo">Trilhas em andamento</h2>
            <div className="trilha-secao-navegacao">
              <button 
                className="trilha-secao-seta"
                onClick={() => navegarCarrossel('anterior', 'andamento')}
                aria-label="Voltar"
              >
                {"<"}
              </button>
              <button 
                className="trilha-secao-seta"
                onClick={() => navegarCarrossel('proximo', 'andamento')}
                aria-label="Avançar"
              >
                {">"}
              </button>
            </div>
          </div>

          <div 
            className="trilha-secao-carrossel-container"
            ref={carrosselAndamentoRef}
          >
            {trilhasEmAndamento.map((trilha) => (
              <div 
                key={`andamento-${trilha.id}`} 
                className="trilha-secao-card"
                onClick={() => handleCardClick(trilha.id, 'andamento')}
              >
                <div className="trilha-secao-imagem" />
                <h3 className="trilha-secao-nome">{trilha.titulo}</h3>
                <div className="trilha-secao-barra">
                  <div
                    className="trilha-secao-progresso"
                    style={{ width: `${trilha.progresso}%` }}
                  />
                </div>
                <div className="trilha-secao-status">
                  <span className="trilha-secao-tag">Segurança</span>
                  {trilha.concluido ? (
                    <span className="trilha-secao-check">✔</span>
                  ) : (
                    <span className="trilha-secao-andamento">Em andamento</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TRILHAS DISPONÍVEIS */}
        <div className="trilha-secao-carrossel">
          <div className="trilha-secao-cabecalho">
            <h2 className="trilha-secao-titulo">Trilhas disponíveis</h2>
            <div className="trilha-secao-navegacao">
              <button 
                className="trilha-secao-seta"
                onClick={() => navegarCarrossel('anterior', 'disponiveis')}
                aria-label="Voltar"
              >
                {"<"}
              </button>
              <button 
                className="trilha-secao-seta"
                onClick={() => navegarCarrossel('proximo', 'disponiveis')}
                aria-label="Avançar"
              >
                {">"}
              </button>
            </div>
          </div>

          <div 
            className="trilha-secao-carrossel-container"
            ref={carrosselDisponiveisRef}
          >
            {trilhasDisponiveis.map((trilha) => (
              <div key={`disponivel-${trilha.id}`} className="trilha-secao-card">
                <div className="trilha-secao-imagem" />
                <h3 className="trilha-secao-nome">{trilha.titulo}</h3>
                <button 
                  className="trilha-secao-botao"
                  onClick={() => handleCardClick(trilha.id, 'disponivel')}
                >
                  Ver Curso
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modais */}
      {modalVisivel.dados && (
        <div 
          className="trilha-modal"
          onClick={() => toggleModal('dados')}
        >
          <div 
            ref={modalDadosRef}
            className="trilha-modal-conteudo"
            onClick={e => e.stopPropagation()}
          >
            <span 
              className="trilha-fechar-modal"
              onClick={() => toggleModal('dados')}
            >
              &times;
            </span>
            <div className='trilha-modal-foto'>
              <img src="src/imagens/perfil-modal.jpg" alt="Foto de perfil" />
            </div>
            <h2>Meus Dados</h2>
            <div className="trilha-dados-usuario">
              <div className="trilha-modal-campo">
                <label>Nome</label>
                <input type="text" value="João da Silva" readOnly />
              </div>
              <div className="trilha-modal-campo">
                <label>Matrícula</label>
                <input type="text" value="123456" readOnly />
              </div>
              <div className="trilha-modal-campo">
                <label>Setor</label>
                <input type="text" value="TI" readOnly />
              </div>
              <div className="trilha-modal-campo">
                <label>Função</label>
                <input type="text" value="Desenvolvedor Front-End" readOnly />
              </div>
            </div>
          </div>
        </div>
      )}

      {modalVisivel.senha && (
        <div 
          className="trilha-modal"
          onClick={() => toggleModal('senha')}
        >
          <div 
            ref={modalSenhaRef}
            className="trilha-modal-conteudo"
            onClick={e => e.stopPropagation()}
          >
            <span 
              className="trilha-fechar-modal"
              onClick={() => toggleModal('senha')}
            >
              &times;
            </span>
            <div className="trilha-modal-foto">
              <img src="src/imagens/perfil-seguranca.png" alt="Ícone de Segurança" />
            </div>
            <h2>Segurança</h2>
            <p>Altere sua senha aqui</p>
            <div className="trilha-dados-usuario">
              <div className="trilha-modal-campo">
                <label>Senha Atual</label>
                <div className="trilha-senha-container">
                  <input 
                    type={senhaVisivel.atual ? "text" : "password"} 
                    placeholder="Digite sua senha atual aqui" 
                    className="trilha-senha-input" 
                  />
                  <span 
                    className="trilha-toggle-senha"
                    onClick={() => toggleSenha('atual')}
                  >
                    <img
                      src={senhaVisivel.atual 
                        ? "src/imagens/olho-fechado-modal-senha.png" 
                        : "src/imagens/olho-aberto-modal-senha.png"}
                      alt={senhaVisivel.atual ? "Ocultar Senha" : "Mostrar Senha"}
                    />
                  </span>
                </div>
              </div>
              <div className="trilha-modal-campo">
                <label>Nova Senha</label>
                <div className="trilha-senha-container">
                  <input 
                    type={senhaVisivel.nova ? "text" : "password"} 
                    placeholder="Digite sua nova senha aqui" 
                    className="trilha-senha-input" 
                  />
                  <span 
                    className="trilha-toggle-senha"
                    onClick={() => toggleSenha('nova')}
                  >
                    <img
                      src={senhaVisivel.nova 
                        ? "src/imagens/olho-fechado-modal-senha.png" 
                        : "src/imagens/olho-aberto-modal-senha.png"}
                      alt={senhaVisivel.nova ? "Ocultar Senha" : "Mostrar Senha"}
                    />
                  </span>
                </div>
              </div>
              <div className="trilha-modal-campo">
                <label>Confirmar Senha</label>
                <div className="trilha-senha-container">
                  <input 
                    type={senhaVisivel.confirmacao ? "text" : "password"} 
                    placeholder="Confirme sua senha aqui" 
                    className="trilha-senha-input" 
                  />
                  <span 
                    className="trilha-toggle-senha"
                    onClick={() => toggleSenha('confirmacao')}
                  >
                    <img
                      src={senhaVisivel.confirmacao 
                        ? "src/imagens/olho-fechado-modal-senha.png" 
                        : "src/imagens/olho-aberto-modal-senha.png"}
                      alt={senhaVisivel.confirmacao ? "Ocultar Senha" : "Mostrar Senha"}
                    />
                  </span>
                </div>
              </div>
              <button className="trilha-btn-alterar-senha">Alterar Senha</button>
            </div>
          </div>
        </div>
      )}

      {modalVisivel.termos && (
        <div 
          ref={modalTermosRef}
          className="trilha-modal"
          onClick={() => toggleModal('termos')}
        >
          <div 
            className="trilha-modal-conteudo"
            onClick={e => e.stopPropagation()}
          >
            <span 
              className="trilha-fechar-modal"
              onClick={() => toggleModal('termos')}
            >
              &times;
            </span>
            <div className="trilha-modal-foto">
              <img src="src/imagens/perfil-modal-termos.png" alt="Termos e Condições" />
            </div>
            <h2>Termos e Condições</h2>
            <div className="trilha-termos-texto">
              <p>
                1. <strong>Aceitação dos Termos:</strong> 
                <br />1.1. Ao acessar e utilizar a plataforma de treinamento online da Jotanunes, o usuário concorda com estes Termos de Uso. Caso não concorde, deve interromper o uso imediatamente.
              </p>
              <p>
                2. <strong>Cadastro e Conta do Usuário:</strong>
                <br />2.1. Para utilizar os serviços da plataforma, é necessário criar uma conta, fornecendo informações verdadeiras e atualizadas.
                <br />2.2. O usuário é responsável pela segurança de suas credenciais de acesso e deve notificar a Jotanunes imediatamente em caso de uso não autorizado de sua conta.
              </p>
              <p>
                3. <strong>Uso da Plataforma:</strong>
                <br />3.1. A plataforma é destinada exclusivamente a treinamentos oferecidos pela Jotanunes, e o usuário deve utilizá-la de forma ética e legal.
                <br />3.2. É proibida a reprodução ou compartilhamento.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}