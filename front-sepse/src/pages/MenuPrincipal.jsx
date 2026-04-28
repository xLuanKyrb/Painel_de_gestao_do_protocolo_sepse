import { Activity, HeartPulse, BedDouble, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MenuPrincipal() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800">Portal Clínico Integrado</h1>
        <p className="text-slate-500 font-medium">Selecione o módulo desejado</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        
        {/* Módulo Sepse */}
        <Link to="/sepse/painel" className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-red-500 transition-all group">
          <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Activity size={32} className="text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Protocolo de Sepse</h2>
          <p className="text-slate-500 text-sm mt-2">Monitoramento de SLA e triagem de pacientes com suspeita de sepse.</p>
        </Link>

        {/* Módulo Dor Torácica */}
        <Link to="/dor-toracica" className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-orange-500 transition-all group">
          <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <HeartPulse size={32} className="text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Dor Torácica</h2>
          <p className="text-slate-500 text-sm mt-2">Classificação de risco e acompanhamento de ECGs.</p>
        </Link>

        {/* Módulo Gestão de Leitos */}
        <Link to="/leitos" className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-500 transition-all group">
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BedDouble size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Gestão de Leitos</h2>
          <p className="text-slate-500 text-sm mt-2">Mapa de ocupação, altas, transferências e higienização.</p>
        </Link>

      </div>
    </div>
  );
}