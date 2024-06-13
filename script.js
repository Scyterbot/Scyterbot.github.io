document.getElementById('ratingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    var playerName = document.getElementById('playerName').value;
    var playerRating = parseInt(document.getElementById('playerRating').value);
    var opponentName = document.getElementById('opponentName').value;
    var opponentRating = parseInt(document.getElementById('opponentRating').value);
    var pieceColor = document.getElementById('pieceColor').value;
    var result = document.getElementById('result').value;
    
    // FIDE Calculation
    var expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    var actualScore = 0.5;
    if (result === 'win') {
        actualScore = 1;
    } else if (result === 'loss') {
        actualScore = 0;
    }

    var playerNewRating = playerRating + 15 * (actualScore - expectedScore);
    var opponentNewRating = opponentRating + 15 * (expectedScore - actualScore);

    // Display result
    var resultElement = document.getElementById('calculationResult');
    resultElement.innerHTML = '<h2>Calculation Result:</h2>';
    resultElement.innerHTML += '<p>Player Name: ' + playerName + '</p>';
    resultElement.innerHTML += '<p>Player Rating: ' + playerRating + '</p>';
    resultElement.innerHTML += '<p>Opponent Name: ' + opponentName + '</p>';
    resultElement.innerHTML += '<p>Opponent Rating: ' + opponentRating + '</p>';
    resultElement.innerHTML += '<p>Piece Color: ' + pieceColor + '</p>';
    resultElement.innerHTML += '<p>Result: ' + result + '</p>';
    resultElement.innerHTML += '<p>Expected Score: ' + expectedScore.toFixed(2) + '</p>';
    resultElement.innerHTML += '<p>Actual Score: ' + actualScore + '</p>';
    resultElement.innerHTML += '<p>New Rating (Player): ' + Math.round(playerNewRating) + '</p>';
    resultElement.innerHTML += '<p>New Rating (Opponent): ' + Math.round(opponentNewRating) + '</p>';

    // Add to history table
    var historyTable = document.getElementById('calculationHistory');
    var historyBody = document.getElementById('historyBody');
    var currentDate = new Date().toLocaleDateString();
    var newRow = '<tr><td>' + currentDate + '</td>' +
                 '<td>' + playerName + '</td>' +
                 '<td>' + opponentName + '</td>' +
                 '<td>' + pieceColor + '</td>' +
                 '<td>' + result + '</td>' +
                 '<td>' + playerRating + '</td>' +
                 '<td>' + opponentRating + '</td>' +
                 '<td>' + expectedScore.toFixed(2) + '</td>' +
                 '<td>' + actualScore + '</td>' +
                 '<td>' + Math.round(playerNewRating) + '</td>' +
                 '<td>' + Math.round(opponentNewRating) + '</td></tr>';
    historyBody.innerHTML += newRow;

    // Show the history table container
    document.getElementById('tableContainer').style.display = 'block';
});

// Toggle the visibility of the calculation history
document.getElementById('toggleTableBtn').addEventListener('click', function() {
    var tableContainer = document.getElementById('tableContainer');
    if (tableContainer.style.display === 'block') {
        tableContainer.style.display = 'none';
        this.innerText = 'Show Calculation History';
    } else {
        tableContainer.style.display = 'block';
        this.innerText = 'Hide Calculation History';
    }
});
