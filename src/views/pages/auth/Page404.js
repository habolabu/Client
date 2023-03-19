import { CButton } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'src/components/helmet/helmet';

const Page404 = () => {
  return (
    <Helmet title="Không tìm thấy trang" role="404">
      <section className="page_404 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Trang không tìm thấy !</h3>
                <p>Có vẻ như trang mà bạn muốn tìm kiếm không còn hoạt động. Vui lòng thử lại sau !</p>
                <CButton color="primary" className="px-4 mt-3">
                  <Link to="" className="link_404">
                    Về trang chủ
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

export default Page404;
