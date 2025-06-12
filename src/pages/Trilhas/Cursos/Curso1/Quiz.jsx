import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Quiz.css";

const questions = [
  {
    question: 'No canteiro de obras, qual item é considerado um Equipamento de Proteção Individual (EPI)?',
    options: [
      'Capacete de segurança',
      'Sinalização de trânsito',
      'Extintor de incêndio',
      'Placa de advertência'
    ],
    answer: 0
  },
  {
    question: 'Qual desses equipamentos é obrigatório para trabalho em altura?',
    options: [
      'Capacete de segurança',
      'Cinto de segurança tipo paraquedista',
      'Botina de borracha',
      'Sinalização de trânsito'
    ],
    answer: 1
  },
  {
    question: 'O que é considerado EPI para proteção auditiva?',
    options: [
      'Luvas de couro',
      'Protetor auricular',
      'Óculos de proteção',
      'Máscara descartável'
    ],
    answer: 1
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (index) => {
    const newSelected = [...selected];
    newSelected[current] = index;
    setSelected(newSelected);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const getClass = (index, selectedIndex, correctAnswer, isResult) => {
    if (!isResult) {
      return index === selectedIndex ? 'quiz-option quiz-selected' : 'quiz-option';
    } else {
      if (index === correctAnswer) return 'quiz-option quiz-correct';
      if (index === selectedIndex && selectedIndex !== correctAnswer) return 'quiz-option quiz-wrong';
      return 'quiz-option';
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <button className="quiz-close-btn" onClick={handleClose}>✕</button>
        <h4 className="quiz-title">Escolha uma alternativa</h4>

        {!showResult ? (
          <>
            <p className="quiz-question">{questions[current].question}</p>
            <div className="quiz-options">
              {questions[current].options.map((opt, i) => (
                <div
                  key={i}
                  className={getClass(i, selected[current], questions[current].answer, false)}
                  onClick={() => handleOptionClick(i)}
                >
                  <span>{String.fromCharCode(65 + i)}</span> {opt}
                </div>
              ))}
            </div>
            <div className="quiz-navigation">
              <button className="quiz-prev-btn" onClick={handlePrevious} disabled={current === 0}>◀ Anterior</button>
              <button className="quiz-next-btn" onClick={handleNext}>Próxima ➝</button>
            </div>
          </>
        ) : (
          <div className="quiz-options">
            {questions.map((q, qi) => (
              <div key={qi}>
                <p className="quiz-review-question">{q.question}</p>
                {q.options.map((opt, oi) => (
                  <div
                    key={oi}
                    className={getClass(oi, selected[qi], q.answer, true)}
                  >
                    <span>{String.fromCharCode(65 + oi)}</span> {opt}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="quiz-progress-bar">
          <div className="quiz-bar" style={{ width: `${((current + 1) / questions.length) * 100}%` }}></div>
          <span className="quiz-progress-text">{current + 1}/{questions.length}</span>
        </div>
      </div>
    </div>
  );
}