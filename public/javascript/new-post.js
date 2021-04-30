async function newPost(event) {
    event.preventDefault();
//*pay attention to these classes
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('input[name="post-body"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
//*pay attention to classes
document.querySelector('.new-post-form').addEventListener('submit', newPost);