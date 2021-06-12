import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import './LandingPage.less'
import MainLayout from '../../../components/Layouts/Main/MainLayout'
import { DEVELOPED_BY } from '../../../utilities/constants'


const {Title }  = Typography
export default function LandingPage() {
    return (
        <>
          <MainLayout>
              <div className="container landingHeading">
                <Row gutter={{md: 6}}>
                  <Col xs={{span:24, order: 2}} md={{span:9, order: 1}} >
                    <Title type={1} className="landingHeadingText">
                      When <span style={{color: '#f16059'}}>Shortly</span> the better
                    </Title>
                    <Title level={4}>
                      A simple, flexible & powerful URL shortener
                      tools created by {DEVELOPED_BY} to help
                      you protect your brand identity.
                    </Title>
                  </Col>
                  <Col xs={{span:24, order: 1}} md={{span:15, order: 2}}>
                    <div className="displayImg">
                      image
                      {/* <img src="images/_main_img.png" alt="" /> */}
                    </div>
                  </Col>
                </Row>
                <Row style={{margin: "15px 0"}} justify="center">
                  <Col md={{span: 20}}>
                    <input type="text"/>
                  </Col>
                  <Col md={{span: 4}}>
                    <Button type="default">Shorten It</Button>
                  </Col>
                </Row>
                <Row gutter="16">
                  <Col >
                    Col 1
                  </Col>
                  <Col>
                    Col 2
                  </Col>
                  <Col>
                    Col 3
                  </Col>
                </Row>
              </div>
          </MainLayout>
        </>
    )
}
