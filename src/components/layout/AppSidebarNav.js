// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CBadge } from '@coreui/react';
import authServices from 'src/api/auth/authServices';
import { permissionLocal } from 'src/utils/permissionLocal';

export const AppSidebarNav = ({ items }) => {
  const location = useLocation();
  const [permissions, setPermissions] = useState(null);
  let permissionsAccount = [];

  const getPermissions = async () => {
    try {
      const res = await authServices.getAllPermissionCurrentUser();
      if (res && res.data) {
        res.data.response.body.forEach((permissionsRoles) => {
          permissionsRoles.permissions.forEach((permissionDocument) => {
            permissionDocument.permissionDocuments.forEach((permission) => {
              if (permission.status) {
                permissionsAccount.push(permission.name);
              }
            });
          });
        });
        permissionLocal.saveData(permissionsAccount);
        setPermissions(permissionsAccount);
      } else {
        console.log('Thất bại khi lấy danh sách quyền');
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách quyền: ', error);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    const isSubset = item.permissions.every((value) => permissions.includes(value));

    if (isSubset || item.permissions.length === 0) {
      return (
        <Component
          {...(rest.to &&
            !rest.items && {
              component: NavLink,
            })}
          key={index}
          {...rest}
        >
          {navLink(name, icon, badge)}
        </Component>
      );
    } else {
      return;
    }
  };

  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    const isSubset = item.permissions.every((value) => permissions.includes(value));

    if (isSubset || item.permissions.length === 0) {
      return (
        <Component
          idx={String(index)}
          key={index}
          toggler={navLink(name, icon)}
          visible={location.pathname.startsWith(to)}
          {...rest}
        >
          {item.items?.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
        </Component>
      );
    } else {
      return;
    }
  };

  return (
    <>
      {permissions !== null &&
        items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
