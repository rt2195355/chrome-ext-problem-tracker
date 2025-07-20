// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT
const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png")
window.addEventListener("load", addBookMarkButton);

function addBookMarkButton() {
    const bookMarkButton = document.createElement('img');
    bookMarkButton.id = "add-bookmark-button";
    bookMarkButton.src = bookmarkImgURL;
    bookMarkButton.style.height = "30px";
    bookMarkButton.style.width = "30px";
    bookMarkButton.style.cursor = "pointer";
    bookMarkButton.style.marginLeft = '10px';
    const problemTitle = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
    problemTitle.parentNode.after(bookMarkButton);
    bookMarkButton.addEventListener('click', () => {
        alert('Problem bookmarked!');
    });

}