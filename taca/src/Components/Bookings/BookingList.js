import React, { useEffect, useState } from 'react';
import './BookingCard.css';
import BookingCard from './BookingCard';
import axios from '../../axiosConfig';
import { useSelector } from 'react-redux';

const BookingList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const restaurant = useSelector((state) => state.restaurant.restaurant);

  useEffect(() => {
    // Fetch data from the backend API using Axios
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`/bookings/${restaurant._id}`); // Replace with your actual API endpoint
        setReservations(response.data);

        console.log("dfjakldfj;dlkjf",response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservation data:', error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [restaurant._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-list-container">
      <h2 className="heading">Reservations</h2>
      <div className="booking-list">
        {reservations.map((reservation, index) => (
          <BookingCard key={index} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default BookingList;
