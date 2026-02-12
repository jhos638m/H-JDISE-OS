// system configuration functionality

const systemConfig = {
    dateTime: new Date().toISOString().replace('T', ' ').substring(0, 19), // current Date and Time in UTC
    getUserLogin: function() {
        return 'jhos638m'; // current user's login
    },
};

module.exports = systemConfig;