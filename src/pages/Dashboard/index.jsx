import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Dashboard() {
  // Estados principais
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

  // Hook de navegação
  const navigate = useNavigate();

  // Dados simulados
  const progressos = [
    { titulo: "Concluir Módulo 3", progresso: 60 },
    { titulo: "Exercícios Pendentes Capítulo 6", progresso: 40 },
    { titulo: "Nível Atual Aprendizado", progresso: 80 }
  ];

  const topAprendizes = [
    { nome: "Rafaela", foto: "rafaela.jpg", pontos: 950 },
    { nome: "Pedro", foto: "pedro.jpg", pontos: 870 },
    { nome: "Fernanda", foto: "fernanda.jpg", pontos: 790 },
    { nome: "Cláudia", foto: "claudia.jpg", pontos: 750 },
    { nome: "Carlos", foto: "carlos.jpg", pontos: 700 },
    { nome: "Arthur", foto: "arthur.jpg", pontos: 650 }
  ];

  const estatisticas = [
    { valor: 7, label: "Certificados", icone: "certificado.png" },
    { valor: 1765, label: "Horas de Estudo", icone: "relogio.png" },
    { valor: 23, label: "Módulos Finalizados", icone: "modulo.png" },
    { valor: 38, label: "Desafios Concluídos", icone: "desafio.png" }
  ];

  // Refs
  const notificacaoBoxRef = useRef(null);
  const perfilBoxRef = useRef(null);
  const modalDadosRef = useRef(null);
  const modalSenhaRef = useRef(null);
  const modalTermosRef = useRef(null);

  // Fechar modais/caixas ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Caixas de notificação/perfil
      if (
        !event.target.closest('.icone') &&
        !event.target.closest('.box-notificacao') &&
        !event.target.closest('.box-perfil')
      ) {
        setCaixaAberta({ notificacao: false, perfil: false });
      }

      // Modais
      if (modalDadosRef.current && event.target === modalDadosRef.current) {
        setModalVisivel({ ...modalVisivel, dados: false });
      }
      if (modalSenhaRef.current && event.target === modalSenhaRef.current) {
        setModalVisivel({ ...modalVisivel, senha: false });
      }
      if (modalTermosRef.current && event.target === modalTermosRef.current) {
        setModalVisivel({ ...modalVisivel, termos: false });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [modalVisivel]);

  // Funções de toggle
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
      perfil: false // Fecha a caixa de perfil ao abrir modal
    }));
  };

  const toggleSenha = (tipo) => {
    setSenhaVisivel(prev => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  const handleVerRanking = () => {
    alert('Redirecionando para o ranking completo!');
    // navigate('/ranking'); // Se estiver usando react-router
  };

  // Função de Logout
  const handleLogout = () => {
    // Limpar dados de autenticação (ajuste conforme sua implementação)
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    
    // Redirecionar para a página de login
    navigate('/login', { replace: true });
    
    // Fechar a caixa de perfil
    setCaixaAberta({ ...caixaAberta, perfil: false });
  };

  return (
    <div className="dashboard-container freeza-loyout">
      {/* Menu Lateral */}
      <div className={`menu-lateral ${menuAberto ? '' : 'menu-fechado'}`}>
        <div className="logo-container">
          <img 
            src="src/imagens/logo-aberta.png" 
            className={`logo logo-aberta ${menuAberto ? 'visivel' : 'escondido'}`} 
            alt="Logo Jotanunes"
          />
          <img 
            src="src/imagens/logo-fechada.png" 
            className={`logo logo-fechada ${!menuAberto ? 'visivel' : 'escondido'}`} 
            alt="Logo Jotanunes"
          />
          <button id="toggle-menu" onClick={toggleMenu}>
            <img 
              src="src/imagens/seta-voltar.png" 
              alt="Toggle Menu" 
              className={`seta ${menuAberto ? '' : 'invertida'}`} 
            />
          </button>
        </div>

        <ul className="menu-itens">
          <li>
            <a href="/dashboard">
              <img src="src/imagens/icone-home.png" alt="Página Inicial" className="icone-menu" />
              {menuAberto && <span>Página Inicial</span>}
            </a>
          </li>
          <li>
            <a href="/trilhas">
              <img src="src/imagens/icone-trilha.png" alt="Trilhas" className="icone-menu" />
              {menuAberto && <span>Trilhas</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/imagens/icone-certificados.png" alt="Certificados" className="icone-menu" />
              {menuAberto && <span>Certificados</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/imagens/icone-desafios.png" alt="Desafios" className="icone-menu" />
              {menuAberto && <span>Desafios</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/imagens/icone-loja.png" alt="Loja" className="icone-menu" />
              {menuAberto && <span>Loja</span>}
            </a>
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <main className="conteudo">
        <header>
          <input type="search" placeholder="Buscar..." />
          <h1>Bem-vindo, João!</h1>
          <p className="welcome-text">Bem-vindo de volta à sua jornada de capacitação na Jotanunes.</p>
        </header>

        {/* Ícones Superiores */}
        <div className="icones-superiores">
          <div 
            id="notificacao-icon" 
            className="icone"
            onClick={(e) => {
              e.stopPropagation();
              toggleCaixa('notificacao');
            }}
          >
            <img src="src/imagens/notificacao.png" alt="Notificação" />
          </div>
          <div 
            id="perfil-icon" 
            className="icone"
            onClick={(e) => {
              e.stopPropagation();
              toggleCaixa('perfil');
            }}
          >
            <img src="src/imagens/perfil.png" alt="Perfil" />
          </div>
          <div id="infeite-icon" className="icone">
            <img src="src/imagens/infeite.png" alt="Infeite" />
          </div>
        </div>

        {/* Caixa de Notificação */}
        {caixaAberta.notificacao && (
          <div 
            ref={notificacaoBoxRef}
            className="box-notificacao"
            onClick={e => e.stopPropagation()}
          >
            <div className="box-header">Notificações</div>
            <ul className="mensagens">
              <li><span className="ponto-vermelho">•</span> Nova mensagem de sistema</li>
              <li><span className="ponto-vermelho">•</span> Atualização de perfil disponível</li>
              <li><span className="ponto-vermelho">•</span> Novo evento agendado</li>
            </ul>
            <a href="#" className="link-limpar">Limpar Mensagens</a>
          </div>
        )}

        {/* Caixa de Perfil */}
        {caixaAberta.perfil && (
          <div 
            ref={perfilBoxRef}
            className="box-perfil"
            onClick={e => e.stopPropagation()}
          >
            <div className="perfil-header">Perfil</div>
            <div className="foto-perfil">
              <img src="src/imagens/icon-perfil.jpg" alt="Foto de Perfil" />
            </div>
            <div className="moedas-e-pontos">
              <div className="moedas">
                <img src="src/imagens/icone-moeda.png" alt="Moeda" />
                1200
              </div>
              <div className="pontos">
                <img src="src/imagens/icone-ponto.png" alt="Ponto" />
                850
              </div>
            </div>
            <button 
              className="perfil-opcao"
              onClick={(e) => {
                e.preventDefault();
                toggleModal('dados');
              }}
            >
              <img src="src/imagens/icone-perfil-dados.png" alt="Meus Dados" />
              <span>Meus Dados</span>
            </button>
            <button 
              className="perfil-opcao"
              onClick={(e) => {
                e.preventDefault();
                toggleModal('senha');
              }}
            >
              <img src="src/imagens/icone-perfil-seguranca.png" alt="Segurança" />
              <span>Segurança</span>
            </button>
            <button 
              className="perfil-opcao"
              onClick={(e) => {
                e.preventDefault();
                toggleModal('termos');
              }}
            >
              <img src="src/imagens/icone-perfil-termos.png" alt="Termos" />
              <span>Termos e Condições</span>
            </button>
            <button 
              className="perfil-opcao logout-btn"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <img src="src/imagens/icone-logout.png" alt="Logout" />
              <span>Sair</span>
            </button>
          </div>
        )}

        {/* Seção de Cards */}
        <section className="painel">
          {/* Card Próximos Passos */}
          <div className="proximos-passos">
            <h2>Próximos Passos</h2>
            {progressos.map((item, index) => (
              <div key={index} className="passo">
                <p>{item.titulo}</p>
                <div className="barra-progresso">
                  <div 
                    className="progresso" 
                    style={{ width: `${item.progresso}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Card Top Aprendizes */}
          <div className="top-aprendizes">
            <h2>Top Aprendizes da Semana</h2>
            <ul>
              {topAprendizes.map((aprendiz, index) => (
                <li key={index}>
                  <div className="perfil">
                    <img 
                      src={`src/imagens/${aprendiz.foto}`} 
                      alt={aprendiz.nome} 
                    />
                    <span>{aprendiz.nome}</span>
                  </div>
                  <div className="pontuacao">
                    {aprendiz.pontos} <img src="src/imagens/estrela.png" alt="estrela" />
                  </div>
                </li>
              ))}
            </ul>
            <button 
              id="ver-ranking"
              onClick={handleVerRanking}
            >
              Ver ranking completo
            </button>
          </div>
        </section>

        {/* Rodapé com Estatísticas */}
        <footer className="estatisticas">
          {estatisticas.map((estat, index) => (
            <div key={index} className="estatistica-card">
              <div className="estatistica-conteudo">
                <span className="numero">{estat.valor}</span>
                <span className="nome">{estat.label}</span>
              </div>
              <img 
                src={`src/imagens/${estat.icone}`} 
                alt={estat.label} 
              />
            </div>
          ))}
          <div className="imagens-extra">
            <img src="src/imagens/icone-extras.png" alt="Imagem Extra" />
          </div>
        </footer>
      </main>

      {/* Modal Meus Dados */}
      {modalVisivel.dados && (
        <div 
          ref={modalDadosRef}
          className="modal"
          style={{ display: 'flex' }}
        >
          <div className="modal-conteudo">
            <span 
              className="fechar-modal"
              onClick={() => toggleModal('dados')}
            >
              &times;
            </span>
            <img 
              src="src/imagens/perfil-modal.jpg" 
              alt="Foto de perfil" 
              className="modal-foto" 
            />
            <h2>Meus Dados</h2>
            <div className="dados-usuario">
              <div className="modal-campo">
                <label>Nome</label>
                <input type="text" value="João da Silva" readOnly />
              </div>
              <div className="modal-campo">
                <label>Matrícula</label>
                <input type="text" value="123456" readOnly />
              </div>
              <div className="modal-campo">
                <label>Setor</label>
                <input type="text" value="TI" readOnly />
              </div>
              <div className="modal-campo">
                <label>Função</label>
                <input type="text" value="Desenvolvedor Front-End" readOnly />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Alterar Senha */}
      {modalVisivel.senha && (
        <div 
          ref={modalSenhaRef}
          className="modal"
          style={{ display: 'flex' }}
        >
          <div className="modal-conteudo">
            <span 
              className="fechar-modal"
              onClick={() => toggleModal('senha')}
            >
              &times;
            </span>
            <img 
              src="src/imagens/perfil-seguranca.png" 
              alt="Ícone de Segurança" 
              className="modal-foto" 
            />
            <h2>Segurança</h2>
            <p>Altere sua senha aqui</p>
            <div className="dados-usuario">
              <div className="modal-campo">
                <label>Senha Atual</label>
                <div className="senha-container">
                  <input 
                    type={senhaVisivel.atual ? "text" : "password"} 
                    placeholder="Digite sua senha atual aqui" 
                    className="senha-input" 
                  />
                  <span 
                    className="toggle-senha"
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
              <div className="modal-campo">
                <label>Nova Senha</label>
                <div className="senha-container">
                  <input 
                    type={senhaVisivel.nova ? "text" : "password"} 
                    placeholder="Digite sua nova senha aqui" 
                    className="senha-input" 
                  />
                  <span 
                    className="toggle-senha"
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
              <div className="modal-campo">
                <label>Confirmar Senha</label>
                <div className="senha-container">
                  <input 
                    type={senhaVisivel.confirmacao ? "text" : "password"} 
                    placeholder="Confirme sua senha aqui" 
                    className="senha-input" 
                  />
                  <span 
                    className="toggle-senha"
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
              <button className="btn-alterar-senha">Alterar Senha</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Termos e Condições */}
      {modalVisivel.termos && (
        <div 
          ref={modalTermosRef}
          className="modal"
          style={{ display: 'flex' }}
        >
          <div className="modal-conteudo">
            <span 
              className="fechar-modal"
              onClick={() => toggleModal('termos')}
            >
              &times;
            </span>
            <div className="modal-foto">
              <img 
                src="src/imagens/perfil-modal-termos.png" 
                alt="Termos e Condições" 
              />
            </div>
            <h2>Termos e Condições</h2>
            <div className="termos-texto">
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