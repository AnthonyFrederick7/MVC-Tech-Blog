const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const blogId = document.querySelector('#blogId').value;
    const userId = document.querySelector('#userId').value;
    const comment = document.querySelector('#commentBody').value;
  
    if (comment) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          blogId,
          userId,
          comment
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      document.location.reload();
    }
  };

  if(document.querySelector('#newComment')) {
    document.querySelector('#newComment')
    document.addEventListener('submit', commentFormHandler);
  }