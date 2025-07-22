
const searchform = document.querySelector('form')
const imageContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMore = document.querySelector('.load-more-btn');

let page = 1;

const accessKey = 'o8GIiuJ02Vtm0aiUJid4zUJW1fRAqBAT72XlynGh9l4';
//o8GIiuJ02Vtm0aiUJid4zUJW1fRAqBAT72XlynGh9l4

 // link https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

// fetchImages() -> to get images from unsplash.

const fetchImages = async (image, pageNo) => {
    try {
        //  console.log(image);
        if(pageNo === 1){
            imageContainer.innerHTML = '';
        }

        const url =` https://api.unsplash.com/search/photos/?query=${image}&per_page=30&page=${pageNo}&client_id=${accessKey}`; // we use search becuse i need to fetch those images which i am seaeching.
        //  query=${image}&per_page=28 -> here per_page = 28 means we will get 30 images in each page.

        const response = await fetch(url);
        const data = await response.json();

        // console.log(data);

            if(data.results.length > 0){

                data.results.forEach(photo => {   // as images are wraped in array of results.

                    // creating image-div
                    const imageItem = document.createElement('div');
                    imageItem.classList.add('image-div')

                    imageItem.innerHTML = `<img src="${photo.urls.regular}">`;  // the {photo.urls.regular} i am getting it from apis. in console data
                    
                    const overlay = document.createElement('div')
                    overlay.classList.add('overlay');

                    // creating overlay text

                    const overlayText = document.createElement('h3');
                    overlayText.innerText = `${photo.alt_description}`;

                    overlay.appendChild(overlayText)

                    imageItem.appendChild(overlay);

                    imageContainer.appendChild(imageItem);
                });

                if(data.total_pages === pageNo){ // means we are in last page of image then don't show load more
                    loadMore.style.display = 'none'
                }
                else {
                    loadMore.style.display = 'block'
                }

            }
            else {  // empty array case
                imageContainer.innerHTML = `<h2>No Image Found !!!</h2>`
                if(loadMore.style.display === 'block'){  // i don't want to show loadmore button when 'No Image Found !!!' is displayed
                    loadMore.style.display = 'none';  // so i made it display = none
                }
            }

    }
    catch(err) {
        imageContainer.innerHTML = `<h2>Try after sometime. Falied to load ...</h2>`
    }
   
}

// adding event linstener to search box.
searchform.addEventListener('submit', (event) => {
    event.preventDefault(); // no auto submission
    // console.log(searchInput.value);

    const input = searchInput.value.trim(); // trim() ->  helps to remove extra space
    if(input != ''){
        // for load moore on second page
        page = 1;
        fetchImages(input, page)
    }

    else {
        imageContainer.innerHTML = `<h2> Please enter your Search...</h2>`
        if(loadMore.style.display === 'block'){  // i don't want to show loadmore button when 'Please enter your Search...' is displayed
            loadMore.style.display = 'none';  // so i made it display = none
        }
    }
})

// adding event linstener to load more

loadMore.addEventListener('click', ()=> {
    fetchImages(searchInput.value.trim(), page++);
})
 