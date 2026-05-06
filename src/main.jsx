import React from 'react';
import { createRoot } from 'react-dom/client';
import { Phone, Send, MessageCircle, Download, Share2, Home, KeyRound, MapPin, Building2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './style.css';

const CONTACT = {
  phone: '+7 951 380-11-18',
  phoneHref: 'tel:+79513801118',
  telegram: 'https://t.me/elvira_nsk',
  telegramLabel: 't.me/elvira_nsk',
  whatsapp: 'https://wa.me/79513801118',
};

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Дорошенко;Эльвира;;;',
    'FN:Эльвира Дорошенко',
    'ORG:Ключи от Сибири',
    'TITLE:Агент по недвижимости',
    'TEL;TYPE=CELL:+79513801118',
    'URL:https://t.me/elvira_nsk',
    'NOTE:Агент по недвижимости в Новосибирске. Помощь в покупке новостроек и продаже недвижимости.',
    'END:VCARD',
  ].join('\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'elvira-doroshenko.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function shareCard() {
  const shareData = {
    title: 'Эльвира Дорошенко — Ключи от Сибири',
    text: 'Агент по недвижимости в Новосибирске. Полезно о недвижимости, честные обзоры и помощь в поиске дома мечты.',
    url: window.location.href,
  };
  if (navigator.share) await navigator.share(shareData);
  else {
    await navigator.clipboard.writeText(window.location.href);
    alert('Ссылка на визитку скопирована');
  }
}

function ActionButton({ href, icon: Icon, children, onClick, primary = false }) {
  const className = `action-button ${primary ? 'primary' : ''}`;
  const content = <><Icon size={20} /><span>{children}</span></>;
  if (onClick) return <button onClick={onClick} className={className}>{content}</button>;
  return <a href={href} className={className}>{content}</a>;
}

function App() {
  return (
    <main className="page">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="card">
        <section className="cover">
          <div className="photo-placeholder">
            <div className="portrait-circle">ЭД</div>
            <div className="portrait-text">
              <KeyRound size={28} />
              <span>Ключи от Сибири</span>
            </div>
          </div>
          <div className="cover-box">
            <div className="cover-title">Ключи от Сибири</div>
            <p>Полезно о недвижимости Новосибирска, честные обзоры и помощь в поиске дома мечты.</p>
          </div>
        </section>

        <section className="content">
          <header className="brand-row">
            <div className="logo"><Building2 size={34} /></div>
            <div>
              <p className="eyebrow">Ключи</p>
              <h1>от Сибири</h1>
            </div>
            <div className="city"><MapPin size={16} /> Новосибирск</div>
          </header>

          <p className="role">агент по недвижимости</p>
          <h2>Эльвира<br />Дорошенко</h2>

          <section className="intro">
            <h3>Привет, Новосибирск! Давайте знакомиться 🔑</h3>
            <p>Я Эльвира, и я помогаю людям находить не просто квадратные метры, а место, которое они назовут домом.</p>
          </section>

          <section className="benefits">
            {['Проверка документов без стресса', 'Реальные объекты и честные цены', 'Слышу ваши желания'].map((item) => (
              <div className="benefit" key={item}><span><Sparkles size={16} /></span>{item}</div>
            ))}
          </section>

          <section className="highlight">
            <div><Home size={28} /> <b>Большие покупки — легко!</b></div>
            <p>Подбор новостроек за 0₽ для клиента, подготовка объекта к продаже и честный разбор плюсов и минусов.</p>
          </section>

          <section className="link-box">
            <p>Ссылка на визитку</p>
            <a href={CONTACT.telegram}><Send size={22} /> {CONTACT.telegramLabel}</a>
            <span>Полезно о недвижимости Новосибирска, честные обзоры и помощь в поиске дома мечты.</span>
          </section>

          <div className="actions">
            <ActionButton href={CONTACT.phoneHref} icon={Phone} primary>Позвонить</ActionButton>
            <ActionButton href={CONTACT.telegram} icon={Send}>Telegram</ActionButton>
            <ActionButton href={CONTACT.whatsapp} icon={MessageCircle}>WhatsApp</ActionButton>
            <ActionButton icon={Download} onClick={downloadVCard}>Сохранить контакт</ActionButton>
            <ActionButton icon={Share2} onClick={shareCard}>Поделиться визиткой</ActionButton>
          </div>
        </section>
      </motion.section>
      <SpeedInsights />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
