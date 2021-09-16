const handleFormSubmit = (e) => {
  e.preventDefault();
  const formEl = e.target;
  const formData = new FormData(formEl);
  const commentTemplate = document.getElementById('comment-item');
  const value = formData.get('answer').trim();

  if (!(value && commentTemplate)) {
    return null;
  }

  const commentChildrenEl = formEl.closest('.comment__children');
  const commentContainer = commentChildrenEl || formEl.closest('.comments').querySelector('.comments__list');
  const replyElement = commentContainer.querySelector('.reply');
  const commentClone = commentTemplate.content.cloneNode(true);
  const commentChild = commentClone.firstElementChild;
  const userComment = commentChild.querySelector('.user-comment');

  if (commentChildrenEl) {
    replyElement.remove();
  } else {
    formEl.reset()
  }

  userComment.innerHTML = value;
  commentContainer.appendChild(commentChild);
  bindReplyClick(commentChild);
}

const mountReplyForm = (commentElement) => {
  const commentChildrenEl = commentElement.querySelector('.comment__children');
  if (commentChildrenEl.querySelector('.reply')) {
    return null;
  }

  const replyTemplate = document.getElementById('reply-item');
  if (replyTemplate) {
    const replyClone = replyTemplate.content.cloneNode(true);
    const replyChild = replyClone.firstElementChild;
    commentChildrenEl.appendChild(replyChild);
    replyChild.querySelector('.reply__input').focus();
    replyChild.querySelector('form.reply__form').addEventListener('submit', handleFormSubmit);
  }
}

const bindReplyClick = (commentElement) => {
  commentElement
    .querySelector('.reaction__item[data-action="reply"]')
    .addEventListener('click', () => mountReplyForm(commentElement));
}

// document.querySelectorAll('.comment').forEach((item) => bindReplyClick(item));
document.querySelectorAll('.comment').forEach(bindReplyClick);
document.querySelector('form.reply__form').addEventListener('submit', handleFormSubmit);


// document.querySelectorAll('.reaction__item').forEach(
//   (item) => item.addEventListener('click', () => console.log('clicked'))
// )

// document.addEventListener('click', (e) => {
//   console.log(e.target.closest('.reaction__item'))
// })
