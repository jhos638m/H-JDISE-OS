// jobs.js

class JobManager {
    constructor() {
        this.jobs = [];
    }

    addJob(job) {
        this.jobs.push(job);
        console.log(`Job ${job.name} added.`);
    }

    removeJob(jobName) {
        this.jobs = this.jobs.filter(job => job.name !== jobName);
        console.log(`Job ${jobName} removed.`);
    }

    listJobs() {
        console.log('Current jobs:');
        this.jobs.forEach(job => {
            console.log(`- ${job.name}, Status: ${job.status}`);
        });
    }
}

// Example usage
const jobManager = new JobManager();
jobManager.addJob({ name: 'Develop Feature A', status: 'In Progress' });
jobManager.addJob({ name: 'Fix Bug B', status: 'Completed' });
jobManager.listJobs();
