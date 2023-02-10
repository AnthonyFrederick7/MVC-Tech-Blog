const editFormHandler = async function(event) {
  event.preventDefault();
  
  const title = document.querySelector('#blogTitle').value;
  const content = document.querySelector('#blogBody').value;
  
  await fetch(`/api/blog/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  document.location.replace('/dashboard');
};

const blogId = document.querySelector('#blogId').value;

const deleteClickHandler = async function() {
  await fetch(`/api/blog/${blogId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document.querySelector('#editBlog')
document.addEventListener('submit', editFormHandler);
document.querySelector('#deleteButton')
document.addEventListener('click', deleteClickHandler);