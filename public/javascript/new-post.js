async function newPost(event) {
    event.preventDefault();
    //*pay attention to these classes
    const id = document.querySelector('input[name="post-id"]').value;
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('textarea[name="post-body"]').value;

    let url = '/api/posts'
    let method = 'POST'
    if( !!id ){
        url += '/' + id
        method = 'PUT'
    }

    const response = await fetch(url, {
        method,
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

document.querySelector('.create-post-form').addEventListener('submit', newPost);