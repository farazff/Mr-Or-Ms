//This function hide all kinds of errors by chang their visibility to hidden
function hideErrors()
{
    document.getElementById("name-error").style.visibility = 'hidden'
    document.getElementById("gender-error").style.visibility = 'hidden'
    document.getElementById("prediction-error").style.visibility = 'hidden'
    document.getElementById("network-error").style.visibility = 'hidden'
}

let prediction = null

//This function runs when the user press the submit button
//It checks name and then send the request to API and shows the answer in prediction part
//Also if there is something in memory it shows it in memory part
//Also server error is handled
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
                        }).catch((error) => {
        document.getElementById("network-error").style.visibility = 'visible'
    })

    let saved = localStorage.getItem(name)
    if(saved !== null)
        document.getElementById("saved").innerHTML = localStorage.getItem(name);
    else
        document.getElementById("saved").innerHTML = 'No history'
}

document.getElementById("submit").onclick = checkForm;


//This function runs when the user press the save button
//This button first checks if any of the radio buttons is pressed then it save it
//But if there is not any radio button pressed then it applies the prediction result
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

//This button deletes the Gender for entered name
function clearData(event)
{
    let name = document.getElementById('name').value
    localStorage.removeItem(name)
    location.reload()
}

document.getElementById("clear").onclick = clearData;

