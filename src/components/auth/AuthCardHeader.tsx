import { ShieldCheck } from 'lucide-react';
import logoFull from '../../assets/logo-full.png';

export function AuthCardHeader() {
  return (
    <>
      <img src={logoFull} alt="track+" className="auth-card__logo" />

      <div className="auth-card__meta">
        <span className="auth-card__meta-badge">
          <ShieldCheck size={16} strokeWidth={2.4} />
        </span>
        <div className="auth-card__meta-text">
          <span className="auth-card__meta-title">track+ admin</span>
          <span className="auth-card__meta-domain">admin.trackplus.com</span>
        </div>
      </div>
    </>
  );
}
