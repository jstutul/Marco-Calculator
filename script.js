var bsex = "";
var age = 0;
var weightUnit = "";
var weight = 0;
var height = 0;
var excerciseLevel = 1;
var goal = 1;
var cv = "yes";

function leftClick(button) {
    var btn = button.parentElement.querySelector(".btn");
    var otherbtn = button.parentElement.querySelector(".toggle-btn.selected");
    otherbtn.classList.remove("selected");
    btn.style.left = "0";
    button.classList.add("selected");
}

function rightClick(button) {
    var btn = button.parentElement.querySelector(".btn");
    var otherbtn = button.parentElement.querySelector(".toggle-btn.selected");
    otherbtn.classList.remove("selected");
    btn.style.left = "100px";
    button.classList.add("selected");
}
document.getElementById("btnSubmit").addEventListener("click", function (e) {
    var bsex = document
        .querySelector(".btnSex.selected")
        .getAttribute("data-val");
    var age = parseInt(document.getElementById("txtage").value, 10);
    if (age == 0) {
        setError(
            "<p style='color:red;font-size:20px;font-weight:600;'>Age Field is required.</p>"
        );
        return false;
    }
    var weightUnit = document
        .querySelector(".btnW.selected")
        .getAttribute("data-val");
    var height = parseInt(document.getElementById("txtheight").value, 10);
    if (height == 0) {
        setError(
            "<p style='color:red;font-size:20px;font-weight:600;'>Height Field is required.</p>"
        );
        return false;
    }
    var weight = parseInt(document.getElementById("txtweight").value, 10);
    if (weight == 0) {
        setError(
            "<p style='color:red;font-size:20px;font-weight:600;'>Wight Field is required.</p>"
        );
        return false;
    }
    var excercise = document.querySelector(
        'input[name="excercise"]:checked'
    ).value;
    var goal = document.querySelector('input[name="goal"]:checked').value;

    var cB = document.querySelector(".btnCB.selected").getAttribute("data-val");
    calculateMarcors(
        height,
        bsex,
        weightUnit,
        weight,
        excercise,
        age,
        goal,
        cB
    );
});

function calculateMarcors(
    height,
    bsex,
    weightType,
    weight,
    excerciseType,
    age,
    goalType,
    breastfeeding
) {
    var water = 0;
    var calories = 0;
    var carbs = 0;
    var protons = 0;
    var fats = 0;
    if (weightType == "lb") {
        weight = weight * 0.453592;
    }
    if (bsex == "m") {
        calories = weight * 10 + height * 6.25 - age * 5 + 5;
    } else {
        calories = weight * 10 + height * 6.25 - age * 5 - 161;
    }
    switch (excerciseType) {
        case "l":
            calories = Math.round(calories * 1.1);
            break;
        case "m":
            calories = Math.round(calories * 1.3);
            break;
    }

    switch (goalType) {
        case "lw":
            if (calories <= 2000) calories = Math.round(0.9 * calories);
            if (calories > 2000) calories = Math.round(0.8 * calories);
            carbs = Math.round((0.4 * calories) / 4);
            protons = Math.round((0.4 * calories) / 4);
            fats = Math.round((0.2 * calories) / 9);
            break;
        case "rp":
            carbs = Math.round((0.45 * calories) / 4);
            protons = Math.round((0.3 * calories) / 4);
            fats = Math.round((0.25 * calories) / 9);
            break;
        case "gw":
            calories += 500;
            carbs = Math.round((0.45 * calories) / 4);
            protons = Math.round((0.3 * calories) / 4);
            fats = Math.round((0.25 * calories) / 9);
            break;
    }
    if (breastfeeding === "yes") {
        calories += 300; // Increase calories for breastfeeding
    }
    setError(
        `<div class="summery"><h3>Target  Daily Caloric Intake:</h3>
            <ul>
                <li>Calories : ${calories} </li>
                <li>Carbs : ${carbs} G per day</li>
                <li>Protein: ${protons} G per day</li>
                <li>Fats: ${fats} G per day.</span></div>
            </ul>
        </div>`
    );
}

function setError(msg) {
    if (msg == "") {
        msg =
            "<p style='color:red;font-size:20px;font-weight:600;'>Please enter values for all the fields</p>";
    }
    var newDiv = document.createElement("div");
    newDiv.innerHTML = msg;
    var results = "results"; // ID of the target element
    var errortxt = document.getElementById(results);
    errortxt.appendChild(newDiv);
    errortxt.scrollIntoView({ behavior: "smooth", block: "start" });
}
