const SWAP_PAGE_TITLE = "SWAP_PAGE_TITLE";
const ADD_USERNAME = "ADD_USERNAME";

function swapPageTitle(pageTitle) {

  return {

    type: SWAP_PAGE_TITLE,
    pageTitle
  };
}

function addUsername(username) {

  return {

    type: ADD_USERNAME,
    username
  };
}

function doFetchUsername() {

  return (dispatch) => {

    let url = `${window.location.origin}/user`;
    return fetch(url).then(response => {

      return response.json();
    }).then(resObj => {

      return dispatch(addUsername(resObj.username));
    });
  };
}

module.exports = {

  SWAP_PAGE_TITLE,
  ADD_USERNAME,

  swapPageTitle,
  addUsername,

  doFetchUsername
};
