const dashboardService = {
  getDashboardProgressos: async () => {
    // Simula uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { titulo: 'Concluir Módulo 3', progresso: 60 },
          { titulo: 'Exercícios Pendentes Capítulo 6', progresso: 40 },
          { titulo: 'Nível Atual Aprendizado', progresso: 80 }
        ]);
      }, 500);
    });
  },

  getDashboardTopAprendizes: async () => {
    // Simula uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { nome: 'Rafaela', foto: 'rafaela.jpg', pontos: 950 },
          { nome: 'Pedro', foto: 'pedro.jpg', pontos: 870 },
          { nome: 'Fernanda', foto: 'fernanda.jpg', pontos: 790 },
          { nome: 'Cláudia', foto: 'claudia.jpg', pontos: 750 },
          { nome: 'Carlos', foto: 'carlos.jpg', pontos: 700 },
          { nome: 'Arthur', foto: 'arthur.jpg', pontos: 650 }
        ]);
      }, 500);
    });
  },

  getDashboardEstatisticas: async () => {
    // Simula uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { valor: 7, label: 'Certificados', icone: 'certificado.png' },
          { valor: 1765, label: 'Horas de Estudo', icone: 'relogio.png' },
          { valor: 23, label: 'Módulos Finalizados', icone: 'modulo.png' },
          { valor: 38, label: 'Desafios Concluídos', icone: 'desafio.png' }
        ]);
      }, 500);
    });
  }
};

export default dashboardService;
