const Restaurant = require('../models/restaurant');

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find(); // Fetches all restaurants from the database
        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

