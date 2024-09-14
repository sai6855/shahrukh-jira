const options = {
  method: "POST",
  headers: {
    Authorization: "Bearer <API KEY>", // check https://fish.audio/go-api/ for api key
    "Content-Type": "application/json",
  },
  body: {
    text: "",
    reference_id: "1f51bb552a924f89837c80d6c1b11e03",
    chunk_length: 200,
    normalize: true,
    format: "wav",
    mp3_bitrate: 64,
    opus_bitrate: -1000,
    latency: "normal",
  },
};

const timer = setInterval(() => {
  console.log("Hello World");
  const header = document.getElementById("jira-issue-header");

  if (header) {
    const button = document.createElement("img");

    button.src =
      "https://img.theweek.in/content/dam/week/magazine/theweek/leisure/images/2023/2/11/63-Shah-Rukh-Khan.jpg";
    button.style.width = "70px";
    button.style.height = "70px";
    button.style.cursor = "pointer";
    button.style.borderRadius = "50%";

    button.addEventListener("click", () => {
      const comments = document.querySelector(
        '[data-testid="issue.views.field.rich-text.description"]'
      );

      const text = comments.innerText.replace(/[^a-zA-Z0-9]/g, " ");

      options.body.text = text.slice(0, 495);

      options.body = JSON.stringify(options.body);

      fetch("https://api.fish.audio/v1/tts", options)
        .then(async (response) => {
          const contentType = response.headers.get("content-type");

          if (contentType && contentType.startsWith("audio/")) {
            const audioBlob = await response.blob(); // Get the response as a Blob
            const audioUrl = URL.createObjectURL(audioBlob); // Create a URL for the Blob

            const audio = new Audio(audioUrl); // Create a new Audio object
            audio.play(); // Play the audio
          } else {
            // If it's not an audio file, handle the response accordingly (e.g., log the response)
            const textResponse = await response.text();
            console.error("Unexpected response:", textResponse);
          }
        })
        .catch((err) => console.error(err));
    });

    header.appendChild(button);

    clearInterval(timer);
    console.log("JIRA Issue Header Found");
  }
}, 1000);
