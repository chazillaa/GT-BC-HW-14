const commentPost = async (event) => {
    event.preventDefault()

    const comment_data = document.querySelector().value.trim()
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

    if (comment_data) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment_data
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
    }
}

document
    .querySelector('')
    .addEventListener('submit', commentPost);