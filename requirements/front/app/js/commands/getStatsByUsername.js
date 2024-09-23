async function getStatsByUsername(username) {
    const http_adapter = new HttpAdapter(`http://localhost:9009/api/stat/?username=${username}`);
    try {
        const json = await http_adapter.fetchByCookie();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}