const form = document.querySelector('#prompt_maker');
var form_data = new FormData(form);
var resps = [];

prompt_maker.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    for (const formElement of formData) {
        //console.log(formElement);

        const data = {
            prompt: formElement[1],
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        };
        const API_KEY = secrets.API_KEY;

        let response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            let nu_resp = await response.json();
            console.log(nu_resp["choices"][0].text);
            resps.push({ prompt: formElement[1], response: nu_resp["choices"][0].text});
        }
        
    }
    console.log(resps);

    document.getElementById("output").innerHTML = "";

    for (const resp of resps) {
        var nu_addition = `<div class="card"><div class="card-body"><h5 class="card-title">${resp.prompt}</h5><p class="card-text">${resp.response}</p> </div></div>`
        var new_addition = document.getElementById("output").innerHTML;
        document.getElementById("output").innerHTML = nu_addition + new_addition;
    }
}