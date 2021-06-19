/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const addCommentHandler = async(event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    if (comment) {
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            header: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/post');
        } else {
            alert(response.statusText);
        }
    }
};
document.querySelector('#add-comment').addEventListener('submit', addCommentHandler);