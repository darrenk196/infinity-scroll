// Replace with your own access key
const ACCESS_KEY =
  "Get your own access key from https://unsplash.com/developers";

// Define the base URL and endpoint
const BASE_URL = "https://api.unsplash.com/";
const ENDPOINT = "photos/random";
const COUNT = 30;

// Construct the full URL with query parameters
const url = `${BASE_URL}${ENDPOINT}?client_id=${ACCESS_KEY}&count=${COUNT}`;

// Global variables
const gallery = document.querySelector(".image-container");

const getImages = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayImages = async () => {
  try {
    const images = await getImages();
    imagesLoaded = 0;
    totalImages = images.length;
    images.forEach((image) => {
      const item = document.createElement("a");
      setAttributes(item, {
        href: image.links.html,
        target: "_blank",
      });
      const img = document.createElement("img");
      setAttributes(img, {
        src: image.urls.regular,
        alt: image.alt_description,
        title: image.alt_description,
      });
      item.appendChild(img);
      gallery.appendChild(item);
    });
  } catch (error) {
    console.log("error");
  }
};

// loads images as the user scrolls
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    displayImages();
  }
});
