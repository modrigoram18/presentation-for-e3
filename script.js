/* =========================================================
   1. MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    if (!menuToggle || !navMenu) return;
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

document.addEventListener("click", event => {
    if (!navMenu || !menuToggle) return;
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
        closeMenu();
    }
});

/* =========================================================
   2. DARK MODE TOGGLE
========================================================= */

const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
        themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }
}

applyTheme(savedTheme || "light");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentlyDark = document.body.classList.contains("dark-mode");
        const newTheme = currentlyDark ? "light" : "dark";
        localStorage.setItem("portfolio-theme", newTheme);
        applyTheme(newTheme);
    });
}

/* =========================================================
   3. REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: "0px 0px -35px 0px" }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}

/* =========================================================
   4. ACTIVE NAVIGATION LINK ON SCROLL
========================================================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const currentId = entry.target.id;
                navLinks.forEach(link => {
                    const isActive = link.getAttribute("href") === `#${currentId}`;
                    link.classList.toggle("active", isActive);
                });
            });
        },
        { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* =========================================================
   5. BACK TO TOP BUTTON
========================================================= */

const backToTop = document.getElementById("back-to-top");

function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =========================================================
   6. INTERACTIVE CAREER JOURNEY MODAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const careerData = {
        "career-dotr": {
            title: "Engineer II",
            company: "Department of Transportation",
            date: "December 2024 – Present",
            duties: [
                "Coordinate utility relocation activities for the Metro Manila Subway Project in collaboration with utility companies, contractors, and other project stakeholders.",
                "Review technical plans and relocation proposals, identify coordination requirements, and facilitate the resolution of technical concerns.",
                "Conduct site inspections and participate in coordination meetings to monitor relocation activities and address implementation issues.",
                "Coordinate technical requirements, permits, work orders, and supporting documentation to facilitate the implementation of utility relocation works."
            ]
        },
        "career-intertek": {
            title: "Technical Assessor",
            company: "Intertek Testing Services Philippines",
            date: "April 2021 – December 2024",
            duties: [
                "Conducted technical assessments related to product certification and applicable requirements.",
                "Reviewed technical documentation and supporting evidence for compliance with relevant standards and assessment criteria.",
                "Applied ISO/IEC 17065-related requirements and assessment procedures in the performance of technical duties.",
                "Prepared assessment findings and coordinated technical clarifications with relevant parties."
            ]
        },
        "career-ev": {
            title: "Junior Mechanical Engineer",
            company: "EV Sinogba Consulting Engineers",
            date: "March 2020 – November 2020",
            duties: [
                "Prepared mechanical quantity takeoffs and cost estimates for construction projects.",
                "Reviewed drawings and technical documents to identify mechanical scope and material requirements.",
                "Supported estimating work for facilities associated with U.S. military installations in Okinawa, Japan."
            ]
        },
        "career-nsjb": {
            title: "Mechanical Engineer",
            company: "New San Jose Builders",
            date: "February 2019 – February 2020",
            duties: [
                "Supported mechanical installation activities for Victoria Sports Tower.",
                "Coordinated mechanical works with construction teams and other building services disciplines.",
                "Assisted in monitoring installation progress and resolving technical and site coordination concerns."
            ]
        },
        "career-fr": {
            title: "Quantity Surveyor",
            company: "FR Sevilla Industrial & Development Corp.",
            date: "May 2018 – August 2018",
            duties: [
                "Prepared HVAC quantity takeoffs and cost estimates for the MDC Headquarters project.",
                "Reviewed project drawings to identify equipment, materials, and installation quantities.",
                "Supported cost planning and preparation of mechanical estimates."
            ]
        },
        "career-sobida": {
            title: "Cadet Engineer",
            company: "Sobida Motors Corporation",
            date: "February 2017 – April 2018",
            duties: [
                "Supported manufacturing operations and production-line activities.",
                "Helped coordinate daily production requirements and operational tasks.",
                "Gained early supervisory and team coordination experience while supporting two production lines and a workforce of more than 50 personnel."
            ]
        }
    };

    const modal = document.getElementById("career-modal");
    if (!modal) return;

    const dialog = modal.querySelector(".career-modal-dialog");
    const titleElement = document.getElementById("career-modal-title");
    const companyElement = document.getElementById("career-modal-company");
    const dateElement = document.getElementById("career-modal-date");
    const dutiesElement = document.getElementById("career-modal-duties");

    const careerButtons = document.querySelectorAll("[data-career]");
    const closeButtons = modal.querySelectorAll("[data-close-career]");
    let previousTrigger = null;

    function openCareerModal(careerId, trigger) {
        const career = careerData[careerId];
        if (!career) return;

        previousTrigger = trigger;
        titleElement.textContent = career.title;
        companyElement.textContent = career.company;
        dateElement.textContent = career.date;

        dutiesElement.replaceChildren();

        career.duties.forEach(function (duty) {
            const item = document.createElement("li");
            item.textContent = duty;
            dutiesElement.appendChild(item);
        });

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("career-modal-open");
        dialog.focus();
    }

    function closeCareerModal() {
        if (!modal.classList.contains("is-open")) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("career-modal-open");
        if (previousTrigger) {
            previousTrigger.focus();
        }
    }

    careerButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const careerId = button.dataset.career;
            openCareerModal(careerId, button);
        });
    });

    closeButtons.forEach(function (button) {
        button.addEventListener("click", closeCareerModal);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeCareerModal();
        }
    });

    /* =========================================================
       7. INTERACTIVE ACCOMPLISHMENTS POPUP MODAL (3 CARDS)
    ========================================================= */

    const accomplishmentData = {
"acc-1": {
            category: "COMPLETED STATIONS",
            title: "MERALCO Utility Relocation",
            description: `
                <div class="accomplishment-mini-badge" style="width: 100%; margin-bottom: 20px; padding: 12px 16px; font-size: 0.95rem;">
                    <span class="badge-title">Completed Stations:</span>
                    <strong>7 out of 15</strong>
                    <span class="badge-percent">(46.67%)</span>
                </div>
                <p style="margin-bottom: 16px;">Successfully relocated all affected MERALCO Power Lines to give way to Station Construction.</p>
                <h4 style="margin: 16px 0 10px; font-size: 0.95rem; font-weight: 800;">Completed Station Locations:</h4>
                <ul style="display: flex; flex-direction: column; gap: 8px; padding-left: 20px; color: var(--text-secondary);">
                    <li>East Valenzuela Station and MMSP Depot</li>
                    <li>Quirino Highway Station</li>
                    <li>Tandang Sora Station</li>
                    <li>North Avenue Station</li>
                    <li>Quezon Avenue Station</li>
                    <li>Anonas Station</li>
                    <li>Camp Aguinaldo Station</li>
                </ul>
            `,
            outcome: "7 out of 15 subway stations cleared for major civil works execution."
        },
"acc-2": {
            category: "MERALCO BILLINGS",
            title: "MERALCO Billing and Charge Letters",
            description: `
                <p style="margin-bottom: 16px;">Actively Monitor and Track Progess and Processing of Meralco Charge Letters.</p>
                
                <h4 style="margin: 20px 0 12px; font-size: 0.95rem; font-weight: 800; color: var(--text);">Financial Disbursal & Processing Status:</h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px;">
                    <div style="padding: 14px; border-radius: 10px; background: var(--surface); border: 1px solid var(--border);">
                        <div style="font-size: 0.72rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 4px;">Successfully Disbursed</div>
                        <div style="font-family: 'Poppins', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--text);">₱4,747,413.56</div>
                        <div style="font-size: 0.74rem; color: var(--text-secondary); margin-top: 2px;">Completed to Meralco</div>
                    </div>
                    
                    <div style="padding: 14px; border-radius: 10px; background: var(--surface); border: 1px solid var(--border);">
                        <div style="font-size: 0.72rem; font-weight: 800; color: #d58a0a; text-transform: uppercase; margin-bottom: 4px;">Currently in Process</div>
                        <div style="font-family: 'Poppins', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--text);">₱5,062,746.98</div>
                        <div style="font-size: 0.74rem; color: var(--text-secondary); margin-top: 2px;">Active processing pipeline</div>
                    </div>
                </div>
            `,
            outcome: "Total combined financial tracking value exceeding ₱9.8M across Meralco relocation activities."
        },
"acc-3": {
            category: "TARGETS & ONGOING WORKS",
            title: "Upcoming Milestones & Active Relocations",
            description: `
                <p style="margin-bottom: 20px;">Managing active utility relocation pipelines, upcoming energization targets, station redesign adjustments, and remaining fund disbursements across strategic subway stations.</p>
                
                <h4 style="margin: 0 0 12px; font-size: 0.95rem; font-weight: 800; color: var(--text);">Active Work Orders & Targets:</h4>
                
                <ul style="display: flex; flex-direction: column; gap: 12px; padding-left: 20px; color: var(--text-secondary);">
                    <li><strong>Shaw Boulevard Station:</strong> Completion of additional work orders driven by the redesign of station entrances.</li>
                    <li><strong>Ortigas Avenue Station:</strong> Job 1B and 2A set to be energized and completed by November 15.</li>
                    <li><strong>Kalayaan Avenue Station:</strong> Finalization design for underground relocation works.</li>
                    <li><strong>BGC Station:</strong> Commencement of upcoming utility relocation works.</li>
                    <li><strong>Financial Disbursal:</strong> Processing and disbursement for remaining charge letters.</li>
                </ul>
            `,
            outcome: "Successfully handling design adjustments while driving upcoming project milestones and active station utility relocations."
        },
    };

    const accModal = document.getElementById("accomplishment-modal");
    if (!accModal) return;

    const accDialog = accModal.querySelector(".career-modal-dialog");
    const accCategory = document.getElementById("acc-modal-category");
    const accTitle = document.getElementById("acc-modal-title");
    const accDescription = document.getElementById("acc-modal-description");
    const accOutcome = document.getElementById("acc-modal-outcome");

    const accButtons = document.querySelectorAll("[data-accomplishment]");
    const closeAccButtons = accModal.querySelectorAll("[data-close-acc]");
    let previousAccTrigger = null;

    function openAccModal(accId, trigger) {
        const item = accomplishmentData[accId];
        if (!item) return;

        previousAccTrigger = trigger;
        accCategory.textContent = item.category;
        accTitle.textContent = item.title;
        accDescription.innerHTML = item.description;
        accOutcome.textContent = item.outcome;

        accModal.classList.add("is-open");
        accModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("career-modal-open");
        accDialog.focus();
    }

    function closeAccModal() {
        if (!accModal.classList.contains("is-open")) return;
        accModal.classList.remove("is-open");
        accModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("career-modal-open");
        if (previousAccTrigger) {
            previousAccTrigger.focus();
        }
    }

    accButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const accId = button.dataset.accomplishment;
            openAccModal(accId, button);
        });
    });

    closeAccButtons.forEach(function (button) {
        button.addEventListener("click", closeAccModal);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && accModal.classList.contains("is-open")) {
            closeAccModal();
        }
    });
});const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});