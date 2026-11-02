// DOM Elements
const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");
const phoneLink = document.getElementById("phoneLink");
const heading = document.getElementById("heroHeading");
const featureGrid = document.getElementById("featureGrid");
const nav = document.getElementById("nav");
const siteHeader = document.querySelector(".site-header");
const heroSubtext = document.getElementById("heroSubtext");
const ctaText = document.getElementById("ctaText");

// Services Data
const services = [
  {
    id: 1,
    title: "Classic Haircut",
    text: "Timeless cuts with modern precision tailored to your style.",
    image: "assets/images/feature-1.jpg",
    alt: "Classic Haircut",
    price: 25,
    popular: true,
    details: [
      "Consultation with your barber before the cut begins.",
      "Hair sectioning and shape-up based on your preferred style.",
      "Professional clippers, trimmers, and shears used for precision.",
      "Neckline cleanup and finishing touches included.",
      "Light styling product applied for a clean final look.",
    ],
  },
  {
    id: 2,
    title: "Beard Trim",
    text: "Shape and line-up your beard for a clean, sharp finish.",
    image: "assets/images/feature-2.jpg",
    alt: "Beard Trim",
    price: 15,
    popular: false,
    details: [
      "Beard assessment and shaping based on face structure.",
      "Line-up around cheeks, jawline, and neckline.",
      "Trimmers and detail tools used for crisp edges.",
      "Conditioning beard product may be applied for softness.",
      "Final symmetry check for a polished finish.",
    ],
  },
  {
    id: 3,
    title: "Straight Razor Shave",
    text: "Hot towel treatment with a smooth traditional shave.",
    image: "assets/images/feature-3.jpg",
    alt: "Straight Razor Shave",
    price: 30,
    popular: true,
    details: [
      "Hot towel prep to soften facial hair and open pores.",
      "Premium shaving cream or lather applied to protect the skin.",
      "Straight razor shave performed with careful detailing.",
      "Aftershave or soothing skin product applied after service.",
    ],
  },
  {
    id: 4,
    title: "Fade & Style",
    image: "assets/images/feature-4.jpeg",
    alt: "Fade Haircut",
    text: "A clean face with finishing detail for sharp, modern look.",
    price: 35,
    popular: false,
    details: [
      "Style consultation before clipper work begins.",
      "Fade blended to your preferred level and finish.",
      "Detailing around temples, neckline, and beard area if needed.",
      "Scissors and clipper-over-comb may be used for texture.",
      "Styling product added to complete the final look.",
    ],
  },
  {
    id: 5,
    title: "Kids Haircut",
    image: "assets/images/feature-1.jpg",
    alt: "Kids Haircut",
    text: "Clean, comfortable haircut services for younger clients.",
    price: 20,
    popular: false,
    details: [
      "Simple consultation with child and parent if needed.",
      "Age-appropriate haircut with comfort in mind.",
      "Careful clipper and scissor work for a clean finish.",
      "Light cleanup around the neckline and ears.",
      "Styled neatly before leaving the chair.",
    ],
  },
  {
    id: 6,
    title: "Head Shave",
    image: "assets/images/feature-2.jpg",
    alt: "Head Shave",
    text: "Smooth head shave with classic barbershop treatment.",
    price: 28,
    popular: true,
    details: [
      "Scalp prep with warm towel treatment.",
      "Protective shave product applied before razor work.",
      "Close shave performed for a smooth finish.",
      "Scalp cleaned and checked for even consistency.",
      "Moisturizing scalp product applied after the shave.",
    ],
  },
];

// Navigation Data
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#features" },
  { label: "Book", href: "#cta" },
  { label: "Contact", href: "#footer" },
];

// Hours Data
const businessHours = [
  { day: "Monday", open: 9, close: 19 },
  { day: "Tuesday", open: 9, close: 19 },
  { day: "Wednesday", open: 9, close: 19 },
  { day: "Thursday", open: 9, close: 19 },
  { day: "Friday", open: 9, close: 19 },
  { day: "Saturday", open: 10, close: 17 },
  { day: "Sunday", open: 0, close: 0 },
];

// Modal Elements
const serviceModal = document.getElementById("serviceModal");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalPrice = document.getElementById("serviceModalPrice");
const serviceModalList = document.getElementById("serviceModalList");

// Open / Closed Logic
const checkIfOpen = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();

  const schedule =
    currentDay === 0 ? businessHours[6] : businessHours[currentDay - 1];

  if (schedule.open === 0 && schedule.close === 0) {
    updateSubtext("We are closed today. Book now for your next sharp look!");
    return;
  }

  if (currentHour >= schedule.open && currentHour < schedule.close) {
    updateSubtext(
      "We're open right now -- walk-ins welcome, appointments recommended.",
    );
  } else {
    updateSubtext(
      "We're currently closed, but you can still book your next appointment!",
    );
  }
};

// Modal Logic
const openServiceModal = (serviceId) => {
  if (
    !serviceModal ||
    !serviceModalTitle ||
    !serviceModalPrice ||
    !serviceModalList
  ) {
    return;
  }

  const selectedService = services.find(
    (service) => service.id === Number(serviceId),
  );

  if (!selectedService) return;

  serviceModalTitle.textContent = selectedService.title;
  serviceModalPrice.textContent = `$${selectedService.price}`;

  serviceModalList.innerHTML = selectedService.details
    .map((detail) => `<li>${detail}</li>`)
    .join("");

  serviceModal.classList.add("is-open");
  serviceModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeServiceModal = () => {
  if (!serviceModal) return;

  serviceModal.classList.remove("is-open");
  serviceModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

// Helpers / Functions
const setCurrentyear = () => {
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

const formatHour = (hour) => {
  if (hour === 0) return "Closed";
  if (hour === 12) return "12PM";
  if (hour > 12) return `${hour - 12}PM`;
  return `${hour}AM`;
};

const handleHeaderOnScroll = () => {
  if (!siteHeader) return;

  siteHeader.classList.toggle("is-scrolled", window.scrollY > 10);
};

let isMenuOpen = false;

const toggleMobileMenu = () => {
  if (!mobileMenu) return;

  isMenuOpen = !isMenuOpen;
  mobileMenu.classList.toggle("is-open", isMenuOpen);
};

const closeMobileMenu = () => {
  if (!mobileMenu) return;

  mobileMenu.classList.remove("is-open");
  isMenuOpen = false;
};

const updateHeadingText = (newText) => {
  if (heading) {
    heading.textContent = newText;
  }
};

const updateSubtext = (newText) => {
  if (heroSubtext) {
    heroSubtext.textContent = newText;
  }
};

// Render Services
const renderFeatures = () => {
  if (!featureGrid) return;

  featureGrid.innerHTML = services
    .map(
      (service) => `
        <article class="feature-card">
          <img
            src="${service.image}"
            alt="${service.alt}"
            class="feature-img"
          />

          <h3 class="feature-title">${service.title}</h3>
          <p class="feature-text">${service.text}</p>
          <p class="feature-price">$${service.price}</p>

          <button
            type="button"
            class="btn btn-secondary service-details-btn"
            data-service-id="${service.id}"
            aria-haspopup="dialog"
            aria-controls="serviceModal"
          >
            View Details
          </button>
        </article>
      `,
    )
    .join("");
};

// Render Navigation
const renderNavigation = () => {
  if (nav) {
    nav.innerHTML = navLinks
      .map((link) =>
          `<a href="${link.href}" class="nav-link">${link.label}</a>`,
      )
      .join("");
  }

  if (mobileMenu) {
    mobileMenu.innerHTML = navLinks
      .map(
        (link) =>
          `<a href="${link.href}" class="mobile-link">${link.label}</a>`,
      )
      .join("");
  }
};

// Event Listeners
if (menuBtn) {
  menuBtn.addEventListener("click", toggleMobileMenu);
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      closeMobileMenu();
    }
  });
}

if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    const bookingSection = document.getElementById("cta");

    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }

    updateHeadingText("Choose your date and time below.");
  });
}

if (callBtn) {
  callBtn.addEventListener("click", () => {
    window.location.href = `tel:${shopInfo.phoneRaw}`;
  });
}

if (featureGrid) {
  featureGrid.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".service-details-btn");

    if (!clickedButton) return;

    openServiceModal(clickedButton.dataset.serviceId);
  });
}

if (serviceModalClose) {
  serviceModalClose.addEventListener("click", closeServiceModal);
}

if (serviceModalOverlay) {
  serviceModalOverlay.addEventListener("click", (event) => {
    if (event.target === serviceModalOverlay) {
      closeServiceModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeServiceModal();
  }
});

window.addEventListener("scroll", handleHeaderOnScroll);

// Initial page setup
setCurrentyear();
renderFeatures();
renderNavigation();
handleHeaderOnScroll();
checkIfOpen();