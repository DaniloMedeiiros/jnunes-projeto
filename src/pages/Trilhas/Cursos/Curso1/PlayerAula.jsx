import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Star, User, Clock, BookOpen, FileText, ChevronDown, ChevronUp, CheckCircle, Circle } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import "./style.css";

export default function TrilhaSegurancaObras() {
  const [abaAtiva, setAbaAtiva] = useState("info");
  const [menuAberto, setMenuAberto] = useState(true);
  const [moduloAtivo, setModuloAtivo] = useState(null);
  const [aulaSelecionada, setAulaSelecionada] = useState("Aula 1 - O que fazer em caso de acidentes no canteiro de obras?");
  const [aulasConcluidas, setAulasConcluidas] = useState([]);
  const playerRef = useRef(null);
  const navigate = useNavigate();

  const modulosData = [
    {
      titulo: "Módulo 1 - Introdução à Segurança no Canteiro de Obras",
      aulas: [
        "Aula 1 - O que fazer em caso de acidentes no canteiro de obras?",
        "Aula 2 - Primeiros socorros: Como agir em emergências"
      ]
    },
    {
      titulo: "Módulo 2 - Equipamentos de Proteção Individual (EPIs) e Coletiva (EPCs)",
      aulas: []
    },
    {
      titulo: "Módulo 3 - Procedimentos de Emergência e Primeiros Socorros",
      aulas: [
        "Aula 3 - Plano de evacuação e combate a incêndios",
        "Aula 4 - Como relatar incidentes e acidentes corretamente"
      ]
    },
    {
      titulo: "Módulo 5 - Normas Regulamentadoras (NRs) e Boas Práticas",
      aulas: []
    }
  ];

  const videoLinks = {
    "Aula 1 - O que fazer em caso de acidentes no canteiro de obras?": "pmjBoLB44qs",
    "Aula 2 - Primeiros socorros: Como agir em emergências": "fem0Dnu9TFA",
    "Aula 3 - Plano de evacuação e combate a incêndios": "C0PMwotO_lQ",
    "Aula 4 - Como relatar incidentes e acidentes corretamente": "537crXaxn1k"
  };

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    function initializePlayer() {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("player", {
        height: '100%',
        width: '100%',
        videoId: videoLinks[aulaSelecionada],
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onReady: (event) => event.target.playVideo(),
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              if (!aulasConcluidas.includes(aulaSelecionada)) {
                setAulasConcluidas((prev) => [...prev, aulaSelecionada]);
              }
            }
          }
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [aulaSelecionada]);

  const voltarParaTrilhas = () => {
    navigate('/trilhas');
  };

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const handleModuloClick = (index) => {
    setModuloAtivo(moduloAtivo === index ? null : index);
  };

  const isAulaConcluida = (aula) => aulasConcluidas.includes(aula);

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

        {/* Player de Aulas */}
        <div className="video-container">
          <div className="video-area">
            <div className="video-placeholder">
              <div id="player"></div>
            </div>
            <div className="aula-info">
              <h3>{aulaSelecionada}</h3>
              <div className="status-e-botoes">
                <div className={`status-icone ${isAulaConcluida(aulaSelecionada) ? "check-vermelho" : "bolinha"}`} />
                <div className="botoes">
                  <button className="quiz" onClick={() => window.location.href = "/quiz"}>Quiz</button>
                  <button className="leitura" onClick={() => window.open("", "_blank")}>Leitura complementar</button>
                  <button className="assistente">Assistente Virtual</button>
                  <button className="proximo" onClick={() => {
                    const indexAtual = modulosData.flatMap(m => m.aulas).indexOf(aulaSelecionada);
                    const todasAulas = modulosData.flatMap(m => m.aulas);
                    if (indexAtual + 1 < todasAulas.length) {
                      setAulaSelecionada(todasAulas[indexAtual + 1]);
                    }
                  }}>Próximo</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modulos">
            {modulosData.map((modulo, index) => (
              <div key={index} className="modulo">
                <div className="modulo-header" onClick={() => handleModuloClick(index)}>
                  <div className={`icone-status ${modulo.aulas.every(aula => aulasConcluidas.includes(aula)) && modulo.aulas.length > 0 ? "vermelho" : "cinza"}`} />
                  <span>{modulo.titulo}</span>
                  <span className="seta">{moduloAtivo === index ? "▲" : "▼"}</span>
                </div>
                {moduloAtivo === index && (
                  <div className="aulas">
                    {modulo.aulas.map((aula, i) => (
                      <div
                        key={i}
                        className={`aula ${aulaSelecionada === aula ? "ativa" : ""}`}
                        onClick={() => setAulaSelecionada(aula)}
                      >
                        <div className={`icone-aula ${isAulaConcluida(aula) ? "check-vermelho" : "bolinha-vermelha"}`} />
                        <span>{aula}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="teste-final">
              <a href="">Teste Final</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}