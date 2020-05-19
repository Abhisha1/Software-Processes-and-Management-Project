import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewBooking.scss';


const confirmationModal = 
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>




function ViewBookings() {
    const [data, setData] = useState({ bookings: [] });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            // Send HTTP POST request to backend endpoint
            await axios('https://jjfresh.herokuapp.com/orders/', { method: "get" })
                .then(res => {
                    console.log(res);
                    setData({ bookings: res.data });
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                });

        }

        fetchData();
    }, [])



    function getOrderedBoxes(produce) {
        var orderDetails = "";
        if (produce.Small > 0) {
            orderDetails += "Small: " + produce.Small;
        }
        if (produce.Medium > 0) {
            if (orderDetails != "") {
                orderDetails += " "
            }
            orderDetails += "Medium: " + produce.Medium;
        }
        if (produce.Large > 0) {
            if (orderDetails != "") {
                orderDetails += " "
            }
            orderDetails += "Large: " + produce.Large;
        }
        return orderDetails;
    }

    return (
        <div>
            {isLoading ?
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Loading...</span>
                </button>
                : (
                    <div>
                        {data.bookings.map((item, index) => (
                            <div className="card" key={index} >
                                <div className="card-body">
                                    <h5 className="card-title">Order</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Delivery date: {new Date(item.date).toDateString()}</h6>

                                    <h6 className="card-subtitle mb-2 text-muted">Delivery time: {new Date(item.date).toLocaleTimeString()}</h6>
                                    <br />
                                    <h6 className="card-subtitle mb-2 text-muted">Order: </h6>
                                    {getOrderedBoxes(item.items.Fruit) ? <p>Fruit {getOrderedBoxes(item.items.Fruit)}</p>
                                        : <div></div>}
                                    {getOrderedBoxes(item.items.Mixed) ? <p>Mixed {getOrderedBoxes(item.items.Mixed)}</p> : <div></div>}
                                    {getOrderedBoxes(item.items.Vegetable) ? <p>Vegetable {getOrderedBoxes(item.items.Vegetable)}</p> : <div></div>}
                                    <div id="EditButtons">
                                        <a id="modify" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Modify</a>
                                        <a id="button1" className="btn btn-primary">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default ViewBookings;