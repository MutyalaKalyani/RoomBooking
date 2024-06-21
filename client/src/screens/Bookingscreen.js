import React, { useEffect , useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2'
import Error from "../components/Error";
import Loader from "../components/Loader";
import {loadStripe} from '@stripe/stripe-js';
import moment from 'moment';

import AOS from 'aos';
AOS.init();
AOS.refresh()
function Bookingscreen({match}) {
    const[loading, setloading]=useState(true);
    const[error, seterror]=useState(false)
    const[room , setroom]=useState()
    const roomid=match.params.roomid
    const fromdate=moment(match.params.fromdate , 'DD-MM-YYYY')
    const todate=moment(match.params.todate,'DD-MM-YYYY')
    const totalDays = moment.duration(todate.diff(fromdate)).asDays()+1
    const [totalAmount , settotalAmount]=useState()
    useEffect(() => {
        
    const func=async ()=>{
        try {
            setloading(true);
            const data = await (await axios.post("http://localhost:5000/api/rooms/getroombyid" , {roomid})).data;
            setroom(data);
            setloading(false);
            settotalAmount(data.rentperday * totalDays)
          } catch (error) {
            console.log(error);
            setloading(false);
            seterror(true)
          }
        
    }
    func();   
    },[])


    async function tokenHander() {
        const first=match.params.fromdate,
          const last= match.params.todate,
        const bookingDetails ={
            room ,
           first,
            last,
            totalDays,
            totalAmount
        }
        
        const stripe = await loadStripe('');
             setloading(true);
            const response = await axios.post('http://localhost:5000/api/bookings/bookroom' , bookingDetails)
            setloading(false)
            const result =await stripe.redirectToCheckout({
                sessionId:response.data.id
            });
           
            if(result.error){
                Swal.fire('Oops' , 'Something went wrong , please try later' , 'error')
            }
            
            
    }   

    return (
        <div className='m-5'>
            
            {loading ? (<Loader/>) : error ? (<Error/>) : (

                <div className="row p-3 mb-5 bs" data-aos='flip-right' duration='2000'>

                      <div className="col-md-6 my-auto">
                        
                         <div>
                         <h1> {room.name}</h1>
                           <img src={room.imageurls[0]} style={{height:'400px'}} alt='image'/>
                         </div>

                      </div>
                      <div className="col-md-6 text-right">
                           <div>
                           <h1><b>Booking Details</b></h1>
                           <hr />

                           <p><b>Name</b> : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                           <p><b>From Date</b> : {match.params.fromdate}</p>
                           <p><b>To Date</b> : {match.params.todate}</p>
                           <p><b>Max Count </b>: {room.maxcount}</p>
                           </div>
                           
                           <div className='mt-5'>
                           <h1><b>Amount</b></h1>
                           <hr />
                           <p>Total Days : <b>{totalDays}</b></p>
                           <p>Rent Per Day : <b>{room.rentperday}</b></p>
                           <h1><b>Total Amount : {totalAmount} /-</b></h1>

           
            
                  
                  <button className='btn btn-primary' onClick={tokenHander}>Pay Now</button>

                           </div>
                          

                           
                      </div>

                </div>

            )}
        
        </div>
    )
}

export default Bookingscreen
