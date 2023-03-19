import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authServices from 'src/api/auth/authServices';
import { toast } from 'react-toastify';
import { CButton, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      rawPassword: '',
    },
    validationSchema: Yup.object({
      rawPassword: Yup.string().required('Vui lòng nhập mật khẩu !').min(6, 'Tối thiểu 6 ký tự !'),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          rawPassword: values.rawPassword,
        };
        const res = await authServices.changePassword(data);
        if (res.response.message === 'Successful') {
          toast.success('Cập nhật thành công. Vui lòng đăng nhập lại !', { theme: 'colored' });
          Cookies.remove('habolabu');
          navigate('/');
        } else {
          toast.error('Cập nhật thất bại ! ', { theme: 'colored' });
        }
      } catch (error) {
        console.log('Cập nhật thất bại: ', error);
        toast.error('Cập nhật thất bại ! ' + error.message, { theme: 'colored' });
      }
    },
  });

  return (
    <CForm onSubmit={formik.handleSubmit}>
      <CRow className="align-items-center justify-content-center">
        <CCol lg={4} md={7} sm={11}>
          <CFormLabel htmlFor="rawPassword" className="col-sm-12 col-form-label">
            <b>
              Mật khẩu mới <span className="text-danger">*</span>
            </b>
          </CFormLabel>
          <CFormInput
            type="text"
            id="rawPassword"
            name="rawPassword"
            placeholder="Nhập mật khẩu mới..."
            {...formik.getFieldProps('rawPassword')}
          />
          {formik.touched.rawPassword && formik.errors.rawPassword ? (
            <p className="formik-text-size text-danger mt-1"> {formik.errors.rawPassword} </p>
          ) : null}

          <CButton type="submit" color="warning" className="mt-3">
            Sửa
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default ChangePassword;
