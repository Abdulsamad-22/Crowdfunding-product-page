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

    const radio = document.querySelectorAll('.js-radio');
    radio.forEach(radio => {
        radio.checked = false;
    });

    const container = document.querySelectorAll('.newContainer');
    const pledgeContainer = document.querySelectorAll(".pledge-container");

    pledgeContainer.forEach(cont => cont.classList.remove("active"));

    container.forEach((cont) => {
        cont.classList.remove("active");
        const pledgeSection = cont.querySelector(".pledge-section");
        if (pledgeSection) {
            pledgeSection.remove(); // Remove any added section
        }
    });
});

let html = '';

function makePledge() {
    html += `
        <div class="pledge-section">
            <hr class="divider">
            <div class="new">
                <p>
                    Enter your pledge
                </p>

                <div class="right-side">
                    <input class="pledge-amount" value="25" type="number" name="amount">
                    <button class="pledge-btn">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    `;

    const radio = document.querySelectorAll('.js-radio');
    const container = document.querySelectorAll('.newContainer');
    const pledgeContainer = document.querySelectorAll(".pledge-container");

    radio.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            container.forEach((cont) => {
                cont.classList.remove("active");
                const pledgeSection = cont.querySelector(".pledge-section");

                if (pledgeSection) {
                    console.log('remove');
                    pledgeSection.remove();
                }

            });

            if (btn.checked && container[index]) {
                pledgeContainer[index].classList.add('active');

                if (!container[index].querySelector(".pledge-section")) {
                    container[index].innerHTML = html;
                }

                backThisProject();
            }
        });
    });
}

makePledge();

function backThisProject() {
   setTimeout( () => {
        const pledgeBtns = document.querySelectorAll('.pledge-btn');
        const pledgeAmt = document.querySelector('.pledge-amount');
        const amountValue = pledgeAmt.value.trim();

        if (pledgeBtns.length > 0) {
            pledgeBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const index = [...pledgeBtns].indexOf(event.target);

                    console.log(`Clicked index: ${index}`);
                    if (index === 0) {
                        console.log('pledge');
                        //collectInput();
                        modal.classList.add('hidden');
                        overlay.classList.add('hidden');
                    } else if (index === 1) {
                        console.error("Pledge buttons not found!");
                        console.log('no button found');
                    } else if (index === 2) {
                        console.error("Pledge buttons not found!3");
                        console.log('no button found');
                    }
                });
            });
        }
   }, 100);
}

function collectInput() {
    let totalAmount = document.getElementById('amount-pledged');
    let backers = document.getElementById('nos-backers');
    let amountBacked = Number(totalAmount.textContent.replace(/[^0-9.]/g, ""));
    let nosBacked = Number(backers.textContent.replace(/[^0-9.]/g, ""));

    const pledgeAmt = document.querySelector('.pledge-amount');
    const amountValue = Number(pledgeAmt.value.trim());
    
    if (amountValue) {
        amountBacked += amountValue;
        nosBacked +=1;

        console.log(amountBacked);
        console.log(nosBacked);
        totalAmount.textContent = amountBacked;
        backers.textContent = nosBacked;
    }
}

const gotItBtn = document.getElementById('gotIt-btn');
const thankYou = document.getElementById('thankYou-page');
const rewardButtons = document.getElementById('reward-btn');

rewardButtons.addEventListener('click', (event) => {
        console.log('reward');
        thankYou.classList.remove('hidden');
        overlay.classList.remove('hidden');
        collectInput();
        console.log('Clicked button:', event.target);
});


setTimeout(() => {
    if (!gotItBtn.length) {
        gotItBtn.addEventListener('click', () => {
            thankYou.classList.add('hidden');
            overlay.classList.add('hidden');
        });
    }
}, 100);

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
