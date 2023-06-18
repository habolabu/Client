/* eslint-disable no-useless-escape */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react';

import { toast } from 'react-toastify';
import userServices from 'src/api/humanServices/userServices';
import { FaEdit } from 'react-icons/fa';
import roleServices from 'src/api/humanServices/roleServices';
import Tippy from '@tippyjs/react';

registerLocale('vi', vi);

const EditUserModal = ({ userId, submitEditUserChange }) => {
  const [visibleAddUser, setVisibleAddUser] = useState(false);
  const [gender, setGender] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [roles, setRoles] = useState([]);
  const [roleSelect, setRoleSelect] = useState(1);

  const sexs = [
    { id: 1, name: 'male', title: 'Nam' },
    { id: 0, name: 'female', title: 'Nữ' },
  ];

  const getUserDetails = async () => {
    try {
      const res = await userServices.getUserDetails(userId);
      if (res && res.data) {
        formik.values.lastName = res.data.response.body.lastName;
        formik.values.firstName = res.data.response.body.firstName;
        formik.values.address = res.data.response.body.address;
        formik.values.idCard = res.data.response.body.idCard;
        formik.values.phoneNumber = res.data.response.body.phoneNumber;
        formik.values.email = res.data.response.body.email;
        setGender(res.data.response.body.gender);
        formik.values.roleId = res.data.response.body.roleId;
        setDateOfBirth(new Date(res.data.response.body.dateOfBirth.slice(0, 10)));
        formik.values.nationality = res.data.response.body.nationality;
      } else {
        toast.error('Thất bại khi lấy thông tin chi tiết tài khoản ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy thông tin chi tiết tài khoản: ', error);
      toast.error('Thất bại khi lấy thông tin chi tiết tài khoản ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [userId]);

  const getRoles = async () => {
    try {
      const res = await roleServices.getAllRole();
      if (res && res.data) {
        setRoles(res.data.response.body);
      } else {
        toast.error('Thất bại khi lấy danh sách quyền ! ', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log('Thất bại khi lấy danh sách quyền: ', error);
      toast.error('Thất bại khi lấy danh sách quyền ! ', { theme: 'colored' });
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      idCard: '',
      phoneNumber: '',
      email: '',
      nationality: '',
      roleId: 1,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Vui lòng điền tên !'),
      lastName: Yup.string().required('Vui lòng điền họ và tên lót !').min(2, 'Tối thiểu 2 ký tự !'),
      address: Yup.string().required('Vui lòng điền địa chỉ !').min(2, 'Tối thiểu 2 ký tự !'),
      idCard: Yup.string()
        .required('Vui lòng điền CCCD !')
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{6}$/, 'Phải là định dạng số và đủ 12 ký tự !'),
      phoneNumber: Yup.string()
        .required('Vui lòng điền số điện thoại !')
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là định dạng số và đủ 10 ký tự !'),
      email: Yup.string()
        .required('Vui lòng điền email !')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email !'),
      nationality: Yup.string().required('Vui lòng điền quốc tịch !').min(2, 'Tối thiểu 2 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          id: userId,
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          idCard: values.idCard,
          phoneNumber: values.phoneNumber,
          email: values.email,
          gender: gender === 1 ? true : false,
          dateOfBirth: dateOfBirth.toISOString().slice(0, 10),
          nationality: values.nationality,
          roleId: roleSelect,
        };
        const res = await userServices.updateUser(params);
        if (res && res.data) {
          toast.success('Sửa thành công !', { theme: 'colored' });
          setVisibleAddUser(false);
          submitEditUserChange();
        } else if (res.error.message !== undefined) {
          toast.error('Thông tin bị trùng. Sửa thất bại !', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Sửa thất bại: ', error);
        toast.error('Sửa thất bại ! ', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Tippy content="Sửa thông tin">
        <CButton color="warning" size="sm" className="me-2" onClick={() => setVisibleAddUser(!visibleAddUser)}>
          <FaEdit />
        </CButton>
      </Tippy>
      <CModal backdrop="static" alignment="center" visible={visibleAddUser} onClose={() => setVisibleAddUser(false)}>
        <CModalHeader>
          <CModalTitle>Sửa tài khoản</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm={11}>
                <CFormLabel htmlFor="lastName" className="col-sm-12 col-form-label">
                  <b>
                    Họ và tên lót <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Nhập họ và tên lót..."
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.lastName} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="firstName" className="col-sm-12 col-form-label">
                  <b>
                    Tên <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Nhập tên..."
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.firstName} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="address" className="col-sm-12 col-form-label">
                  <b>
                    Địa chỉ <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Nhập địa chỉ..."
                  {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.address} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="idCard" className="col-sm-12 col-form-label">
                  <b>
                    CCCD <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="idCard"
                  name="idCard"
                  placeholder="Nhập CCCD..."
                  {...formik.getFieldProps('idCard')}
                />
                {formik.touched.idCard && formik.errors.idCard ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.idCard} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="phoneNumber" className="col-sm-12 col-form-label">
                  <b>
                    Số điện thoại <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại..."
                  {...formik.getFieldProps('phoneNumber')}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.phoneNumber} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="email" className="col-sm-12 col-form-label">
                  <b>
                    Email <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Nhập email..."
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.email} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="gender" className="col-sm-12 col-form-label">
                  <b>
                    Giới tính <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                {sexs.map((sex) => (
                  <CFormCheck
                    key={sex.id}
                    inline
                    type="radio"
                    name="gender"
                    id={sex.name}
                    label={sex.title}
                    defaultChecked={gender === sex.id}
                    onChange={() => setGender(sex.id)}
                  />
                ))}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="dateOfBirth" className="col-sm-12 col-form-label">
                  <b>
                    Ngày sinh <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <DatePicker
                  locale="vi"
                  selected={dateOfBirth}
                  onChange={(date) => setDateOfBirth(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="nationality" className="col-sm-12 col-form-label">
                  <b>
                    Quốc tịch <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="nationality"
                  name="nationality"
                  placeholder="Nhập quốc tịch..."
                  {...formik.getFieldProps('nationality')}
                />
                {formik.touched.nationality && formik.errors.nationality ? (
                  <p className="formik-text-size text-danger mt-1"> {formik.errors.nationality} </p>
                ) : null}
              </CCol>
              <CCol sm={11}>
                <CFormLabel htmlFor="floorNumber" className="col-sm-12 col-form-label">
                  <b>
                    Loại tài khoản <span className="text-danger">*</span>
                  </b>
                </CFormLabel>
                {roles ? (
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(e) => {
                      const selectedRole = e.target.value;
                      setRoleSelect(selectedRole);
                    }}
                  >
                    {roles.map((role) => {
                      return (
                        <option key={role.id} value={role.id}>
                          {role.display}
                        </option>
                      );
                    })}
                  </CFormSelect>
                ) : (
                  <p>Đang lấy quyền...</p>
                )}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddUser(false)}>
              Huỷ
            </CButton>
            <CButton type="submit" color="info">
              Xác nhận
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default EditUserModal;
