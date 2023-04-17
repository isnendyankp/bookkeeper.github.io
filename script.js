const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Validate Form
function validate(nameValue, urlValue) {
  const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }
  // Valid
  return true;
}

// Build Bookmarks
function buildBookmarks() {
    // Build Items
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        // Item
        const item = document.createElement('div');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
    });
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookmarks array in localStorage
    bookmarks = [
      {
        name: 'Nendy Github',
        url: 'https://github.com/isnendyankp',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Handle Data from Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    // Add 'https://' if not there
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    // Validate
    if (!validate(nameValue, urlValue)) {
        return false;
    }
     // Set bookmark object, add to array
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    // Set bookmarks in localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // call Fetch bookmarks function
    fetchBookmarks();
    // Reset
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// call Fetch Bookmarks when first load the project
fetchBookmarks();