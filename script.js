const btn = document.getElementById("randomBtn");
const gifImage = document.getElementById("gifImage");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");

// Curated list of direct GIF links (no API key needed, so it can't be rate-limited or banned).
const GIF_URLS = [
  "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/3orieWY8QCRWn7lnym/giphy.gif",
  "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
  "https://media.giphy.com/media/26gs6qmhSGjkzql4o/giphy.gif",
  "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif",
  "https://media.giphy.com/media/3og0IPxMM0erATueVW/giphy.gif",
  "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif",
  "https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif",
  "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
  "https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif",
  "https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif",
  "https://media.giphy.com/media/xT5LMzIK1v4Ge2Jn3O/giphy.gif",
  "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif",
  "https://media.giphy.com/media/l2JJyLbhqCF4va86Y/giphy.gif",
];

function pickRandomGifUrl(excludeUrl) {
  let url = excludeUrl;
  while (url === excludeUrl) {
    url = GIF_URLS[Math.floor(Math.random() * GIF_URLS.length)];
  }
  return url;
}

function tryLoadGif(triesLeft, excludeUrl) {
  const url = pickRandomGifUrl(excludeUrl);

  gifImage.onload = () => {
    gifImage.hidden = false;
    loading.hidden = true;
    btn.disabled = false;
  };
  gifImage.onerror = () => {
    if (triesLeft > 0) {
      tryLoadGif(triesLeft - 1, url);
    } else {
      errorMsg.hidden = false;
      loading.hidden = true;
      btn.disabled = false;
    }
  };

  gifImage.dataset.currentUrl = url;
  gifImage.src = url;
}

function showRandomGif() {
  gifImage.hidden = true;
  errorMsg.hidden = true;
  loading.hidden = false;
  btn.disabled = true;

  // Retry a few times with a different GIF in case one link happens to fail.
  tryLoadGif(3, gifImage.dataset.currentUrl);
}

btn.addEventListener("click", showRandomGif);
