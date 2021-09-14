document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get('answer').trim()) {
        const object = {};
      formData.forEach((value, key) => object[key] = value);
    // formData.append('answer', value);
      console.log('form', object);
        document.formName.reset();   // Mozhno li ydalit' cherez formData.delete()
        
        const commentTemplate = document.getElementById('comment-item');
        const replyTemplate = document.getElementById('reply-item');
        if (commentTemplate && replyTemplate) {
          const commentClone = commentTemplate.content.cloneNode(true);
          const replyClone = replyTemplate.content.cloneNode(true);
          const commentChild = commentClone.firstElementChild;
          const replyChild = replyClone.firstElementChild;
          // console.log(commentChild);
          // console.log(replyChild);

          const commentContainer = document.querySelector('.reaction');
          commentContainer.appendChild(commentChild);
          const a = commentChild.querySelector('.user-comment');
          a.innerHTML = object.answer;
    }

    }
  });


  


  




    // document.querySelector('form').addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     if (formData.get('answer').trim()) {
    //       const object = {};
    //       formData.forEach((value, key) => object[key] = value);
    //       console.log('form', object);
    //       document.formName.reset();   // Mozhno li ydalit' cherez formData.delete()
    //     }
    //   });