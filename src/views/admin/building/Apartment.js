import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import apartmentServices from 'src/api/buildingServices/apartmentServices';

import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Helmet from 'src/components/helmet/helmet';
import RoomList from './RoomList';
import ParkingList from './ParkingList';

const Apartment = () => {
  const url = useParams();
  const [apartmentInfo, setApartmentInfo] = useState(null);

  // get data page
  useEffect(() => {
    const getApartmentDetails = async () => {
      try {
        const res = await apartmentServices.getApartmentDetails(url.apartmentDetails);
        if (res.response.message === 'Successful') {
          setApartmentInfo(res.response.body);
        } else {
          console.log('Thất bại khi lấy thông tin chung cư ! ' + res.response.message);
          toast.error('Thất bại khi lấy thông tin chung cư ! ', {
            theme: 'colored',
          });
        }
      } catch (error) {
        console.log('Thất bại khi lấy thông tin chung cư: ', error.message);
        toast.error('Thất bại khi lấy thông tin chung cư ! ', { theme: 'colored' });
      }
    };
    getApartmentDetails();
  }, [url.apartmentDetails]);

  return (
    <Helmet title={apartmentInfo ? apartmentInfo.name : 'Căn hộ'} role="Admin">
      {apartmentInfo ? (
        <>
          <CRow>
            <CCol lg={4} md={5} xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>🏦 Thông tin {apartmentInfo.name}</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={12}>
                      <h6>📝 Thông tin chi tiết</h6>
                      <ul>
                        <li>
                          <strong>Tên chung cư:</strong> {apartmentInfo.name}
                        </li>
                        <li>
                          <strong>Số lượng:</strong> {apartmentInfo.floorAmount} phòng
                        </li>
                      </ul>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            {/* room list */}
            <RoomList apartmentId={apartmentInfo.id} />
            {/* parking list */}
            <ParkingList apartmentId={apartmentInfo.id} />
          </CRow>
        </>
      ) : (
        <SkeletonTheme color="#202020" highlightColor="#ccc">
          <p className="text-danger fw-bold">Không tìm thấy thông tin. Vui lòng thử lại sau !!!</p>
          <Skeleton count={5} />
        </SkeletonTheme>
      )}
    </Helmet>
  );
};

export default Apartment;
