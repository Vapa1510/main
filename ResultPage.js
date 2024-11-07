document.addEventListener("DOMContentLoaded", () => {
    // Simulated prediction value (from Google Colab model or API)
    const predictionValue = parseInt(document.getElementById("prediction-result").textContent); // Change to 0 for non-potable water
    const predictionResult = document.getElementById("prediction-result");
    const statusMessage = document.getElementById("status-message");

    // Display Prediction result
    if (predictionValue === 1) {
        predictionResult.textContent = "Potable";
        predictionResult.style.color = "#4caf50"; // Green color for potable
        statusMessage.textContent = "The water is safe to drink!";
        statusMessage.style.color = "#4caf50"; // Green message
    } else {
        predictionResult.textContent = "Not Potable";
        predictionResult.style.color = "#f44336"; // Red color for not potable
        statusMessage.textContent = "The water is not safe to drink!";
        statusMessage.style.color = "#f44336"; // Red message
    }

    // Simulated Graph Data (from pandas profiling)
    const graphData = {
        labels: ["pH", "Turbidity", "Hardness", "Sulfates","Conductivity","Turbidity","Solids","Halomethanes","Organic Carbon"],
        datasets: [{
            label: 'Water Quality Factors',
            data: [12, 19, 3, 5], // Replace with actual data
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1
        }]
    };

    // Create the graph using Chart.js
    const ctx = document.getElementById('water-quality-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: graphData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Water Quality Analysis',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
});
