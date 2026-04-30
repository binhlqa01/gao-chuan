document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. XỬ LÝ ĐỒNG HỒ KỸ THUẬT SỐ */
    const hhEl = document.getElementById('hh');
    const mmEl = document.getElementById('mm');
    const ssEl = document.getElementById('ss');

    function updateClock() {
        const now = new Date();
        if (hhEl && mmEl && ssEl) {
            hhEl.innerText = now.getHours().toString().padStart(2, '0');
            mmEl.innerText = now.getMinutes().toString().padStart(2, '0');
            ssEl.innerText = now.getSeconds().toString().padStart(2, '0');
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    /* 2. TỰ ĐỘNG PHÁT NHẠC KHI NGƯỜI DÙNG TƯƠNG TÁC */
    const audio = document.getElementById('bg-music');
    if (audio) {
        const playMusic = () => {
            if (audio.paused) {
                audio.play().catch(err => console.log("Cần tương tác để phát nhạc"));
            }
            // Hủy sự kiện sau khi click lần đầu
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
