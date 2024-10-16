const breakingImg = document.querySelector('#breakingImg');
const breakingNews_title = document.querySelector('#breakingNews .title');
const breakingNews_desc = document.querySelector('#breakingNews .description');
const topNews = document.querySelector('.topNews');
const sportsNews = document.querySelector('#sportsNews .newsBox');
const businessNews = document.querySelector('#businessNews .newsBox');
const internationalNews = document.querySelector('#int-News .newsBox');
const nationalNews = document.querySelector('#national-News .newsBox');
const techNews = document.querySelector('#techNews .newsBox');

const header = document.querySelector('.header');
const toggleMenu = document.querySelector('.bar');
const menu = document.querySelector('nav ul');


toggleMenu.addEventListener('click', toggle);

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
    };
};

window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}, 100));

const apiKey = "53254a446f97420fb5fb75c9a8f26a92";

const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const add_breakingNews = (data) => {
    if (data.length > 0) {
        breakingImg.innerHTML = `<img src="${data[0].urlToImage || ''}" alt="image">`;
        breakingNews_title.innerHTML = `<a href="${data[0].url}" target="_blank"><h2>${data[0].title || ''}</h2></a>`;
        breakingNews_desc.innerHTML = data[0].description || '';
    }
};

const addNews = (data, container) => {
    let html = '';
    data.forEach((element) => {
        const title = element.title?.length > 100 ? `${element.title.slice(0, 100)}...` : element.title;
        html += `
            <div class="newsCard">
                <div class="img">
                    <img src="${element.urlToImage || ''}" alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href="${element.url}" target="_blank"><p>${title || ''}</p></a>
                    </div>
                </div>
            </div>`;
    });
    container.innerHTML = html;
};

const fetchAndAddNews = async (category, container, pageSize) => {
    try {
        const data = await fetchData(category, pageSize);
        addNews(data, container);
    } catch (error) {
        console.error(`Error adding ${category} news:`, error);
    }
};

fetchData('general', 5).then(add_breakingNews);
fetchAndAddNews('general', topNews, 20);
fetchAndAddNews('sports', sportsNews, 5);

fetchAndAddNews('technology', techNews, 5);
