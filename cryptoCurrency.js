const getCurrentConversionRate = async () => {
    const data = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
    );
    const res = await data.json();
    loadTopCoins(res);
  };
  
  const loadTopCoins = async (data) => {
    const conversionRate = data.bitcoin.inr;
    const trendingCoins = await fetch(
      "https://api.coingecko.com/api/v3/search/trending"
    );
    const res = await trendingCoins.json();
    renderTopCoinsOnScreen(conversionRate, res);
  };
  
  const renderTopCoinsOnScreen = (conversionRate, topCoins) => {
    console.log(conversionRate, topCoins);
    for (let i = 0; i < topCoins.coins.length; i++) {
      const coinData = topCoins.coins[i].item;
      const logo = coinData.thumb;
      const name = `${coinData.name} (${coinData.symbol})`;
      const price =
        Math.round(coinData.price_btc * conversionRate * 10000) / 10000;
      createCard(logo, name, price);
    }
  };
  
  const createCard = (logo, name, price) => {
    console.log(logo, name, price);
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("topcoinsCardContainer");
  
    const img = document.createElement("img");
    img.src = logo;
    img.classList.add("topCoinsLogoImg");
  
    const div = document.createElement("div");
    div.classList.add("nameAndPriceContainerTopCoins");
  
    const name2 = document.createElement("h2");
    name2.innerText = name;
  
    const price2 = document.createElement("p");
    price2.innerText = price;
    
    div.appendChild(name2);
    div.appendChild(price2);
    const cardDiv = document.createElement("div");
    cardDiv.className="cardDiv"

    cardContainer.appendChild(img)
    cardContainer.appendChild(div)

    cardDiv.appendChild(cardContainer)
    document.getElementById("TopCoinsDiv").appendChild(cardDiv)
  };
  
  window.onload = function () {
    getCurrentConversionRate();
  };

   
setTimeout(()=>{
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
        xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
        return xPercents[i];
      }
    });
    gsap.set(items, {x: 0});
    totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = xPercents[i] / 100 * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
        .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex+1, vars);
    tl.previous = vars => toIndex(curIndex-1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
    }

    const boxes = gsap.utils.toArray(".cardDiv");
    const loop = horizontalLoop(boxes, {paused: false, repeat : -1});
},1000)

