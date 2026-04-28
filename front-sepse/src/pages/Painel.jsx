import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  LogOut, Activity, Users, HeartPulse, Settings, 
  Pill, Bed, ClipboardList, Hospital, LayoutGrid, Bell, 
  Search, ChevronRight, UserCircle
} from 'lucide-react';

const MapaDeIcones = {
  Users, HeartPulse, Settings, Pill, Bed, ClipboardList, Hospital
};


export default function Painel() {
  const navigate = useNavigate();
  const [modulos, setModulos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  
  const usuarioTexto = localStorage.getItem('sigh_user');
  const usuario = usuarioTexto ? JSON.parse(usuarioTexto) : { nome: 'Profissional', perfil: 'N/A' };

  useEffect(() => {
    const buscarModulos = async () => {
      const token = localStorage.getItem('sigh_token');
      if (!token) { navigate('/'); return; }

      try {
        const resposta = await fetch('http://localhost:8080/api/modulos/meus-modulos', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (resposta.ok) {
          setModulos(await resposta.json());
        } else {
          setErro('Falha na autenticação das permissões.');
        }
      } catch (error) {
        setErro('Conexão com o servidor SIGH interrompida.');
      } finally {
        setTimeout(() => setCarregando(false), 600); // Suaviza a transição
      }
    };
    buscarModulos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      
      {/* SIDEBAR LATERAL (Padrão SIGH Profissional) */}
      <aside className="w-64 bg-slate-900 hidden lg:flex flex-col sticky top-0 h-screen shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-teal-500 p-2 rounded-lg text-white shadow-lg shadow-teal-500/20">
            <Hospital size={24} />
          </div>
          <span className="text-white font-black text-xl tracking-tighter">SIGH <span className="text-teal-400 font-light">UPA</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2 mb-4">Navegação Principal</p>

            <button onClick={() => navigate('/painel')} className="w-full flex items-center gap-3 px-4 py-3 bg-teal-500/10 text-teal-400 rounded-xl font-bold transition-all border border-teal-500/20">
            <LayoutGrid size={20} /> Dashboard
            </button>

            {modulos.map(m => {
            // A MÁGICA ESTÁ AQUI: Atribuímos a uma constante com letra MAIÚSCULA
            const IconeSidebar = MapaDeIcones[m.icone] || LayoutGrid;

            return (
                <button 
                key={m.id} 
                onClick={() => navigate(m.rotaApp)} 
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all group"
                >
                <div className="group-hover:scale-110 transition-transform">
                    <IconeSidebar size={20} />
                </div>
                <span className="text-sm font-medium">{m.titulo.split(' ')[0]}</span>
                </button>
            );
            })}
            </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER SUPERIOR */}
        <header className="bg-white h-20 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-sm font-medium">Dashboard</span>
            <ChevronRight size={16} />
            <span className="text-sm font-bold text-slate-800">Início</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Buscar paciente ou módulo..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-teal-500 outline-none w-64 transition-all" />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-teal-600 transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-black text-slate-800">{usuario.nome}</p>
                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-tighter">{usuario.perfil}</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 border border-slate-200">
                <UserCircle size={24} />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* BOAS VINDAS */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bem-vindo ao SIGH, {usuario.nome.split(' ')[0]}</h2>
            <p className="text-slate-500 mt-1">Selecione o módulo de operação para UPA Santa Paula.</p>
          </div>

          {/* ÁREA DE CARDS */}
          {carregando ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-white border border-slate-200 rounded-[2rem] animate-pulse"></div>
              ))}
            </div>
          ) : erro ? (
            <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl text-rose-600 flex items-center gap-4 shadow-sm">
              <Activity className="animate-bounce" />
              <p className="font-bold">{erro}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modulos.map((m) => {
                const Icone = MapaDeIcones[m.icone] || LayoutGrid;
                return (
                  <div 
                    key={m.id} 
                    onClick={() => navigate(m.rotaApp)}
                    className={`group bg-white rounded-[2rem] border-2 ${m.corBorda || 'border-transparent'} p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 relative overflow-hidden`}
                  >
                    {/* Background decorativo */}
                    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 ${m.corBorda ? 'bg-current' : 'bg-slate-400'}`}></div>

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors ${m.corFundo || 'bg-slate-50'}`}>
                      <Icone size={28} className="text-slate-700 group-hover:text-teal-600 transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">{m.titulo}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {m.descricao}
                    </p>

                    <div className="mt-6 flex items-center text-xs font-bold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      ACESSAR MÓDULO <ChevronRight size={14} className="ml-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}