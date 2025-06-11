import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importa o hook useAuth
import './style.css';

import emoji from '../../imagens/emoji.png';
import item1 from '../../imagens/itens-login-1.png';
import item2 from '../../imagens/itens-login-2.png';
import item3 from '../../imagens/itens-login-3.png';
import item4 from '../../imagens/itens-login-4.png';
import item5 from '../../imagens/itens-login-5.png';
import item6 from '../../imagens/itens-login-6.png';
import item7 from '../../imagens/itens-login-7.png';
import item8 from '../../imagens/itens-login-8.png';
import logo from '../../imagens/logo.png';
import mascote from '../../imagens/mascote.png';

export default function Login() {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa o hook useAuth para acessar a função de login
  const [errors, setErrors] = useState({
    loginInput: '',
    password: ''
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    charLength: false,
    oneNumber: false,
    oneUpper: false,
    oneLower: false,
    oneSpecial: false
  });

  const handleLogin = async (e) => {
    // Adiciona async
    e.preventDefault();
    console.log('Função handleLogin chamada!');

    const newErrors = {};

    if (!loginInput.trim()) {
      newErrors.loginInput = 'Insira seu e-mail ou matrícula';
    } else {
      if (/[a-zA-Z]/.test(loginInput)) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput)) {
          newErrors.loginInput = 'E-mail inválido';
        }
      } else {
        if (!/^\d{10}$/.test(loginInput)) {
          newErrors.loginInput = 'Matrícula deve ter exatamente 10 dígitos';
        }
      }
    }

    if (!password.trim()) newErrors.password = 'Insira sua senha';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await login(loginInput, password); // Chama a função de login do contexto
        navigate('/dashboard');
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: error.message || 'Credenciais inválidas'
        }));
      }
    }
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentStep(0);
    setRecoveryEmail('');
    setRecoveryCode('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({ ...errors, recoveryEmail: '', password: '' });
  };

  const handleSendCode = (e) => {
    e.preventDefault();

    if (!recoveryEmail.includes('@gmail.com')) {
      setErrors({ ...errors, recoveryEmail: 'Informe um e-mail válido' });
      return;
    }
    setCurrentStep(1);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

    setPasswordRequirements({
      charLength: password.length >= 8,
      oneNumber: /\d/.test(password),
      oneUpper: /[A-Z]/.test(password),
      oneLower: /[a-z]/.test(password),
      oneSpecial: /[\W_]/.test(password)
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    const allRequirementsMet =
      Object.values(passwordRequirements).every(Boolean);
    if (!allRequirementsMet || newPassword !== confirmPassword) {
      setErrors({ ...errors, password: 'Senha inválida ou não confere' });
      return;
    }

    setCurrentStep(3);
    // Aqui sera a chamada API para resetar a senha
  };

  return (
    <div className={`container ${modalOpen ? 'modal-active' : ''}`}>
      {/* Formulário Principal */}
      <div className="form-container">
        <img src={logo} alt="Logo Jotanunes" className="logo-topo" />

        {/* Itens decorativos (ajuste os imports no topo) */}
        <img src={item1} alt="Item decorativo" className="itens-login-1" />
        <img src={item2} alt="Item decorativo" className="itens-login-2" />
        <img src={item3} alt="Item decorativo" className="itens-login-3" />
        <img src={item4} alt="Item decorativo" className="itens-login-4" />
        <img src={item5} alt="Item decorativo" className="itens-login-5" />
        <img src={item6} alt="Item decorativo" className="itens-login-6" />
        <img src={item7} alt="Item decorativo" className="itens-login-7" />
        <img src={item8} alt="Item decorativo" className="itens-login-8" />

        <div className="form-content">
          <h1>Bem-vindo ao Sistema de treinamentos da Jotanunes!</h1>
          <p className="subtitulo">Treinamento e evolução em um só lugar</p>

          <form onSubmit={handleLogin}>
            <label htmlFor="loginInput">E-mail ou Matrícula</label>
            <input
              type="text"
              id="loginInput"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              placeholder="Digite seu e-mail ou matrícula"
              className={errors.loginInput ? 'input-error' : ''}
            />
            {errors.loginInput && (
              <span className="error">{errors.loginInput}</span>
            )}

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            <button
              type="button"
              className="esqueceu"
              onClick={handleOpenModal}
            >
              Esqueceu a senha?
            </button>

            <button type="submit" className="button">
              Entrar
            </button>
          </form>

          <p className="footer">
            Jotanunes Construtora © Todos os Direitos Reservados
          </p>
        </div>
      </div>

      {/* Lado do Mascote */}
      <div className="mascote-wrapper">
        <div className="circles-container">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="mascote-container">
            <img src={mascote} alt="Mascote" className="mascote-img" />
          </div>
        </div>
      </div>

      {/* Modal de Recuperação de Senha */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <span className="close-modal" onClick={handleCloseModal}>
                &times;
              </span>

              {/* Step 1: Email */}
              {currentStep === 0 && (
                <div className="step active">
                  <img src={emoji} alt="Emoji" className="emoji-icon" />
                  <h2 className="modal-step1-title">Recuperação de Senha</h2>
                  <p className="modal-step1-text">
                    Para recuperar seu acesso à plataforma novamente, vamos
                    enviar um código de 4 dígitos para redefinir sua senha.
                  </p>
                  <input
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="Digite seu email aqui"
                    className={errors.recoveryEmail ? 'input-error' : ''}
                  />
                  {errors.recoveryEmail && (
                    <span className="error-message active">
                      {errors.recoveryEmail}
                    </span>
                  )}
                  <button onClick={handleSendCode}>CONTINUE</button>
                </div>
              )}

              {/* Step 2: Código */}
              {currentStep === 1 && (
                <div className="step active">
                  <h2 className="modal-step2-title">Digite o Código</h2>
                  <p className="modal-step2-text">
                    Insira o código de 4 dígitos enviado para seu e-mail:
                  </p>
                  <input
                    type="text"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    maxLength="4"
                    placeholder="0000"
                  />
                  <button onClick={handleVerifyCode}>CONTINUE</button>
                </div>
              )}

              {/* Step 3: Nova Senha */}
              {currentStep === 2 && (
                <div className="step active">
                  <h2 className="modal-step3-title">Nova Senha</h2>
                  <p className="modal-step3-text">Digite sua nova senha:</p>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nova senha"
                    className={errors.password ? 'input-error' : ''}
                  />
                  <ul className="password-requirements">
                    <li
                      className={passwordRequirements.charLength ? 'valid' : ''}
                    >
                      Mínimo 8 caracteres
                    </li>
                    <li
                      className={passwordRequirements.oneNumber ? 'valid' : ''}
                    >
                      Pelo menos 1 número
                    </li>
                    <li
                      className={passwordRequirements.oneUpper ? 'valid' : ''}
                    >
                      Pelo menos 1 letra maiúscula
                    </li>
                    <li
                      className={passwordRequirements.oneLower ? 'valid' : ''}
                    >
                      Pelo menos 1 letra minúscula
                    </li>
                    <li
                      className={passwordRequirements.oneSpecial ? 'valid' : ''}
                    >
                      Pelo menos 1 caractere especial
                    </li>
                  </ul>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a senha"
                    className={errors.password ? 'input-error' : ''}
                  />
                  {errors.password && (
                    <span className="error-message active">
                      {errors.password}
                    </span>
                  )}
                  <button onClick={handleResetPassword}>CONTINUE</button>
                </div>
              )}

              {/* Step 4: Confirmação */}
              {currentStep === 3 && (
                <div className="step active">
                  <h2 className="modal-step4-title">Sucesso!</h2>
                  <p className="modal-step4-text">
                    Sua senha foi redefinida com sucesso.
                  </p>
                  <button
                    className="modal-confirm-btn"
                    onClick={handleCloseModal}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
