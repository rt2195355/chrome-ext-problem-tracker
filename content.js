// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT
const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png")
window.addEventListener("load", addBookMarkButton);
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";



function addBookMarkButton() {
    const bookMarkButton = document.createElement('img');
    bookMarkButton.id = "add-bookmark-button";
    bookMarkButton.src = bookmarkImgURL;
    bookMarkButton.style.height = "30px";
    bookMarkButton.style.width = "30px";
    bookMarkButton.style.cursor = "pointer";
    bookMarkButton.style.marginLeft = '10px';
    const problemTitle = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
    problemTitle.parentNode.append(bookMarkButton);
    bookMarkButton.addEventListener('click', addNewBookmarkHandler);
}

async function addNewBookmarkHandler() {
    const currentBookmarks = await getCurrentBookmarks();
    const azProblemURL = window.location.href;
    const uniqueID = window.location.pathname.split('/')[2]; //using the title of problem as unique id
    const pt = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0].textContent;

    if (currentBookmarks.some((b) => b.id === uniqueID)) return; //if already bookmarked

    const bookmarkObj = {
        id: uniqueID,
        pname: pt,
        url: azProblemURL
    };

    const updatedBookmarks = [...currentBookmarks, bookmarkObj];
    chrome.storage.sync.set({ AZ_PROBLEM_KEY: updatedBookmarks }, () => {
        console.log("Updated the bookmarks correctly to ", updatedBookmarks);
    })
}


function getCurrentBookmarks() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([AZ_PROBLEM_KEY], (results) => {
            resolve(results[AZ_PROBLEM_KEY] || []);
        })
    });
}