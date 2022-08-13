import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://4859-138-99-71-103.sa.ngrok.io',
    timeout: 1000,
    headers: {'Content-Type':'application/json'}
  });
  export default instance