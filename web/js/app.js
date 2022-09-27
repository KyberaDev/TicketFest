window.addEventListener("load", () => {
    document.querySelector(".loading").classList.add("active");
});

const backwardArrow = () => {
    if (document.referrer.includes("localhost")) window.history.back();
    else location.href = "http://localhost:3000/";
};
// const progressBar = step => {
//     const progress = document.querySelector('.progress');
//     const steps = document.querySelectorAll('.step');

//     steps.forEach(element => {
//         element.classList.remove('active');
//     });

//     progress.style.width = '0%';

//     switch(step){
//         case 1:
//             steps[0].classList.add('active');

//             progress.style.width = '0%';
//             break;

//         case 2:
//             steps[0].classList.add('active');
//             steps[1].classList.add('active');

//             progress.style.width = '50%';
//             break;

//         case 3:
//             steps[0].classList.add('active');
//             steps[1].classList.add('active');
//             steps[2].classList.add('active');

//             progress.style.width = '100%';
//             break;
//     }
// }

// const steps = step => {
//     switch(step){
//         case 1:
//             progressBar(1);
//             break;
//     }
// }

// const modalMessage = async (type, icon, message) => {
//     fetch('/modules/modalMessage.php', {
//         method: 'POST',
//         body: JSON.stringify({
//             type: type,
//             icon: icon,
//             message: message,
//         })
//     })
//     .then(response => response.json())
//     .then(data => { console.log("🚀 ~ file: app.js ~ line 53 ~ modalMessage ~ data", data)})
//     .catch(err => { console.log("🚀 ~ file: app.js ~ line 54 ~ modalMessage ~ err", err)});
// }

// document.getElementById('next-btn').addEventListener('click', function() {
//     modalMessage(0, 'fa-regular fa-circle-check', 'Se ha creado el ticket correctamente.');
// })
