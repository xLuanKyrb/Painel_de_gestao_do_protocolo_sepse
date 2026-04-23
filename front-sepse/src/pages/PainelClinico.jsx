import { useEffect, useState } from 'react';
import api from '../services/api';
import './PainelClinico.css';

export default function PainelClinico() {
  const [protocolos, setProtocolos] = useState([]);
  
  // Estado para controlar o formulário de novo protocolo
  const [novoProtocolo, setNovoProtocolo] = useState({
    pacienteId: '',
    responsavel: '',
    foco: ''
  });

  const carregarProtocolos = async () => {
    try {
      const response = await api.get('/protocolos/ativos');
      setProtocolos(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    carregarProtocolos();
  }, []);

  // Função para ABRIR o protocolo no banco (Substitui o Postman!)
  const abrirNovoProtocolo = async (e) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    try {
      await api.post('/protocolos', {
        paciente: { id: parseInt(novoProtocolo.pacienteId) },
        nomeResponsavelAbertura: novoProtocolo.responsavel,
        focoInfeccioso: novoProtocolo.foco
      });
      
      alert('✅ Protocolo aberto com sucesso! O Tempo Zero começou.');
      
      // Limpa o formulário
      setNovoProtocolo({ pacienteId: '', responsavel: '', foco: '' });
      
      // Recarrega a tela para mostrar o novo cartão
      carregarProtocolos();
    } catch (error) {
      alert('Erro ao abrir protocolo. Verifique se o ID do paciente existe.');
      console.error(error);
    }
  };

  // Função que envia a ação do checklist
  const registrarAcao = async (protocoloId, tipoAcao) => {
    const nomeResponsavel = window.prompt(`Qual o seu nome para registrar a ação de ${tipoAcao}?`);
    if (!nomeResponsavel) return;

    try {
      await api.post(`/protocolos/${protocoloId}/acoes`, {
        tipoAcao: tipoAcao,
        responsavelAcao: nomeResponsavel,
        observacao: "Ação registrada via Painel Rápido"
      });
      
      alert(`✅ ${tipoAcao} registrado com sucesso!`);
      carregarProtocolos();
    } catch (error) {
      alert("Erro ao registrar a ação.");
      console.error(error);
    }
  };

  return (
    <div className="painel-container">
      <header className="painel-header">
        <h1>👨‍⚕️ Painel Clínico - Protocolo de Sepse</h1>
      </header>

      {/* --- NOVO: Formulário de Abertura --- */}
      <section className="form-abertura-section">
        <h2>🚨 Abrir Novo Protocolo</h2>
        <form onSubmit={abrirNovoProtocolo} className="form-abertura">
          <div className="input-group">
            <label>ID do Paciente:</label>
            <input 
              type="number" 
              required 
              placeholder="Ex: 1"
              value={novoProtocolo.pacienteId}
              onChange={(e) => setNovoProtocolo({...novoProtocolo, pacienteId: e.target.value})}
            />
          </div>
          
          <div className="input-group">
            <label>Responsável pela Triagem:</label>
            <input 
              type="text" 
              required 
              placeholder="Seu nome"
              value={novoProtocolo.responsavel}
              onChange={(e) => setNovoProtocolo({...novoProtocolo, responsavel: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Foco Infeccioso Suspeito:</label>
            <select 
              required 
              value={novoProtocolo.foco}
              onChange={(e) => setNovoProtocolo({...novoProtocolo, foco: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option value="Pulmonar">Pulmonar</option>
              <option value="Urinário">Urinário</option>
              <option value="Abdominal">Abdominal</option>
              <option value="SNC">Sistema Nervoso Central</option>
              <option value="Pele/Partes Moles">Pele / Partes Moles</option>
              <option value="Indeterminado">Indeterminado</option>
            </select>
          </div>

          <button type="submit" className="btn-abrir">Iniciar Tempo Zero</button>
        </form>
      </section>

      <hr className="divisor" />

      {/* --- Área dos Cartões que você já tinha --- */}
      <h2>Pacientes em Observação</h2>
      <div className="cards-grid">
        {protocolos.length === 0 ? (
          <p>Nenhum protocolo em andamento no momento.</p>
        ) : (
          protocolos.map((prot) => (
            <div className="paciente-card" key={prot.id}>
              <h2>{prot.paciente.nomeCompleto}</h2>
              <p><strong>Protocolo nº:</strong> {prot.id}</p>
              <p><strong>Tempo Zero:</strong> {new Date(prot.dataHoraAbertura).toLocaleTimeString('pt-BR')}</p>
              <p><strong>Foco:</strong> {prot.focoInfeccioso}</p>
              
              <hr />
              
              <div className="acoes-botoes">
                <button className="btn-cultura" onClick={() => registrarAcao(prot.id, 'CULTURA')}>🧪 Cultura</button>
                <button className="btn-antibiotico" onClick={() => registrarAcao(prot.id, 'ANTIBIOTICO')}>💊 Antibiótico</button>
                <button className="btn-fluido" onClick={() => registrarAcao(prot.id, 'FLUIDO')}>💧 Fluidos</button>
                <button className="btn-perfusao" onClick={() => registrarAcao(prot.id, 'PERFUSAO')}>🩸 Perfusão</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}