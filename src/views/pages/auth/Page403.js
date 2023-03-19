import { CButton } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'src/components/helmet/helmet';

const Page403 = () => {
  return (
    <Helmet title="Lỗi truy cập" role="Forbidden">
      <section className="page_403 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">403</h1>
              </div>
              <div className="contant_box_403">
                <h3 className="h2">Bạn không có quyền truy cập trang này !</h3>
                <p>
                  Có vẻ như bạn không có quyền truy cập vào trang này, bạn nên đăng nhập để tiếp tục truy cập. Vui lòng
                  thử lại sau !
                </p>
                <CButton color="primary" className="px-4 mt-3">
                  <Link to="/" className="link_403">
                    Về trang đăng nhập
                  </Link>
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Page403;
