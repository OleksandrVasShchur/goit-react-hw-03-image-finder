import axios from 'axios';

const API_KEY = '35544989-94139f01e43b0cfec95c5298b';

export async function getImages(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return data;
}
