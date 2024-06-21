import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Success=({match})=> {
  const {id,name,fromdate,todate,amount,totalDays}=match.params
  const user =JSON.parse(localStorage.getItem('currentUser'));
  Swal.fire('Booking ','Continue Booking','success')
  useEffect(()=>{
   
    const func=async ()=>{
     const response=await axios.post( "http://localhost:5000/api/bookings/complete",{id,name,fromdate,todate,amount,totalDays,user})
    alert(response.data);
    }
    func();
    })



  return (
    <div className="alert alert-success" role="alert">
      <div class='d-flex align-items-center justify-content-center'>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Thanks for visiting</h5>
        <p class="card-text">Continue Booking</p>
        <a href="/home" class="btn btn-primary">Click here</a>
      </div>
    </div>
   </div>
  </div>
  );
}
export default  Success