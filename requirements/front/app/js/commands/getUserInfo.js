async function getUserInfo() {
    const http_adapter = new HttpAdapter('http://localhost:9009/api/stat/');
    try {
        const json = await http_adapter.fetchByCookie();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}