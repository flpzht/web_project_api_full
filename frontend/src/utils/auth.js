export const BASE_URL = "https://api.flp-around-us.verymad.net";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject({
          status: res.status,
          message: "um dos campos foi preenchido incorretamente",
        });
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok
      ? res.json().then((data) => ({ jwt: data.token ?? data.jwt, ...data }))
      : Promise.reject({
          status: res.status,
          message: "um ou mais campos não foram fornecidos",
        });
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject({
          status: res.status,
          message: "O token fornecido é inválido",
        });
  });
};
