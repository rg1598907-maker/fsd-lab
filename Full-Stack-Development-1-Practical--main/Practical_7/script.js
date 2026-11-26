
async function searchUniversity() {

    let country = document.getElementById("country").value.trim();

    let result = document.getElementById("result");

    if (country === "") {
        result.innerHTML = "Please enter a country name.";
        return;
    }

    result.innerHTML = "Loading universities...";

    try {

        let response = await fetch(
            "http://universities.hipolabs.com/search?country=" +
            encodeURIComponent(country)
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        let universities = await response.json();

        result.innerHTML = "";

        if (universities.length === 0) {
            result.innerHTML = "No universities found.";
            return;
        }

        universities.forEach(function(university) {

            let div = document.createElement("div");
            div.className = "university";

            let name = document.createElement("h3");
            name.textContent = university.name;

            let state = document.createElement("p");
            state.textContent =
                "State: " + (university["state-province"] || "Not available");

            let link = document.createElement("a");
            link.href = university.web_pages[0];
            link.textContent = "Visit Website";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            div.appendChild(name);
            div.appendChild(state);
            div.appendChild(link);

            result.appendChild(div);

        });

    }

    catch (error) {

        result.innerHTML = "Unable to fetch university data.";

        console.log(error);

    }
}