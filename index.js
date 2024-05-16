document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
    setupQRCodes();
    setupCarousel();
});
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('header a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupQRCodes() {
    const projectsContainer = document.querySelector('#projects .flex.flex-wrap.-m-4');
    const projects = [
        {
            title: 'AR-ОТКРЫТКА',
            qrText: 'https://projects.web-ar.studio/v2/42ee11fe83',
            url: 'ar_photo.html',
            description: 'Новогодняя открытка группы AR'
        },
        {
            title: '3-D TOUR',
            qrText: 'https://tour.panoee.com/iframe/65fc58e1fd11cb8a3b31caf1',
            url: 'https://tour.panoee.com/iframe/65fc58e1fd11cb8a3b31caf1',
            description: 'Виртуальный тур по ШКИ'
        }
    ];

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'p-4 md:w-1/2 w-full';
        projectDiv.innerHTML = `
            <div class="h-full bg-gray-200 p-8 rounded-xl flex flex-col items-center">
                <a href="${project.url}" class="text-lg text-gray-900 font-medium title-font mb-4">
                    ${project.title}
                </a>
                <div class="flex justify-center items-center w-full mb-5">
                    <canvas class="qr-code"></canvas>
                </div>
                <p class="leading-relaxed text-base">${project.description}</p>
            </div>
        `;
        projectsContainer.appendChild(projectDiv);

        const canvas = projectDiv.querySelector('.qr-code');
        if (canvas) {
            QRCode.toCanvas(canvas, project.qrText, {
                width: 128,
                height: 128
            }, error => {
                if (error) console.error('Error generating QR code:', error);
                else console.log('QR code generated!');
            });
        } else {
            console.log('Canvas not found');
        }
    });
}

function setupCarousel(interval = 3000) {
    const images = document.querySelectorAll('.carousel-image');
    let currentImageIndex = 0;

    function nextImage() {
        images[currentImageIndex].classList.add('hidden');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.remove('hidden');
    }

    images[currentImageIndex].classList.remove('hidden');
    setInterval(nextImage, interval);
}
