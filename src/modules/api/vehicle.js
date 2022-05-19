import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getVehicle = (page, limit, type, search, location) => {
  const getURL =
    URL +
    `/vehicles?page=${page}&limit=${limit}&types=${type}&name=${search}&location=${location}`;
  return axios.get(getURL);
};

export const deleteVehicle = (id) => {
  const deleteURL = URL + `/vehicles/${id}`;
  return axios.delete(deleteURL);
};

export const addVehicle = (body) => {
  const addURL = URL + `/vehicles/add-vehicle`;
  return axios.post(addURL, body, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const updateVehicle = (body, id) => {
  const addURL = URL + `/vehicles/update/${id}`;
  return axios.patch(addURL, body, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
