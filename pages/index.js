import Head from 'next/head'
import { useState } from 'react'

const css = `
  :root {
    --gold: #c8a96e; --gold-light: #e8d5b0; --gold-dark: #a07840;
    --cream: #faf8f5; --warm-white: #f5f0e8; --dark: #3a3028;
    --mid: #6b5a4a; --light-text: #9a8878; --border: #e0d5c5; --section-bg: #f0ebe0;
  }
  img { max-width: 100%; display: block; }
  a { text-decoration: none; color: inherit; }

  /* HEADER */
  header { background:#fff; border-bottom:1px solid var(--border); position:sticky; top:0; z-index:1000; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .header-inner { max-width:1100px; margin:0 auto; padding:0 20px; display:flex; align-items:center; justify-content:space-between; height:70px; }
  .logo { display:flex; flex-direction:column; line-height:1.2; }
  .logo-main { font-size:1.3rem; font-weight:700; color:var(--gold-dark); letter-spacing:.05em; }
  .logo-sub { font-size:.65rem; color:var(--light-text); letter-spacing:.12em; font-family:'Gill Sans',sans-serif; text-transform:uppercase; }
  .header-tel { font-size:.8rem; color:var(--mid); text-align:right; display:none; }
  .header-tel span { display:block; font-size:1rem; font-weight:700; color:var(--gold-dark); }
  @media(min-width:600px){.header-tel{display:block;}}

  /* PAGE NAV */
  .page-nav { background:var(--dark); position:sticky; top:70px; z-index:999; }
  .page-nav-inner { max-width:1100px; margin:0 auto; display:flex; }
  .nav-btn { flex:1; padding:14px 8px; text-align:center; font-size:.82rem; color:rgba(255,255,255,.65); cursor:pointer; border:none; background:none; transition:all .3s; border-bottom:3px solid transparent; font-family:inherit; letter-spacing:.05em; line-height:1.3; }
  .nav-btn:hover{color:var(--gold-light);}
  .nav-btn.active{color:var(--gold);border-bottom-color:var(--gold);background:rgba(255,255,255,.04);}
  @media(min-width:640px){.nav-btn{font-size:.92rem;padding:16px 20px;}}

  /* HERO */
  .hero { background:linear-gradient(135deg,#2c2418 0%,#4a3828 50%,#3a2e20 100%); color:white; text-align:center; padding:80px 20px 90px; position:relative; overflow:hidden; }
  .hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 0%,rgba(200,169,110,.25) 0%,transparent 70%); }
  .hero-badge { display:inline-block; border:1px solid var(--gold); color:var(--gold); font-size:.7rem; letter-spacing:.25em; padding:5px 18px; margin-bottom:28px; font-family:'Gill Sans',sans-serif; text-transform:uppercase; position:relative; }
  .hero h1 { font-size:clamp(1.8rem,5vw,3.2rem); font-weight:400; line-height:1.4; margin-bottom:20px; position:relative; }
  .hero h1 em { color:var(--gold); font-style:normal; display:block; font-size:.55em; letter-spacing:.15em; margin-bottom:8px; }
  .hero-tagline { font-size:clamp(.85rem,2vw,1rem); color:rgba(255,255,255,.72); max-width:520px; margin:0 auto 36px; position:relative; }
  .hero-concept { display:inline-flex; gap:0; position:relative; margin-bottom:44px; }
  .concept-item { padding:14px 22px; border:1px solid rgba(200,169,110,.4); font-size:.88rem; color:var(--gold-light); letter-spacing:.1em; }
  .concept-item+.concept-item{border-left:none;}
  @media(max-width:500px){.hero-concept{flex-direction:column;}.concept-item+.concept-item{border-left:1px solid rgba(200,169,110,.4);border-top:none;}}
  .hero-cta-group{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;}

  /* BUTTONS */
  .btn-primary { display:inline-block; background:var(--gold); color:#1a1208; padding:14px 32px; font-size:.9rem; font-weight:700; letter-spacing:.08em; transition:all .3s; cursor:pointer; border:none; font-family:inherit; }
  .btn-primary:hover{background:var(--gold-dark);color:white;transform:translateY(-2px);box-shadow:0 6px 20px rgba(160,120,64,.4);}
  .btn-outline { display:inline-block; border:1px solid rgba(255,255,255,.5); color:rgba(255,255,255,.85); padding:14px 32px; font-size:.9rem; letter-spacing:.08em; transition:all .3s; cursor:pointer; background:none; font-family:inherit; }
  .btn-outline:hover{border-color:var(--gold);color:var(--gold);}

  /* SECTIONS */
  .section{padding:70px 20px;}
  .section-alt{background:var(--section-bg);}
  .section-dark{background:var(--dark);color:white;}
  .container{max-width:1060px;margin:0 auto;}
  .section-label{font-family:'Gill Sans','Trebuchet MS',sans-serif;font-size:.7rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;display:block;}
  .section-title{font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:400;margin-bottom:14px;line-height:1.4;}
  .section-lead{color:var(--light-text);font-size:.92rem;max-width:580px;margin-bottom:50px;}
  .divider{width:40px;height:1px;background:var(--gold);margin:16px 0 40px;}
  .text-center{text-align:center;}
  .text-center .divider{margin-left:auto;margin-right:auto;}
  .text-center .section-lead{margin-left:auto;margin-right:auto;}

  /* FEATURE CARDS */
  .feature-grid{display:grid;grid-template-columns:1fr;gap:28px;}
  @media(min-width:600px){.feature-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:900px){.feature-grid{grid-template-columns:repeat(3,1fr);}}
  .feature-card{background:white;padding:36px 28px;border:1px solid var(--border);transition:transform .3s,box-shadow .3s;}
  .feature-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08);}
  .feature-num{font-family:'Gill Sans',sans-serif;font-size:2.5rem;color:var(--gold-light);font-weight:700;line-height:1;margin-bottom:12px;}
  .feature-card h3{font-size:1.05rem;margin-bottom:12px;color:var(--dark);}
  .feature-card p{font-size:.88rem;color:var(--mid);line-height:1.9;}

  /* STORE CARDS */
  .store-grid{display:grid;grid-template-columns:1fr;gap:32px;}
  @media(min-width:760px){.store-grid{grid-template-columns:repeat(2,1fr);}}
  .store-card{background:white;border:1px solid var(--border);overflow:hidden;}
  .store-img-placeholder{height:200px;display:flex;align-items:center;justify-content:center;font-size:3rem;color:rgba(255,255,255,.6);position:relative;overflow:hidden;}
  .store-img-sangenjaya{background:linear-gradient(135deg,#2c2418,#5a3e28);}
  .store-img-nakano{background:linear-gradient(135deg,#1e2e3c,#2d4a5e);}
  .store-img-placeholder::after{content:'VITAMIN SPA';font-family:'Gill Sans',sans-serif;font-size:.85rem;letter-spacing:.2em;color:rgba(200,169,110,.7);position:absolute;bottom:16px;left:20px;}
  .store-body{padding:28px;}
  .store-tag{display:inline-block;background:var(--gold);color:white;font-size:.7rem;padding:3px 12px;letter-spacing:.1em;margin-bottom:12px;}
  .store-body h3{font-size:1.3rem;margin-bottom:16px;color:var(--dark);}
  .store-info-row{display:flex;gap:10px;margin-bottom:10px;font-size:.88rem;align-items:flex-start;}
  .store-info-icon{width:20px;flex-shrink:0;color:var(--gold);font-size:.9rem;margin-top:2px;}
  .store-info-text{color:var(--mid);line-height:1.6;}
  .store-tel{margin-top:20px;padding-top:18px;border-top:1px solid var(--border);font-size:1.3rem;font-weight:700;color:var(--gold-dark);letter-spacing:.05em;}
  .store-tel small{display:block;font-size:.7rem;color:var(--light-text);font-weight:400;margin-bottom:4px;letter-spacing:.1em;}

  /* PLANS */
  .plan-grid{display:grid;grid-template-columns:1fr;gap:24px;max-width:720px;margin:0 auto;}
  @media(min-width:600px){.plan-grid{grid-template-columns:repeat(2,1fr);}}
  .plan-card{border:1px solid rgba(200,169,110,.3);padding:36px 28px;text-align:center;position:relative;}
  .plan-card.featured{border-color:var(--gold);background:rgba(200,169,110,.06);}
  .plan-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--gold);color:white;font-size:.65rem;padding:3px 14px;letter-spacing:.12em;white-space:nowrap;}
  .plan-name{font-family:'Gill Sans',sans-serif;font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;}
  .plan-price{font-size:2.4rem;font-weight:700;color:white;line-height:1;margin-bottom:4px;}
  .plan-price span{font-size:.9rem;font-weight:400;}
  .plan-price-tax{font-size:.75rem;color:rgba(255,255,255,.5);margin-bottom:20px;}
  .plan-detail{font-size:.85rem;color:rgba(255,255,255,.7);line-height:2;}
  .plan-detail strong{color:var(--gold);}

  /* COMPANY */
  .company-hero{background:linear-gradient(160deg,#1a140e 0%,#2e2416 100%);color:white;padding:80px 20px 70px;text-align:center;}
  .company-hero h2{font-size:clamp(1.6rem,4vw,2.5rem);font-weight:400;margin-bottom:16px;}
  .company-hero p{color:rgba(255,255,255,.65);font-size:.92rem;}
  .company-table-wrap{background:white;border:1px solid var(--border);}
  .company-table{width:100%;border-collapse:collapse;}
  .company-table tr{border-bottom:1px solid var(--border);}
  .company-table tr:last-child{border-bottom:none;}
  .company-table th{padding:18px 24px;font-size:.85rem;font-weight:600;color:var(--mid);background:var(--section-bg);width:35%;text-align:left;vertical-align:top;letter-spacing:.05em;}
  .company-table td{padding:18px 24px;font-size:.9rem;color:var(--dark);line-height:1.8;vertical-align:top;}
  @media(max-width:560px){.company-table th,.company-table td{padding:14px 16px;}.company-table th{width:38%;font-size:.78rem;}.company-table td{font-size:.82rem;}}
  .philosophy-grid{display:grid;grid-template-columns:1fr;gap:24px;}
  @media(min-width:600px){.philosophy-grid{grid-template-columns:repeat(3,1fr);}}
  .philosophy-item{text-align:center;padding:36px 20px;border:1px solid var(--border);background:white;}
  .philosophy-kanji{font-size:2.8rem;color:var(--gold);margin-bottom:12px;font-weight:300;}
  .philosophy-label{font-size:.78rem;color:var(--light-text);letter-spacing:.15em;}

  /* BEGINNER */
  .beginner-hero{background:linear-gradient(150deg,#1c2a1c 0%,#2e4a2e 100%);color:white;padding:80px 20px 70px;text-align:center;}
  .beginner-hero h2{font-size:clamp(1.6rem,4vw,2.5rem);font-weight:400;margin-bottom:16px;}
  .beginner-hero p{color:rgba(255,255,255,.65);font-size:.92rem;}
  .steps-wrap{max-width:700px;margin:0 auto;}
  .step{display:flex;gap:20px;position:relative;}
  .step-left{display:flex;flex-direction:column;align-items:center;width:52px;flex-shrink:0;}
  .step-num{width:52px;height:52px;border-radius:50%;background:var(--gold);color:white;font-size:1.2rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Gill Sans',sans-serif;}
  .step-line{flex:1;width:2px;background:var(--border);min-height:40px;}
  .step-body{padding:10px 0 44px;flex:1;}
  .step-body h3{font-size:1.05rem;margin-bottom:8px;color:var(--dark);}
  .step-body p{font-size:.88rem;color:var(--mid);line-height:1.9;}
  .reasons-grid{display:grid;grid-template-columns:1fr;gap:24px;}
  @media(min-width:640px){.reasons-grid{grid-template-columns:repeat(3,1fr);}}
  .reason-card{background:rgba(200,169,110,.08);border:1px solid rgba(200,169,110,.25);padding:32px 24px;}
  .reason-icon{font-size:2rem;margin-bottom:14px;}
  .reason-card h3{font-size:.95rem;margin-bottom:10px;color:var(--dark);}
  .reason-card p{font-size:.85rem;color:var(--mid);line-height:1.9;}

  /* FAQ */
  .faq-item{border-bottom:1px solid var(--border);}
  .faq-q{width:100%;text-align:left;background:none;border:none;padding:20px 0;display:flex;align-items:center;gap:14px;cursor:pointer;font-family:inherit;font-size:.92rem;color:var(--dark);}
  .faq-q:hover{color:var(--gold-dark);}
  .faq-q-mark{color:var(--gold);font-size:1.1rem;font-weight:700;flex-shrink:0;}
  .faq-a{display:none;padding:0 0 20px 30px;font-size:.88rem;color:var(--mid);line-height:1.9;}
  .faq-a.open{display:block;}

  /* TRIAL */
  .trial-grid{display:grid;grid-template-columns:1fr;gap:20px;}
  @media(min-width:640px){.trial-grid{grid-template-columns:repeat(3,1fr);}}
  .trial-card{background:white;border:1px solid var(--border);padding:28px 22px;text-align:center;}
  .trial-type{font-size:.72rem;letter-spacing:.15em;color:var(--light-text);margin-bottom:8px;text-transform:uppercase;font-family:'Gill Sans',sans-serif;}
  .trial-card h3{font-size:1rem;margin-bottom:14px;color:var(--dark);}
  .trial-price{font-size:1.8rem;font-weight:700;color:var(--gold-dark);}
  .trial-price span{font-size:.75rem;font-weight:400;color:var(--light-text);}
  .trial-note{font-size:.78rem;color:var(--light-text);margin-top:10px;}

  /* NOTICE */
  .notice-box{background:#fff8f0;border:1px solid #f0d5a0;border-left:4px solid var(--gold);padding:20px 24px;font-size:.87rem;color:var(--mid);line-height:1.9;}
  .notice-box strong{color:var(--dark);}

  /* FOOTER */
  footer{background:#1a130d;color:rgba(255,255,255,.55);padding:60px 20px 30px;text-align:center;}
  .footer-logo{font-size:1.3rem;color:var(--gold);margin-bottom:8px;font-weight:400;}
  .footer-corp{font-size:.78rem;margin-bottom:28px;}
  .footer-stores{display:flex;gap:30px;justify-content:center;flex-wrap:wrap;margin-bottom:28px;font-size:.8rem;}
  .footer-store{text-align:center;}
  .footer-store strong{display:block;color:rgba(255,255,255,.8);margin-bottom:4px;}
  .footer-copy{font-size:.72rem;border-top:1px solid rgba(255,255,255,.1);padding-top:24px;margin-top:24px;}

  @media(max-width:600px){.hero,.company-hero,.beginner-hero{padding:60px 20px 70px;}.section{padding:52px 20px;}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
`

const faqs = [
  {
    q: 'はじめてのエステで不安です。どんな雰囲気ですか？',
    a: 'スタッフが丁寧にカウンセリングを行い、お客様のペースに合わせてご案内します。強引なご提案や無理な勧誘は一切ありませんので、安心してご来店ください。',
  },
  {
    q: '「かっさ」とはどのような施術ですか？',
    a: 'かっさ（刮痧）は3,000年以上の歴史を持つ東洋の手技療法です。専用のツールで皮膚を優しく刺激することで、老廃物の排出・血行促進・筋肉弛緩を促します。痛みを伴わない優しい施術です。',
  },
  {
    q: '一度の施術で効果は感じられますか？',
    a: '「一度の施術で実感できる変化」をモットーとしています。施術後にむくみの軽減・お顔のリフトアップ・代謝向上などを多くのお客様が実感されています。',
  },
  {
    q: '会員コースはローンが必要ですか？',
    a: 'ローンは一切不要です。月額固定制で、口座振替・6ヶ月一括現金・6ヶ月一括クレジットカードからお選びいただけます。最低継続期間は6ヶ月です。',
  },
  {
    q: 'ワクチン接種後はいつから来店できますか？',
    a: '新型コロナウイルスワクチン接種後1週間は施術をお断りしております。副反応がある場合は症状が完全に落ち着いてからさらに1週間後、医師の許可を得た上でご来店ください。',
  },
  {
    q: '体験コースは何度でも受けられますか？',
    a: '体験コースはビタミンスパグループを通じてお一人様1回限りとなっております。三軒茶屋店・中野店どちらかでご体験いただけます。',
  },
  {
    q: '会員コースの施術メニューは毎月変えられますか？',
    a: 'はい、毎月フェイシャル3種・ボディ3種の中からお好きなメニューをお選びいただけます。その時のお身体の状態やご希望に合わせてスタッフがご提案することも可能です。',
  },
]

export default function Home() {
  const [page, setPage] = useState('home')
  const [openFaqs, setOpenFaqs] = useState({})

  const showPage = (name) => {
    setPage(name)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToStores = () => {
    document.getElementById('stores')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleFaq = (i) => setOpenFaqs(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <>
      <Head>
        <title>ビタミンスパ＆ボーテ | 美と活力のエステサロン</title>
        <meta name="description" content="東洋と西洋が融合した手技エステサロン。三軒茶屋・中野に展開。かっさ療法で解毒・浄化・活性化。ローンなし月額会員制。" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <style>{css}</style>

      {/* HEADER */}
      <header>
        <div className="header-inner">
          <div className="logo">
            <span className="logo-main">ビタミンスパ＆ボーテ</span>
            <span className="logo-sub">Vitamin Spa &amp; Beauté</span>
          </div>
          <div className="header-tel">
            <div>三軒茶屋店</div>
            <span>03-5431-5358</span>
          </div>
        </div>
      </header>

      {/* PAGE NAV */}
      <nav className="page-nav">
        <div className="page-nav-inner">
          {[
            { id: 'home', label: 'トップページ', sub: '店舗紹介' },
            { id: 'company', label: '会社概要', sub: '株式会社クロスフォート' },
            { id: 'beginner', label: 'はじめての方へ', sub: '初めてのご来店' },
          ].map(({ id, label, sub }) => (
            <button key={id} className={`nav-btn${page === id ? ' active' : ''}`} onClick={() => showPage(id)}>
              {label}<br /><small style={{ fontSize: '.68rem', opacity: .7 }}>{sub}</small>
            </button>
          ))}
        </div>
      </nav>

      {/* ======================== PAGE: HOME ======================== */}
      {page === 'home' && (
        <>
          <section className="hero">
            <div className="hero-badge">All for Women's Beauty &amp; Vitality</div>
            <h1>
              <em>東洋と西洋が出会う、手技の美学</em>
              本物のエステで<br />内側から輝く美しさへ
            </h1>
            <p className="hero-tagline">
              3,000年の歴史を持つかっさ療法と最新の美容テクノロジーが融合。<br />
              たった一度の施術で実感できる変化をお届けします。
            </p>
            <div className="hero-concept">
              <div className="concept-item">解毒</div>
              <div className="concept-item">浄化</div>
              <div className="concept-item">活性化</div>
            </div>
            <div className="hero-cta-group">
              <button className="btn-primary" onClick={() => showPage('beginner')}>はじめての方へ</button>
              <button className="btn-outline" onClick={scrollToStores}>店舗を見る</button>
            </div>
          </section>

          <section className="section text-center">
            <div className="container">
              <span className="section-label">About</span>
              <h2 className="section-title">ビタミンスパとは</h2>
              <div className="divider" />
              <p className="section-lead">
                サロン名に込められた想いは「ビタミン」のように、外から補わなければ得られないものを届けること。
                女性の美と活力のために、トレンドを追うのではなく、本当に必要なエステのみをご提案します。
              </p>
              <div className="feature-grid">
                {[
                  { num: '01', title: '3,000年の歴史に基づく技術', body: '「解毒・浄化・活性化」の原理に基づき、細胞活性・筋肉弛緩・血行促進・免疫向上を実現。東洋の叡智を現代の施術に昇華させています。' },
                  { num: '02', title: '豊富なメニュー選択肢', body: 'フェイシャル3種・ボディ3種の計6コースを基軸に、高周波・キャビテーションなど最新機器のオプションも充実。お客様に合った施術を。' },
                  { num: '03', title: 'ローンなしの会員制度', body: '毎月一定額で通える月額会員コース。ローン契約不要で、無理なく継続できるサロンを目指しています。最低6ヶ月からのお約束。' },
                ].map(({ num, title, body }) => (
                  <div key={num} className="feature-card">
                    <div className="feature-num">{num}</div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt" id="stores">
            <div className="container">
              <span className="section-label">Stores</span>
              <h2 className="section-title">店舗案内</h2>
              <div className="divider" />
              <p className="section-lead">東京都内2店舗を展開。アクセスしやすい駅近の立地でお迎えします。</p>
              <div className="store-grid">
                {[
                  { cls: 'store-img-sangenjaya', emoji: '🌿', tag: 'SANGENJAYA', name: '三軒茶屋店', addr: '東京都世田谷区三軒茶屋1-32-12\nまるうんビル 2F', access: '東急田園都市線・世田谷線「三軒茶屋」駅より徒歩圏内', tel: '03-5431-5358' },
                  { cls: 'store-img-nakano', emoji: '✨', tag: 'NAKANO', name: '中野店', addr: '東京都中野区中野3-34-26\n中野湊口駅ビル 6F', access: 'JR中央線・東西線「中野」駅より徒歩圏内', tel: '03-6304-8225' },
                ].map(({ cls, emoji, tag, name, addr, access, tel }) => (
                  <div key={name} className="store-card">
                    <div className={`store-img-placeholder ${cls}`}><span style={{ fontSize: '4rem' }}>{emoji}</span></div>
                    <div className="store-body">
                      <div className="store-tag">{tag}</div>
                      <h3>{name}</h3>
                      <div className="store-info-row"><span className="store-info-icon">📍</span><span className="store-info-text">{addr.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</span></div>
                      <div className="store-info-row"><span className="store-info-icon">🚉</span><span className="store-info-text">{access}</span></div>
                      <div className="store-info-row"><span className="store-info-icon">🕐</span><span className="store-info-text">営業時間：ご予約にてご確認ください</span></div>
                      <div className="store-tel"><small>TEL</small>{tel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-dark">
            <div className="container text-center">
              <span className="section-label" style={{ color: 'var(--gold-light)' }}>Membership</span>
              <h2 className="section-title">会員コース</h2>
              <div className="divider" />
              <p className="section-lead" style={{ color: 'rgba(255,255,255,.6)', marginBottom: 44 }}>
                毎月一定の額で通えるローンなしのエステコース。<br />
                入会金 ¥11,000 / 最低6ヶ月のご継続をお願いしております。
              </p>
              <div className="plan-grid">
                <div className="plan-card">
                  <div className="plan-name">Silver</div>
                  <div className="plan-price">¥15,400<span>/月</span></div>
                  <div className="plan-price-tax">（税込）</div>
                  <div className="plan-detail">50分 × 月2回<br /><strong>フェイシャル3種 / ボディ3種</strong><br />から毎月選択可能</div>
                </div>
                <div className="plan-card featured">
                  <div className="plan-badge">POPULAR</div>
                  <div className="plan-name">Gold</div>
                  <div className="plan-price">¥22,000<span>/月</span></div>
                  <div className="plan-price-tax">（税込）</div>
                  <div className="plan-detail">80分 × 月2回<br /><strong>フェイシャル3種 / ボディ3種</strong><br />から毎月選択可能</div>
                </div>
              </div>
              <div style={{ marginTop: 36 }}>
                <button className="btn-primary" onClick={() => showPage('beginner')}>はじめての方へのご案内を見る →</button>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="notice-box">
                <strong>【ワクチン接種後の施術について】</strong><br />
                新型コロナウイルスワクチン接種後1週間は施術をお断りしております。
                副反応がある場合は症状が完全に落ち着いてから更に1週間後、医師の許可を得た上でご来店ください。
              </div>
            </div>
          </section>
        </>
      )}

      {/* ======================== PAGE: COMPANY ======================== */}
      {page === 'company' && (
        <>
          <section className="company-hero">
            <div className="container">
              <span className="section-label" style={{ display: 'block', marginBottom: 12 }}>Company</span>
              <h2>会社概要</h2>
              <div className="divider" style={{ margin: '16px auto 20px' }} />
              <p>私たちのサロンを運営する会社について</p>
            </div>
          </section>

          <section className="section text-center section-alt">
            <div className="container">
              <span className="section-label">Philosophy</span>
              <h2 className="section-title">私たちのコンセプト</h2>
              <div className="divider" />
              <p className="section-lead">3,000年の歴史を持つ東洋医学の叡智と現代の美容科学が融合した唯一無二の施術で、すべての女性の美と活力をサポートします。</p>
              <div className="philosophy-grid">
                {[
                  { kanji: '解毒', en: 'DETOXIFICATION', desc: '体内の老廃物・毒素を排出し、身体本来のバランスを取り戻す' },
                  { kanji: '浄化', en: 'PURIFICATION', desc: '皮膚・血液・リンパを清浄化し、内側からの輝きを引き出す' },
                  { kanji: '活性化', en: 'ACTIVATION', desc: '細胞を活性化し、代謝を高め、自然治癒力・免疫力を向上させる' },
                ].map(({ kanji, en, desc }) => (
                  <div key={kanji} className="philosophy-item">
                    <div className="philosophy-kanji">{kanji}</div>
                    <div className="philosophy-label">{en}</div>
                    <p style={{ marginTop: 14, fontSize: '.85rem', color: 'var(--mid)' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <span className="section-label">Corporate Info</span>
              <h2 className="section-title">会社情報</h2>
              <div className="divider" />
              <div className="company-table-wrap">
                <table className="company-table">
                  <tbody>
                    {[
                      ['会社名', '株式会社クロスフォート'],
                      ['サロン名', 'ビタミンスパ＆ボーテ（Vitamin Spa & Beauté）'],
                      ['事業内容', 'エステティックサロンの運営\nかっさ療法・フェイシャル・ボディ施術'],
                      ['展開店舗', '三軒茶屋店（東京都世田谷区）\n中野店（東京都中野区）'],
                      ['三軒茶屋店', '東京都世田谷区三軒茶屋1-32-12 まるうんビル2F\nTEL：03-5431-5358'],
                      ['中野店', '東京都中野区中野3-34-26 中野湊口駅ビル6F\nTEL：03-6304-8225'],
                      ['施術の特徴', '東洋医学に基づくかっさ（刮痧）療法を核に\n手技を主体とした施術を提供\nフェイシャル・ボディ・痩身コースを展開'],
                      ['会員制度', '月額固定制・ローンなし（最低6ヶ月）\n入会金：¥11,000（税込）\nSilverコース：¥15,400/月〜'],
                      ['予約・お問い合わせ', '各店舗へ直接お電話ください\nまたはホットペッパービューティーよりご予約'],
                    ].map(([th, td]) => (
                      <tr key={th}>
                        <th>{th}</th>
                        <td>{td.split('\n').map((l, i, arr) => <span key={i}>{l}{i < arr.length - 1 && <br />}</span>)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section section-alt">
            <div className="container">
              <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <span className="section-label">Message</span>
                <h2 className="section-title">サロンからのメッセージ</h2>
                <div className="divider" />
                {['「本物のエステとは、必要なものだけを選ぶこと」——これが私たちの信念です。',
                  'トレンドを追うのではなく、お客様お一人おひとりの身体の声に耳を傾け、本当に必要な施術をご提供することを大切にしています。かっさ療法（刮痧）は3,000年以上の歴史を持つ東洋の技術。それを現代の美容ニーズに合わせて進化させたのがビタミンスパ＆ボーテの施術です。',
                  '「一度受けたら変化を実感できる」——その確かな手応えが、お客様がリピートしてくださる理由だと自負しています。ビタミンのように、外から補わなければ得られない美と活力を、私たちが責任を持ってお届けします。',
                ].map((t, i) => (
                  <p key={i} style={{ fontSize: i === 0 ? '.95rem' : '.92rem', color: 'var(--mid)', lineHeight: 2.1, marginBottom: 24 }}>{t}</p>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ======================== PAGE: BEGINNER ======================== */}
      {page === 'beginner' && (
        <>
          <section className="beginner-hero">
            <div className="container">
              <span className="section-label" style={{ display: 'block', marginBottom: 12 }}>First Time</span>
              <h2>はじめての方へ</h2>
              <div className="divider" style={{ margin: '16px auto 20px' }} />
              <p>ご来店の流れ・料金・よくある質問をご紹介します</p>
            </div>
          </section>

          <section className="section text-center">
            <div className="container">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">ビタミンスパが選ばれる3つの理由</h2>
              <div className="divider" />
              <div className="reasons-grid">
                {[
                  { icon: '🌿', title: '高度な手技哲学', body: '3,000年の歴史を持つかっさ療法に基づき、「解毒・浄化・活性化」で細胞を活性化。筋肉弛緩・血行促進・免疫向上を一度の施術で実感できます。' },
                  { icon: '✨', title: '豊富なメニュー', body: 'フェイシャル3種・ボディ3種の計6コースを基軸に、高周波・キャビテーションなど最新オプションも。毎月異なるメニューを選ぶことができます。' },
                  { icon: '💎', title: 'ローンなし会員制度', body: '月額固定制でローン不要。無理なく続けられる仕組みで、長期的な美しさをサポートします。シルバー・ゴールドの2プランからお選びください。' },
                ].map(({ icon, title, body }) => (
                  <div key={title} className="reason-card">
                    <div className="reason-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt">
            <div className="container">
              <span className="section-label">Flow</span>
              <h2 className="section-title">ご来店の流れ</h2>
              <div className="divider" />
              <div className="steps-wrap">
                {[
                  { title: 'ご予約', body: 'お電話またはホットペッパービューティーよりご予約ください。はじめての方は「体験コース希望」とお伝えいただくとスムーズです。' },
                  { title: 'カウンセリング', body: 'お身体の状態・お悩み・ご希望を丁寧にヒアリングします。押しつけや無理なご提案は一切行いません。お気軽にご相談ください。' },
                  { title: '施術', body: '経験豊富なスタッフが丁寧に施術します。「一度で実感できる変化」をモットーに、お客様それぞれに最適なアプローチで対応します。' },
                  { title: 'アフターカウンセリング', body: '施術後のお体の変化をご確認いただき、今後のケアについてご説明します。ご入会については一切強制しておりません。' },
                  { title: 'お会計・次回予約', body: 'お会計をすませ、ご希望の方は次回のご予約を承ります。会員コースについてもこの際にご説明いたします。' },
                ].map(({ title, body }, i, arr) => (
                  <div key={title} className="step">
                    <div className="step-left">
                      <div className="step-num">{i + 1}</div>
                      {i < arr.length - 1 && <div className="step-line" />}
                    </div>
                    <div className="step-body">
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <span className="section-label">Trial</span>
              <h2 className="section-title">体験コース</h2>
              <div className="divider" />
              <p className="section-lead">まずはお気軽にお試しください。体験コースは各サロングループを通じてお一人様1回限りとなります。</p>
              <div className="trial-grid">
                {[
                  { type: 'Body', title: '全身かっさ痩身\n体験コース', note: '全身のかっさ療法で老廃物を排出。スリミング効果を実感。' },
                  { type: 'Facial', title: 'フェイシャルかっさ\n体験コース', note: '小顔・美肌効果を体感。リフトアップとトーンアップを同時に。' },
                  { type: 'Special', title: 'フェイシャル＆ボディ\n総合体験コース', note: 'フェイシャルとボディを組み合わせた充実のトライアル。' },
                ].map(({ type, title, note }) => (
                  <div key={type} className="trial-card">
                    <div className="trial-type">{type}</div>
                    <h3>{title.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h3>
                    <div className="trial-price">特別価格<span>（要問合せ）</span></div>
                    <p className="trial-note">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-dark">
            <div className="container text-center">
              <span className="section-label" style={{ color: 'var(--gold-light)' }}>Membership Plans</span>
              <h2 className="section-title">会員コース詳細</h2>
              <div className="divider" />
              <p className="section-lead" style={{ color: 'rgba(255,255,255,.6)' }}>
                入会金 ¥11,000（税込）/ 最低ご継続期間：6ヶ月<br />
                お支払い：口座振替 / 6ヶ月一括現金 / 6ヶ月一括クレジットカード
              </p>
              <div className="plan-grid" style={{ maxWidth: 720, margin: '0 auto 40px' }}>
                <div className="plan-card">
                  <div className="plan-name">Silver</div>
                  <div className="plan-price">¥15,400<span>/月</span></div>
                  <div className="plan-price-tax">（税込）</div>
                  <div className="plan-detail">施術時間：<strong>50分</strong><br />月の回数：<strong>月2回</strong><br />フェイシャル3種・ボディ3種から毎月お選びいただけます</div>
                </div>
                <div className="plan-card featured">
                  <div className="plan-badge">POPULAR</div>
                  <div className="plan-name">Gold</div>
                  <div className="plan-price">¥22,000<span>/月</span></div>
                  <div className="plan-price-tax">（税込）</div>
                  <div className="plan-detail">施術時間：<strong>80分</strong><br />月の回数：<strong>月2回</strong><br />フェイシャル3種・ボディ3種から毎月お選びいただけます</div>
                </div>
              </div>
              <div className="notice-box" style={{ textAlign: 'left', background: 'rgba(255,255,255,.05)', borderColor: 'rgba(200,169,110,.4)', color: 'rgba(255,255,255,.7)' }}>
                <strong style={{ color: 'var(--gold)' }}>【会員コースについての注意事項】</strong><br />
                ・最低6ヶ月のご継続をお願いしております<br />
                ・入会金¥11,000は別途必要です<br />
                ・オプション（高周波・キャビテーション等）は別料金となります<br />
                ・体験コースは各グループを通じてお一人様1回限りです
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <span className="section-label">FAQ</span>
              <h2 className="section-title">よくあるご質問</h2>
              <div className="divider" />
              <div style={{ maxWidth: 720 }}>
                {faqs.map(({ q, a }, i) => (
                  <div key={i} className="faq-item">
                    <button className="faq-q" onClick={() => toggleFaq(i)}>
                      <span className="faq-q-mark">Q</span>{q}
                    </button>
                    <div className={`faq-a${openFaqs[i] ? ' open' : ''}`}>{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt text-center">
            <div className="container">
              <span className="section-label">Reservation</span>
              <h2 className="section-title">まずはお気軽にご相談ください</h2>
              <div className="divider" />
              <p className="section-lead">体験コースのご予約・ご不明点はお電話にてお気軽にどうぞ。</p>
              <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginTop: 10 }}>
                {[{ name: '三軒茶屋店', tel: '03-5431-5358' }, { name: '中野店', tel: '03-6304-8225' }].map(({ name, tel }) => (
                  <div key={name} style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '.82rem', color: 'var(--light-text)', marginBottom: 6 }}>{name}</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-dark)' }}>{tel}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">ビタミンスパ＆ボーテ</div>
        <div className="footer-corp">運営：株式会社クロスフォート</div>
        <div className="footer-stores">
          <div className="footer-store"><strong>三軒茶屋店</strong>東京都世田谷区三軒茶屋1-32-12 まるうんビル2F<br />03-5431-5358</div>
          <div className="footer-store"><strong>中野店</strong>東京都中野区中野3-34-26 中野湊口駅ビル6F<br />03-6304-8225</div>
        </div>
        <div className="footer-copy">© 2024 株式会社クロスフォート / ビタミンスパ＆ボーテ. All Rights Reserved.</div>
      </footer>
    </>
  )
}
