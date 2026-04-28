import { useState } from 'react';
import { 
  UserPlus, Search, Edit2, Trash2, Shield, Stethoscope, Activity, 
  Laptop, Filter, ChevronDown, MoreHorizontal, CheckCircle2, XCircle, RefreshCw 
} from 'lucide-react';

export default function GerenciarUsuarios() {
  const [busca, setBusca] = useState('');
  
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Dr. Roberto Almeida', documento: 'CRM 12345-PR', perfil: 'Médico', status: 'Ativo', ultimoAcesso: '12/04 14:20' },
    { id: 2, nome: 'Enf. Juliana Costa', documento: 'COREN 54321-PR', perfil: 'Enfermeiro', status: 'Ativo', ultimoAcesso: '24/04 09:15' },
    { id: 3, nome: 'Carlos Silva', documento: 'CPF 111.222.333-44', perfil: 'Recepção', status: 'Inativo', ultimoAcesso: '01/03 10:00' },
    { id: 4, nome: 'Alexsandro Bryk', documento: 'Matrícula 9988', perfil: 'TI / Admin', status: 'Ativo', ultimoAcesso: 'Agora' },
  ]);

  return (
    <div className="flex h-screen w-screen bg-[#f1f5f9] font-sans overflow-hidden">
      
      {/* SIDEBAR DE FILTROS (Padrão Tasy/Sistemas Corporativos) */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Filtros Avançados</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">Situação</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-teal-500/20 outline-none">
                <option>Todos os Status</option>
                <option>Ativos</option>
                <option>Inativos</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">Perfil de Acesso</label>
              <div className="space-y-2">
                {['Médico', 'Enfermeiro', 'TI / Admin', 'Recepção'].map(perfil => (
                  <label key={perfil} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                    <span className="text-sm text-slate-600 group-hover:text-teal-600 transition-colors">{perfil}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-teal-600 text-xs font-bold uppercase transition-colors">
            <RefreshCw size={14} /> Limpar Filtros
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* BARRA DE TÍTULO E AÇÕES RÁPIDAS */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-2 h-6 bg-teal-500 rounded-full"></div>
              Gestão de Profissionais
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisa rápida..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm w-64 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              />
            </div>
            <button className="bg-[#38b2ac] hover:bg-[#319795] text-white px-5 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20">
              <UserPlus size={18} /> Novo Registro
            </button>
          </div>
        </header>

        {/* ÁREA DA TABELA */}
        <section className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left">
                  <th className="py-3.5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="py-3.5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</th>
                  <th className="py-3.5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Documentação</th>
                  <th className="py-3.5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Perfil</th>
                  <th className="py-3.5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Último Login</th>
                  <th className="py-3.5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usuarios.map((user) => (
                  <tr key={user.id} className="hover:bg-teal-50/30 transition-colors group">
                    <td className="py-4 px-6">
                      {user.status === 'Ativo' 
                        ? <CheckCircle2 size={18} className="text-green-500" />
                        : <XCircle size={18} className="text-slate-300" />
                      }
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm">{user.nome}</span>
                        <span className="text-[10px] text-slate-400 font-medium">ID: #{user.id}00{user.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-500">
                      {user.documento}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[11px] font-black uppercase border border-slate-200">
                        {user.perfil}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[12px] text-slate-400 font-medium italic">
                      {user.ultimoAcesso}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RODAPÉ DA TABELA / PAGINAÇÃO */}
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400 uppercase px-2">
            <span>Exibindo {usuarios.length} de 42 profissionais</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">Anterior</button>
              <button className="px-3 py-1 bg-white border border-teal-500 rounded text-teal-600">1</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">2</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">Próximo</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}