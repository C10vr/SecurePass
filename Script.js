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

const attackValue = {
    brute: { name: 'Brute Force', speed: '1,000,000,000 attempts/sec', ratePerSec: 1_000_000_000 },
    dict: { name: 'Dictionary Attack', speed: '100,000,000 attempts/sec', ratePerSec: 100_000_000 },
    cred: { name: 'Credential Stuffing', speed: '10,000,000 attempts/sec', ratePerSec: 10_000_000 }
};

let selectedAttack = 'brute';
let logCount = 0;

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

function addAttackLog(password, attack, crackTime, isCrackable) {
    logCount++;

    const emptyEl = document.getElementById('logEmpty');
    if (emptyEl) emptyEl.style.display = 'none';

    document.getElementById('logCount').textContent =
        logCount + ' simulation' + (logCount !== 1 ? 's' : '') + ' logged';

    const masked = password.slice(0, 2) + '*'.repeat(Math.max(password.length - 2, 3));

    const now = new Date();
    const time = now.toLocaleTimeString() + ' · ' + now.toLocaleDateString();

    const entry = document.createElement('div');
    entry.className = 'log-entry ' + (isCrackable ? 'cracked' : 'safe');

    entry.innerHTML = `
        <div class="log-entry-header">
            <div class="log-entry-title">
                <i class="fa-solid ${isCrackable ? 'fa-circle-exclamation' : 'fa-shield-halved'}"></i>
                Log #${logCount} — "${masked}" · ${isCrackable ? 'Cracked' : 'Resisted'}
            </div>
            <span class="log-entry-time">${time}</span>
        </div>
        <div class="log-entry-stats">
            <div class="log-stat">
                <span class="log-stat-label">Attack Type</span>
                <span class="log-stat-value">${attack.name}</span>
            </div>
            <div class="log-stat">
                <span class="log-stat-label">Speed</span>
                <span class="log-stat-value">${attack.speed}</span>
            </div>
            <div class="log-stat">
                <span class="log-stat-label">Crack Time</span>
                <span class="log-stat-value">${crackTime.label}</span>
            </div>
            <div class="log-stat">
                <span class="log-stat-label">Risk Level</span>
                <span class="log-stat-value ${crackTime.riskClass}">${crackTime.risk}</span>
            </div>
        </div>
    `;

    document.getElementById('logList').prepend(entry);
}

function clearLogs() {
    logCount = 0;
    document.getElementById('logCount').textContent = '0 simulations logged';
    document.getElementById('logList').innerHTML = `
        <div class="log-empty" id="logEmpty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>No simulations run yet.</p>
            <p>Run an attack simulation to see logs here.</p>
        </div>
    `;
}
function showAttack(type, clicked) {
    selectedAttack = type;

    document.querySelectorAll('.option-box').forEach(box => box.classList.remove('selected'));
    clicked.classList.add('selected');

    document.querySelectorAll('.attack-detail').forEach(card => card.style.display = 'none');
    const cardMap = { brute: 'attackCard1', dict: 'attackCard2', cred: 'attackCard3' };
    document.getElementById(cardMap[type]).style.display = 'block';

    document.getElementById('attackResult').style.display = 'none';
}

function estimateCrackTime(password, ratePerSec) {
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^A-Za-z0-9]/.test(password)) charset += 32;
    if (!charset) return { label: 'Instantly', risk: 'Critical', riskClass: 'risk-high' };

    const seconds = Math.pow(charset, password.length) / ratePerSec;

    if (seconds < 1) return { label: 'Instantly', risk: 'Critical', riskClass: 'risk-high', seconds };
    if (seconds < 60) return { label: Math.round(seconds) + ' seconds', risk: 'Critical', riskClass: 'risk-high', seconds };
    if (seconds < 3600) return { label: Math.round(seconds / 60) + ' minutes', risk: 'High', riskClass: 'risk-high', seconds };
    if (seconds < 86400) return { label: Math.round(seconds / 3600) + ' hours', risk: 'High', riskClass: 'risk-high', seconds };
    if (seconds < 2592000) return { label: Math.round(seconds / 86400) + ' days', risk: 'Medium', riskClass: 'risk-medium', seconds };
    if (seconds < 31536000) return { label: Math.round(seconds / 2592000) + ' months', risk: 'Medium', riskClass: 'risk-medium', seconds };
    if (seconds < 3.15e9) return { label: Math.round(seconds / 31536000) + ' years', risk: 'Low', riskClass: 'risk-low', seconds };
    return { label: 'Centuries+', risk: 'Very Low', riskClass: 'risk-low', seconds };
}

function runAttackSim() {
    const password = passwordInput.value;

    if (!password) {
        alert('Enter a password in the Analyze tab first.');
        return;
    }

    const attack = attackValue[selectedAttack];
    const crackTime = estimateCrackTime(password, attack.ratePerSec);

    const isCrackable = crackTime.seconds < 3.15e9; 

    const attempts = Math.min(crackTime.seconds * attack.ratePerSec, 9.99e15);

    let attemptsLabel;
    if (attempts >= 1e12) attemptsLabel = (attempts / 1e12).toFixed(1) + ' trillion';
    else if (attempts >= 1e9) attemptsLabel = (attempts / 1e9).toFixed(1) + 'B';
    else if (attempts >= 1e6) attemptsLabel = (attempts / 1e6).toFixed(1) + 'M';
    else attemptsLabel = Math.round(attempts).toLocaleString();

    document.getElementById('resAttempts').textContent = attemptsLabel;
    document.getElementById('resTime').textContent = crackTime.label;

    const bar = document.getElementById('resProgressBar');
    const pct = document.getElementById('resPercent');
    bar.style.width = '0%';
    pct.textContent = '0%';
    setTimeout(() => {
        const fill = isCrackable ? 100 : 8;
        bar.style.width = fill + '%';
        pct.textContent = fill + '%';
    }, 100);

    const banner = document.getElementById('resBanner');
    const icon = document.getElementById('resBannerIcon');
    const title = document.getElementById('resBannerTitle');
    const msg = document.getElementById('resBannerMsg');

    if (isCrackable) {
        banner.className = 'sim-banner cracked';
        icon.className = 'fa-solid fa-circle-exclamation';
        title.textContent = 'Password Cracked!';
        msg.textContent = `This password is vulnerable to ${attack.name} attacks. Consider using a longer password with more character variety.`;
    } else {
        banner.className = 'sim-banner safe';
        icon.className = 'fa-solid fa-shield-halved';
        title.textContent = 'Password Resisted!';
        msg.textContent = `This password would take ${crackTime.label} to crack using ${attack.name}. Great job!`;
    }

    document.getElementById('attackResult').style.display = 'block';

    addAttackLog(password, attack, crackTime, isCrackable);
}

window.addEventListener('load', () => {
    const firstCard = document.querySelector('.option-box');
    showAttack('brute', firstCard);
});

toggleAttack.addEventListener("click", runAttackSim);
function showTab(tabId) {

    const pages =
        document.querySelectorAll('.tab-page');

    pages.forEach(page => {
        page.style.display = 'none';
    });

    document.getElementById(tabId)
        .style.display = 'block';
}
