const BASE_URL = "";

export async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const text = await response.text();
            console.error(`Request to ${url} failed. Status: ${response.status}. Response: ${text}`);
            throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return await response.text();
    } catch (error) {
        console.error(`Fetch error for ${url}:`, error);
        throw error;
    }
}

export default BASE_URL;
