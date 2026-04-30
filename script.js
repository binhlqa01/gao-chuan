document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. XỬ LÝ ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN) TỚI 10/05/2026 */
    const ddEl = document.getElementById('dd');
    const hhEl = document.getElementById('hh');
    const mmEl = document.getElementById('mm');
    const ssEl = document.getElementById('ss');

    // Mốc thời gian dự kiến đón bé Gạo: 0h00 ngày 10/05/2026
    const targetDate = new Date("2026-05-10T00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Nếu vẫn còn thời gian đếm ngược
        if (distance >= 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (ddEl) ddEl.innerText = days.toString().padStart(2, '0');
            if (hhEl) hhEl.innerText = hours.toString().padStart(2, '0');
            if (mmEl) mmEl.innerText = minutes.toString().padStart(2, '0');
            if (ssEl) ssEl.innerText = seconds.toString().padStart(2, '0');
        } else {
            // Khi thời gian đã điểm (Đã qua ngày 10/05)
            if (ddEl) ddEl.innerText = "00";
            if (hhEl) hhEl.innerText = "00";
            if (mmEl) mmEl.innerText = "00";
            if (ssEl) ssEl.innerText = "00";
        }
    }
    
    // Khởi chạy ngay lập tức và đếm ngược mỗi giây
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* 2. TỰ ĐỘNG PHÁT NHẠC KHI NGƯỜI DÙNG TƯƠNG TÁC */
    const audio = document.getElementById('bg-music');
    if (audio) {
        const playMusic = () => {
            if (audio.paused) {
                audio.play().catch(err => console.log("Cần tương tác để phát nhạc"));
            }
            ['click', 'scroll', 'touchstart'].forEach(evt => 
                document.removeEventListener(evt, playMusic)
            );
        };

        ['click', 'scroll', 'touchstart'].forEach(evt => 
            document.addEventListener(evt, playMusic, { once: true })
        );
    }

    /* 3. HIỆU ỨNG CUỘN TRANG (FADE-IN MƯỢT MÀ) */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.info-card, .heart-frame, .gallery-img, .ratio');
    
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        scrollObserver.observe(el);
    });
});
