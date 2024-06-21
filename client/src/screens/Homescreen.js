import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Loader from "../components/Loader";
import Room from "../components/Room";
import { DatePicker } from "antd";
import AOS from 'aos';
import 'antd/dist/reset.css';
AOS.init();
const { RangePicker } = DatePicker;
const Homescreen=() =>{
  const [hotels, sethotels] = useState([]);
  const [duplicatehotes, setduplicatehotes] = useState([]);
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('')
  const [loading, setloading] = useState(false);
  const [searchkey, setsearchkey] = useState('')
  const[type , settype]=useState('all')

  const filterByDate=(dates) =>{

    setfromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
    settodate(moment(dates[1].$d).format('DD-MM-YYYY'))

    var temp=[]
    for (var room of duplicatehotes) {
      var availability = false;
      
      for (var booking of room.currentbookings) {
        
        if(room.currentbookings.length)
        {
          if (
            moment(fromdate).isBetween(booking.fromdate, booking.todate) ||
            moment(todate).isBetween(booking.fromdate, booking.todate)
          ) {
            if (
              fromdate=== booking.fromdate &&
            todate=== booking.todate &&
             fromdate === booking.fromdate &&
              todate=== booking.todate
            ) {
              availability = true;
            }
          }
        }
        
        
      }
      if(!availability || room.currentbookings.length===0) 
        {
          temp.push(room)
        }
     
    }
    sethotels(temp)
  }

  useEffect( () => {
    const func=async()=>{
    try {
      setloading(true);
      const rooms = await (await axios.get("http://localhost:5000/api/rooms/getallrooms")).data;
      sethotels(rooms);
      setduplicatehotes(rooms)
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }}
    func()
  }, []);

  function filterBySearch()
  {
    const dupdate = duplicatehotes.filter(room=>room.name.toLowerCase().includes(searchkey))
    sethotels(dupdate)
  }

  function filterByType(e)
  {
    settype(e)
    if(e.toLowerCase()!=='all'){
      const dupdate = duplicatehotes.filter(room=>room.type.toLowerCase()===(e.toLowerCase()))
      sethotels(dupdate)
    }
    else{
      sethotels(duplicatehotes)
    }
   
  }

  return (
    <div className="mt-5">
      <div className="container">
        <div className="row bs p-3 m-5">
          <div className="col-md-4">
            <RangePicker style={{ height: "38px" }} onChange={filterByDate} format='DD-MM-YYYY' className='m-2'/>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control i2 m-2"
              placeholder='Search Rooms'
              value={searchkey}
              onKeyUp={filterBySearch}
              onChange={(e)=>{setsearchkey(e.target.value)}}
            />
          </div>
          <div className="col-md-4">
            <select className="form-control m-2" value={type} onChange={(e)=>{filterByType(e.target.value)}} >

            <option value="all">All</option>
              <option value="delux">Delux</option>
              <option value="non-delux">Non Delux</option>
              
            </select>
          </div>
        </div>
      </div>
<div align="center">
               <h3> Please, choose the Start and End date For Room Booking!!</h3>
              </div>

      <div className="row justify-content-center">
        {loading ? (
          <Loader />
        ) : (
          hotels.map((room) => {
            return (
              <div className="col-md-8" data-aos='zoom-in'>
                <Room room={room} fromdate={fromdate} todate={todate}/>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
