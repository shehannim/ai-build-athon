document.addEventListener('DOMContentLoaded', () => {
  // --- Initialize Lenis Smooth Scroll ---
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // spring deceleration
    smooth: true,
    infinite: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Smooth scroll to anchors with offset for the floating navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        lenis.scrollTo(target, {
          offset: -80, // Offset for navbar height
          duration: 1.2
        });
      }
    });
  });

  // --- Faculty & Department Dynamic Data ---
  const facultyDeptData = {
    "Faculty of Commerce & Management Studies": [
      "Department of Accountancy",
      "Department of Commerce & Financial Management",
      "Department of Finance",
      "Department of Human Resource Management",
      "Department of Marketing Management",
      "Other"
    ],
    "Faculty of Computing and Technology": [
      "Department of Computer Systems Engineering",
      "Department of Industrial Management Technology",
      "Department of Software Engineering",
      "Other"
    ],
    "Faculty of Humanities": [
      "Department of English",
      "Department of English Language Teaching (DELT)",
      "Department of Fine Arts",
      "Department of Hindi Studies",
      "Department of Linguistics",
      "Department of Modern Languages",
      "Department of Pali & Buddhist Studies",
      "Department of Sanskrit & Eastern Studies",
      "Department of Sinhala",
      "Department of Western Classical Culture & Christian Culture",
      "Other"
    ],
    "Faculty of Medicine": [
      "Department of Anatomy",
      "Department of Biochemistry & Clinical Chemistry",
      "Department of Community Medicine",
      "Department of Family Medicine",
      "Department of Forensic Medicine",
      "Department of Medical Education",
      "Department of Medicine",
      "Department of Medical Microbiology",
      "Department of Obstetrics & Gynaecology",
      "Department of Paediatrics",
      "Department of Parasitology",
      "Department of Pathology",
      "Department of Pharmacology",
      "Department of Physiology",
      "Department of Psychiatry",
      "Department of Public Health",
      "Department of Surgery",
      "Other"
    ],
    "Faculty of Science": [
      "Department of Chemistry",
      "Department of Industrial Management",
      "Department of Mathematics",
      "Department of Microbiology",
      "Department of Physics & Electronics",
      "Department of Plant & Molecular Biology",
      "Department of Statistics & Computer Science",
      "Department of Zoology & Environmental Management",
      "Other"
    ],
    "Faculty of Social Sciences": [
      "Department of Criminology & Criminal Justice",
      "Department of Economics",
      "Department of Geography",
      "Department of History",
      "Department of International Studies",
      "Department of Library & Information Science",
      "Department of Mass Communication",
      "Department of Philosophy",
      "Department of Political Science",
      "Department of Psychology",
      "Department of Social Statistics",
      "Department of Social Work",
      "Department of Sociology",
      "Department of Sport Science & Physical Education",
      "Other"
    ]
  };

  const regFacultySelect = document.getElementById('regFaculty');
  const regDeptSelect = document.getElementById('regDept');

  if (regFacultySelect && regDeptSelect) {
    regFacultySelect.addEventListener('change', () => {
      const selectedFaculty = regFacultySelect.value;
      const depts = facultyDeptData[selectedFaculty] || [];
      
      regDeptSelect.innerHTML = '<option value="" disabled selected>Select Department</option>';
      depts.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        regDeptSelect.appendChild(option);
      });
      
      regDeptSelect.disabled = false;
    });
  }

  // --- 1. Apple-style Scroll Reveal System ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once visible, stop observing to keep visible
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // trigger when 10% of card is in viewport
    rootMargin: '0px 0px -50px 0px' // offset slightly for smoother arrival
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Blur character entry animation for Hero Title on load
  const titleEl = document.querySelector('.hero-title-main');
  if (titleEl) {
    const text = titleEl.textContent;
    titleEl.innerHTML = '';
    text.split(' ').forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.whiteSpace = 'nowrap';
      
      word.split('').forEach((char, charIdx) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        // Stagger every single character animation
        charSpan.style.animationDelay = `${(index * 120) + (charIdx * 25)}ms`;
        wordSpan.appendChild(charSpan);
      });

      titleEl.appendChild(wordSpan);
      // Append spaces between words
      titleEl.appendChild(document.createTextNode(' '));
    });
  }

  // --- 2. Countdown Timer ---
  // Target deadline: August 10, 2026 (local timeline)
  const targetDate = new Date('August 10, 2026 23:59:59').getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      document.querySelector('.countdown-container').innerHTML = `
        <div class="countdown-title">Registration Closed</div>
        <div style="font-size: 1.1rem; font-weight: 600; color: var(--primary-orange); margin-top:0.5rem;">The Hackathon has officially kicked off!</div>
      `;
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- 3. Scroll Header styling ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });



  // --- 5. Interactive Modal (Register Portal) ---
  const portalModal = document.getElementById('portalModal');
  const openPortalBtns = document.querySelectorAll('.open-portal-btn');
  const closePortalBtn = document.getElementById('closePortalBtn');

  const openModal = () => {
    portalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    portalModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForms();
  };

  openPortalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closePortalBtn.addEventListener('click', closeModal);
  portalModal.addEventListener('click', (e) => {
    if (e.target === portalModal) closeModal();
  });

  // --- 6. Form Dynamics (Team Size & Member Fields) ---
  const segmentBtns = document.querySelectorAll('.segment-btn');
  const memberFieldsContainer = document.getElementById('memberFieldsContainer');
  let selectedTeamSize = 1;

  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTeamSize = parseInt(btn.getAttribute('data-size'));
      updateMemberFields();
    });
  });

  const updateMemberFields = () => {
    memberFieldsContainer.innerHTML = '';
    // Size 1 needs no extra member names. Size 2 needs 1 extra. Size 3 needs 2 extra.
    if (selectedTeamSize > 1) {
      const heading = document.createElement('label');
      heading.className = 'form-label';
      heading.style.marginTop = '1rem';
      heading.textContent = 'Team Member Information';
      memberFieldsContainer.appendChild(heading);

      for (let i = 2; i <= selectedTeamSize; i++) {
        const row = document.createElement('div');
        row.className = 'form-row';
        row.innerHTML = `
          <div class="form-group">
            <input type="text" class="form-input member-name" placeholder="Member ${i} Full Name" required>
          </div>
          <div class="form-group">
            <input type="text" class="form-input member-sid" placeholder="Member ${i} Student ID" required>
          </div>
        `;
        memberFieldsContainer.appendChild(row);
      }
    }
  };

  // --- 7. Supabase Operations ---
  const registerForm = document.getElementById('registerForm');
  const registerMsg = document.getElementById('registerMsg');
  const registerBtnText = document.getElementById('registerBtnText');
  const registerSpinner = document.getElementById('registerSpinner');

  const registerSuccessOverlay = document.getElementById('registerSuccessOverlay');
  const registerFormContent = document.getElementById('registerFormContent');

  const resetForms = () => {
    registerForm.reset();
    registerMsg.className = 'form-message';
    registerMsg.style.display = 'none';
    registerFormContent.style.display = 'block';
    registerSuccessOverlay.classList.remove('active');
    selectedTeamSize = 1;
    segmentBtns.forEach((b, idx) => {
      if (idx === 0) b.classList.add('active');
      else b.classList.remove('active');
    });
    updateMemberFields();
  };

  // Check login state on launch
  const checkSession = async () => {
    if (typeof supabaseClient === 'undefined') return;
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
      updateUIForLoggedInUser(session.user);
    }
  };

  const updateUIForLoggedInUser = (user) => {
    // Keep CTAs as "Register Team" so logged-in users can open the registration form!
  };

  // Registration Logic
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    registerMsg.style.display = 'none';
    registerBtnText.textContent = 'Registering Team...';
    registerSpinner.style.display = 'inline-block';
    registerForm.querySelector('button').disabled = true;

    // Core User Info
    const fullName = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    // Generate a secure random password in the background
    const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const studentId = document.getElementById('regStudentId').value.trim();
    const faculty = document.getElementById('regFaculty').value;
    const department = document.getElementById('regDept').value;
    const yearOfStudy = document.getElementById('regYear').value;

    // Team Details
    const teamName = document.getElementById('regTeamName').value.trim();
    const interestedTools = Array.from(document.querySelectorAll('.tool-checkbox input:checked')).map(cb => cb.value);

    // Dynamic members details
    const members = [];
    const memberNameInputs = document.querySelectorAll('.member-name');
    const memberSidInputs = document.querySelectorAll('.member-sid');

    memberNameInputs.forEach((input, index) => {
      members.push({
        name: input.value.trim(),
        student_id: memberSidInputs[index].value.trim()
      });
    });

    try {
      if (typeof supabaseClient === 'undefined') {
        throw new Error('Supabase SDK is not loaded. Please verify configuration.');
      }

      // Step 1: Sign up user using Supabase Auth
      const { data: authData, error: authError } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            student_id: studentId,
            faculty: faculty,
            department: department,
            year_of_study: yearOfStudy
          }
        }
      });

      if (authError) throw authError;

      const user = authData.user;
      if (!user) throw new Error('Failed to retrieve registered user context.');

      // Step 2: Write registration entry to database registrations table
      const { error: dbError } = await supabaseClient.from('registrations').insert([
        {
          user_id: user.id,
          full_name: fullName,
          student_email: email,
          student_id: studentId,
          faculty: faculty,
          department: department,
          year_of_study: yearOfStudy,
          team_name: teamName,
          team_size: selectedTeamSize,
          tools_interested: interestedTools
        }
      ]);

      if (dbError) {
        console.error('Database insertion error:', dbError);
        // Note: auth was successful, but DB insertion failed. We warn but treat as registered or allow retry.
        throw new Error(`Auth registered, but profile write failed: ${dbError.message}`);
      }

      // Display animated Success Checkmark Panel
      registerFormContent.style.display = 'none';
      registerSuccessOverlay.classList.add('active');
      document.getElementById('successTeamName').textContent = teamName;

      // Update Header/CTA State
      setTimeout(() => {
        closeModal();
        updateUIForLoggedInUser(user);
      }, 3500);

    } catch (err) {
      registerMsg.textContent = err.message || 'An error occurred during registration.';
      registerMsg.className = 'form-message error';
      registerMsg.style.display = 'block';
    } finally {
      registerBtnText.textContent = 'Register Team';
      registerSpinner.style.display = 'none';
      registerForm.querySelector('button').disabled = false;
    }
  });

  // --- 8. Scroll-driven Intricate Timeline Tracker ---
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineContainer = document.querySelector('.timeline-container');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineLaserTail = document.getElementById('timelineLaserTail');

  let lastScrollY = window.scrollY;
  let lastScrollTimeVal = Date.now();
  let targetTailHeight = 0;
  let currentTailHeight = 0;
  let animationFrameId = null;

  const updateTailPhysics = () => {
    // Decay target to 0 if scrolling has stopped (no scroll events for > 80ms)
    if (Date.now() - lastScrollTimeVal > 80) {
      targetTailHeight = 0;
    }

    // Ease tail height
    currentTailHeight += (targetTailHeight - currentTailHeight) * 0.15;
    
    if (timelineLaserTail) {
      timelineLaserTail.style.height = `${currentTailHeight}px`;
      
      // Update opacity relative to speed/length
      if (currentTailHeight > 1.5) {
        timelineLaserTail.style.opacity = Math.min(0.2 + (currentTailHeight / 80), 0.95);
      } else {
        timelineLaserTail.style.opacity = 0;
      }
    }
    
    // Keep looping if tail is visible or active
    if (Math.abs(targetTailHeight - currentTailHeight) > 0.1 || currentTailHeight > 0.5) {
      animationFrameId = requestAnimationFrame(updateTailPhysics);
    } else {
      currentTailHeight = 0;
      if (timelineLaserTail) {
        timelineLaserTail.style.height = '0px';
        timelineLaserTail.style.opacity = 0;
      }
      animationFrameId = null;
    }
  };

  const handleTimelineScroll = () => {
    if (!timelineProgress || !timelineContainer) return;

    const containerRect = timelineContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Laser tracking triggers when it enters 60% of viewport height
    const triggerPoint = viewportHeight * 0.6;
    
    let totalHeight = containerRect.height;
    if (timelineItems.length > 0) {
      const lastItem = timelineItems[timelineItems.length - 1];
      const lastItemDot = lastItem.querySelector('.timeline-dot');
      if (lastItemDot) {
        const lastItemDotRect = lastItemDot.getBoundingClientRect();
        const offset = containerRect.bottom - lastItemDotRect.top - 4;
        totalHeight -= offset;
      }
    }
    
    let scrolledDistance = triggerPoint - containerRect.top;
    let scrollPercent = scrolledDistance / totalHeight;
    scrollPercent = Math.min(Math.max(scrollPercent, 0), 1);
    
    // Set the height of the glowing track
    timelineProgress.style.height = (scrollPercent * 100) + '%';

    // Calculate Scroll Speed
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const distance = Math.abs(currentScrollY - lastScrollY);
    const timeDiff = currentTime - lastScrollTimeVal;
    
    if (timeDiff > 0 && distance > 0) {
      const speed = distance / timeDiff; // Pixels per millisecond
      targetTailHeight = Math.min(speed * 90, 140); // Maximum tail length of 140px
      
      lastScrollTimeVal = currentTime;
      
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateTailPhysics);
      }
    }
    
    lastScrollY = currentScrollY;

    // Activate the timeline items, dots, and update statuses dynamically
    timelineItems.forEach(item => {
      const dotWrapper = item.querySelector('.timeline-dot-wrapper');
      if (!dotWrapper) return;
      
      const dotRect = dotWrapper.getBoundingClientRect();
      const statusText = item.querySelector('.tech-status');
      
      if (dotRect.top <= triggerPoint) {
        if (!item.classList.contains('active-timeline')) {
          item.classList.add('active-timeline');
          if (statusText) {
            statusText.textContent = '[ STATUS: COMPLETED ]';
          }
        }
      } else {
        if (item.classList.contains('active-timeline')) {
          item.classList.remove('active-timeline');
          if (statusText) {
            statusText.textContent = '[ STATUS: INACTIVE ]';
          }
        }
      }
    });
  };

  const techContainer = document.getElementById('interactiveTechContainer');

  const handleScrollInteractions = () => {
    handleTimelineScroll();
    
    if (techContainer) {
      const rotation = window.scrollY * 0.06;
      const scale = 1 + Math.sin(window.scrollY * 0.002) * 0.02;
      techContainer.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    }
  };

  window.addEventListener('scroll', handleScrollInteractions);
  handleScrollInteractions();

  // Run session check on start
  checkSession();

  // --- 11. Interactive Hero Canvas Particles (hackX-inspired) ---
  const initHeroParticles = () => {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const colors = ['#FF5500', '#FF8800', '#94a3b8']; // Orange, Amber, Soft gray

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    let mouse = {
      x: null,
      y: null,
      radius: 120
    };

    const parentSection = canvas.parentElement;
    parentSection.addEventListener('mousemove', (event) => {
      const rect = parentSection.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });

    parentSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        // Bounce off canvas bounds
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse interaction (pull/push effect)
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
              this.x += 1.5;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.x -= 1.5;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
              this.y += 1.5;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.y -= 1.5;
            }
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Initialize particles array
    const init = () => {
      particlesArray = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 14000);
      const limit = Math.min(numberOfParticles, 85);
      for (let i = 0; i < limit; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    // Draw lines connecting particles
    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          
          if (distance < 80) {
            opacityValue = 1 - (distance/80);
            ctx.strokeStyle = `rgba(255, 85, 0, ${opacityValue * 0.25})`; // Soft orange lines
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }

        // Connect to mouse as well
        if (mouse.x !== null && mouse.y !== null) {
          let dx = particlesArray[a].x - mouse.x;
          let dy = particlesArray[a].y - mouse.y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          if (distance < mouse.radius) {
            opacityValue = 1 - (distance/mouse.radius);
            ctx.strokeStyle = `rgba(255, 136, 0, ${opacityValue * 0.35})`; // Soft orange lines from mouse
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    init();
    animate();
    
    // Re-init on resize
    window.addEventListener('resize', init);
  };
  
  initHeroParticles();

  // --- 11. About Section Morphing 3D Sphere Canvas ---
  const initAboutCanvas = () => {
    const canvas = document.getElementById('aboutVisualCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let points = [];
    const numPoints = 140; // Dense enough to look techy, sparse enough to render fast
    const radius = 90;
    
    let angleX = 0.003;
    let angleY = 0.004;
    
    let mouse = { x: null, y: null, targetX: 0, targetY: 0, currentX: 0, currentY: 0 };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width || 380;
      canvas.height = rect.width || 380;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Golden Spiral point distribution on a 3D sphere
    const initPoints = () => {
      points = [];
      for (let i = 0; i < numPoints; i++) {
        const theta = Math.acos(1 - 2 * (i / numPoints));
        const phi = Math.PI * (1 + Math.sqrt(5)) * i;
        
        points.push({
          x: Math.sin(theta) * Math.cos(phi),
          y: Math.sin(theta) * Math.sin(phi),
          z: Math.cos(theta),
          baseX: Math.sin(theta) * Math.cos(phi),
          baseY: Math.sin(theta) * Math.sin(phi),
          baseZ: Math.cos(theta),
          phase: Math.random() * Math.PI * 2
        });
      }
    };
    initPoints();

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.targetX = (mouse.x / canvas.width - 0.5) * 0.4;
      mouse.targetY = (mouse.y / canvas.height - 0.5) * 0.4;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
      mouse.targetX = 0;
      mouse.targetY = 0;
    });

    const project = (x, y, z) => {
      const fov = 220;
      const distance = 2.0;
      const scale = fov / (distance + z);
      return {
        x: x * scale + canvas.width / 2,
        y: y * scale + canvas.height / 2,
        scale: scale
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.08;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.08;
      
      const time = Date.now() * 0.0012;
      
      const cosY = Math.cos(angleY + mouse.currentX);
      const sinY = Math.sin(angleY + mouse.currentX);
      const cosX = Math.cos(angleX + mouse.currentY);
      const sinX = Math.sin(angleX + mouse.currentY);

      // Rotate and morph points
      const projected = points.map(p => {
        // Wave morphing
        const wave = Math.sin(time + p.phase) * 0.1;
        const mx = p.baseX * (1 + wave);
        const my = p.baseY * (1 + wave);
        const mz = p.baseZ * (1 + wave);
        
        // 3D rotations
        let x1 = mx * cosY - mz * sinY;
        let z1 = mz * cosY + mx * sinY;
        let y2 = my * cosX - z1 * sinX;
        let z2 = z1 * cosX + my * sinX;
        
        const rx = x1 * radius;
        const ry = y2 * radius;
        const rz = z2 * radius;

        const proj = project(rx, ry, rz / 180);
        return { x: proj.x, y: proj.y, z: rz, scale: proj.scale };
      });

      // Depth sort
      projected.sort((a, b) => a.z - b.z);

      // Draw faint connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        let connCount = 0;
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < 42 && connCount < 2) {
            const alpha = (1 - dist / 42) * 0.12 * ((p1.z + radius) / (radius * 2));
            ctx.strokeStyle = `rgba(255, 85, 0, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            connCount++;
          }
        }
      }

      // Draw particle points
      projected.forEach(p => {
        const size = Math.max(0.8, p.scale * 0.015);
        const opacity = Math.min(1, Math.max(0.1, (p.z + radius) / (radius * 2)));
        
        ctx.fillStyle = `rgba(255, 85, 0, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Keep rotating slowly
      angleY += 0.002;
      angleX += 0.001;

      requestAnimationFrame(draw);
    };

    draw();
  };
  initAboutCanvas();

  // --- 10. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });
    // Close menu when clicking outside or clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });
  }
});
