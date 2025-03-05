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

primaryCta();
modalFun();
makePledge();


function primaryCta() {
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

    // Opens the back this project page
    backProjectBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        console.log('open modal');
        overlay.classList.remove('hidden');
    });
}

function modalFun() {
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
}

function makePledge() {
    const radio = document.querySelectorAll('.js-radio');
    const container = document.querySelectorAll('.newContainer');
    const pledgeContainer = document.querySelectorAll(".pledge-container");

    radio.forEach((btn, index) => {
        // Skips all functionalities for radio button 4
        if (index === 3) {
            return;
        }

        btn.addEventListener('click', () => {
            const parentContainer = btn.closest(".pledge-container");

            container.forEach((cont) => {
                cont.classList.add("hidden");
            });

            const pledgeSection = parentContainer.querySelector(".newContainer");

            // Render the pledge section by removing hidden class
            if (pledgeSection) {
                pledgeSection.classList.remove('hidden');
            }

            // Assign functionalities to corresponding radio button clicked
            if (btn.checked && container[index]) {
                pledgeContainer[index].classList.add('active');
                backThisProject();
                //setReward();
                //hasExecuted = true;
            }
        });

         // Assign functionalities to corresponding container clicked
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

function backThisProject() {
    let totalAmount = document.getElementById('amount-pledged');
    let backers = document.getElementById('nos-backers');
    let amountBacked = Number(totalAmount.textContent.replace(/[^0-9.]/g, ""));
    let nosBacked = Number(backers.textContent.replace(/[^0-9.]/g, ""));

    // Gets page only after it is rendered in the DOM
   setTimeout( () => {
    const pledgeBtns = document.querySelectorAll('.pledge-btn');

        if (pledgeBtns.length > 0) {
            pledgeBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    //const index = [...pledgeBtns].indexOf(event.target);
                    const parentContainer = btn.closest(".pledge-container");
                    const input = parentContainer.querySelector('.pledge-amount');

                    if (input) {
                        // Get value, default to 0 if empty or invalid
                        const inputValue = input.value.trim();
                        const amountValue = inputValue === '' ? 0 : Number(inputValue);

                        if (isNaN(amountValue)) {
                            console.log('Invalid input: Not a number');
                            return;
                        }

                        if (amountValue > 0) {
                            amountBacked += amountValue;
                            nosBacked += 1;

                            console.log("Total Amount Backed:", amountBacked);
                            console.log("Total Backers:", nosBacked);

                            // Update displays
                            totalAmount.textContent = `$${helperFunction(amountBacked)}`;
                            backers.textContent = helperFunction(nosBacked);

                             //input.value = input.defaultValue;
                        } else if (inputValue === '') {
                            console.log('Empty input accepted as 0');
                        } else {
                            console.log('Invalid amount: Must be greater than 0');
                        }
                    
                        trackingProgressBar(input, amountValue);
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

let total = 89.914;
function trackingProgressBar(input, amountValue) {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
        console.error("Progress bar element not found!");
        return;
    }

    if (input === '') {
        console.log('no additional backer');
    } else {
        // Calculates the percentage of the pledge and updates the bar
        const maxAmt = 100000;
        const progress = Number((100 * (amountValue / maxAmt)));

        total += progress;
        
        //total = newTotal > 100 ? 100 : newTotal;
        console.log(progressBar);
        progressBar.style.width = `${total}%`;
    }
}

setReward();

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


    document.addEventListener("DOMContentLoaded", function () {
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

// Helper function for number formatting
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

// Helper function for updating right image for all screen sizes
const image = document.getElementById('bg-image');
function resizeWindow() {
    if (window.innerWidth <= 768) {
        if (image) {
            image.src = 'images/image-hero-mobile.jpg';
        }    
    } else {
        if (image) {
            image.src = 'images/image-hero-desktop.jpg';
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
