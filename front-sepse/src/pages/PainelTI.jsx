import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Save, ArrowLeft, CheckSquare, Square, 
  Activity, AlertCircle, UserPlus, Users as UsersIcon,
  ChevronRight, Hospital, Search, Filter, MoreHorizontal,
  Mail, User, Fingerprint, MapPin
} from 'lucide-react';

export default function PainelTI() {
  const navigate = useNavigate();
  
  // Controle de Abas
  const [abaAtiva, setAbaAtiva] = useState('usuarios'); 

  // Estados de Dados
  const [perfis, setPerfis] = useState([]);
  const [todosModulos, setTodosModulos] = useState([]);
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [usuariosCadastrados, setUsuariosCadastrados] = useState([]);
  
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);
  const [modulosMarcados, setModulosMarcados] = useState([]); 
  
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  // Estado do Formulário
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '', cpf: '', email: '', usuario: '', perfilId: '', estabelecimentoId: ''
  });

  useEffect(() => {
    const carregarDados = async () => {
      const token = localStorage.getItem('sigh_token');
      if (!token) return navigate('/');

      try {
        const [resPerfis, resModulos, resEstab, resUsers] = await Promise.all([
          fetch('http://localhost:8080/api/perfis', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:8080/api/modulos/todos', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:8080/api/estabelecimentos', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:8080/api/usuarios', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (resPerfis.ok && resModulos.ok && resEstab.ok && resUsers.ok) {
          setPerfis(await resPerfis.json());
          setTodosModulos(await resModulos.json());
          setEstabelecimentos(await resEstab.json());
          setUsuariosCadastrados(await resUsers.json());
        }
      } catch (error) {
        setMensagem({ texto: 'Falha na comunicação com o servidor.', tipo: 'erro' });
      } finally {
        setCarregando(false);
      }
    };
    carregarDados();
  }, [navigate]);

  // Handlers (Mantendo a lógica que já funciona)
  const selecionarPerfil = (perfil) => {
    setPerfilSelecionado(perfil);
    setModulosMarcados(perfil.modulos.map(m => m.id));
  };

  const handleCadastrarUsuario = async (e) => {
    e.preventDefault();
    setSalvando(true);
    const token = localStorage.getItem('sigh_token');
    const payload = {
      nome: novoUsuario.nome, cpf: novoUsuario.cpf, email: novoUsuario.email,
      usuario: novoUsuario.usuario, perfil: { id: novoUsuario.perfilId },
      estabelecimento: { id: novoUsuario.estabelecimentoId }
    };

    try {
      const res = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const userSalvo = await res.json();
        setUsuariosCadastrados([...usuariosCadastrados, userSalvo]);
        setMensagem({ texto: 'Usuário ativado com sucesso!', tipo: 'sucesso' });
        setNovoUsuario({ nome: '', cpf: '', email: '', usuario: '', perfilId: '', estabelecimentoId: '' });
      }
    } catch (error) {
      setMensagem({ texto: 'Erro ao processar cadastro.', tipo: 'erro' });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      
      {/* SIDEBAR CONSISTENTE COM O PAINEL */}
      <aside className="w-64 bg-slate-900 hidden lg:flex flex-col sticky top-0 h-screen shadow-xl shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-teal-500 p-2 rounded-lg text-white shadow-lg shadow-teal-500/20">
            <ShieldCheck size={24} />
          </div>
          <span className="text-white font-black text-xl tracking-tighter">SIGH <span className="text-teal-400 font-light">TI</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2 mb-4">Ferramentas de Gestão</p>
          <button onClick={() => setAbaAtiva('usuarios')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${abaAtiva === 'usuarios' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white'}`}>
            <UsersIcon size={20} /> Equipe UPA
          </button>
          <button onClick={() => setAbaAtiva('permissoes')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${abaAtiva === 'permissoes' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white'}`}>
            <ShieldCheck size={20} /> Permissões
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={() => navigate('/painel')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white rounded-xl transition-all">
            <ArrowLeft size={20} /> Voltar ao Início
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* HEADER PROFISSIONAL */}
        <header className="bg-white h-20 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-sm font-medium">Administração</span>
            <ChevronRight size={16} />
            <span className="text-sm font-bold text-slate-800 capitalize">{abaAtiva}</span>
          </div>

          <div className="flex items-center gap-4">
            {mensagem.texto && (
              <div className={`px-4 py-2 rounded-full text-xs font-bold animate-in fade-in slide-in-from-right-4 ${mensagem.tipo === 'sucesso' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {mensagem.texto}
              </div>
            )}
          </div>
        </header>

        <div className="p-8 max-w-6xl w-full mx-auto">
          
          {carregando ? (
            <div className="flex justify-center items-center py-20"><Activity className="animate-spin text-teal-500" size={48} /></div>
          ) : (
            <>
              {/* --- ABA DE USUÁRIOS (FORMULÁRIO + TABELA) --- */}
              {abaAtiva === 'usuarios' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  
                  {/* FORMULÁRIO REFINADO */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl"><UserPlus size={24}/></div>
                      <div>
                        <h2 className="text-xl font-black text-slate-800">Novo Profissional</h2>
                        <p className="text-sm text-slate-500">Cadastre médicos, enfermeiros e recepcionistas.</p>
                      </div>
                    </div>

                    <form onSubmit={handleCadastrarUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">Nome Completo</label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 text-slate-300" size={18} />
                          <input type="text" required className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none" value={novoUsuario.nome} onChange={e => setNovoUsuario({...novoUsuario, nome: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">CPF</label>
                        <div className="relative">
                          <Fingerprint className="absolute left-4 top-3.5 text-slate-300" size={18} />
                          <input type="text" required placeholder="000.000.000-00" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none" value={novoUsuario.cpf} onChange={e => setNovoUsuario({...novoUsuario, cpf: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">E-mail Corporativo</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 text-slate-300" size={18} />
                          <input type="email" required className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none" value={novoUsuario.email} onChange={e => setNovoUsuario({...novoUsuario, email: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">Usuário / Login</label>
                        <input type="text" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none font-bold text-teal-600" value={novoUsuario.usuario} onChange={e => setNovoUsuario({...novoUsuario, usuario: e.target.value})} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">Perfil</label>
                        <select required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={novoUsuario.perfilId} onChange={e => setNovoUsuario({...novoUsuario, perfilId: e.target.value})}>
                          <option value="">Selecione...</option>
                          {perfis.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">Unidade</label>
                        <select required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={novoUsuario.estabelecimentoId} onChange={e => setNovoUsuario({...novoUsuario, estabelecimentoId: e.target.value})}>
                          <option value="">Selecione...</option>
                          {estabelecimentos.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                        </select>
                      </div>

                      <div className="md:col-span-3 flex justify-end pt-4">
                        <button type="submit" disabled={salvando} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50">
                          <Save size={18}/> {salvando ? 'Processando...' : 'Finalizar Cadastro'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* TABELA DE USUÁRIOS (A "PROVA" DE QUE O SISTEMA É ROBUSTO) */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <h3 className="font-black text-slate-800 uppercase tracking-tighter">Equipe Cadastrada</h3>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-2 text-slate-400" size={14}/>
                          <input type="text" placeholder="Filtrar nome..." className="pl-8 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none" />
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <th className="px-6 py-4">Profissional</th>
                            <th className="px-6 py-4">Acesso</th>
                            <th className="px-6 py-4">Unidade</th>
                            <th className="px-6 py-4 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {usuariosCadastrados.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                <p className="font-bold text-slate-800 text-sm">{user.nome}</p>
                                <p className="text-xs text-slate-400">{user.usuario}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black">{user.perfil?.nome}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                {user.estabelecimento?.nome}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className={`w-2 h-2 rounded-full inline-block ${user.ativo ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA DE PERMISSÕES (Mantida e Estilizada) */}
              {abaAtiva === 'permissoes' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="md:col-span-1 bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden h-fit">
                    <div className="bg-slate-50 p-6 border-b border-slate-100"><h2 className="font-black text-slate-800 uppercase text-xs tracking-widest">Selecione o Perfil</h2></div>
                    <div className="p-2">
                      {perfis.map(perfil => (
                        <button key={perfil.id} onClick={() => selecionarPerfil(perfil)} className={`w-full text-left px-5 py-4 rounded-2xl transition-all font-bold text-sm mb-1 ${perfilSelecionado?.id === perfil.id ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'text-slate-500 hover:bg-slate-50'}`}>
                          {perfil.nome}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
                    <h2 className="text-xl font-black text-slate-800 mb-6">Módulos Liberados</h2>
                    <div className="grid grid-cols-1 gap-4 mb-8">
                      {todosModulos.map(modulo => {
                        const estaMarcado = modulosMarcados.includes(modulo.id);
                        return (
                          <label key={modulo.id} className={`flex items-start gap-4 p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all ${estaMarcado ? 'bg-teal-50/30 border-teal-500/20' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                            <input type="checkbox" className="hidden" checked={estaMarcado} onChange={() => alternarModulo(modulo.id)} />
                            {estaMarcado ? <CheckSquare size={24} className="text-teal-500" /> : <Square size={24} className="text-slate-300" />}
                            <div>
                              <p className={`font-black text-sm uppercase tracking-tight ${estaMarcado ? 'text-teal-700' : 'text-slate-400'}`}>{modulo.titulo}</p>
                              <p className="text-xs text-slate-500 mt-1 font-medium">{modulo.descricao}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    <div className="flex justify-end">
                      <button onClick={handleSalvarPermissoes} disabled={salvando} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 flex gap-2">
                        <Save size={18} /> Atualizar Acessos
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}