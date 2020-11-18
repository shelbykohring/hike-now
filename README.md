<!-- Project Title and Description -->
## Project Title

<!-- User Story -->
## User Story
AS A vacationer
I WANT to enter where I am going
SO THAT I can see the weather and hotels in that city

<!-- Identified APIs -->
## Identified APIs
* Open Weather Map
* Travel Partner Google API

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="./assets/css/style.css">
    <title>3D Card</title>
</head>
<body>
    <!-- landing page -->
    <div class="card2">
        <div class="container2">
            <div class="hero2">
                <h1 class="heading">Where would you like to go?</h1>
            </div>
            <div class="input-container">
                <input class="input" id="search-term" type="search" placeholder="Enter destination..." onfocus="this.placeholder = '';this.value=''" onblur="this.placeholder = 'Enter destination...'" autocomplete="off">
                <button class="button2">Search</button>
            </div>
        </div>
    </div>

    <!-- card page -->
    <button class="back-button" style="display:none">Back</button>