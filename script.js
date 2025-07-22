
const searchform = document.querySelector('form')
const imageContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');

const accessKey = '';
//o8GIiuJ02Vtm0aiUJid4zUJW1fRAqBAT72XlynGh9l4

 // link https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

// fetchImages() -> to get images from unsplash.

const fetchImages = async (image) => {
  //  console.log(image);
    
  const url =` https://api.unsplash.com/photos/?query=${image}&per_page=28&client_id=${accessKey}`; // query=${image}&per_page=28 -> here per_page = 28 means we will get 28 images in each page.
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  


}


 // adding event linstener to search box.
searchform.addEventListener('submit', (event) => {
    event.preventDefault(); // no auto submission
     // console.log(searchInput.value);

     const input = searchInput.value.trim(); // trim() ->  helps to remove extra space
    if(input != ''){
        fetchImages(input)
    }

    else {
        imageContainer.innerHTML = `<h2> Please enter your Search...</h2>`
    }
})