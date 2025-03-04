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
        overlay.classList.add('hidden');
    } else {
        menu.src = 'images/icon-close-menu.svg'
        overlay.classList.remove('hidden');
    }
});

const bookMarkBtn = document.getElementById('bookMarkBtn');
const bookmarkText = document.querySelector('.bookmark-text');
const bookmarkIcon = document.getElementById("bookmarkIcon");
const iconContainer = document.getElementById('bookmarkContainer');

bookMarkBtn.addEventListener("click", () => {
    bookmarkText.innerText = bookmarkText.innerText === "Bookmark" ? "Bookmarked" : "Bookmark";
    bookmarkText.classList.toggle("text-[#147b74]");

    // Toggle icon color
    bookmarkIcon.classList.toggle("fill-white"); 
    bookmarkIcon.classList.toggle("fill-[#c4c4c4]");

    // Toggle icon container color
    iconContainer.classList.toggle("bg-[#147b74]")
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
    
    container.forEach(cont => {
        if (cont) {
            cont.classList.add("hidden"); // Remove any added section
        }
    });
});

function makePledge() {
    const radio = document.querySelectorAll('.js-radio');
    const container = document.querySelectorAll('.newContainer');
    const pledgeContainer = document.querySelectorAll(".pledge-container");

    radio.forEach((btn, index) => {
        if (index === 3) {
            return;
        }

        btn.addEventListener('click', () => {
            const parentContainer = btn.closest(".pledge-container");

            container.forEach((cont) => {
                cont.classList.add("hidden");
            });

            const pledgeSection = parentContainer.querySelector(".newContainer");

            if (pledgeSection) {
                pledgeSection.classList.remove('hidden');
            }

            if (btn.checked && container[index]) {
                pledgeContainer[index].classList.add('active');
                backThisProject();
                setReward();
                hasExecuted = true;
            }
        });

        if (pledgeContainer[index]) {
            pledgeContainer[index].addEventListener('click', () => {
                pledgeContainer.forEach((cont) => {
                    cont.classList.remove("active");
                    pledgeContainer[index].classList.add('active');
                    btn.click();
                });
            });
        }
    });
}

makePledge();

function backThisProject() {
    let totalAmount = document.getElementById('amount-pledged');
    let backers = document.getElementById('nos-backers');
    let amountBacked = Number(totalAmount.textContent.replace(/[^0-9.]/g, ""));
    let nosBacked = Number(backers.textContent.replace(/[^0-9.]/g, ""));

   setTimeout( () => {
    const pledgeBtns = document.querySelectorAll('.pledge-btn');

        if (pledgeBtns.length > 0) {
            pledgeBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    //const index = [...pledgeBtns].indexOf(event.target);
                    const parentContainer = btn.closest(".pledge-container");
                    const input = parentContainer.querySelector('.pledge-amount');


                    if (input) {
                        const amountValue = Number(input.value.trim());

                        if (!isNaN(amountValue) && amountValue > 0) {
                            amountBacked += amountValue;
                            nosBacked += 1;

                            console.log("Total Amount Backed:", amountBacked);
                            console.log("Total Backers:", nosBacked);

                            totalAmount.textContent = `$${helperFunction(amountBacked)}`;
                            backers.textContent = helperFunction(nosBacked);

                            input.value = input.defaultValue;
                        } else {
                            console.log('Invalid input or empty value');
                        }

                        trackingProgressBar(input, amountValue);

                    } else {
                        console.log('no matching input found');
                    }

                    modal.classList.add('hidden');
                    overlay.classList.add('hidden');
                    const radio = document.querySelectorAll('.js-radio');
                    radio.forEach(radio => {
                        radio.checked = false;
                    });

                    const pledgeContainer = document.querySelectorAll(".pledge-container");
                    pledgeContainer.forEach(cont => cont.classList.remove("active"));

                    const container = document.querySelectorAll('.newContainer');
                    
                    container.forEach(cont => {
                        if (cont) {
                            cont.classList.add("hidden"); // Remove any added section
                        }
                    });
                }, { once: true });
            });
        } else {
            console.log('no matching button found');
        }
   }, 100);
}

const progressBar = document.getElementById('progress-bar');
let total = 0;

function trackingProgressBar(input, amountValue) {
    if (!progressBar) {
        console.error("Progress bar element not found!");
        return;
    }

    // if (amountBacked > 100000) {
    //     console.log('complete');
    //     return;
    // }

    if (input === '') {
        console.log('no additional backer');
    } else {
        const progress = 100 * (amountValue / 100000).toFixed(4);
        total += progress;
        console.log(total);
        
        console.log(progressBar);
        if (total > 100) total = 100; // Prevent exceeding 100%
        progressBar.style.width = `${total}%`;
    }

    if (total === 0) {
        progressBar.classList.add('hidden');
    } else if (total > 0) {
        progressBar.classList.remove('hidden');
    }
}

function setReward() {
    const gotItBtn = document.getElementById('gotIt-btn');
    const thankYou = document.getElementById('thankYou-page');
    const rewardButtons = document.querySelectorAll('.reward-btn');

    let hasExecuted = false;

    rewardButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            thankYou.classList.remove('hidden');
            overlay.classList.remove('hidden');
            console.log('Clicked button:', event.target);
        });
    });


    setTimeout(() => {
        if (!gotItBtn.length) {
            gotItBtn.addEventListener('click', () => {
                thankYou.classList.add('hidden');
                overlay.classList.add('hidden');
            });
        }
    }, 100);

    if (!backThisProject) {
        rewardButtons.forEach(btn => {
            btn.removeEventListener('click', setReward);
        });
    }  else if (backThisProject && !hasExecuted) {
        rewardButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                setReward();
                hasExecuted = true;
            });
        });
        console.log('leave');
        //setReward();
    } 
}

function helperFunction(result) {
    const noBeforeDecimal = `${result}`.indexOf('.');
    const wholeNumber = 
        noBeforeDecimal  !== -1 
            ?result.slice(0, noBeforeDecimal)
            : result;

    const decimalNumber = 
        noBeforeDecimal !== -1 ?
        result.slice(noBeforeDecimal) : '';

    let str = wholeNumber.toString();
    const groups = [];
    while(str.length > 3) {
        groups.unshift(str.slice(-3));
        str = str.slice(0, -3);
    }

    groups.unshift(str);
    str = groups.join(',');
    return str + decimalNumber;
}

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
