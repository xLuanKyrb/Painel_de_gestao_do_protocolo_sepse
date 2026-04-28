import { useState } from "react";
import { Lock, User as UserIcon, ArrowRight, ShieldAlert, Save, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoSigh from "../assets/sigh-icone.png";

export default function Login() {
  const navigate = useNavigate();
  
  // ESTADOS PRINCIPAIS
  const [etapa, setEtapa] = useState('login'); // 'login' ou 'trocar'
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  // CAMPOS DO LOGIN
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  // CAMPOS DA TROCA DE SENHA
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        localStorage.setItem('sigh_token', dados.token);
        localStorage.setItem('sigh_user', JSON.stringify({
          nome: dados.nome,
          perfil: dados.perfil,
          precisaTrocarSenha: dados.precisaTrocarSenha 
        }));

        // DECISÃO DE ETAPA
        if (dados.precisaTrocarSenha) {
          setEtapa('trocar'); // Troca o formulário na hora!
        } else {
          navigate('/painel');
        }
      } else {
        setErro('Usuário ou senha inválidos.');
      }
    } catch (error) {
      setErro('Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  const handleTrocarSenha = async (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);
    const token = localStorage.getItem('sigh_token');

    try {
      const res = await fetch('http://localhost:8080/api/usuarios/alterar-senha', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ novaSenha })
      });

      if (res.ok) {
        navigate('/painel');
      } else {
        setErro('Erro ao atualizar senha.');
      }
    } catch (err) {
      setErro('Erro de rede.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-slate-100">
          
          <div className="flex justify-center mb-6">
            <img src={logoSigh} alt="Logo" className="h-20 object-contain" />
          </div>

          {erro && (
            <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm font-bold mb-5 flex items-center gap-2 border border-red-100">
              <ShieldAlert size={18} />
              <span>{erro}</span>
            </div>
          )}

          {/* --- FORMULÁRIO DE LOGIN --- */}
          {etapa === 'login' && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Acesso ao Sistema</h2>
                <p className="text-sm text-slate-500 mt-2">Unidade de Pronto Atendimento</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input type="text" placeholder="Usuário" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-teal-500/10 transition-all" value={usuario} onChange={e => setUsuario(e.target.value)} required />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input type="password" placeholder="Senha" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-teal-500/10 transition-all" value={senha} onChange={e => setSenha(e.target.value)} required />
                </div>
                <button type="submit" disabled={carregando} className="w-full bg-[#38b2ac] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#319795] flex items-center justify-center gap-2 transition-all">
                  {carregando ? 'Verificando...' : 'Entrar'} {!carregando && <ArrowRight size={18} />}
                </button>
              </form>
            </>
          )}

          {/* --- FORMULÁRIO DE TROCA DE SENHA (Aparece se for 1º acesso) --- */}
          {etapa === 'trocar' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center mb-6">
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <KeyRound className="text-orange-600" size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Primeiro Acesso</h2>
                <p className="text-sm text-slate-500 mt-2">Defina uma senha pessoal para continuar.</p>
              </div>

              <form onSubmit={handleTrocarSenha} className="space-y-4">
                <input type="password" placeholder="Nova Senha" required className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} />
                <input type="password" placeholder="Confirme a Senha" required className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} />
                <button type="submit" disabled={carregando} className="w-full bg-slate-800 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-700 flex items-center justify-center gap-2 transition-all">
                  {carregando ? 'Salvando...' : 'Salvar e Entrar'} {!carregando && <Save size={18} />}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}