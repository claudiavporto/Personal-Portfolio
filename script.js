document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.container');
    const toggleHeaders = document.querySelectorAll('.toggle-header');
    const backToProjectsButton = document.querySelector('.back-to-projects-button');
    const showProjectButton = document.querySelectorAll('.show-project-button');
    const projectSection = document.getElementById('project');
    const vantaContainer = document.querySelector('#vanta-container');

    // Toggle visibility for section contents
    toggleHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            if (content) {
                if (content.classList.contains('show')) {
                    content.classList.remove('show');
                    this.parentElement.classList.remove('show');
                    setTimeout(() => content.style.display = 'none', 300);
                } else {
                    content.style.display = 'block';
                    this.parentElement.classList.add('show');
                    setTimeout(() => content.classList.add('show'), 10);
                }
            }

            // Show "Show More" button for creative technology project
            if (content && this.parentElement.classList.contains('project-item') && this.parentElement.dataset.details === 'project3') {
                const showMoreButton = content.querySelector('.show-project-button');
                if (showMoreButton) {
                    showMoreButton.style.display = 'block';
                }
            }
        });
    });

    // Set the first section as visible and the first button as active
    if (sections.length > 0) {
        sections.forEach(section => section.style.display = 'none'); // Hide all sections initially
        sections[0].style.display = 'block'; // Show the first section
    }
    if (navButtons.length > 0) {
        navButtons[0].classList.add('active');
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offset = document.querySelector('header').offsetHeight;

                // Hide all sections
                sections.forEach(section => {
                    section.style.display = 'none';
                });

                // Show the target section
                targetElement.style.display = 'block';

                // Smooth scrolling
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });

                // Update active button
                navButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            } else {
                console.warn(`Element with ID "${targetId}" not found.`);
            }
        });
    });

    showProjectButton.forEach(button => {
        button.addEventListener('click', function () {
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Show the project section
            projectSection.style.display = 'block';

            // Change body background color to teal and hide Vanta container
            document.body.style.backgroundColor = 'var(--teal)';
            vantaContainer.style.display = 'none';

            // Smooth scrolling
            window.scrollTo({
                top: projectSection.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    if (backToProjectsButton) {
        backToProjectsButton.addEventListener('click', function () {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.style.display = 'block';
                sections.forEach(section => {
                    if (section !== projectsSection) {
                        section.style.display = 'none';
                    }
                });

                // Reset body background color and show Vanta container
                document.body.style.backgroundColor = 'var(--light-grey)';
                vantaContainer.style.display = 'block';

                window.scrollTo({
                    top: projectsSection.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Adding Vanta.js fog effect to fill the background
    VANTA.FOG({
        el: "#vanta-container",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0x8ecae6,
        midtoneColor: 0xfb8500,
        lowlightColor: 0x023047,
        blurFactor: 0.6,
        speed: 2.40
    });
});
