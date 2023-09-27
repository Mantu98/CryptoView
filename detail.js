const loadDetails = async () => {
    console.log("details loaded");
    const currentPath = window.location.href;
    const urlObj = new URL(currentPath);
    const params = new URLSearchParams(urlObj.search);
    if (!params.has("id")) {
      window.location.href = "./CryptoCurrency.html";
    }
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.get(
        "id"
      )}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    const res = await data.json();
    renderDetails(res)
  };
  
  const renderDetails = (coin) => {
      console.log(coin);
      const name = `${coin.name} (${coin.symbol.toUpperCase()})`
      console.log(name);
      const desc = coin.description.en
      console.log(desc);
      const logo = coin.image.large
      console.log(logo);
  
      const inr  = coin.market_data.current_price.inr
      const usd  = coin.market_data.current_price.usd
      const eur  = coin.market_data.current_price.eur
      const gbp  = coin.market_data.current_price.gbp
      console.log(inr, usd, eur, gbp);
  
      const card = document.createElement("div")
      const content = document.createElement("div")
      content.className="content"
      card.className="card"
      const logoImg = document.createElement("img")
      logoImg.src = logo
      const descDiv = document.createElement("p")
      descDiv.innerText = desc
      const priceContainer = document.createElement("div")
      priceContainer.className = "priceContainer"
      const inrPrice = document.createElement("h3")
      inrPrice.innerText = "Rs. "+inr
      const usdPrice = document.createElement("h3")
      usdPrice.innerText = usd+" $"
      const eurPrice = document.createElement("h3")
      eurPrice.innerText = eur+" Euro"
      const gbpPrice = document.createElement("h3")
      gbpPrice.innerText = gbp+" gbp"
      priceContainer.appendChild(inrPrice)
      priceContainer.appendChild(usdPrice)
      priceContainer.appendChild(eurPrice)
      priceContainer.appendChild(gbpPrice)
  
      card.appendChild(logoImg)
      content.appendChild(descDiv)
      card.appendChild(content)
      // card.appendChild(priceContainer)
  
      const div = document.getElementById("searchSectionMainContainer33")
      div.appendChild(card)
      div.appendChild(priceContainer)
  }
  ;
  
  window.onload = function () {
    loadDetails();
  };