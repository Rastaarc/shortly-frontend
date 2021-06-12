import { Col, Row, Typography } from 'antd'
import React from 'react'
import './LandingPage.less'
import MainLayout from '../../../components/Layouts/Main/MainLayout'


const {Title }  = Typography
export default function LandingPage() {
    return (
        <>
          <MainLayout>
              <div className="container">
                <Row>
                  <Col xs={{span:24, order: 2}} md={{span:7, order: 1}} >
                    <Title type={1} className="landingHeading">
                      When <span style={{color: '#f16059'}}>Shortly</span> the better
                    </Title>
                  </Col>
                  <Col xs={{span:24, order: 1}} md={{span:17, order: 2}}>
                    <div className="displayImg">
                      <img src="images/_main_img.png" alt="" />
                    </div>
                  </Col>
                </Row>
              </div>
          </MainLayout>
        </>
    )
}
