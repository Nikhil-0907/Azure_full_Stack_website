function sendData() {
  const name = document.getElementById('name').value;

  if (!name) {
    alert("Please enter your name!");
    return;
  }

  const output = document.getElementById('output');
  output.innerText = "Loading";

  fetch(`/api?name=${name}`)
    .then(res => res.json())
    .then(data => {
      output.innerText = data.message;
    })
    .catch(() => {
      output.innerText = "Something went wrong";
    });
}