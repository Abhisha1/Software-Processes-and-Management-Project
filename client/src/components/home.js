import React, { useState, useEffect } from 'react';

function Home(){
        return (
            <div>
                <h3>Home</h3>
                <a href="/viewBookings" className="btn btn-primary">View all orders</a>
            </div>
        );
}

export default Home;