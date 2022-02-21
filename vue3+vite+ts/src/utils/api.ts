import axios from 'axios'

interface AxiosConfig {
	timeout: number
}

const config: AxiosConfig = {
	timeout: 60 * 1000,
}

const Axios = axios.create(config)

Axios.interceptors.request.use((req) => {
	req.headers['token'] = 'adhjbnkjnnnkjnknnhjbhknkjbhjbhjbhjbajskkkk'
	return req
})

export default Axios
