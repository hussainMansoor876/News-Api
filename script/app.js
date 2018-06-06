var apikey = '9172acd648fc4cf29cd9bc009ce3b5a1';
const main = document.querySelector("#div");
const selector = document.querySelector('#selector')
const cardContainer = document.getElementById('cardContainer')
const defineDefualt = "reuters"
let imagesArray = [];

window.addEventListener('load', async e => {
    updatedNews()
    await upadteSources()
    selector.value = defineDefualt;

    selector.addEventListener('change', e => {
        updatedNews(e.target.value)
    })
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('../service-worker.js')
            console.log('service worker')
        } catch (erro) {
            console.log('error')
        }
    }
})

async function upadteSources() {
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json()
    selector.innerHTML = json.sources
        .map(src => `<option value="${src.id}">${src.name}</option>`).join('\n')
}
async function updatedNews(source = defineDefualt) {
    document.getElementById('form-control').style.display = 'inline-block';
    selector.value = source;
    imagesArray = [];
    const link = `https://newsapi.org/v1/articles?source=${source}&apikey=${apikey}`
    const res = await fetch(link);
    const json = await res.json();
    for (let key in json.articles) {
        imagesArray.push(json.articles[key].urlToImage)
    }
    var flag = 0;
    var timer;
    document.getElementById('img').style.backgroundImage = "url(" + imagesArray[3] + ")"
    function images() {
        if (flag === imagesArray.length) {
            flag = 0
            document.getElementById('img').style.backgroundImage = "url(" + imagesArray[flag] + ")"
        }
        else {
            document.getElementById('img').style.backgroundImage = "url(" + imagesArray[flag] + ")"
        }
    }
    // }
    timer = setInterval(() => {
        flag++
        images()
    }, 5000)
    cardContainer.innerHTML = imagesArray.map(createCards).join('\t')
    main.innerHTML = json.articles.map(createArticles).join('\n')
}

function createArticles(article) {
    return `
        <div class="col-md-8 col-md-offset-2">
            <h2 class='h2'>${article.title}</h2>
            <img class="img-rounded" width='100%' src="${article.urlToImage}"/>
            <p class='h4'>${article.description}</p>
        </div>
   `
}
function createCards(image) {
    return `
        <div class="card">
            <div class="img">
                <img src="${image}" alt="card">
            </div>
            <div class="text">
                <span>Responsive Card</span>
            </div>
        </div>`

}
function changeNews(val) {
    var bool = true;
    val = val + apikey;
    for (var i = 0; i < val.length; i++) {
        if (val.slice(i, i + 7) == 'sources') {
            console.log('Mansoor');
            updatedNews();
            bool = false;
            break;
        }
    }
    if (bool) {
        console.log('Hussain');
        newsUpdate(val);
    }
}
async function newsUpdate(link) {
    document.getElementById('form-control').style.display = 'none';
    imagesArray = [];
    const res = await fetch(link);
    const json = await res.json();
    for (let key in json.articles) {
        imagesArray.push(json.articles[key].urlToImage)
    }
    var flag = 0;
    var timer;
    document.getElementById('img').style.backgroundImage = "url(" + imagesArray[3] + ")"
    function images() {
        if (flag === imagesArray.length) {
            flag = 0
            document.getElementById('img').style.backgroundImage = "url(" + imagesArray[flag] + ")"
        }
        else {
            document.getElementById('img').style.backgroundImage = "url(" + imagesArray[flag] + ")"
        }
    }
    timer = setInterval(() => {
        flag++
        images()
    }, 5000)
    cardContainer.innerHTML = imagesArray.map(createCards).join('\t')
    main.innerHTML = json.articles.map(createArticles).join('\n')
}