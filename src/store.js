// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import { legacy_createStore as createStore } from 'redux';

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
  avatarUser: 'https://res.cloudinary.com/dzd9sonxs/image/upload/v1664544714/avatar/default-avatar_xh2rub.png',
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
