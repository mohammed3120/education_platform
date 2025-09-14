// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile nav on click
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

// ========== Mobile Menu Toggle ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ========== Light/Dark Mode Toggle ==========
const modeToggle = document.getElementById('modeToggle');
const modeIcon = modeToggle.querySelector('.mode-icon');
function setMode(dark) {
  document.body.classList.toggle('dark-mode', dark);
  modeIcon.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('eduplatform-mode', dark ? 'dark' : 'light');
}
modeToggle.addEventListener('click', () => {
  setMode(!document.body.classList.contains('dark-mode'));
});
// On load, set mode from localStorage
setMode(localStorage.getItem('eduplatform-mode') === 'dark');

// ========== Courses Data & Filtering ==========
const courses = [
  {
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    title: 'الرياضيات',
    desc: 'شرح مبسط لجميع دروس الرياضيات مع تمارين تفاعلية.',
    level: 'إعدادي',
    subject: 'الرياضيات',
  },
  {
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    title: 'الفيزياء',
    desc: 'تجارب وشرح مفصل لمفاهيم الفيزياء للمرحلتين.',
    level: 'ثانوي',
    subject: 'الفيزياء',
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    title: 'الكيمياء',
    desc: 'دروس الكيمياء مع تطبيقات عملية وأسئلة إثرائية.',
    level: 'ثانوي',
    subject: 'الكيمياء',
  },
  {
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    title: 'اللغة العربية',
    desc: 'قواعد، نصوص، تعبير، وإملاء لجميع المراحل.',
    level: 'إعدادي',
    subject: 'اللغة العربية',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'اللغة الإنجليزية',
    desc: 'مهارات القراءة والكتابة والاستماع والتحدث.',
    level: 'ثانوي',
    subject: 'اللغة الإنجليزية',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    title: 'الأحياء',
    desc: 'شرح مبسط لعلم الأحياء مع رسوم توضيحية.',
    level: 'ثانوي',
    subject: 'الأحياء',
  },
  {
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
    title: 'الدراسات الاجتماعية',
    desc: 'تاريخ وجغرافيا ومهارات حياتية.',
    level: 'إعدادي',
    subject: 'الدراسات الاجتماعية',
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    title: 'الحاسوب',
    desc: 'أساسيات الحاسوب والبرمجة للمبتدئين.',
    level: 'إعدادي',
    subject: 'الحاسوب',
  },
];

const levels = ['الكل', 'إعدادي', 'ثانوي'];
const subjects = ['الكل', ...Array.from(new Set(courses.map(c => c.subject)))];

function renderCourseFilters() {
  const filtersDiv = document.getElementById('coursesFilters');
  filtersDiv.innerHTML = '';
  // Level filter
  const levelSelect = document.createElement('select');
  levelSelect.id = 'levelFilter';
  levelSelect.innerHTML = levels.map(l => `<option value="${l}">${l}</option>`).join('');
  filtersDiv.appendChild(levelSelect);
  // Subject filter
  const subjectSelect = document.createElement('select');
  subjectSelect.id = 'subjectFilter';
  subjectSelect.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
  filtersDiv.appendChild(subjectSelect);
}
renderCourseFilters();

function renderCourses(filter = '', level = 'الكل', subject = 'الكل') {
  const grid = document.getElementById('coursesGrid');
  grid.innerHTML = '';
  let filtered = courses.filter(c =>
    (c.title.toLowerCase().includes(filter.toLowerCase()) ||
     c.desc.toLowerCase().includes(filter.toLowerCase())) &&
    (level === 'الكل' || c.level === level) &&
    (subject === 'الكل' || c.subject === subject)
  );
  if (filtered.length === 0) {
    grid.innerHTML = '<p>لم يتم العثور على دورات.</p>';
    return;
  }
  filtered.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <img src="${course.image}" alt="${course.title}">
      <h3>${course.title}</h3>
      <p>${course.desc}</p>
      <div style="margin-bottom:0.5em;"><span style="color:#00b894;">${course.level}</span> | <span style="color:#3a86ff;">${course.subject}</span></div>
      <a href="#contact" class="btn btn-primary">سجل الآن</a>
    `;
    grid.appendChild(card);
  });
}

// Initial render
let currentLevel = 'الكل';
let currentSubject = 'الكل';
renderCourses('', currentLevel, currentSubject);

document.getElementById('courseSearch').addEventListener('input', e => {
  renderCourses(e.target.value, currentLevel, currentSubject);
});
document.getElementById('coursesFilters').addEventListener('change', e => {
  const levelVal = document.getElementById('levelFilter').value;
  const subjectVal = document.getElementById('subjectFilter').value;
  currentLevel = levelVal;
  currentSubject = subjectVal;
  renderCourses(document.getElementById('courseSearch').value, currentLevel, currentSubject);
});

// ========== Instructors Data ==========
const instructors = [
  {
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'أ. محمد عبد الله',
    specialization: 'الرياضيات',
    socials: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'أ. فاطمة الزهراء',
    specialization: 'اللغة العربية',
    socials: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    photo: 'https://randomuser.me/api/portraits/men/54.jpg',
    name: 'د. سامي يوسف',
    specialization: 'الفيزياء والكيمياء',
    socials: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'أ. ليلى منصور',
    specialization: 'اللغة الإنجليزية',
    socials: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
];
function renderInstructors() {
  const grid = document.getElementById('instructorsGrid');
  grid.innerHTML = '';
  instructors.forEach(inst => {
    const card = document.createElement('div');
    card.className = 'instructor-card';
    card.innerHTML = `
      <img src="${inst.photo}" alt="${inst.name}" class="instructor-photo">
      <div class="instructor-name">${inst.name}</div>
      <div class="instructor-specialization">${inst.specialization}</div>
      <div class="instructor-socials">
        <a href="${inst.socials.twitter}" target="_blank" aria-label="تويتر"><i class="fab fa-twitter"></i>🐦</a>
        <a href="${inst.socials.linkedin}" target="_blank" aria-label="لينكدإن"><i class="fab fa-linkedin"></i>💼</a>
        <a href="${inst.socials.github}" target="_blank" aria-label="جيت هب"><i class="fab fa-github"></i>💻</a>
      </div>
    `;
    grid.appendChild(card);
  });
}
renderInstructors();

// ========== Pricing Data ==========
const pricingPlans = [
  {
    title: 'أساسي',
    price: '١٩$ / شهر',
    features: ['الوصول إلى جميع الدورات المجانية', 'دعم المجتمع', 'موارد أساسية'],
  },
  {
    title: 'محترف',
    price: '٤٩$ / شهر',
    features: ['جميع ميزات الأساسي', 'دورات مميزة', 'إرشاد فردي', 'مواد قابلة للتنزيل'],
  },
  {
    title: 'الشركات',
    price: 'تواصل معنا',
    features: ['حلول مخصصة', 'تحليلات الفريق', 'دعم مخصص', 'خصومات جماعية'],
  },
];
function renderPricing() {
  const grid = document.getElementById('pricingGrid');
  grid.innerHTML = '';
  pricingPlans.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'pricing-card';
    card.innerHTML = `
      <div class="pricing-title">${plan.title}</div>
      <div class="pricing-price">${plan.price}</div>
      <ul class="pricing-features">
        ${plan.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <a href="#contact" class="btn btn-primary">اختر الخطة</a>
    `;
    grid.appendChild(card);
  });
}
renderPricing();

// ========== Testimonials Data & Carousel ==========
const testimonials = [
  {
    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
    name: 'سارة أحمد',
    role: 'طالبة في الإعدادي',
    text: 'تحسنت علاماتي في الرياضيات والعلوم بفضل الدروس التفاعلية والمعلمين الرائعين!'
  },
  {
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
    name: 'خالد محمود',
    role: 'طالب في الثانوي',
    text: 'المنصة ساعدتني على فهم الفيزياء والكيمياء بطريقة سهلة وممتعة.'
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    name: 'أم يوسف',
    role: 'ولية أمر',
    text: 'لاحظت تطور ابني في جميع المواد بعد استخدام المنصة. شكراً لكم!'
  },
];
let testimonialIndex = 0;
function renderTestimonial(idx) {
  const carousel = document.getElementById('testimonialCarousel');
  carousel.innerHTML = '';
  testimonials.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'testimonial' + (i === idx ? ' active' : '');
    div.innerHTML = `
      <img src="${t.photo}" alt="${t.name}" class="testimonial-photo">
      <div class="testimonial-name">${t.name}</div>
      <div class="testimonial-role">${t.role}</div>
      <div class="testimonial-text">${t.text}</div>
    `;
    carousel.appendChild(div);
  });
}
renderTestimonial(testimonialIndex);
document.getElementById('prevTestimonial').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial(testimonialIndex);
});
document.getElementById('nextTestimonial').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial(testimonialIndex);
});

// ========== Contact Form (Demo Only) ==========
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('شكراً لتواصلك معنا! سنرد عليك قريباً.');
  this.reset();
});
