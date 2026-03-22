import PocketBase from 'pocketbase';

// Configure your PocketBase URL here
const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

const pb = new PocketBase(PB_URL);

// Disable auto-cancellation for concurrent requests
pb.autoCancellation(false);

export default pb;
