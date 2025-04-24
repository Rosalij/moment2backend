

let url = "http://127.0.0.1:3000"
getData()
async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    console.log("this is the data", data)
};


async function createExperience(expArray) {
    let experience = {
        company: expArray[0],
        jobtitle: expArray[1],
        location: expArray[2]
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(experience)
    });

    const data = await response.json();
    console.log("this is the last data:", data)
} 