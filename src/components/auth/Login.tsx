import { useState, type FormEvent } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthBackground } from './AuthBackground';
import { AuthCardHeader } from './AuthCardHeader';
import type { UserRole } from '../../types/auth';
import './auth.css';

interface Account {
  email: string;
  password: string;
  role: UserRole;
}

const ACCOUNTS: Account[] = [
  { email: 'admin@jodayn.com', password: '12jodayn', role: 'admin' },
  { email: 'superadmin@jodayn.com', password: 'jodayn12', role: 'superadmin' },
];

const MIN_PASSWORD_LENGTH = 8;

interface LoginProps {
  onSuccess: (role: UserRole) => void;
}

export function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`كلمة المرور يجب أن تتكون من ${MIN_PASSWORD_LENGTH} أحرف على الأقل`);
      return;
    }

    const account = ACCOUNTS.find(
      (candidate) =>
        candidate.email === email.trim().toLowerCase() && candidate.password === password,
    );

    if (!account) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      return;
    }

    setIsSubmitting(true);
    
    window.setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(account.role);
    }, 350);
  }

  return (
    <div className="auth-page">
      <AuthBackground />

      <div className="auth-card">
        <AuthCardHeader />

        <h1 className="auth-card__title">تسجيل دخول فريق المنصة</h1>
        <p className="auth-card__subtitle">هذه المنطقة مخصصة لفريق إدارة المنصة فقط</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="auth-form__label" htmlFor="email">
            البريد الإلكتروني
          </label>
          <div className="auth-form__field">
            <Mail size={18} className="auth-form__icon auth-form__icon--start" />
            <input
              id="email"
              type="email"
              dir="ltr"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <label className="auth-form__label" htmlFor="password">
            كلمة المرور
          </label>
          <div className="auth-form__field">
            <Lock size={18} className="auth-form__icon auth-form__icon--start" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              dir="ltr"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              minLength={MIN_PASSWORD_LENGTH}
            />
            <button
              type="button"
              className="auth-form__icon auth-form__icon--end"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="auth-form__error">{error}</p>}

          <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
            {isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
