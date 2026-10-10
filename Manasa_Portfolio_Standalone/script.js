const projects = [{"title":"Waste Classification System","category":"Machine learning · Sustainability","number":"01","type":"waste","description":"A smarter approach to sorting waste. An image-recognition web application that makes everyday sustainability a little easier.","technologies":["HTML","CSS","JavaScript","Machine Learning"],"details":["Built a web application for real-time waste classification using image recognition.","Integrated machine learning to automate waste categorization and improve user awareness.","Presented the project at a hackathon conducted by Anurag University."]},{"title":"Sign Language Translation","category":"Computer vision · Accessibility","number":"02","type":"sign","description":"Bridging the communication gap. A real-time translator that turns hand gestures into meaningful text and speech.","technologies":["JavaScript","MediaPipe","Computer Vision"],"details":["Developed a real-time sign language translator using MediaPipe and computer vision to detect hand gestures through a webcam.","Converted recognized gestures into text and speech, enhancing accessibility and communication."]}];
"use strict";
// Plain JavaScript: no React, packages, or build step.
document.documentElement.classList.add('js-enabled');
const menuToggle = document.getElementById('menu-toggle');
const mobileNavigation = document.getElementById('mobile-navigation');
function closeMenu() {
  mobileNavigation.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const open = mobileNavigation.hidden;
  mobileNavigation.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mobileNavigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 851px)').addEventListener('change', event => { if(event.matches) closeMenu(); });

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(element => revealObserver.observe(element));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-link').forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
} else {
  reveals.forEach(element => element.classList.add('visible'));
}

const dialog = document.getElementById('project-dialog');
let projectTrigger;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[Number(button.dataset.project)];
    if (!project) return;
    projectTrigger = button;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-description').textContent = project.description;
    const details = document.getElementById('project-details');
    details.replaceChildren(...project.details.map(detail => {
      const li = document.createElement('li');
      li.textContent = detail;
      return li;
    }));
    document.getElementById('project-technologies').replaceChildren(...project.technologies.map(technology => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = technology;
      return tag;
    }));
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (projectTrigger) projectTrigger.focus();
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const subject = encodeURIComponent(String(form.get('subject')));
  const body = encodeURIComponent(`Hi Manasa,\n\n${form.get('message')}\n\nFrom: ${form.get('name')}\nEmail: ${form.get('email')}`);
  window.location.href = `mailto:manasapagadalu282005@gmail.com?subject=${subject}&body=${body}`;
  contactForm.querySelector('[role="status"]').hidden = false;
});
