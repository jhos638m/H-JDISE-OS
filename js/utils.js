// Utility functions for ERP system

/**
 * Get current date and time in UTC
 * @returns {string} - Formatted as YYYY-MM-DD HH:MM:SS
 */
function getCurrentDateTimeUTC() {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Format a date to YYYY-MM-DD format
 * @param {Date} date - Date object to format
 * @returns {string} - Formatted date
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Add days to a date
 * @param {Date} date - Original date
 * @param {number} days - Number of days to add
 * @returns {Date} - New date
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export { getCurrentDateTimeUTC, formatDate, addDays };