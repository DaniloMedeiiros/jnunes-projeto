import { useState, useRef } from "react";
import { ArrowLeft, Star, User, Clock, BookOpen, FileText, ChevronDown, ChevronUp, CheckCircle, Circle } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import "./style.css";

// Dados dos módulos (movido para fora do componente)
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
      { id: 1, titulo: "Aula 1 - O que fazer em caso de acidentes no canteiro de obras?", assistida: true },
      { id: 2, titulo: "Aula 2 - Primeiros socorros: Como agir em emergências", assistida: true },
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

export default function TrilhaSegurancaObras() {
  const [abaAtiva, setAbaAtiva] = useState("info");
  const [menuAberto, setMenuAberto] = useState(true);
  const [modulosAbertos, setModulosAbertos] = useState([]);
  const navigate = useNavigate();

  // Função para voltar para a página de trilhas
  const voltarParaTrilhas = () => {
    navigate('/trilhas');
  };

  // Função para toggle do menu
  const toggleMenu = () => setMenuAberto(!menuAberto);

  // Função para toggle dos módulos
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
              onClick={() => setAbaAtiva("info")}
            >
              Informações Gerais
            </button>
            <button
              className={`trilha-conteudo-secao-aba ${abaAtiva === "conteudo" ? "ativa" : ""}`}
              onClick={() => setAbaAtiva("conteudo")}
            >
              Conteúdo da trilha
            </button>
          </div>
        </div>

        {/* Card principal (aparece em ambas as abas) */}
        <div className="trilha-conteudo-secao-card-container">
          <div className="trilha-conteudo-secao-card">
            <div className="trilha-conteudo-secao-imagem">EPI</div>
            <div className="trilha-conteudo-secao-detalhes">
              <div className="trilha-conteudo-secao-avaliacao">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} fill="currentColor" stroke="currentColor" size={16} />
                ))}
                <span className="trilha-conteudo-secao-avaliacao-texto">4.0 (20 avaliações)</span>
              </div>
              <div className="trilha-conteudo-secao-criador">
                <User size={16} />
                <span>Criado por Adm</span>
                <span className="trilha-conteudo-secao-data">Modificado em 30/03/2023</span>
              </div>
              <div className="trilha-conteudo-secao-categoria">
                <span className="trilha-conteudo-secao-categoria-label">Categorias: </span>
                <span className="trilha-conteudo-secao-categoria-tag">Segurança</span>
              </div>
              <div className="trilha-conteudo-secao-infos">
                <BookOpen size={16} />
                <span>9 módulos</span>
                <Clock size={16} />
                <span>7 horas de conteúdo</span>
                <FileText size={16} />
                <span>Certificado de conclusão</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo condicional */}
        {abaAtiva === "info" ? (
          <div className="trilha-conteudo-secao-descricao-container">
            <div className="trilha-conteudo-secao-descricao">
              <div className="trilha-conteudo-secao-bloco">
                <h2 className="trilha-conteudo-secao-subtitulo">📌 Objetivo da Trilha</h2>
                <p>
                  Nesta trilha, você aprenderá as melhores práticas de segurança no canteiro de obras, garantindo um ambiente
                  de trabalho mais protegido e eficiente. Ao longo do curso, abordaremos os principais riscos, o uso correto
                  dos Equipamentos de Proteção Individual (EPIs) e Coletiva (EPCs), procedimentos de emergência e diretrizes
                  essenciais para evitar acidentes.
                </p>
              </div>
              <div className="trilha-conteudo-secao-bloco">
                <h2 className="trilha-conteudo-secao-subtitulo">👷 Para quem é esta trilha?</h2>
                <p>
                  Este curso é voltado para todos os profissionais da construção civil, incluindo operários, técnicos,
                  engenheiros e gestores de obras, garantindo que toda a equipe esteja alinhada com as normas de segurança.
                </p>
              </div>
              <div className="trilha-conteudo-secao-bloco">
                <h2 className="trilha-conteudo-secao-subtitulo">📚 O que você vai aprender?</h2>
                <ul>
                  <li>Identificação e prevenção de riscos no canteiro de obras</li>
                  <li>Uso correto de EPIs e EPCs</li>
                  <li>Procedimentos de emergência</li>
                  <li>Normas regulamentadoras</li>
                </ul>
              </div>
              <button className="trilha-conteudo-secao-botao">Ver mais</button>
            </div>
          </div>
        ) : (
          <div className="trilha-conteudo-secao-conteudo-container">
            {/* Conteúdo da aba de módulos */}
            <div className="trilha-conteudo-secao-progresso">
              <div className="trilha-conteudo-secao-barra">
                <div className="trilha-conteudo-secao-barra-preenchida" style={{ width: "32%" }}></div>
              </div>
              <span className="trilha-conteudo-secao-texto-progresso">32% Concluído</span>
            </div>

            {modulosData.map((modulo) => (
              <div key={modulo.id} className="trilha-conteudo-secao-modulo">
                <div className="trilha-conteudo-secao-topo" onClick={() => toggleModulo(modulo.id)}>
                  <img src={modulo.imagem} alt="Módulo" className="trilha-conteudo-secao-imagem-modulo" />
                  <div className="trilha-conteudo-secao-info">
                    <p className="trilha-conteudo-secao-titulo-modulo">{modulo.titulo}</p>
                    {modulo.status === "concluido" && (
                      <span className="trilha-conteudo-secao-status">Concluído</span>
                    )}
                    {modulo.status === "parcial" && (
                      <span className="trilha-conteudo-secao-status parcial">
                        {modulo.progresso}% concluído
                      </span>
                    )}
                    {modulo.status === "nao-iniciado" && (
                      <span className="trilha-conteudo-secao-status nao-iniciado">
                        Não iniciado
                      </span>
                    )}
                  </div>
                  {modulosAbertos.includes(modulo.id) ? <ChevronUp /> : <ChevronDown />}
                </div>

                {modulosAbertos.includes(modulo.id) && (
                  <div className="trilha-conteudo-secao-aulas">
                    {modulo.aulas.map((aula) => (
                      <Link
                        key={aula.id}
                        to="#"
                        className="trilha-conteudo-secao-aula"
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
        )}
      </div>
    </div>
  );
}