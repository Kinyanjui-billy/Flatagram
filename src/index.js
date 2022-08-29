// write your code here
let cardinfo;

//render image and constituent data
function cardRender(card) {
  const cardTitle = document.querySelector("#card-title");
  const cardImage = document.querySelector("#card-image");
  const cardLikeCount = document.querySelector("#like-count");
  const cardLikesButton = document.querySelector("#like-button");
  const cardCommentList = document.querySelector("#comments-list");
  const cardCommentForm = document.querySelector("#comment-form");
  const cardCommentInput = document.querySelector("#comment");

  cardTitle.textContent = card.title;
  cardImage.src = card.image;
  cardLikeCount.textContent = `${card.likes} likes`;

  //remove temp comments
  cardCommentList.textContent = "";
  //display comments
  card.comments.forEach((comment) => {
    let cardComment = document.createElement("li");
    cardComment.textContent = comment.content;
    cardComment.setAttribute("id", comment.id);
    cardCommentList.appendChild(cardComment);
  });

  //add likes
  cardLikesButton.addEventListener("click", () => {
    card.likes += 1;
    cardLikeCount.textContent = `${card.likes} likes`;
  });

  //add comments
  cardCommentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cardComment = document.createElement("li");
    cardComment.textContent = cardCommentInput.value;
    cardComment.setAttribute("id", card.comments.length + 1);
    cardCommentList.appendChild(cardComment);

    let newComment = {
      id: card.comments.length + 1,
      imageId: 1,
      content: cardCommentInput.value,
    };

    postComment(newComment);
  });

  // toggle show image
  let hide = true;
  cardTitle.addEventListener("click", (e) => {
    cardImage.style.display = hide ? "none" : "";
    hide = !hide;
  });

  //change image
  cardImage.addEventListener("click", () => {
    url = "https://dog.ceo/api/breeds/image/random";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        cardImage.src = res.message;
      })
      .catch((err) => {
        console.error(err);
      });
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

function postComment(comment) {
  url = "http://localhost:3000/comments";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

function patchData(updatedData, id = 1) {
  url = `http://localhost:3000/images/${id}`;
  fetch(url, {
    method: "PATCH",
  });
}

function init() {
  fetchData();
}
init();
