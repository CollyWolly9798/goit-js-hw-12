export const createGalleryTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => `
  <div class="photo-card">
    <a href="${largeImageURL}" class="photo-link">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p><b>Likes:</b> ${likes}</p>
      <p><b>Views:</b> ${views}</p>
      <p><b>Comments:</b> ${comments}</p>
      <p><b>Downloads:</b> ${downloads}</p>
    </div>
  </div>`;