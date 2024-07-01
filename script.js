async function getFormId(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
        } catch (error) {
        alert('There was a problem with the fetch operation:', error);
    }
}
async function postData(url, data) {
// Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc\
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    // Store the response as JSON
    const responseData = await response.json();
    return responseData; // parses JSON response into native JavaScript objects
}


const getFormIdURL = "https://anticheat.up.railway.app/create"

const formLinkBaseURL = "https://form-container.netlify.app"
const reportLinkBaseURL = "https://form-view.netlify.app"
document.getElementById("generate").onclick = () => {
    const inputValue = document.getElementById("input").value
    document.getElementById("results").style.display = "flex";
    document.getElementById("results").style.flexDirection = "column";
    const formLink = document.getElementById("formLink")
    const reportLink = document.getElementById("reportLink")
    const data = { url: inputValue };
    postData(getFormIdURL, data).then(responseData => {
        formLink.innerText = `${formLinkBaseURL}?code=${responseData.id}`
        reportLink.innerText = `${reportLinkBaseURL}?code=${responseData.id}`; 
    }).catch(error => {
        console.error('Error:', error);
    });
}