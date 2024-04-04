const axios = require('axios');

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}


/* Async functions are specially marked with async keywords
after assigning async keyword that function can perform async operations,
now these functions can be invoked by using await keyword before calling
them.
A good example would be a call to another server.


*/