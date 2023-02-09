const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const blog_id = document.querySelector('#blog-id').value;
    const user_id = document.querySelector('#user-id').value;
    const comment = document.querySelector('#comment-body').value;
  
    if (comment) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          blog_id,
          user_id,
          comment
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      document.location.reload();
    }
  };
  
  if(document.querySelector('#new-comment-form')) {
    document
      .querySelector('#new-comment-form')
      .addEventListener('submit', commentFormHandler);
  }