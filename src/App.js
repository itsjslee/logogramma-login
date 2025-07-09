import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
import './App.css';

const translations = {
  en: {
    signIn: 'Sign in',
    enterCredentials: 'Enter your credentials',
    username: 'Username',
    usernamePlaceholder: 'Enter your username',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    signInBtn: 'Sign In',
    fillAllFields: 'Please fill in all fields',
  },
  it: {
    signIn: 'Accedi',
    enterCredentials: 'Inserisci le tue credenziali',
    username: 'Nome utente',
    usernamePlaceholder: 'Inserisci il tuo nome utente',
    password: 'Password',
    passwordPlaceholder: 'Inserisci la tua password',
    rememberMe: 'Ricordami',
    signInBtn: 'Accedi',
    fillAllFields: 'Per favore compila tutti i campi',
  }
};

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('en');

  const t = translations[lang];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (formData.username && formData.password) {
        console.log('Login attempt:', formData);
        alert((lang === 'en' ? 'Login successful!' : 'Accesso effettuato!') + ' (This is a demo)');
      } else {
        setError(t.fillAllFields);
      }
      setLoading(false);
    }, 1000);
  };

  const handleLangToggle = () => {
    setLang(prev => (prev === 'en' ? 'it' : 'en'));
  };

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-content">
          <div className="logo-area">
            <a href="https://logogramma.com" target="_blank" rel="noopener noreferrer">
              <img src="/logogramma.png" alt="Logogramma Logo" className="logo-img" />
            </a>
          </div>
          <div className="lang-switcher">
            <div className={`lang-toggle-pill ${lang}` } onClick={handleLangToggle}>
              <span className="lang-label it-label">IT</span>
              <span className="lang-label en-label">EN</span>
              <span className="lang-toggle-knob" />
            </div>
          </div>
        </div>
      </header>
      <div className="teal-bar" />
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <h1>{t.signIn}</h1>
            <p>{t.enterCredentials}</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <Message 
                severity="error" 
                text={error} 
                className="error-message"
              />
            )}
            <div className="field">
              <label htmlFor="username" className="field-label">
                {t.username}
              </label>
              <InputText
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder={t.usernamePlaceholder}
                className="w-full"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password" className="field-label">
                {t.password}
              </label>
              <Password
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full"
                required
                feedback={false}
                toggleMask
              />
            </div>
            <div className="field-checkbox">
              <Checkbox
                inputId="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.checked)}
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                {t.rememberMe}
              </label>
            </div>
            <Button
              type="submit"
              label={t.signInBtn}
              icon="pi pi-sign-in"
              loading={loading}
              className="login-button"
            />
          </form>
          <Divider />
        </Card>
      </div>
    </div>
  );
}

export default App; 