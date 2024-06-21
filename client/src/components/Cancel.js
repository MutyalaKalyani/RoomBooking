
import { useEffect } from 'react'
import Swal from 'sweetalert2'
const Cancel = () => {
    useEffect(()=>{
    Swal.fire('Booking Cancelled','Continue Booking','error')
    },[]
)
  return (
    
   <div class='d-flex align-items-center justify-content-center'>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Thanks for visiting</h5>
        <p class="card-text">Continue Booking</p>
        <a href="/home" class="btn btn-primary">Click here</a>
      </div>
    </div>
   </div>
  )
}

export default Cancel