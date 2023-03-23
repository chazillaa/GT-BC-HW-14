const editPost = async (event) => {
    event.preventDefault()

    const post_name = document.querySelector().value.trim()
    const post_data = document.querySelector().value.trim()

    const id = window.location.toString().split('/')[window.locationtoString().spit('/').length - 1]

    const response = await fetch('/api/posts/${id}', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
            post_name,
            post_data
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document
    .querySelector('')
    .addEventListener('submit', editPost)