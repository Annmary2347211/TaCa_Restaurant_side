import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Dashboard.css';
import CreateTableModal from '../CreateTableModal/CreateTableModal';
import RestaurantLayout from '../RestaurantLayout/RestaurantLayout';

const Dashboard = () => {
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
        </div>
        <h4>Welcome {restaurant?.name}</h4>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div className="dashboard-card">
            <h3>Total Bookings</h3>
            <p>567</p>
          </div>
          <div className="dashboard-card">
            <h3>Total Incomes</h3>
            <p>$12,345</p>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="dashboard-section">
            <h3>Sales Overview</h3>
            <div className="graph-placeholder">Graph Placeholder</div>
          </div>
          <div className="dashboard-section">
            <h3>Customer Feedback</h3>
            <div className="graph-placeholder">Graph Placeholder</div>
          </div>
          <div className="dashboard-section">
            <h3>Reservation Statistics</h3>
            <div className="graph-placeholder">Graph Placeholder</div>
          </div>
        </div>

        
      </div>
      <div className="reslayout">
        <div className="table-create-btn">
          <h3>Create Tables</h3>
          
          <button className="create-table-button" onClick={openModal}>
            +
          </button>
        </div>
        <RestaurantLayout />
      </div>
      {isModalOpen && <CreateTableModal onClose={closeModal} />}
    </>
  );
};

export default Dashboard;
