// Quotation System Functionality

class QuotationSystem {
    constructor() {
        this.quotations = [];
    }

    addQuotation(quotation) {
        const timestamp = new Date().toISOString();
        this.quotations.push({ quotation, timestamp });
    }

    getQuotations() {
        return this.quotations;
    }

    clearQuotations() {
        this.quotations = [];
    }
}

// Example usage
const myQuotationSystem = new QuotationSystem();
myQuotationSystem.addQuotation("The future belongs to those who believe in the beauty of their dreams.");
console.log(myQuotationSystem.getQuotations());
