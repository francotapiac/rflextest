
import axios from 'axios'

export const getStandarDollars = () => {
    return axios.get('http://127.0.0.1:8000/api/standardollars')
}