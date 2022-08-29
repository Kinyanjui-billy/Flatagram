// write your code here
let cardinfo;

//render image and constituent data
function cardRender(card) {
  const cardTitle = document.querySelector("#card-title");
  const cardImage = document.querySelector("#card-image");
  const cardLikeCount = document.querySelector("#like-count");
  const cardLikesBtnTag = document.querySelector("#like-button");
  const cardCommentList = document.querySelector("#comments-list");
  const cardCommentFormTag = document.querySelector("#comment-form");
  const cardCommentInputTag = document.querySelector("#comment");

  cardTitle.textContent = card.title;
  cardImage.src = card.image;
  cardLikeCount.textContent = `${card.likes} likes`;

  //remove temp comments
  cardCommentList.textContent = "";
  //display comments
  card.comments.forEach((comment) => {
    let cardComment = document.createElement("li");
    cardComment.textContent = comment.content;
    cardCommentList.appendChild(cardComment);
  });
}

function fetchData(id = 1) {
  url = `http://localhost:3000/images/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => cardRender(data))
    .catch((err) => {
      console.log(err);
    });
}

function init() {
  fetchData();
}
init();