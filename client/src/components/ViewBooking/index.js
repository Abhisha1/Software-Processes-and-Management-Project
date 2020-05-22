import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './viewBooking.scss';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    console.log(value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function ViewBookings(props) {
    const [data, setData] = useState({ bookings: [] });
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [id, setId] = useState();
    const target = useRef();

    const showModal = () => {
        setIsOpen(true);
    }
    const modifyModal = (id) => {
        console.log(id);
        setId(id);
        setIsModify(true);
        showModal();
    }
    const deleteModal = (id) => {
        console.log(id);
        setId(id);
        setIsModify(false);
        showModal();
    }
    const hideModal = () => {
        setIsOpen(false);
    }
    useEffect(() => {
        const fetchData = async () => {
            axios.post('http://localhost:5000/users/getCurrUser', { id: getCookie("uId") })
                .then(res => {
                    console.log(res);
                    setEmail(res.data.data.email);
                    return res.data.data.email;
                })
                .then(
                    email => axios.get("http://localhost:5000/orders/" + email + "/")
                )
                .then(booking => {
                    console.log(booking)
                    setData({ bookings: booking.data });
                    console.log(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                })
        }
        fetchData()
    }, []);



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

    async function removeOrder(){
        console.log(id);
        await axios.get("http://localhost:5000/orders/delete/"+ id)
        .then(res => {
            setIsOpen(false);
            console.log(res);
            toast("Your order has been successfully removed");
            setIsLoading(true);
            if (isModify){
                props.history.push("/order");
            }
            else{
                let newBookings = []
                data.bookings.map((item) => {
                    if (item._id !== id){
                        newBookings.push(item);
                    }
                })
                console.log(newBookings)
                setData({bookings: newBookings});
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <ToastContainer />
            {isLoading ?
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Loading...</span>
                </button>
                : (data.bookings.length ?
                    <div id="orderCards">
                        {console.log(data.bookings)}
                        {data.bookings.map((item) => (
                            <div className="card" key={item._id} >
                                <div className="card-body" target={target.current}>
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
                                        <a id="modify" className="btn btn-primary" ref={target} onClick={() => modifyModal(item._id)}>Modify</a>
                                    <a id="remove" className="btn btn-primary" ref={target} onClick={() => deleteModal(item._id)}>Remove</a>
                                    </div>
                                    <Modal show={isOpen} onHide={hideModal}>
                                        <Modal.Header>
                                            <Modal.Title>Confirmation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to do this?</Modal.Body>
                                        <Modal.Footer>
                                            <button className="btn btn-primary" onClick={hideModal}>Cancel</button>
                                            {isModify ? <button className="btn btn-primary" onClick={() => removeOrder()}>Modify</button>
                                            : <button id="confirmDelete" className="btn btn-primary" onClick={() => removeOrder()}>Delete</button>}
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <p>
                        {console.log("no orders")}You don't have any orders yet</p>

                )
            }
        </div>
    );
}

export default ViewBookings;