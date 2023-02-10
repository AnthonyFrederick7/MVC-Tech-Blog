const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value;
    const description = document.querySelector('#blogDescription').value;
  
    await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace('/dashboard');
  };
  
  document.querySelector('#newBlog')
  document.addEventListener('submit', newFormHandler);