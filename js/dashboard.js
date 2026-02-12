// dashboard.js

const dashboard = () => {
    // Get current date and time in UTC
    const now = new Date();
    const formattedDate = now.toUTCString();

    // Display date and time on the dashboard
    console.log('Current Date and Time (UTC):', formattedDate);

    // Add more dashboard functionality here
};

dashboard();