/**
 * scripts.js
 * 
 * Clean Code Implementation for Miguel Garcia Hermida Portfolio
 * Features: OOP architecture, Theme Management, Intersection Observer, i18n, Interactive Hover Effects
 */

// Translations Dictionary
const translations = {
  en: {
    "nav.about": "About",
    "nav.work": "Work",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "hero.subtitle": "Cloud Platform & AI Ops Engineer.",
    "hero.desc": "Bridging software development, cloud infrastructure, and AI orchestration. Building with Node.js, Python, and AWS. Driven by Infrastructure as Code (Terraform), Kubernetes, and scalable CI/CD pipelines.",
    "hero.cta": "View Projects",
    "hero.cv": "Download CV",
    "about.title": "01<span class=\"dot\">.</span> About Me<span class=\"dot\">.</span>",
    "about.p1": "I am a Cloud Platform & AI Ops Engineer bridging the gap between sophisticated infrastructure, artificial intelligence integration, and clear business logic. With a foundation forged in enterprise management, I bring a mature product vision to tech, ensuring that systems are not only resilient but solve real business problems efficiently.",
    "about.p2": "My technical core revolves around the <strong>AWS ecosystem</strong>, containerized deployments with <strong>Docker & Kubernetes (K8s)</strong>, and <strong>Terraform (IaC)</strong>. I build robust APIs using <strong>Node.js and Python</strong> to seamlessly connect enterprise data with <strong>LLMs and AI models (LangChain, RAG)</strong>, deploying them through automated GitHub Actions pipelines.",
    "about.p3": "<strong>Global Communication:</strong> With a background in Modern Languages Philology, my professional command of <strong>English</strong> and <strong>French</strong> is a core asset. It allows me to integrate seamlessly into international tech hubs—particularly the <strong>Vaud canton and EPFL ecosystem</strong>—translating complex DevOps and AI concepts to non-technical stakeholders.",
    "about.stack.cloud": "Cloud & Infrastructure",
    "about.stack.devai": "Development & AI Ops",
    "about.stack.automation": "Automation & CI/CD",
    "projects.title": "02<span class=\"dot\">.</span> Selected Work<span class=\"dot\">.</span>",
    "projects.p1.overline": "Enterprise Tooling",
    "projects.p1.desc": "A comprehensive workforce management application emphasizing Clean Architecture. Features dynamic salary calculations based on contract variables.",
    "projects.p2.overline": "Security Infrastructure",
    "projects.p2.desc": "A privacy-first security utility engineered with pure JavaScript (Vanilla). Employs robust entropy generation optimized for zero external dependencies.",
    "projects.p3.overline": "Algorithmic Engineering",
    "projects.p3.desc": "A high-performance poker probability simulator showcasing the translation of highly complex mathematical logic into functional code.",
    "experience.title": "03<span class=\"dot\">.</span> Career Trajectory<span class=\"dot\">.</span>",
    "experience.e1.role": "Cloud Platform & AI Ops Engineer",
    "experience.e1.date": "2026 — Present",
    "experience.e1.desc": "Specializing in highly available architectures (AWS) and Infrastructure as Code (Terraform). Deploying and scaling containerized applications with Docker and Kubernetes, while orchestrating LLMs and AI services via robust Node.js/Python backends and GitHub Actions CI/CD pipelines.",
    "experience.e2.role": "Higher Degree in Web Application Development (DAW)",
    "experience.e2.date": "2024 — 2026",
    "experience.e2.desc": "Formalized deep technical skills traversing the entire software stack. Engineered complex backend solutions, REST APIs, and gained extensive practice in database administration, server deployments, and modern architectural patterns.",
    "experience.e3.role": "Operations & Project Management",
    "experience.e3.date": "2015 — 2022",
    "experience.e3.desc": "End-to-end management of retail operations. Developed resilient leadership, high-stakes negotiation skills, and a holistic, client-facing product strategy that directly translates into building infrastructure that meets precise user needs and business metrics.",
    "contact.title": "Let's build scalable infrastructure<span class=\"dot\">.</span>",
    "contact.desc": "I am currently available for new opportunities. Whether you have a position open in the Vaud ecosystem or just want to discuss Cloud architecture and AI Ops, my inbox is open.",
    "contact.btn": "Get in Touch",
    "footer.copy": "&copy; <span id=\"year\"></span> &mdash; Engineered with precision and IaC."
  },
  fr: {
    "nav.about": "À Propos",
    "nav.work": "Projets",
    "nav.experience": "Expérience",
    "nav.contact": "Contact",
    "hero.subtitle": "Ingénieur Plateforme Cloud & AI Ops.",
    "hero.desc": "Création d'un pont entre le développement logiciel, l'infrastructure cloud et l'orchestration de l'IA. Conception avec Node.js, Python et AWS. Guidé par l'Infrastructure as Code (Terraform), Kubernetes et des pipelines CI/CD évolutifs.",
    "hero.cta": "Voir les Projets",
    "hero.cv": "Télécharger le CV",
    "about.title": "01<span class=\"dot\">.</span> À Propos de Moi<span class=\"dot\">.</span>",
    "about.p1": "Je suis un Ingénieur Plateforme Cloud & AI Ops créant un pont entre une infrastructure sophistiquée, l'intégration de l'intelligence artificielle et une logique métier claire. Avec une fondation forgée dans la gestion d'entreprise, j'apporte une vision produit mature à la technologie, m'assurant que les systèmes soient non seulement résilients, mais qu'ils résolvent efficacement de vrais problèmes commerciaux.",
    "about.p2": "Mon cœur technique s'articule autour de l'<strong>écosystème AWS</strong>, des déploiements conteneurisés avec <strong>Docker & Kubernetes (K8s)</strong> et <strong>Terraform (IaC)</strong>. Je construis des API robustes en utilisant <strong>Node.js et Python</strong> pour connecter de manière transparente les données d'entreprise aux <strong>LLMs et modèles d'IA (LangChain, RAG)</strong>, en les déployant via des pipelines GitHub Actions automatisés.",
    "about.p3": "<strong>Communication Globale :</strong> Fort de mes études en Philologie des Langues Modernes, ma maîtrise professionnelle de l'<strong>Anglais</strong> et du <strong>Français</strong> est un atout majeur. Cela me permet de m'intégrer parfaitement dans les hubs technologiques internationaux — en particulier <strong>le canton de Vaud et l'écosystème de l'EPFL</strong> — en traduisant des concepts complexes de DevOps et d'IA aux parties prenantes non techniques.",
    "about.stack.cloud": "Cloud & Infrastructure",
    "about.stack.devai": "Développement & AI Ops",
    "about.stack.automation": "Automatisation & CI/CD",
    "projects.title": "02<span class=\"dot\">.</span> Travaux Sélectionnés<span class=\"dot\">.</span>",
    "projects.p1.overline": "Outils d'Entreprise",
    "projects.p1.desc": "Une application de gestion de la main-d'œuvre axée sur la Clean Architecture. Calculs dynamiques de salaires basés sur les variables de contrat.",
    "projects.p2.overline": "Infrastructure de Sécurité",
    "projects.p2.desc": "Un utilitaire de sécurité cryptographique conçu en Vanilla JavaScript avec une génération d'entropie optimisée sans dépendances externes.",
    "projects.p3.overline": "Ingénierie Algorithmique",
    "projects.p3.desc": "Un simulateur de probabilités de poker de haute performance illustrant la traduction de logiques mathématiques complexes en code fonctionnel.",
    "experience.title": "03<span class=\"dot\">.</span> Trajectoire Professionnelle<span class=\"dot\">.</span>",
    "experience.e1.role": "Ingénieur Plateforme Cloud & AI Ops",
    "experience.e1.date": "2026 — Présent",
    "experience.e1.desc": "Spécialisation dans les architectures à haute disponibilité (AWS) et l'Infrastructure as Code (Terraform). Déploiement et mise à l'échelle d'applications conteneurisées avec Docker et Kubernetes, tout en orchestrant des LLMs et services d'IA via des backends Node.js/Python robustes et des pipelines CI/CD GitHub Actions.",
    "experience.e2.role": "Brevet de Technicien Supérieur (BTS) en Développement d'Applications Web",
    "experience.e2.date": "2024 — 2026",
    "experience.e2.desc": "Acquisition de compétences techniques approfondies couvrant l'ensemble de la stack logicielle. Ingénierie de solutions backend complexes, d'API REST et pratique intensive de l'administration de bases de données, des déploiements de serveurs et des modèles d'architecture modernes.",
    "experience.e3.role": "Gestion des Opérations & Projets",
    "experience.e3.date": "2015 — 2022",
    "experience.e3.desc": "Gestion complète d'opérations commerciales. Développement d'un leadership résilient, de compétences de négociation à forts enjeux et d'une stratégie produit globale orientée client, se traduisant directement par la construction d'infrastructures répondant aux besoins précis des utilisateurs et aux métriques de l'entreprise.",
    "contact.title": "Construisons une infrastructure évolutive<span class=\"dot\">.</span>",
    "contact.desc": "Je suis actuellement disponible pour de nouvelles opportunités. Que vous ayez un poste ouvert dans l'écosystème vaudois ou que vous souhaitiez simplement discuter d'architecture Cloud et d'AI Ops, mon e-mail est ouvert.",
    "contact.btn": "Me Contacter",
    "footer.copy": "&copy; <span id=\"year\"></span> &mdash; Conçu avec précision et IaC."
  }
};

class Portfolio {
  constructor() {
    this.themeToggleBtn = document.getElementById('themeToggle');
    this.langToggleBtn = document.getElementById('langToggle');
    this.yearSpan = document.getElementById('year');

    // Initialize standard functionalities
    this.init();
  }

  init() {
    this.setupThemeManager();
    this.setupLanguageManager();
    this.setupIntersectionObserver();
    this.setupHoverImages();
    this.setCopyrightYear();
  }

  /**
   * Evaluates system preferences and local storage to set initial theme,
   * then adds the event listener for toggling modes.
   */
  setupThemeManager() {
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (currentTheme === 'dark' || (!currentTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.updateThemeIcon(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.updateThemeIcon(false);
    }

    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateThemeIcon(!isDark);
  }

  updateThemeIcon(isNowDark) {
    if (!this.themeToggleBtn) return;
    this.themeToggleBtn.innerHTML = isNowDark
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
    this.themeToggleBtn.setAttribute('aria-label', isNowDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /**
   * Initializes Language system
   */
  setupLanguageManager() {
    const currentLang = localStorage.getItem('lang') || 'en';
    this.applyLanguage(currentLang);

    if (this.langToggleBtn) {
      this.langToggleBtn.addEventListener('click', () => {
        const activeLang = document.documentElement.getAttribute('lang');
        const newLang = activeLang === 'en' ? 'fr' : 'en';
        this.applyLanguage(newLang);
        this.setCopyrightYear(); // Fix year span inside i18n
      });
    }
  }

  applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);

    // Update Toggle UI
    if (this.langToggleBtn) {
      const activeSpan = this.langToggleBtn.querySelector('.lang-active');
      const inactiveSpan = this.langToggleBtn.querySelector('.lang-inactive');

      activeSpan.textContent = lang.toUpperCase();
      inactiveSpan.textContent = lang === 'en' ? 'FR' : 'EN';
    }

    // Apply translations
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }


  /**
   * Sets up the interactive hover image effect on the project list titles
   */
  setupHoverImages() {
    const container = document.getElementById('hover-image-container');
    const hoverImage = document.getElementById('hover-image');
    const hoverItems = document.querySelectorAll('.cursor-hover-item');
    const projectsSection = document.getElementById('projects');

    if (!container || !hoverImage || hoverItems.length === 0 || !projectsSection) return;

    let isHovering = false;

    const moveImage = (e) => {
      if (!isHovering) return;
      const sectionRect = projectsSection.getBoundingClientRect();
      const x = e.clientX - sectionRect.left;
      const y = e.clientY - sectionRect.top;
      container.style.left = `${x}px`;
      container.style.top = `${y}px`;
    };

    hoverItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const imageUrl = item.getAttribute('data-image');
        if (imageUrl) {
          hoverImage.src = imageUrl;
          isHovering = true;
          container.classList.add('show');
          moveImage(e);
        }
      });

      item.addEventListener('mousemove', moveImage);

      item.addEventListener('mouseleave', () => {
        isHovering = false;
        container.classList.remove('show');
      });
    });
  }

  /**
   * Adds efficient scroll animations matching the clean aesthetic
   */
  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, options);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
  }

  setCopyrightYear() {
    // The span is dynamically recreated if translation occurs, re-fetch it
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear().toString();
    }
  }
}

// Bootstrap application once DOM is entirely loaded
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});
