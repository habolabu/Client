import axiosClient from '../axios/axiosClient';

const emergencyServices = {
  getEmergencyUserID: (params, userId) => {
    const url = `/human/query/api/emergency/user/${userId}`;
    return axiosClient.get(url, { params });
  },
  getEmergencyCurrentUser: (params) => {
    const url = `/human/query/api/emergency`;
    return axiosClient.get(url, { params });
  },
  getEmergencyDetails: (emergencyId) => {
    const url = `/human/query/api/emergency/${emergencyId}`;
    return axiosClient.get(url);
  },
  addEmergency: (data) => {
    const url = '/human/command/api/emergency';
    return axiosClient.post(url, data);
  },
  updateEmergency: (data) => {
    const url = '/human/command/api/emergency';
    return axiosClient.put(url, data);
  },
  deleteEmergency: (emergencyId) => {
    const url = '/human/command/api/emergency';
    return axiosClient.delete(url, { data: emergencyId });
  },
};

export default emergencyServices;
