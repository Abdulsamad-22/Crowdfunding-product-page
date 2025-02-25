const backProjectBtn = document.getElementById('js-btn');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

const menu = document.getElementById('menu');
const nav = document.getElementById('nav-item');

menu.addEventListener('click', () => {
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');

    if (nav.classList.contains('hidden')) {
        menu.src = 'images/icon-hamburger.svg';
    } else {
        menu.src = 'images/icon-close-menu.svg'
    }
});

backProjectBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    console.log('open modal');
    overlay.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    console.log('close modal');
});

function makePledge() {
    const html = document.createElement('div');
    html.classList.add('pledge-container');
    html.innerHTML = `
        <hr class="divider">
        <div class="pledge-section">
            <p>
                Enter your pledge
            </p>

            <div class="right-side">
                <input class="pledge-amount" type="number" name="amount">
                <button class="pledge-btn">
                    Continue
                </button>
            </div>
        </div>
    `;

    const radio = document.querySelectorAll('.js-radio');
    const container = document.querySelectorAll('.pledge-container');

    radio.forEach((btn, index) => {
        btn.addEventListener('click', () => {

            container.forEach(container => container.classList.remove('active'));

            if (btn.checked && container[index]) {
                container[index].classList.add('active');
                console.log('here');

                container[index].appendChild(html);
            }
        });
    });
}

makePledge();

const image = document.getElementById('bg-image');
function resizeWindow() {
    if (window.innerWidth <= 768) {
        if (image) {
            image.src = 'images/image-hero-mobile.jpg';
            console.log('mobile');
        }    
    } else {
        if (image) {
            image.src = 'images/image-hero-desktop.jpg';
            console.log('desktop')
        } 
    }
}

if (image) {
    resizeWindow();

    let resizeTimer;
    window.addEventListener('resize', () => { 
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeWindow, 250)
    });
} else {
    console.log('background not found');
}
