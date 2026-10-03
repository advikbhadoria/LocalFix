import { CheckCircle, X } from 'lucide-react';

const TYPES = {
  success: { bg: 'bg-green-600', icon: '✓' },
  info:    { bg: 'bg-blue-600',  icon: 'ℹ' },
  warning: { bg: 'bg-yellow-500',icon: '⚠' },
  error:   { bg: 'bg-red-500',   icon: '✕' },
};

export default function Toast({ toast }) {
  if (!toast) return null;
  const style = TYPES[toast.type] || TYPES.info;

  return (
    <div className={`toast flex items-center gap-3 ${style.bg} text-white px-4 py-3 rounded-xl shadow-xl max-w-xs animate-slideDown`}>
      <span className="font-bold text-lg leading-none">{style.icon}</span>
      <p className="text-sm font-medium">{toast.msg}</p>
    </div>
  );
}
