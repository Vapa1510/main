document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const feedback = document.getElementById('feedback');
    feedback.textContent = "Thank you for submitting the survey!";
    feedback.style.color = "#28a745";
    feedback.style.animation = "fadeIn 1s ease, bounce 1s ease 0.5s";
});

function clearForm() {
    const formElements = document.querySelectorAll('#survey-form .form-input');
    formElements.forEach(input => {
        input.value = '';
    });
}


document.getElementById('survey-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Capture form data
    const formData = {
        pH: document.getElementById('pH').value,
        hardness: document.getElementById('hardness').value,
        sulfates: document.getElementById('sulfates').value,
        conductivity: document.getElementById('conductivity').value,
        solids: document.getElementById('Solids').value,
        turbidity: document.getElementById('turbidity').value,
        halomethanes: document.getElementById('Halomethanes').value,
        organicCarbon: document.getElementById('Organic Carbon').value,
        chloramines: document.getElementById('chloramines').value
    };

    // Create CSV content
    const csvHeader = 'pH,hardness,sulfates,conductivity,solids,turbidity,halomethanes,organicCarbon,chloramines\n';
    const csvRow = ${formData.pH},${formData.hardness},${formData.sulfates},${formData.conductivity},${formData.solids},${formData.turbidity},${formData.halomethanes},${formData.organicCarbon},${formData.chloramines}\n;

    const csvContent = csvHeader + csvRow;

    // Send CSV content to the backend
    try {
        const response = await fetch('http://<your_backend_url>/predict_csv_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/csv'
            },
            body: csvContent
        });

        const data = await response.json();

        // Display the result
        document.getElementById('feedback').innerHTML = `
            <h3>Prediction Result: ${data.prediction}</h3>
            <p>${data.message}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('feedback').innerHTML = '<p style="color: red;">An error occurred while fetching the result.</p>';
    }
});
