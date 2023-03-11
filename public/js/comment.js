const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#content").value.trim();
  const postId = document.querySelector("#hidden").value.trim();

  if (content) {
    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ content, postId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create comment");
    }
  }
};

const delCommentButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentFormHandler);

document
  .querySelector(".comment")
  .addEventListener("click", delCommentButtonHandler);
