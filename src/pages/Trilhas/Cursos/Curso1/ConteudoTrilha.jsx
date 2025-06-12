import { useState, useRef } from "react";
import { ArrowLeft, Star, User, Clock, BookOpen, FileText, ChevronDown, ChevronUp, CheckCircle, Circle } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import "./style.css";

const modulosData = [
  {
    id: 1,
    titulo: "Módulo 1 - Introdução à Segurança no Canteiro de Obras",
    imagem: "/img/modulo1.png",
    status: "concluido",
    aulas: [
      { id: 1, titulo: "Aula 1 - O que fazer em caso de acidentes no canteiro de obras?", assistida: true },
      { id: 2, titulo: "Aula 2 - Primeiros socorros: Como agir em emergências", assistida: true },
    ],
  },
  {
    id: 2,
    titulo: "Módulo 2 - Equipamentos de Proteção Individual (EPIs) e Coletiva (EPCs)",
    imagem: "/img/modulo2.png",
    status: "concluido",
    aulas: [
      { id: 1, titulo: "Aula 1 - Tipos de EPIs", assistida: true },
      { id: 2, titulo: "Aula 2 - EPCs na prática", assistida: true },
    ],
  },
  {
    id: 3,
    titulo: "Módulo 3 - Procedimentos de Emergência e Primeiros Socorros",
    imagem: "/img/modulo3.png",
    status: "parcial",
    progresso: 50,
    aulas: [
      { id: 1, titulo: "Aula 1 - O que fazer em caso de acidentes no canteiro de obras?", assistida: false },
      { id: 2, titulo: "Aula 2 - Primeiros socorros: Como agir em emergências", assistida: false },
      { id: 3, titulo: "Aula 3 - Plano de evacuação e combate a incêndios", assistida: false },
      { id: 4, titulo: "Aula 4 - Como relatar incidentes e acidentes corretamente", assistida: false },
    ],
  },
  {
    id: 4,
    titulo: "Módulo 4 - Normas Regulamentadoras (NRs) e Boas Práticas",
    imagem: "/img/modulo4.png",
    status: "nao-iniciado",
    aulas: [],
  },
  {
    id: 5,
    titulo: "Módulo 5 - Riscos e Prevenção de Acidentes",
    imagem: "/img/modulo5.png",
    status: "nao-iniciado",
    aulas: [],
  },
];

export default function ConteudoTrilha() {
  const [abaAtiva, setAbaAtiva] = useState("conteudo");
  const [menuAberto, setMenuAberto] = useState(true);
  const [modulosAbertos, setModulosAbertos] = useState([]);
  const navigate = useNavigate();

  const voltarParaTrilhas = () => {
    navigate('/trilhas');
  };

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const toggleModulo = (id) => {
    setModulosAbertos((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="trilha-conteudo-secao-container">
      {/* Background */}
      <div className="trilha-conteudo-secao-background"></div>

      {/* Menu Lateral */}
      <div className={`trilha-conteudo-secao-menu-lateral ${menuAberto ? '' : 'trilha-conteudo-secao-menu-fechado'}`}>
        <div className="trilha-conteudo-secao-logo-container">
          <img 
            src="/src/imagens/logo-aberta.png" 
            className={`trilha-conteudo-secao-logo trilha-conteudo-secao-logo-aberta ${menuAberto ? 'trilha-conteudo-secao-visivel' : 'trilha-conteudo-secao-escondido'}`} 
            alt="Logo"
          />
          <img 
            src="/src/imagens/logo-fechada.png" 
            className={`trilha-conteudo-secao-logo trilha-conteudo-secao-logo-fechada ${!menuAberto ? 'trilha-conteudo-secao-visivel' : 'trilha-conteudo-secao-escondido'}`} 
            alt="Logo"
          />
          <button id="trilha-conteudo-secao-toggle-menu" onClick={toggleMenu}>
            <img 
              src="/src/imagens/seta-voltar.png" 
              alt="Toggle Menu" 
              className={`trilha-conteudo-secao-seta ${menuAberto ? '' : 'trilha-conteudo-secao-invertida'}`} 
            />
          </button>
        </div>

        <ul className="trilha-conteudo-secao-menu-itens">
          <li>
            <a href="/dashboard">
              <img src="/src/imagens/icone-home.png" alt="Página Inicial" className="trilha-conteudo-secao-icone-menu" />
              {menuAberto && <span>Página Inicial</span>}
            </a>
          </li>
          <li>
            <a href="/trilhas">
              <img src="/src/imagens/icone-trilha.png" alt="Trilhas" className="trilha-conteudo-secao-icone-menu" />
              {menuAberto && <span>Trilhas</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/src/imagens/icone-certificados.png" alt="Certificados" className="trilha-conteudo-secao-icone-menu" />
              {menuAberto && <span>Certificados</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/src/imagens/icone-desafios.png" alt="Desafios" className="trilha-conteudo-secao-icone-menu" />
              {menuAberto && <span>Desafios</span>}
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/src/imagens/icone-loja.png" alt="Loja" className="trilha-conteudo-secao-icone-menu" />
              {menuAberto && <span>Loja</span>}
            </a>
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="trilha-conteudo-secao-conteudo-principal">
        {/* Header com seta funcional */}
        <div className="trilha-conteudo-secao-header-container">
          <div className="trilha-conteudo-secao-header">
            <ArrowLeft 
              className="trilha-conteudo-secao-voltar" 
              onClick={voltarParaTrilhas}
              style={{ cursor: 'pointer' }}
            />
            <h1 className="trilha-conteudo-secao-titulo">Segurança no canteiro de Obras</h1>
          </div>
        </div>

        {/* Container das abas com fundo branco */}
        <div className="trilha-conteudo-secao-abas-container">
          <div className="trilha-conteudo-secao-abas">
            <button
              className={`trilha-conteudo-secao-aba ${abaAtiva === "info" ? "ativa" : ""}`}
              onClick={() => navigate('/curso1/informacoesgerais')}
            >
              Informações Gerais
            </button>
            <button
              className={`trilha-conteudo-secao-aba ${abaAtiva === "conteudo" ? "ativa" : ""}`}
              onClick={() => navigate('/curso1/conteudotrilha')}
            >
              Conteúdo da trilha
            </button>
          </div>
        </div>

        {/* Conteúdo da Trilha (adicionado abaixo dos botões) */}
        <div className="conteudo-trilha-sessao-container">
          <div className="conteudo-trilha-sessao-progresso">
            <div className="conteudo-trilha-sessao-barra">
              <div className="conteudo-trilha-sessao-barra-preenchida" style={{ width: "32%" }}></div>
            </div>
            <span className="conteudo-trilha-sessao-texto-progresso">32% Concluído</span>
          </div>

          {modulosData.map((modulo) => (
            <div key={modulo.id} className="conteudo-trilha-sessao-modulo">
              <div className="conteudo-trilha-sessao-topo" onClick={() => toggleModulo(modulo.id)}>
                <img src={modulo.imagem} alt="Módulo" className="conteudo-trilha-sessao-imagem" />
                <div className="conteudo-trilha-sessao-info">
                  <p className="conteudo-trilha-sessao-titulo">{modulo.titulo}</p>
                  {modulo.status === "concluido" && (
                    <span className="conteudo-trilha-sessao-status">Concluído</span>
                  )}
                  {modulo.status === "parcial" && (
                    <span className="conteudo-trilha-sessao-status parcial">
                      {modulo.progresso}% concluído
                    </span>
                  )}
                </div>
                {modulosAbertos.includes(modulo.id) ? <ChevronUp /> : <ChevronDown />}
              </div>

              {modulosAbertos.includes(modulo.id) && (
                <div className="conteudo-trilha-sessao-aulas">
                  {modulo.aulas.map((aula) => (
                    <Link
                      key={aula.id}
                      to={modulo.id === 1 && aula.id === 1 ? "/curso1/modulo1/aula1" : "#"}
                      className="conteudo-trilha-sessao-aula"
                    >
                      {aula.assistida ? (
                        <CheckCircle color="red" size={16} />
                      ) : (
                        <Circle color="red" size={16} />
                      )}
                      <span>{aula.titulo}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}