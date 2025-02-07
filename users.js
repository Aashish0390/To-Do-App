// fetch("https://dummyjson.com/users")
// .then((response) =>{
//     console.log(response.status)
//     console.log(response.status)
//     return response.json()
// }).then((value2) => {
//     console.log(value2)
//     return console.log(value2.users)
// }).catch(error => console.log(error));

document.addEventListener("DOMContentLoaded", function () {
    // fetching data from API 
    fetch("https://dummyjson.com/users")
        .then((res) => res.json())
        .then((data) => {
            let users = data.users;
            let tableBody = document.querySelector(".table-item tbody");

            if (!users || users.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='10'>No data available</td></tr>";
                return;
            }

// .map() creates all rows at once as a single string. and .join("") ensures we don’t add extra commas.
           
let rows = users.map(user => `
                 <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName} ${user.maidenName} ${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.gender}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.birthDate}</td>
                    <td>${user.bloodGroup}</td>
                </tr>
            `).join("");
// used concat for fname mName and lName

            tableBody.innerHTML = rows;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            document.querySelector(".table-item tbody").innerHTML = 
                "<tr><td colspan='10' style='color: red; text-align: center;'>Error loading data</td></tr>";
        });
});
