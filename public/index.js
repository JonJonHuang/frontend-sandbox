
document.addEventListener('DOMContentLoaded', () => {
    axios.get('/api').then(response => {
        console.log(response);
        console.log(response.data.slice(0, 32));
        document.getElementById('image').setAttribute('src', 'data:image/jpeg;base64,' + response.data[0]);
    }).catch(reason => {
        console.error(reason);
    });

    document.getElementById('left').addEventListener('click', (env) => {
        document.getElementById('image').classList.add('left');
        document.getElementById('image').classList.remove('right');
    });
    
    document.getElementById('right').addEventListener('click', (env) => {
        document.getElementById('image').classList.add('right');
        document.getElementById('image').classList.remove('left');
    });
});

