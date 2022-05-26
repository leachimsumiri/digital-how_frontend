function reqListener() {
  if (this.status !== 200) return;

  // eslint-disable-next-line no-restricted-globals
  self.postMessage(JSON.parse(this.response));
}

function getCitiesSequentially(page, size) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', reqListener);
  req.open('GET', `http://localhost:8080/cities?page=${page}&size=${size}`);
  req.send();
}

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (e) => {
  getCitiesSequentially(e.data.page, e.data.size);
});
