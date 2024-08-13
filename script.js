document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('bmiResult');
    const bmiProgressBar = document.getElementById('bmiProgressBar');
    const calculateBtn = document.getElementById('calculateBtn');

    calculateBtn.addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100;

        if (weight && height) {
            const bmi = (weight / (height * height)).toFixed(2);
            result.textContent = `Your BMI is ${bmi}`;

            let progressWidth = 0;
            let colorClass = '';
            let adviceText = '';
            if (bmi < 18.5) {
                progressWidth = 25; // Start closer to the beginning
                colorClass = 'bg-info';
                adviceText = 'You are underweight. You should eat more and consult with a healthcare provider for guidance.';
            } else if (bmi < 24.9) {
                progressWidth = 50; // Centered
                colorClass = 'bg-success';
                adviceText = 'You have a normal weight. Maintain a balanced diet and regular exercise.';
            } else if (bmi < 29.9) {
                progressWidth = 75; // Near the end
                colorClass = 'bg-warning';
                adviceText = 'You are overweight. Consider a balanced diet and regular exercise to manage your weight.';
            } else {
                progressWidth = 100; // Fully filled
                colorClass = 'bg-danger';
                adviceText = 'You are obese. It is advisable to consult with a healthcare provider for a personalized plan.';
            }

            bmiProgressBar.style.width = `${progressWidth}%`;
            bmiProgressBar.classList.remove('bg-info', 'bg-success', 'bg-warning', 'bg-danger');
            bmiProgressBar.classList.add(colorClass);


            speakAdvice(adviceText);
            
            Swal.fire({
                title: `Your BMI is ${bmi}`,
                text: adviceText,
                icon: 'info',
                confirmButtonText: 'OK'
            })
        } else {
            result.textContent = 'Please enter valid values for weight and height.';
        }
    });

    function speakAdvice(advice) {
        const utterance = new SpeechSynthesisUtterance(advice);
        speechSynthesis.speak(utterance);
        return null;
    }
});
