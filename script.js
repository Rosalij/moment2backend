

let url = "http://localhost:3000/workexperience"
let experience = ["sfa", "sdg", "sdf"]
getData();
createExperience(experience);

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    console.log("this is the data", data)
};


async function createExperience(expArray) {
    let experiences = {
        company: expArray[0],
        jobtitle: expArray[1],
        location: expArray[2]
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(experiences)
    });

    const data = await response.json();
    console.log("this is the last data:", data)
} 