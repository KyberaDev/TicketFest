window.addEventListener("load", () => {
    document.querySelector(".loading").classList.add("active");
});

const backwardArrow = () => {
    if (document.referrer.includes("localhost")) window.history.back();
    else location.href = "http://localhost:3000/";
};

const closeModal = () => {
    document.querySelector(".modal").classList.add("hide");
};

const copyCode = () => {
    var code = document.getElementById("invCode");
    code.select();
    code.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(code.value);
};

const groupQR = () => {
    document.querySelector(".modal").classList.remove("hide");
};
