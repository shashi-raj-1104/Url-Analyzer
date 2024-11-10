// script.js

async function analyzeUrl() {
    const url = document.getElementById("urlInput").value;
    const numInput = document.getElementById("numInput").value;
    const n = numInput ? parseInt(numInput) : 10;  // Use 10 if numInput is empty
    const resultTable = document.getElementById("resultTable");
    const resultBody = document.getElementById("resultBody");
    const errorMessage = document.getElementById("errorMessage");

    // Clear previous results and error messages
    resultBody.innerHTML = '';
    errorMessage.textContent = '';
    resultTable.style.display = 'none';

    if (!url) {
        errorMessage.textContent = "Please enter a URL.";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, n : 10 })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Populate the table with word frequency results
            data.forEach(({ word, count }) => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${word}</td><td>${count}</td>`;
                resultBody.appendChild(row);
            });
            resultTable.style.display = 'table';
        } else {
            throw new Error(data.message || "Error analyzing URL");
        }
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
