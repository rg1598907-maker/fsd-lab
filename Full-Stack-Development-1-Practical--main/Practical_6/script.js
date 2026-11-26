async function getJoke() {

    let jokeElement = document.getElementById("joke");

    jokeElement.innerText = "Loading joke...";

    try {

        // Fetch joke from API
        let response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        // Convert response into JSON
        let data = await response.json();

        // Display joke
        jokeElement.innerText =
            data.setup + "\n\n" + data.punchline;

    }

    catch (error) {

        jokeElement.innerText =
            "Unable to fetch joke. Please try again!";

        console.log(error);

    }
}

async function getJoke() {

    // Step 1: Send request to API
    let response = await fetch(
        "https://geek-jokes.sameerkumar.website/api?format=json"
    );

    // Step 2: Convert response into JSON
    let data = await response.json();

    // Step 3: Display joke on webpage
    document.getElementById("joke").innerHTML =
        data.setup + "<br><br>" + data.punchline;
}
