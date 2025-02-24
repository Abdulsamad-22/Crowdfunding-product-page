const backProjectBtn = document.querySelector('.js-btn');

backProjectBtn.addEventListener('click', () => {
    console.log('open modal');
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


        <div class="relative ">
        <hr class="border-5 border-[#f0f0f0] rounded-full">
        <hr class="border-5 border-[#3cb4ac] absolute top-0 left-0 rounded-full w-[70%]">
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