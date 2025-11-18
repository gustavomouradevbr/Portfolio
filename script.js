      let currentIndex = 0;
      const carousel = document.querySelector(".carousel");
      const cards = document.querySelectorAll(".project-card");
      const dots = document.querySelectorAll(".dot");

      function showProject(index) {
        if (index >= cards.length) currentIndex = 0;
        if (index < 0) currentIndex = cards.length - 1;

        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;

        dots.forEach((dot) => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
      }

      function nextProject() {
        currentIndex++;
        showProject(currentIndex);
      }

      function prevProject() {
        currentIndex--;
        showProject(currentIndex);
      }

      function currentProject(index) {
        currentIndex = index;
        showProject(currentIndex);
      }

      // ===== THEME TOGGLE (LIGHT/DARK MODE) =====
      const themeIcon = document.getElementById("theme-icon");
      const body = document.body;

      // Verificar se há preferência salva no localStorage
      const savedTheme = localStorage.getItem("theme") || "dark-mode";
      body.classList.remove("dark-mode", "light-mode");
      body.classList.add(savedTheme);
      updateThemeIcon(savedTheme);

      function updateThemeIcon(theme) {
        if (theme === "light-mode") {
          themeIcon.src = "assets/moon-icon.svg";
          themeIcon.alt = "Dark mode";
        } else {
          themeIcon.src = "assets/sun-icon.svg";
          themeIcon.alt = "Light mode";
        }
      }

      themeIcon.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
          body.classList.remove("dark-mode");
          body.classList.add("light-mode");
          localStorage.setItem("theme", "light-mode");
          updateThemeIcon("light-mode");
        } else {
          body.classList.remove("light-mode");
          body.classList.add("dark-mode");
          localStorage.setItem("theme", "dark-mode");
          updateThemeIcon("dark-mode");
        }
      });

      // ===== COMING SOON MODAL FOR PROJECT LINKS =====
      const projectLinks = document.querySelectorAll('.project-link');
      const modal = document.createElement('div');
      modal.id = 'coming-modal';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button class="modal-close" aria-label="Close">&times;</button>
          <h3 id="modal-title">Coming Soon</h3>
          <p>This solution will be available soon. Thanks for your interest — check back later.</p>
        </div>`;
      document.body.appendChild(modal);

      const modalClose = modal.querySelector('.modal-close');

      // Mobile nav toggle
      const nav = document.querySelector('nav');
      const navToggle = document.getElementById('nav-toggle');
      if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
          nav.classList.toggle('nav-open');
        });

        // Close nav when clicking a nav link
        const navLinks = nav.querySelectorAll('.nav-links a');
        navLinks.forEach(a => a.addEventListener('click', () => {
          nav.classList.remove('nav-open');
        }));

        // Close nav on outside click
        document.addEventListener('click', (e) => {
          if (!nav.contains(e.target) && nav.classList.contains('nav-open')) {
            nav.classList.remove('nav-open');
          }
        });
      }

      function openModal() {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('.modal-close').focus();
      }

      function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
      }

      projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href') || '';
          // If link is external (different origin) open in new tab normally
          try {
            const url = new URL(href, window.location.href);
            if (url.origin !== window.location.origin) {
              // Allow opening external links (e.g. Canva) in a new tab
              window.open(url.href, '_blank', 'noopener');
              return;
            }
          } catch (err) {
            // If URL parsing fails, fall back to modal
          }

          e.preventDefault();
          openModal();
        });
      });

      // Intercept resume links (nav "Resume" and download resume) and show Coming Soon modal
      const resumeLinks = document.querySelectorAll('a[href="#resume"], a[href$="seu-curriculo.pdf"]');
      resumeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const titleEl = modal.querySelector('#modal-title');
          const pEl = modal.querySelector('.modal-content p');
          if (titleEl) titleEl.textContent = 'Coming Soon';
          if (pEl) pEl.textContent = 'This functionality will be available soon. Check back later.';
          openModal();
        });
      });

      modalClose.addEventListener('click', closeModal);

      // Close modal when clicking outside content
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
          closeModal();
        }
      });

