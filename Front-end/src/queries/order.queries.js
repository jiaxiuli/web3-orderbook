import axios from "axios";

export const getOrder = async () => {
    const response = await axios.get("http://localhost:3100/api/orderbook");
    return response;
};