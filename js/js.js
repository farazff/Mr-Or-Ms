function checkForm(event)
{
    let reg_expr = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    let name = document.getElementById('name').value
    if(name.length > 255)
    {
        alert("invalid name")
    }

    if(reg_expr.test(name))
    {
        // alert("ok")
    }

    fetch('https://api.genderize.io/?name=hassan')
        .then(response => response.json())
        .then((data) => {
                            document.getElementById('gender').innerHTML = JSON.stringify(data['gender']);
                            document.getElementById('percentage').innerHTML = JSON.stringify(data['probability'])
                        })

}

document.getElementById("submit").onclick = checkForm;