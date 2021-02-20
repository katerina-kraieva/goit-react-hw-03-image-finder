function fetchPicture(search, page) {
  const key = '19376133-18e6dc3507064954324c531a9';
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      console.log(response);
      return response.json();
    }

    return Promise.reject(new Error(`There is nothing about ${search}`));
  });
}

export default fetchPicture;