const assetsURLMap = {
    play: chrome.runtime.getURL("assets/play.png"),
    delete: chrome.runtime.getURL("assets/delete.png")
};

const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";
const bookmarkSection = document.getElementById("bookmarks");

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookmarks = data[AZ_PROBLEM_KEY] || [];
        viewBookmarks(currentBookmarks);
    })
});

function viewBookmarks(bookmarks) {
    bookmarkSection.innerHTML = "";
    if (bookmarks.length == 0) {
        bookmarkSection.innerHTML = "<i>No Problems added !<i>";
        return;
    }
    else {
        bookmarks.forEach(bookmark => addNewBookmark(bookmark));
    }
}


function addNewBookmark(bookmark) {
    const bookmarkEl = document.createElement('div');
    const bookmarkTitle = document.createElement('div');
    const bookmarkControls = document.createElement('div');
    bookmarkTitle.textContent = bookmark.pname;

    bookmarkEl.classList.add('bookmark-title');
    bookmarkControls.classList.add("bookmark-controls");
    setControlAttributes(assetsURLMap.play, onPlay, bookmarkControls);
    setControlAttributes(assetsURLMap.delete, onDelete, bookmarkControls);
    bookmarkEl.classList.add("bookmark");
    bookmarkEl.append(bookmarkTitle);
    bookmarkEl.append(bookmarkControls);
    bookmarkEl.setAttribute("url", bookmark.url);
    bookmarkEl.setAttribute("bookmarkId", bookmark.id);
    bookmarkSection.append(bookmarkEl);
}


function setControlAttributes(src, handler, parentDiv) {
    const el = document.createElement('img');
    el.src = src;
    el.addEventListener("click", handler);
    parentDiv.appendChild(el);
}

function onPlay(event) {
    const problemURL = event.target.parentNode.parentNode.getAttribute("url");
    window.open(problemURL, "_blank");

}
function onDelete(event) {
    const item = event.target.parentNode.parentNode;
    const idToRemove = item.getAttribute("bookmarkId");
    item.remove();
    deleteItemFromStorage(idToRemove);
}

function deleteItemFromStorage(idToRemove) {
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookmarks = data[AZ_PROBLEM_KEY] || [];
        const updatedBookMarks = currentBookmarks.filter((b) => b.id !== idToRemove);
        chrome.storage.sync.set({ AZ_PROBLEM_KEY: updatedBookMarks });
    });
}