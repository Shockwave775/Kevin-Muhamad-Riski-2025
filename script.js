const portfolioItems = document.querySelector(".carousel");
const popup = document.querySelector(".popup-box")
const popupCloseBtn = popup.querySelector(".popup-close-btn");
const popupCloseIcon = popup.querySelector(".popup-close-icon");

portfolioItems.addEventListener("click", function(event) {
    if (event.target.tagName.toLowerCase() == "button") {
        const item = event.target.parentElement;
        const h3 = item.querySelector("h3").innerHTML;
        const readMoreCont = item.querySelector(".read-more-cont").innerHTML;
        popup.querySelector("h3").innerHTML = h3;
        popup.querySelector(".popup-body").innerHTML = readMoreCont;
        popupBox();

        // Lightbox
        const galleryLightbox = popup.querySelectorAll(
            ".popup-body .gallery-with-lightbox > a",
        );
        if (galleryLightbox.length > 0) {
            new SimpleLightbox(galleryLightbox);
        }

    }

})

popupCloseIcon.addEventListener("click", closePopupBox);

popup.addEventListener("click", function(event) {
    if (event.target == popup) {
        popupBox();

        setTimeout(() => {
            // Remove content.
            popup.querySelector('.popup-body').innerHTML = ''
        }, 500)
    }
})

function popupBox() {
    popup.classList.toggle("open");
}

function closePopupBox() {
    // Wait transition duration.
    setTimeout(() => {
        // Remove content.
        popup.querySelector('.popup-body').innerHTML = ''
    }, 500)

    popupBox();
}

// SWIPER
const portofolioEle = document.getElementById('portfolios')
const portofolioSliderEle = portofolioEle.querySelector('.slider__wrapper')

console.log(portofolioSliderEle)
if (portofolioSliderEle) {
    new Swiper(portofolioSliderEle, {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 12,
        navigation: {
            prevEl: "#portfolios .slider__navigation .nav-prev",
            nextEl: "#portfolios .slider__navigation .nav-next",
        },
        // autoplay: {
        //     delay: 2500
        // },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 8,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 12,
            }
        }
    })
}

// Parallax Profile
const profileOrnamentEle = document.querySelectorAll(
    ".profile-img__ornament .item",
);
if (profileOrnamentEle.length > 0) {
    document.addEventListener("mousemove", function(e) {
        profileOrnamentEle.forEach((ele) => {
            const moving = ele.dataset.moving || 1;

            const x = (e.clientX * moving) / 400;
            const y = (e.clientY * moving) / 400;

            console.log(x, e.clientX);

            ele.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}

// =====================================
// CARD CLICK → TRIGGER BUTTON (AMAN)
// =====================================
document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", function(e) {

        // Jika klik tombol → biarkan JS lama bekerja
        if (e.target.closest("button")) return;

        // Jika klik link / video → biarkan normal
        if (e.target.closest("a, video, iframe")) return;

        // Cari tombol Read More di card ini
        const btn = card.querySelector(".btn");
        if (!btn) return;

        // Trigger klik tombol
        btn.click();
    });

});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {

        // Ambil SEMUA video-container di popup
        const containers = btn
            .closest(".item-inner")
            .querySelectorAll(".video-container[data-vimeo]");

        containers.forEach(container => {
            if (container.innerHTML.trim() !== "") return;

            const id = container.dataset.vimeo;

            container.innerHTML = `
                <iframe
                    src="https://player.vimeo.com/video/${id}?autoplay=0&muted=1&controls=1&loop=0&title=0&byline=0&portrait=0"
                    allow="fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            `;
        });

    });
});