import { useEffect, useState } from "react"
import { dummyBookingData } from "../../assets/assets"
import Loading from "../../components/Loading"
import Title from "../../components/amin/Title"
import { dateFormat } from "../../lib/dateFormat"
import { useAppContext } from "../../../context/AppContext"

function ListBookings() {
  
  const {user, axios, getToken} = useAppContext()  
  
  const currency = import.meta.env.VITE_CURRENCY  

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllBookings = async() => {
    try {
      const {data} = await axios.get('/api/admin/all-bookings',{
          headers: {Authorization: `Bearer ${await getToken()}`}
      })
      setBookings(data.bookings)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if(user) getAllBookings()
  },[user])

  return !isLoading ? (
    <>
        <Title text1="List" text2="Bookings" />
        <div className="max-w-4xl mt-6 overflow-x-auto">
        <thead>
            <tr className="bg-primary/20 text-left text-white">
                <th className="p-2 font-medium pl-5">User Name</th>
                <th className="p-2 font-medium">Movie Name</th>
                <th className="p-2 font-medium">Show Time</th>
                <th className="p-2 font-medium">Seats</th>
                <th className="p-2 font-medium">Amount</th>
            </tr>
        </thead>
        <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
                <tr key={index} className="border-b border-primary/20 bg-primary/5 even:bg-primary/10">
                    <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
                    <td className="p-2">{item.show.movie.title}</td>
                    <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                    <td className="p-2">
                        {Object.keys(item.bookedSeats).map(seat => 
                            item.bookedSeats[seat]
                        ).join(", ")}
                    </td>
                    <td className="p-2">{currency} {item.amount}</td>
                </tr>
            ))}
        </tbody>
        </div>
    </>
  )
  :
  (
    <Loading />
  )
}

export default ListBookings