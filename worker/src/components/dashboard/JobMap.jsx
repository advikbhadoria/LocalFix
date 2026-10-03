import { useState } from 'react';
import { MAP_PINS } from '../../data/mockData';
import { List, Map as MapIcon, MapPin, X } from 'lucide-react';

function MockMap({ pins, jobs, onAccept }) {
  const [popup, setPopup] = useState(null);

  const pinStyle = {
    available: 'bg-green-500 border-green-600',
    expiring:  'bg-yellow-400 border-yellow-500',
    worker:    'bg-blue-600 border-blue-700',
  };

  return (
    <div className="map-bg rounded-2xl relative overflow-hidden" style={{ height: 320 }}>
      {/* Street pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(30,58,138,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,138,0.2) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Road lines */}
      <div className="absolute top-1/3 left-0 right-0 h-8 bg-white/20 rounded-none" />
      <div className="absolute top-0 bottom-0 left-2/5 w-8 bg-white/20" />

      {/* Labels */}
      <div className="absolute top-1/3 right-2 mt-1 text-[9px] text-blue-700 font-medium opacity-60">MG Road</div>
      <div className="absolute left-2/5 top-2 ml-9 text-[9px] text-blue-700 font-medium opacity-60 rotate-90 origin-left">Ring Rd</div>

      {/* Pins */}
      {pins.map(pin => (
        <button
          key={pin.id}
          style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%,-50%)' }}
          onClick={() => pin.type !== 'worker' && setPopup(pin)}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold shadow-lg transition-transform hover:scale-110 z-10 ${
            pinStyle[pin.type] || 'bg-blue-500 border-blue-600'
          }`}
        >
          {pin.type === 'worker' ? '👤' : pin.type === 'expiring' ? '!' : '✓'}
        </button>
      ))}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 text-[10px] space-y-1 shadow">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Available</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Expiring</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> You</div>
      </div>

      {/* Pin popup */}
      {popup && (
        <div className="absolute inset-x-3 bottom-3 bg-white rounded-xl shadow-xl p-3 z-20 animate-fadeUp">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-bold text-slate-800 text-sm">{popup.label}</p>
              <p className="text-slate-500 text-xs">{popup.area} · {popup.dist} km away</p>
            </div>
            <button onClick={() => setPopup(null)} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-bold">₹{popup.pay}</span>
            <button
              onClick={() => {
                const job = jobs.find(j => j.pay === popup.pay) || jobs[0];
                if (job) onAccept(job);
                setPopup(null);
              }}
              className="bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Accept Job
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JobMap({ jobs, onAccept }) {
  const [view, setView] = useState('map');

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-700 text-sm">Job Map</h3>
        <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5">
          {[{ id:'map', Icon:MapIcon, label:'Map' }, { id:'list', Icon:List, label:'List' }].map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                view === id ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-500 hover:text-blue-700'
              }`}
            >
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>
      </div>

      {view === 'map' ? (
        <MockMap pins={MAP_PINS} jobs={jobs} onAccept={onAccept} />
      ) : (
        <div className="space-y-2">
          {jobs.length === 0 ? (
            <div className="card p-6 text-center text-slate-400 text-sm">No jobs on map right now</div>
          ) : jobs.map(j => (
            <div key={j.id} className="card p-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">{j.icon}</div>
              <div className="flex-1">
                <p className="text-slate-800 text-sm font-semibold">{j.type}</p>
                <p className="text-slate-400 text-xs flex items-center gap-1"><MapPin size={10} />{j.area} · {j.dist} km</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold text-sm">₹{j.pay}</p>
                <button onClick={() => onAccept(j)} className="text-blue-600 text-xs font-semibold hover:text-blue-800">Accept →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
