// Event listener for smooth scrolling
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Event listener for form submit
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh

  const formData = new FormData(event.target);
  let responseHTML = "";

  formData.forEach((value, key) => {
    responseHTML += `<p><strong>${
      key.charAt(0).toUpperCase() + key.slice(1)
    }:</strong> ${value}</p>`;
  });

  const responseContainer = document.getElementById("response");
  responseContainer.innerHTML = responseHTML;

  document.getElementById("myForm").reset(); // Reset form after submission
});

document.addEventListener("DOMContentLoaded", function () {
  const banners = document.querySelectorAll(".banner");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentBannerIndex = 0;
  let interval;
  let isPaused = false; // Variable untuk menandai apakah autoslide sedang di-pause

  // Fungsi untuk menampilkan banner berdasarkan index
  function showBanner(index) {
    banners.forEach((banner, i) => {
      if (i === index) {
        banner.classList.add("active");
      } else {
        banner.classList.remove("active");
      }
    });
  }

  // Fungsi untuk menampilkan banner berikutnya
  function nextBanner() {
    currentBannerIndex = (currentBannerIndex + 1) % banners.length;
    showBanner(currentBannerIndex);
  }

  // Fungsi untuk menampilkan banner sebelumnya
  function prevBanner() {
    currentBannerIndex =
      (currentBannerIndex - 1 + banners.length) % banners.length;
    showBanner(currentBannerIndex);
  }

  // Fungsi untuk memulai autoslide
  function startSlide() {
    if (!isPaused) {
      interval = setInterval(nextBanner, 3500); // Ganti interval ke 3.5 detik
    }
  }

  // Fungsi untuk menghentikan autoslide
  function stopSlide() {
    clearInterval(interval);
  }

  // Inisialisasi: tampilkan banner pertama saat halaman dimuat
  showBanner(currentBannerIndex);

  // Event listener untuk mousedown dan mouseup pada banner
  banners.forEach((banner) => {
    let isDragging = false;
    banner.addEventListener("mousedown", () => {
      isDragging = true;
      isPaused = true;
      stopSlide();
    });
    banner.addEventListener("mouseup", () => {
      isDragging = false;
      isPaused = false;
      startSlide();
    });
    banner.addEventListener("mouseleave", () => {
      if (isDragging) {
        isPaused = false;
        startSlide();
      }
    });
  });

  // Event listener untuk tombol navigasi manual
  prevBtn.addEventListener("click", () => {
    if (!isPaused) {
      isPaused = true; // Pause autoslide saat navigasi manual
      stopSlide();
      prevBanner();
      setTimeout(() => {
        isPaused = false; // Mulai kembali autoslide setelah navigasi manual
        startSlide();
      }, 1000);
    } else {
      prevBanner();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (!isPaused) {
      isPaused = true; // Pause autoslide saat navigasi manual
      stopSlide();
      nextBanner();
      setTimeout(() => {
        isPaused = false; // Mulai kembali autoslide setelah navigasi manual
        startSlide();
      }, 1000);
    } else {
      nextBanner();
    }
  });

  // Mulai autoslide
  startSlide();

  // Event listener untuk handle saat tab tidak aktif (visibility change)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      // Jika tab tidak aktif, hentikan autoslide
      stopSlide();
    } else {
      // Jika tab aktif lagi, mulai autoslide kembali jika tidak sedang di-pause
      if (!isPaused) {
        startSlide();
      }
    }
  });
});
