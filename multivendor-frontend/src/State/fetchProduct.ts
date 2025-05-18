import axios from "axios"
const api = "localhost:8080"

const fetchProduct =async()=>{
    try {
         const response = await axios.get(api);
    } catch (error) {
        
    }
}