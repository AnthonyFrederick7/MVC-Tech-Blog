const blogId = document.querySelector('#blog-id').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value;
  const content = document.querySelector('#blog-body').value;

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

const deleteClickHandler = async function() {
  await fetch(`/api/blog/${blogId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-blog-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);