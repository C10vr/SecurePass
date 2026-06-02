const passwordInput =
    document.getElementById("password");

const strengthBar =
    document.getElementById("strengthBar");

const strengthText =
    document.getElementById("strengthText");

const togglePassword =
    document.getElementById("togglePassword");

const themeToggle =
    document.getElementById("themeToggle");

const toggleBreach =
    document.getElementById("toggleBreach");

const toggleAttack =
    document.getElementById("toggleAttack");

const breachText =
    document.getElementById("breachText");

const slider =
    document.getElementById("lengthSlider");

const lengthValue =
    document.getElementById("lengthValue");

const attackChip1 =
    document.getElementById("attackCard1");

const attackChip2 =
    document.getElementById("attackCard2");

const attackChip3 =
    document.getElementById("attackCard3");

const attackCard1 =
    document.getElementById("attackCard1");

const attackCard2 =
    document.getElementById("attackCard2");

const attackCard3 =
    document.getElementById("attackCard3");

slider.addEventListener("input", () => {

    lengthValue.innerText =
        slider.value + " Characters";

});

document
    .getElementById("generateBtn")
    .addEventListener("click", generatePassword);

function generatePassword() { // for generate panel

    const length =
        parseInt(slider.value);

    let chars = "";

    if (document.getElementById("uppercase").checked) // checking the capital letter alphabets
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (document.getElementById("lowercase").checked) // checking the lowercased alphabets
        chars += "abcdefghijklmnopqrstuvwxyz";

    if (document.getElementById("numbers").checked) // checking number
        chars += "0123456789";

    if (document.getElementById("symbols").checked) // checking special symbols
        chars += "!@#$%^&*()_+-=[]{}";

    if (chars === "") {
        alert("Select at least one option");
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {

        const random =
            Math.floor(Math.random() * chars.length);

        password += chars[random];
    }

    document
        .getElementById("generatedPassword")
        .value = password;
}

themeToggle.addEventListener("click", () => { //changing background theme color and icon

    document.body.classList.toggle("light-mode");

    const icon =
        themeToggle.querySelector("i");

    if (document.body.classList.contains("light-mode")) {
        icon.className = "fa-solid fa-sun"; // changing icon
    }
    else {
        icon.className = "fa-solid fa-moon";
    }

});


passwordInput.addEventListener("input", () => { // for analyze panel
    const password = passwordInput.value;

    toggleBreach.disabled = password.length === 0;

    let strength = 0;

    if (password.length > 7)
        strength++;

    if (/[A-Z]/.test(password))
        strength++;

    if (/[0-9]/.test(password))
        strength++;

    if (/[^A-Za-z0-9]/.test(password))
        strength++;

    switch (strength) {

        case 1:
            strengthBar.style.width = "25%";
            strengthBar.style.background = "#ef4444"; //Red
            strengthText.innerText = "Weak";
            break;

        case 2:
            strengthBar.style.width = "50%";
            strengthBar.style.background = "#f59e0b"; //Orange
            strengthText.innerText = "Moderate";
            break;

        case 3:
            strengthBar.style.width = "75%";
            strengthBar.style.background = "#22c55e"; //Yellow
            strengthText.innerText = "Strong";
            break;

        case 4:
            strengthBar.style.width = "100%";
            strengthBar.style.background = "#10b981"; //Green
            strengthText.innerText = "Very Strong";
            break;

        default:
            strengthBar.style.width = "0%";
            strengthText.innerText = "Entering a password...";
    }

});

togglePassword.addEventListener("click", function (){  //this function is to switch the password inputed by user into plaintext 
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        togglePassword.className = 'class="fa-solid fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        togglePassword.className = 'fa-solid fa-eye';
    }
});

toggleBreach.addEventListener('click', () => {
    breachText.removeAttribute('hidden');
    // breachText.classList.toggle('hidden');
});

attackChip1.addEventListener('click', () => {
    attackCard2.removeAttribute('hidden');
    attackCard3.removeAttribute('hidden');
    attackCard1.classList.toggle('hidden');
});

attackChip2.addEventListener('click', () => {
    attackCard1.removeAttribute('hidden');
    attackCard3.removeAttribute('hidden');
    attackCard2.classList.toggle('hidden');
});

attackChip3.addEventListener('click', () => {
    attackCard2.removeAttribute('hidden');
    attackCard1.removeAttribute('hidden');
    attackCard3.classList.toggle('hidden');
});

function showTab(tabId) {

    const pages =
        document.querySelectorAll('.tab-page');

    pages.forEach(page => {
        page.style.display = 'none';
    });

    document.getElementById(tabId)
        .style.display = 'block';
}
