// import axios from 'axios';
// const URL = axios.create({
//     baseURL: 'http://localhost:20403/api'
// });

// let options = {
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
        
//     }
// }
export function getData() {
    return new Promise((resolve, reject) => {
        fetch('/api/recipes', {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()).then(function(data) {
            resolve(Object.assign([], data));
        }).catch(function(error) {                
            return { error: error }
        });
    });
    //return URL.get('/recipes', options).then(res => { return res }).catch(error => { return { error: error } });
}