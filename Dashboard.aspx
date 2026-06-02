<!DOCTYPE html>
<html lang ="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecurePass</title>
    <link rel="stylesheet" href="Styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"></script>
</head>
<body>
<div class="container">
    <header>
        <div class="logo">
            <i class="fa-solid fa-shield-halved"></i>
            <div>
                <h1>SecurePass</h1>
                <p>Enterprise Password Security Platform</p>
            </div>
        </div>
        <button class="theme-btn" id="themeToggle">
            <i class="fa-solid fa-moon"></i>
        </button>
    </header>

    <section class="stats">
        <div class="card">
            <span>Analyzed Today</span> <!-- Just an example of real time data -->
            <h2>247</h2>
            <i class="fa-solid fa-lock"></i>
        </div>
        <div class="card">
            <span>Avg. Strength</span>
            <h2 class="green">Strong</h2>
            <i class="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <div class="card">
            <span>Breaches Found</span> <!-- Soon to be implemented -->
            <h2 class="red">12</h2>
            <i class="fa-solid fa-shield"></i>
        </div>
    </section>
</div>

<section class="panel">
    <div class="tabs">
        <button class="tab"
                onclick="showTab('analyzePage')">
            Analyze
        </button>

        <button class="tab"
                onclick="showTab('generatePage')">
            Generate
        </button>

        <button class="tab"
                onclick="showTab('logPage')">
            Logs
        </button>

         <button class="tab"
                onclick="showTab('attackPage')">
            Attack Sim
        </button>

    </div>
    <!-- Analyze panel-->
    <div id="analyzePage" class="tab-page">

        <div class="content">
            <h2>Password Security Analysis</h2>
            <div class="password-box">
                <input type="password" id="password" placeholder= "Enter password to analyze...">             
                <i class="fa-solid fa-eye"id="togglePassword"></i>
            </div>
            <div class="strength">
                <div id="strengthBar"></div>
            </div>
                <p id="strengthText">
                    Enter a password to check how strong it is!
                </p>
            <h3>Breach Detection</h3>
            <button type="button" class="breach-btn" id="toggleBreach" disabled> Check for Data Breaches </button>

            <div class="statusCard" id="breachText" hidden>
                <i class="fa-solid fa-shield"></i>
                <div class="text-container">
                    <h3>No Breaches Found</h3>
                    <p>Password not found in known data breaches</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Generate panel -->
    <div id="generatePage"
         class="tab-page"
         style="display:none">

        <div class="content">
                <h2>Secure Password Generator</h2>

                <!-- to generate password for user -->
                <div class="generator-card">
                    <label>Generated Password</label>
                    <div class="generated-box">
                        <input type="text" id="generatedPassword" readonly value="Click generate to create a secure password...">
                        <button id="copyBtn">   
                            Copy
                        </button>
                    </div>
                </div>

                <!-- length slider -->
                <div class="generator-card">
                    <div class="slider-header">
                        <span>Password Length</span>
                        <span id="lengthValue">16 Characters</span>
                    </div>
                    <input type="range" id="lengthSlider" min="8" max="32" value="16">
                </div>

                <!-- the checkbox options -->
                <div class="options-grid">
                    <label class="option-box">
                        <input type="checkbox" id="uppercase" checked>
                        Uppercase (A-Z)
                    </label>
                    <label class="option-box">
                        <input type="checkbox" id="lowercase" checked>
                        Lowercase (a-z)
                    </label>
                    <label class="option-box">
                        <input type="checkbox" id="numbers" checked>
                        Numbers (0-9)
                    </label>
                    <label class="option-box">
                        <input type="checkbox" id="symbols" checked>
                        Symbols (!@#$)
                    </label>
                </div>

                <button id="generateBtn" class="generate-btn">
                    Generate Secure Password
                </button>
            </div>
        </div>

    <!-- Log panel -->
    <div id="logPage" class="tab-page" style="display:none">        
        <div class="content">
            <h2>Threat Logs</h2>

            <!-- to view threat logs -->
            <div class="generator-card">
                <div class="generated-box">
                    <label id="logLabel"><b>Log 1.0</b></label>
                    There are no current breaches...
                </div>
            </div>
        </div>
    </div>

    <!--Attack Sim panel -->
    <div id="attackPage" class="tab-page" style="display:none">        
        <div class="content">
        <h2>Attack Simulator Lab</h2>

        <!-- to show for education purposes -->
        <div class="generator-card">
            <label>Enter a password in the <b>Analyze</b> tab first, then simulate common attack methods here.</label>
            <div class="generated-box">
                <i class="fa-solid fa-shield"></i>
                <h4 id="log">This is for educational purposes only. No actual attacks are performed</h4>
            </div>
        </div>
        <div class="generator-card">
              <div class="options-grid">
                    <label class="option-box">
                        <input type="radio" id="chip1" name="category" value="brute" checked>
                        <h3>Brute Force</h3>
                        <p>1B attempts/sec</p>
                    </label>
                    <label class="option-box">
                        <input type="radio" id="chip2" name="category" value="dict"> 
                        <h3>Dictionary</h3>
                        <p>100M attempts/sec</p>
                    </label>
                    <label class="option-box">
                        <input type="radio" id="chip3" name="category" value="cred">
                        <h3>Credential Stuffing</h3>
                        <p>10M attempts/sec</p>
                    </label>
            </div>
        </div>
        <div class="generator-card" id="card1" hidden>
        <label>Enter a password in the <b>Analyze</b> tab first, then simulate common attack methods here.</label>
            <div class="generated-box">
                <i class="fa-solid fa-shield"></i>
                <h4 id="log">This is for educational purposes only. No actual attacks are performed</h4>
            </div>
        </div>
        <div class="generator-card" id="card2" hidden>
            <label>Enter a password in the <b>Analyze</b> tab first, then simulate common attack methods here.</label>
            <div class="generated-box">
                <i class="fa-solid fa-shield"></i>
                <h4 id="log">This is for educational purposes only. No actual attacks are performed</h4>
            </div>
        </div>
        <div class="generator-card"id="card3" hidden>
            <label>Enter a password in the <b>Analyze</b> tab first, then simulate common attack methods here.</label>
            <div class="generated-box">
                <i class="fa-solid fa-shield"></i>
                <h4 id="log">This is for educational purposes only. No actual attacks are performed</h4>
            </div>
        </div>
    </div>
</div>
</section>


    <section>
       <div class="features">
           <div class="feat-card">
               <i class="fa-solid fa-shield"></i>
               <div>
                   <h3>Security First</h3>
                   <p>
                       Learn how to create strong passwords the resist modern attacks
                   </p>
               </div>
           </div>
           <div class="feat-card">
               <i class="fa-solid fa-lock"></i>
               <div>
                   <h3>Breach Awareness</h3>
                   <p>
                       Check if your passwords appear in known data breaches
                   </p>
               </div>
           </div>
           <div class="feat-card">
               <i class="fa-solid fa-key"></i>
               <div>
                   <h3>Best Practices</h3>
                   <p>
                       Generate secure passwords with customizable options
                   </p>
               </div>
           </div>
       </div>
   </section>
<script src="script.js"></script>
</body>
</html>
