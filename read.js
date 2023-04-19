var btn = document.getElementById('btn')
btn.addEventListener('click', hello)

function hello(){
    var n = document.getElementById('name').value
    var b = document.getElementById('branch').value
    var p = document.getElementById('phone').value

    fetch("http://127.0.0.1:5500/post", {
     
    // Adding method type
        method: "POST",
        
        // Adding body or contents to send
        body: JSON.stringify({
            name: n,
            branch: b,
            phone: p
        }),
        
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    // Converting to JSON
    .then(response => response.json())
    
    // Displaying results to console
    .then(json => console.log(json));
}