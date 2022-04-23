import { fetchData } from "./model.js";

const parentElement = document.getElementById("section-container");
const btn = document.getElementById("btn");

/////////Retrieve data and render on UI ///////
const renderDataOnUI = () => {
  //retrieve data
  const data = fetchData();

  //Loop over data and dynamically render it on the UI, as oppposed to hard-coding it.
  data.forEach((dataItem) => {
    const { park, content } = dataItem;

    const html = `
    <article class="article">
      <div class="sub-heading">
        <h3>${park}</h3>
        <svg>
            <use xlink:href="assets/sprite.svg#icon-chevron-down"></use>
          </svg>
      </div>
      <div class="content">
        <p>
          ${content} </br>
          <a href="#">Learn More</a>
        </p>
     </div>
    </article>
    `;

    parentElement.insertAdjacentHTML("beforeend", html);
  });
};

/////////Expand and Collapse Individual article elements //////////////////////
const openAndCloseDrawer = () => {
  //event listener is added to the parent element and delegated to the clicked child element, as opposed to adding the event listener to each child element
  parentElement.addEventListener("click", (e) => {
    const contentElements = Array.from(document.querySelectorAll(".article"));
    const articleElement = e.target.closest(".article");

    if (!articleElement) return;

    articleElement.classList.toggle("active");

    //check the state of each article
    const allArticlesAreExpanded = contentElements.every(
      (contentElement) =>
        contentElement.classList.contains("active") &&
        btn.textContent === "Expand All"
    );

    //change text in button if they are all expanded
    if (allArticlesAreExpanded) {
      btn.textContent = "Collapse All";
    }
  });
};

/////////Expand and Collapse All Article Elements //////////////////////
const expandAndCollapseAll = () => {
  btn.addEventListener("click", () => {
    const contentElements = Array.from(document.querySelectorAll(".article"));

    const atLeastOneArticleIsCollapsed = contentElements.some(
      (contentElement) =>
        !contentElement.classList.contains("active") &&
        btn.textContent === "Expand All"
    );

    const atLeastOneArticleIsExpanded = contentElements.some(
      (contentElement) =>
        contentElement.classList.contains("active") &&
        btn.textContent === "Collapse All"
    );

    //Expannd feature should work if at least one element is collapsed
    if (atLeastOneArticleIsCollapsed) {
      contentElements.forEach((contentElement) => {
        contentElement.classList.add("active");
        btn.textContent = "Collapse All";
      });
    }

    //collapse feature should work if at least one element is expanded
    if (atLeastOneArticleIsExpanded) {
      contentElements.forEach((contentElement) => {
        contentElement.classList.remove("active");
        btn.textContent = "Expand All";
      });
    }
  });
};

const init = () => {
  renderDataOnUI();
  openAndCloseDrawer();
  expandAndCollapseAll();
};

init();
