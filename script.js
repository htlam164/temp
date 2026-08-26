const btn = document.getElementById("randomBtn");
const gifImage = document.getElementById("gifImage");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");

// Public Giphy beta key, provided by Giphy for demos/testing.
const GIPHY_API_KEY = "dc6zaTOxFJmzC";
const GIPHY_RANDOM_URL = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=ai&rating=g`;

async function fetchRandomGif() {
  gifImage.hidden = true;
  errorMsg.hidden = true;
  loading.hidden = false;
  btn.disabled = true;

  try {
    const response = await fetch(GIPHY_RANDOM_URL);
    if (!response.ok) throw new Error("Request failed");

    const data = await response.json();
    const url = data?.data?.images?.original?.url;
    if (!url) throw new Error("No image found");

    gifImage.src = url;
    gifImage.hidden = false;
  } catch (err) {
    errorMsg.hidden = false;
  } finally {
    loading.hidden = true;
    btn.disabled = false;
  }
}

btn.addEventListener("click", fetchRandomGif);
