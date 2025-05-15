import axios from "axios";
const BASE_URL = import .meta.env.VITE_API_URL;

class NewRouteService {
    static async createRoute({ data }) {
        try {
            const response = await axios.post(
                `${BASE_URL}/routes`, data
            )
            if (response.status === 201) {
                return response.status;
            }
            return response.data;
        } catch (error) {
            console.log('Error creating route:', error);
        }
    }
}

export default NewRouteService