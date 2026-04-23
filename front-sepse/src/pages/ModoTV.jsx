import { useEffect, useState } from 'react';
import api from '../services/api';
import './ModoTV.css'; // Vamos criar um estilo simples depois

export default function ModoTV() {
  const [protocolos, setProtocolos] = useState([]);

  // Função para buscar os dados no Back-end
  const carregarProtocolos = async () => {
    try {
      const response = await api.get('/protocolos/ativos');
      setProtocolos(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  // O useEffect com setInterval faz o React buscar novos dados a cada 5 segundos
  useEffect(() => {
    carregarProtocolos(); // Carrega na hora que abre a tela
    
    const intervalo = setInterval(() => {
      carregarProtocolos();
    }, 5000); // 5000 milissegundos = 5 segundos

    // Limpa o intervalo se a tela for fechada
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="tv-container">
      <header className="tv-header">
        <h1>🚨 Gestão à Vista - Protocolo de Sepse</h1>
      </header>
      
      <table className="tv-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Aberto por</th>
            <th>Início (Tempo Zero)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {protocolos.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>Nenhum protocolo ativo no momento.</td>
            </tr>
          ) : (
            protocolos.map((prot) => (
              <tr key={prot.id}>
                <td>#{prot.id}</td>
                <td>{prot.paciente.nomeCompleto}</td>
                <td>{prot.nomeResponsavelAbertura}</td>
                <td>{new Date(prot.dataHoraAbertura).toLocaleTimeString('pt-BR')}</td>
                <td className="status-andamento">Em Andamento</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}