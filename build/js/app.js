const progressBar = step => {
    const progress = document.querySelector('.progress');
    const steps = document.querySelectorAll('.step');
    
    steps.forEach(element => {
        element.classList.remove('active');
    });

    progress.style.width = '0%';

    switch(step){
        case 1:
            steps[0].classList.add('active');

            progress.style.width = '0%';
            break;

        case 2:
            steps[0].classList.add('active');
            steps[1].classList.add('active');

            progress.style.width = '50%';
            break;

        case 3:
            steps[0].classList.add('active');
            steps[1].classList.add('active');
            steps[2].classList.add('active');

            progress.style.width = '100%';
            break;
    }
}

const steps = step => {
    switch(step){
        case 1:
            progressBar(1);
            break;
    }
}

const next = () => {

}