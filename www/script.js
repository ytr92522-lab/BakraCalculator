let lastResult = "";

// Photo Preview
document.getElementById("photo").addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (event) {

            const preview = document.getElementById("preview");

            preview.src = event.target.result;
            preview.style.display = "block";
        };

        reader.readAsDataURL(file);
    }
});


// Calculate Weight
function calculateWeight() {

    let name = document.getElementById("bakraName").value || "Mera Bakra";

    let breed = parseFloat(document.getElementById("breed").value);

    let gender = document.getElementById("gender").value;

    let age = parseInt(document.getElementById("age").value) || 0;

    let girth = parseFloat(document.getElementById("girth").value);

    let length = parseFloat(document.getElementById("length").value);

    let rate = parseFloat(document.getElementById("rate").value);

    if (isNaN(girth) || isNaN(length)) {

        document.getElementById("result").innerHTML =
            "Please enter Chest Girth and Body Length.";

        return;
    }

    // Weight Formula
    let weight = ((girth * girth * length) / 660) * breed;

    weight = weight.toFixed(1);

    // Feed & Water
    let feed = (weight * 0.03).toFixed(2);

    let water = (weight * 0.10).toFixed(1);

    // Price
    let priceText = "";

    let totalPrice = 0;

    if (!isNaN(rate)) {

        totalPrice = (weight * rate).toFixed(0);

        priceText = `
            Rate: Rs ${rate}/Kg<br>
            Estimated Price: Rs ${totalPrice}<br>
        `;
    }

    // Vaccine Advice
    let vaccine = "";

    if (age < 6) {

        vaccine = "Vaccine: PPR vaccine recommended.";

    } else {

        vaccine = "Vaccine: Follow regular vaccination schedule.";
    }

    lastResult = `
Bakra Name: ${name}

Gender: ${gender}
Age: ${age} Months

Weight: ${weight} Kg
Feed: ${feed} Kg/Day
Water: ${water} Litre/Day

Estimated Price: Rs ${totalPrice}

${vaccine}
`;

    document.getElementById("result").innerHTML = `
        <h2>${name}</h2>

        Gender: ${gender}<br>
        Age: ${age} Months<br><br>

        Weight: ${weight} Kg<br>
        Feed: ${feed} Kg/Day<br>
        Water: ${water} Litre/Day<br><br>

        ${priceText}

        ${vaccine}
    `;
}


// Share Result
function shareResult() {

    if (!lastResult) {

        alert("Pehle Calculate karo!");

        return;
    }

    if (navigator.share) {

        navigator.share({
            title: "Bakra Weight Calculator",
            text: lastResult
        });

    } else {

        alert("Share support available nahi hai.");
    }
}


// Copy Result
function copyResult() {

    if (!lastResult) {

        alert("Pehle Calculate karo!");

        return;
    }

    navigator.clipboard.writeText(lastResult);

    alert("Result copy ho gaya!");
}


// Clear Data
function clearData() {

    localStorage.clear();

    document.getElementById("bakraName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("girth").value = "";
    document.getElementById("length").value = "";
    document.getElementById("rate").value = "";

    document.getElementById("breed").selectedIndex = 0;
    document.getElementById("gender").selectedIndex = 0;

    document.getElementById("preview").style.display = "none";

    document.getElementById("result").innerHTML = "";

    lastResult = "";

    alert("Data clear ho gaya!");
}


// Auto Save
const inputs = [
    "bakraName",
    "breed",
    "gender",
    "age",
    "girth",
    "length",
    "rate"
];

inputs.forEach(id => {

    const el = document.getElementById(id);

    if (el && localStorage.getItem(id)) {

        el.value = localStorage.getItem(id);
    }

    if (el) {

        el.addEventListener("input", () => {

            localStorage.setItem(id, el.value);
        });

        el.addEventListener("change", () => {

            localStorage.setItem(id, el.value);
        });
    }
});
