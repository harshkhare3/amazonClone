import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-app-93a48.cloudfunctions.net/app' //API (Cloud Function) URL
  // http://localhost:5001/app-93a48/us-central1/app
});

export default instance;