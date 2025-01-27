import instance from './axiosConfig';

export const registerUser = async (userInfo) => {
  const data = await instance.post('/users/register', userInfo);
  return data;
};

export const loginUser = async (userInfo) => {
  const data = await instance.post('/users/login', userInfo);
  return data;
};

export const logOutUser = async () => {
  await instance.post('/users/logout');
};

export const currentUser = async () => {
  const data = await instance.get('/users/current');
  return data;
};

export const updateUserInfo = async (userInfo) => {
  const data = await instance.patch('/users/info', userInfo);
  return data;
};

export const updateUserPhoto = async (formData) => {
  const data = await instance.patch('/users/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const requestUserCount = async () => {
  const data = await instance.get('/users/count');
  return data;
};

export const updateUserAccessById = async (id, { access }) => {
  const data = await instance.patch(`/users/${id}/access`, { access });
  return data;
};
