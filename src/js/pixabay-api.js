import axios from "axios";
export const fetchPhotosByQuery = async (searchedQuery,currentPage) => {

  const axiosOptions = {
    params: {
    key: '48318728-33e02a537f20daf55b07c1f54',
    q: searchedQuery.trim(),
    page: currentPage,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  }
  }

  try {
    const response = await axios.get(`https://pixabay.com/api/`, axiosOptions);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};