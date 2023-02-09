const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value;
    const description = document.querySelector('#blog-description').value;
  
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
  
  document
    .querySelector('#new-blog-form')
    .addEventListener('submit', newFormHandler);