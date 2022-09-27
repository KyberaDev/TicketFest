let currentStep = 3;
let totalPrice = 0;

const moneyBtn = document.querySelector(".money");
const percentBtn = document.querySelector(".percent");

const progressBar = (step) => {
    const progress = document.querySelector(".progress");
    const steps = document.querySelectorAll(".step");

    steps.forEach((element) => {
        element.classList.remove("active");
    });

    progress.style.width = "0%";

    switch (step) {
        case 1:
            steps[0].classList.add("active");

            progress.style.width = "0%";
            break;

        case 2:
            steps[0].classList.add("active");
            steps[1].classList.add("active");

            progress.style.width = "50%";
            break;

        case 3:
            steps[0].classList.add("active");
            steps[1].classList.add("active");
            steps[2].classList.add("active");

            progress.style.width = "100%";
            break;
    }
};

const steps = (step) => {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    switch (step) {
        case 1:
            progressBar(1);
            document.getElementById("step1").style.display = "flex";
            break;
        case 2:
            progressBar(2);
            document.getElementById("step2").style.display = "flex";
            break;
        case 3:
            progressBar(3);
            document.getElementById("step3").style.display = "flex";
            totalPrice = document.getElementById("ticketPrice").value;
            document.getElementById("totalPrice").textContent = totalPrice;
            calculateBalance();
            break;
    }
};

const changeBalanceType = (type) => {
    const balanceType = document.querySelectorAll(".balanceType");

    moneyBtn.classList.remove("activeBalance");
    percentBtn.classList.remove("activeBalance");

    switch (type) {
        case "money":
            document.querySelector(".money").classList.add("activeBalance");
            balanceType.forEach((element) => {
                element.textContent = "$";
            });
            break;
        case "percent":
            document.querySelector(".percent").classList.add("activeBalance");
            balanceType.forEach((element) => {
                element.textContent = "%";
            });
            break;
    }
    calculateBalance();
};

const calculateBalance = () => {
    const users = document.querySelectorAll(".user").length;
    const inputs = document.querySelectorAll(".input_balance");

    if (moneyBtn.classList.contains("activeBalance")) {
        type = "money";
    } else {
        type = "percent";
    }

    switch (type) {
        case "money":
            let amount = totalPrice / users;
            inputs.forEach((element) => {
                element.value = amount;
            });
            break;

        case "percent":
            let percent = 100 / users;
            inputs.forEach((element) => {
                element.value = percent;
            });
            break;
    }
};

const back = () => {
    currentStep--;
    steps(currentStep);
};

const next = () => {
    currentStep++;
    steps(currentStep);
};

steps(currentStep);
