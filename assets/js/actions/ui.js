export const SWAP_PAGE_TITLE = "SWAP_PAGE_TITLE";
export const ADD_USERNAME = "ADD_USERNAME";

export function swapPageTitle(pageTitle) {

  return {

    type: SWAP_PAGE_TITLE,
    pageTitle
  };
}

export function addUsername(username) {

  return {

    type: ADD_USERNAME,
    username
  };
}

export function doFetchUsername() {

  return (dispatch) => {

    let url = `${window.location.origin}/user`;
    return fetch(url).then(response => {

      return response.json();
    }).then(resObj => {

      return dispatch(addUsername(resObj.username));
    });
  };
}
