let apiKey = '1eff027380aa4f0b9ec00dc745af55f6'; 
let apiGet = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKey}`;
let row_banner = document.querySelector('.row__banner');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let row__feature__Articel = document.querySelector('.row__feature__Articel');
let row__new__articel = document.querySelector('.row__new__articel');
let footer = document.querySelector('.footerSpan');
let header = document.querySelector('header');
let hamburger = document.querySelector('.hamburger');
let btn__top = document.querySelector('.btn__top');
let date = new Date();
let footerDate = date.getFullYear();
footer.innerText = `${footerDate}`

document.addEventListener('DOMContentLoaded',getData);
async function getData () {
  let dataNews = await fetch(apiGet);
  let ambilDataNews = await dataNews.json();
  let ambilHasilDataNews = ambilDataNews.articles;
  randomFunc(ambilHasilDataNews);
  
}

function randomFunc(dataNews){
 let items = dataNews.sort(() => 0.5 - Math.random());
  elementBannerFunc(items);
  artlcleFunc(items);
  artlcleFuncNews(items);
  newArticleFunc(items);
}
function elementBannerFunc(data){
  console.log(data)
  let getDataNews = data.slice(0,3);
  getDataNews.forEach((item) => {
    let bannerEl = document.createElement('div');
    bannerEl.className = "box__banner";
    bannerEl.innerHTML = `<img class="gambar" src="${item.urlToImage}"></img>
                          <a class="title" href="${item.url}" target="_blank"><h1>${item.title}</h1></a>
                          <span class="published">${item.source.name}</span>
    `
    row_banner.appendChild(bannerEl);
    let bannerEls = document.querySelectorAll('.box__banner');

    for(let i = 0; i < bannerEls.length; i++){
      let item = bannerEls[i];
      item.style.transform = `translateX(`+ 100 * ( i % bannerEls.length) + `%)`;
    }
    let loop = 0 + 1000 * 3;
    // next slider news
    next.addEventListener('click',(e) => {
      e.preventDefault();
      loop++
      for(let i = 0; i < bannerEls.length; i++){
        let item = bannerEls[i];
        item.style.transform = `translateX(`+ 100 * ( i - loop % bannerEls.length) + `%)`;
      }
    });
    // prev slider news
    prev.addEventListener('click',(e) => {
      e.preventDefault();
      loop--
      for(let i = 0; i < bannerEls.length; i++){
        let item = bannerEls[i];
        item.style.transform = `translateX(`+ 100 * ( i - loop % bannerEls.length) + `%)`;
      }
    })
  });
}

function artlcleFunc(data){
  let newsFeaturedRandom = data.slice(0,1);
  newsFeaturedRandom.forEach((item) =>{
    let featuredEl = document.createElement('div');
    featuredEl.classList = "box__article";
    featuredEl.innerHTML = `<img class="gambar" src="${item.urlToImage}">
                            <p class="author">${item.author}</p>
                            <div class="text__news"><h1 class="article__featured">${item.title}</h1>
                            <p class="content">${item.description}</p>
                            </div>
    
    `
  row__feature__Articel.appendChild(featuredEl);
  })
}

function artlcleFuncNews(data){
  let newsFeaturedRandomList = data.slice(0,3);
  let featuredListEl = document.createElement('div');
  featuredListEl.classList = "box__list__article";
  row__feature__Articel.appendChild(featuredListEl);

  let boxListFeatured = document.querySelector('.box__list__article');

  row__feature__Articel.appendChild(featuredListEl)
  newsFeaturedRandomList.forEach((item) => {
    let box__article__list = document.createElement('div');
    box__article__list.classList = "box__article__list";
    box__article__list.innerHTML = `<img class="gambar" src="${item.urlToImage}">
                                   <div class="news__list">
                                   <p>${item.publishedAt}</p>
                                   <a href="${item.url}"><h3>${item.title}</h3></a>
                                   </div>
    `
    boxListFeatured.appendChild(box__article__list)
  })
}

function newArticleFunc(data){
  let getNewArticles = data.slice(0,6);
  let itemsNewArticles = getNewArticles.sort(() => 0.5 - Math.random());
  itemsNewArticles.forEach((itemNew) => {
    let box__new = document.createElement('div');
    box__new.classList = "box__latest__article";
    box__new.innerHTML = `<img class="picture" src="${itemNew.urlToImage}"></img>
                          <p class="published__lastest__article">${itemNew.publishedAt}</p>
                          <div class="title__latest__article">
                          <a class="newArticles" href="${itemNew.url}"><h3>${itemNew.title}</h3></a>
                          <p>${itemNew.description}</p>
                          </div>
    `
    row__new__articel.appendChild(box__new)
  })
}

window.addEventListener('scroll',() =>{
  header.classList.toggle('sticky',scrollY > 0);
  btn__top.classList.toggle('btn__topShow',scrollY > 0)
});
hamburger.addEventListener('click',() => {
  let nav = document.querySelector('nav');
  nav.classList.toggle('navShow');
  hamburger.classList.toggle('hamburgerStyle')
});
let ul = document.querySelectorAll('ul');
let li = document.querySelectorAll('li');
li.forEach((clickList) => {
  clickList.addEventListener('click',() => {
    document.querySelector('.active').classList.remove('active');
    clickList.classList.add('active');
  })
})

btn__top.addEventListener('click',() => {
  document.documentElement.scrollTop = "0";
  document.body.scrollTop = "0";
});
let list__item = document.querySelectorAll('.list__item');
list__item.forEach((clickList) => {
  clickList.addEventListener('click',() => {
    window.alert('Maaf, Tombol ini masih belum bisa digunakan')
  })
})
