// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

export const permissionLocal = {
  localStorageName: 'permissions',
  data: null,

  saveData: (data) => {
    permissionLocal.data = JSON.stringify(data);
    localStorage.setItem(permissionLocal.localStorageName, JSON.stringify(data));
  },

  getData: () => {
    return JSON.parse(localStorage.getItem(permissionLocal.localStorageName));
  },

  isExistPermission: (permissionName) => {
    return permissionLocal.getData().includes(permissionName);
  },
};
