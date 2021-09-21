const handleFormSubmit = (e) => {
  console.log('bla')
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
    formEl.reset();
  }

  userComment.innerHTML = value;
  commentContainer.appendChild(commentChild);
  bindReplyClick(commentChild);
};

const mountReplyForm = (commentElement) => {
  const commentChildrenEl = commentElement.querySelector('.comment__children'); // 1.3 Peremennaya - nahodit "comment__children" v kotorom pri nazhatii na REPLY poyavlyaetsya forma dlya kommenta
  if (commentChildrenEl.querySelector('.reply')) { // 1.4 Proverka sushestvyet li yzhe forma dlya kommenta - esli da - ne daet otkrit' dopolnitelnie formi v dannoi vetke
    return null;  
  }

  const replyTemplate = document.getElementById('reply-item'); // 1.4 Peremennaya - nahodit template s formoi dlya napisaniya kommenta 
  if (replyTemplate) { // ??? Dlya podstrahovki?
    const replyClone = replyTemplate.content.cloneNode(true);  // 1.5 (chto delaet .content? Bez nego ne rabotaet) (chto proishodit kogda "false"?) Peremennaya - sozdaet uzel template s formoi dlya napisaniya kommenta
    const replyChild = replyClone.firstElementChild; // 1.6 Peremennaya - sozdaet formu iz template 
    commentChildrenEl.appendChild(replyChild); // 1.7 Dobavlyaet sozdannyu formy v vetky
    replyChild.querySelector('.reply__input').focus(); //1.8 Srazy posle dobavleniya daet vozmozhnost' pisat' v forme bez klika
    replyChild.querySelector('form.reply__form').addEventListener('submit', handleFormSubmit); // 1.8 === 2 Otpravka kommenta pri nazatii na SEND pri pomozhi funkzii "handleFormSubmit"
    replyChild.querySelector('form.reply__form').addEventListener("keydown", event => {
      if (event.keyCode === 13 && event.ctrlKey) {
        event.target.submit();
      }
    });
  }
};

const bindReplyClick = (commentElement) => {
  commentElement
    .querySelector('.reaction__item[data-action="reply"]')   // 1.1 Izhet knopku REPLY 
    .addEventListener('click', () => mountReplyForm(commentElement)); // 1.2 Po kliku na REPLY vizivaet funkziu "mountReplyForm"
}

// document.querySelectorAll('.comment').forEach((item) => bindReplyClick(item));
document.querySelectorAll('.comment').forEach(bindReplyClick);  //  1 - Dlya lubogo opublikovannogo kommenta vipolnyaet funkziu "bindReplyClick" 
document.querySelector('form.reply__form').addEventListener('submit', handleFormSubmit); // 2 - Otpravka kommenta pri nazatii na SEND pri pomozhi funkzii "handleFormSubmit" (nuzhno tol'ko dlya osnovnoi vetki - kogda ne sozdaetsya REPLY iz template?)
document.querySelector('form.reply__form').addEventListener("keydown", event => {
  if (event.keyCode === 13 && event.ctrlKey) {
    event.currentTarget.submit();
  }
});

// document.querySelectorAll('.reaction__item').forEach(
//   (item) => item.addEventListener('click', () => console.log('clicked'))
// )

// document.addEventListener('click', (e) => {
//   console.log(e.target.closest('.reaction__item'))
// })


// const keyboardSubmit = (e) => {
//   e = e || window.event;
//   if (e.keyCode === 13 && e.ctrlKey) {
//     console.log("Boom! In your face!");
//   }
// };


// document.body.addEventListener('keydown', function(e) {
// 	if(!(e.keyCode == 13 && (e.metaKey || e.ctrlKey))) return;

// 	var target = e.target;
// 	if(target.form) {
// 		target.form.submit();
// 	}
// });