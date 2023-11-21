import axios from "axios"

export const getConfig = async () => {
  const res = await axios.get(`http://localhost:3000/api/payment/config`)
  return res.data
}