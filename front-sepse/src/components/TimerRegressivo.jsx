import { useState, useEffect } from 'react';

export default function TimerRegressivo({ dataHoraAbertura }) {
  const [tempo, setTempo] = useState("");
  const [critico, setCritico] = useState(false);

  useEffect(() => {
    const atualizar = () => {
      const abertura = new Date(dataHoraAbertura);
      const agora = new Date();
      const sessentaMinutos = 60 * 60 * 1000;
      const restante = sessentaMinutos - (agora - abertura);

      if (restante <= 0) {
        setTempo("SLA ESTOURADO!");
        setCritico(true);
      } else {
        const min = Math.floor(restante / 60000);
        const seg = Math.floor((restante % 60000) / 1000);
        setTempo(`${min}min ${seg}s`);
        if (min < 15) setCritico(true); 
      }
    };

    atualizar();
    const id = setInterval(atualizar, 1000);
    return () => clearInterval(id);
  }, [dataHoraAbertura]);

  return (
    <div className={`timer-box ${critico ? 'timer-critico' : ''}`}>
      <span>Tempo para Pacote 1ª Hora:</span>
      <strong>{tempo}</strong>
    </div>
  );
}