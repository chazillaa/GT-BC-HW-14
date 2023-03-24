const addPost = async (event) => {
    event.preventDefault()

    const post_name = document.querySelector().value.trim()
    const post_data = document.querySelector().value.trim()

    const response = await fetch('/api/posts', {
        method: 'POST',
        body : JSON.stringify({
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
    .querySelector('makeButton')
    .addEventListener('submit', addPost)