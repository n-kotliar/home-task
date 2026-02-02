export const LS_FAV = 'favouriteExercises';
const QUOTE_KEY = 'quote';
const QUOTE_TIME_KEY = 'quote_time';
const ONE_DAY_MS = 86400000;

export const setFav = arr => localStorage.setItem(LS_FAV, JSON.stringify(arr));

export const getFav = key => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error parsing JSON:', err.message);
    return [];
  }
};

export const removeFromFav = id => {
  const updated = getFav(LS_FAV).filter(item => item._id !== id);
  setFav(updated);
};

async function fetchQuote() {
  const response = await fetch('https://your-energy.b.goit.study/api/quote');
  return response.json();
}

let quotePromise = null;

async function getQuote() {
  if (quotePromise) return quotePromise;

  const storedQuote = localStorage.getItem(QUOTE_KEY);
  const storedTime = localStorage.getItem(QUOTE_TIME_KEY);

  if (
    storedQuote &&
    storedTime &&
    Date.now() - Number(storedTime) < ONE_DAY_MS
  ) {
    return JSON.parse(storedQuote);
  }

  quotePromise = (async () => {
    try {
      const data = await fetchQuote();
      localStorage.setItem(QUOTE_KEY, JSON.stringify(data));
      localStorage.setItem(QUOTE_TIME_KEY, Date.now().toString());
      return data;
    } catch (err) {
      console.error('Error fetching quote:', err);
      return storedQuote
        ? JSON.parse(storedQuote)
        : { quote: 'No quote available', author: '' };
    } finally {
      quotePromise = null;
    }
  })();

  return quotePromise;
}


const renderQuoteHTML = (quote, author) => `
  <svg width="32" height="32" class="quote-text-icon">
    <use href="/home-task/icons.svg#icon-run"></use>
  </svg>
  <div>
    <h3 class="main-quote-title">Quote of the day</h3>
    <p class="main-quote-text">${quote}</p>
    <p class="main-quote-author">${author}</p>
    <svg width="24" height="24" class="quote-text-icon-commas">
      <use href="/home-task/icons.svg#icon-commas"></use>
    </svg>
  </div>
`;

export const displayQuote = async quoteContainer => {
  const { quote, author } = await getQuote();
  quoteContainer.innerHTML = renderQuoteHTML(quote, author);
};
