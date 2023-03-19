import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibAngellist, cilLockLocked, cilUser } from '@coreui/icons';

import Helmet from 'src/components/helmet/helmet';

import authServices from 'src/api/auth/login';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: 'test.admin',
      password: '12345678',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Không được để trống tên tài khoản !').min(5, 'Tối thiểu 5 ký tự !'),
      password: Yup.string().required('Không được để trống mật khẩu !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      let loadingLogin = document.getElementById('loadingLogin');
      loadingLogin.classList.add('show');

      try {
        const params = {
          username: values.username,
          password: values.password,
        };
        const res = await authServices.postLogin(params);
        if (res.response.message === 'Successful') {
          let jwtDecodeAuth = jwt_decode(res.response.body);
          Cookies.set(jwtDecodeAuth.aud, res.response.body, { expires: 1 });

          loadingLogin.classList.remove('show');
          navigate(`${jwtDecodeAuth.role}/trang-tong-quan`);

          toast.success('Đăng nhập thành công !', { theme: 'colored' });
        } else {
          loadingLogin.classList.remove('show');
          toast.error('Đăng nhập thất bại !', { theme: 'colored' });
        }
      } catch (error) {
        loadingLogin.classList.remove('show');
        toast.error('Đăng nhập thất bại !', { theme: 'colored' });
      }
    },
  });

  const toogleShowHidePassword = () => {
    let tooglePassword = document.getElementById('password');
    let btnPassword = document.getElementById('btnPassword');
    if (tooglePassword.type === 'password') {
      tooglePassword.type = 'text';
      btnPassword.classList.remove('fa-eye');
      btnPassword.classList.add('fa-eye-slash');
    } else {
      tooglePassword.type = 'password';
      btnPassword.classList.remove('fa-eye-slash');
      btnPassword.classList.add('fa-eye');
    }
  };

  return (
    <Helmet title="Đăng nhập" role="Auth">
      {/* loading login */}
      <div className="loading-login" id="loadingLogin">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* login ui */}
      <div className="bg-login min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center align-items-center">
            <CCol md={8} lg={6} xxl={4}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={formik.handleSubmit}>
                      <h2 className="text-center mb-4">Đăng nhập</h2>
                      <p className="text-center">
                        <CIcon icon={cibAngellist} size="lg" />
                        Chào mừng bạn đến với Habolabu
                      </p>

                      <CInputGroup className="mt-4 mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Tên tài khoản"
                          autoComplete="username"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                        />
                      </CInputGroup>
                      {formik.touched.username && formik.errors.username ? (
                        <p className="formik-text-size text-danger"> {formik.errors.username} </p>
                      ) : null}
                      <CInputGroup className="mt-3 mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                          <i
                            className="fa-regular fa-eye show-hide-password"
                            id="btnPassword"
                            onClick={() => toogleShowHidePassword()}
                          ></i>
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Mật khẩu"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                      </CInputGroup>
                      {formik.touched.password && formik.errors.password ? (
                        <p className="formik-text-size text-danger"> {formik.errors.password} </p>
                      ) : null}
                      <CRow className="align-items-center mt-4">
                        <CCol xs={6}>
                          <CFormCheck id="flexCheckDefault" label="Ghi nhớ tài khoản" />
                        </CCol>
                        <CCol xs={6} className="text-end">
                          <CButton
                            color="info"
                            variant="outline"
                            onClick={() => {
                              toast.info('Bạn vui lòng liên hệ tại phòng tiếp khách (Tầng trệt) để được hỗ trợ !!!', {
                                theme: 'colored',
                              });
                            }}
                          >
                            Quên mật khẩu ?
                          </CButton>
                        </CCol>
                        <CCol xs={12} className="text-center">
                          <CButton color="primary" className="px-4 mt-4" type="submit">
                            Đăng nhập
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </Helmet>
  );
};

export default Login;
