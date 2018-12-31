class Request {
  static COMMON_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  constructor(url) {
    this.url = url;
  }

  async get() {
    try {
      const response = await fetch(this.url, {
        headers: {...Request.COMMON_HEADERS},
        mode: 'cors',
        method: 'GET'
      });
      return await response.json();
    } catch(error) {
      // TODO: DANGER! CATASTROPHIC FAILURE ALERT!!
      console.log(error);
    }
  }

  async post(body) {
    try {
      const response = await fetch(this.url, {
        headers: {...Request.COMMON_HEADERS},
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch(error) {
      // TODO: DANGER! CATASTROPHIC FAILURE ALERT!!
      console.log(error);
    }
  }
}

export default Request;