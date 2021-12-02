function hideErrors()
{
    document.getElementById("name-error").style.visibility = 'hidden'
    document.getElementById("gender-error").style.visibility = 'hidden'
    document.getElementById("prediction-error").style.visibility = 'hidden'
}

let prediction = null

function checkForm(event)
{
    prediction = null
    hideErrors()
    let reg_expr = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    let name = document.getElementById('name').value
    if(name.length > 255)
    {
        document.getElementById("name-error").style.visibility = 'visible'
        return
    }

    if(!reg_expr.test(name))
    {
        document.getElementById("name-error").style.visibility = 'visible'
        return
    }

    let url = 'https://api.genderize.io/?name=' + name
    fetch(url)
        .then(response => response.json())
        .then((data) => {
                            if(data['gender'] == null)
                            {
                                document.getElementById("prediction-error").style.visibility = 'visible'
                                return
                            }
                            prediction = JSON.stringify(data['gender'])
                            document.getElementById('gender').innerHTML = JSON.stringify(data['gender'])
                            document.getElementById('percentage').innerHTML = JSON.stringify(data['probability'])
                        })

    let saved = localStorage.getItem(name)
    if(saved !== null)
        document.getElementById("saved").innerHTML = localStorage.getItem(name);
    else
        document.getElementById("saved").innerHTML = 'No history'
}

document.getElementById("submit").onclick = checkForm;


function saveForm(event)
{
    hideErrors()
    let reg_expr = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    let name = document.getElementById('name').value
    if(name.length > 255)
    {
        document.getElementById("name-error").style.visibility = 'visible'
    }

    if(!reg_expr.test(name))
    {
        document.getElementById("name-error").style.visibility = 'visible'
    }

    let rbs = document.querySelectorAll('input[name="gender"]');
    let selectedValue;
    for (let rb of rbs)
    {
        if (rb.checked)
        {
            selectedValue = rb.value;
            break;
        }
    }


    if(selectedValue == null && prediction == null)
    {
        document.getElementById("gender-error").style.visibility = 'visible'
        return
    }

    if(selectedValue != null)
    {
        localStorage.removeItem(name)
        localStorage.setItem(name, selectedValue);
        location.reload()
        return
    }
    if(prediction != null)
    {
        localStorage.removeItem(name)
        localStorage.setItem(name, prediction);
        location.reload()
    }
}

document.getElementById("save").onclick = saveForm;


function clearData(event)
{
    let name = document.getElementById('name').value
    localStorage.removeItem(name)
    location.reload()
}

document.getElementById("clear").onclick = clearData;

