import {
  Button,
  Col,
  Row,
  Typography,
  Card,
  Avatar,
  message,
 } from 'antd'
import { useState } from 'react'
import {
  CREATE_FREE_LINK
} from '../../../graphql/queries'
import client from '../../../graphql/client'
import './LandingPage.less'
import MainLayout from '../../../components/Layouts/Main/MainLayout'
import { DEVELOPED_BY } from '../../../utilities/constants'
import { Zoom, Slide, Fade } from 'react-reveal'




const {Title }  = Typography
export default function LandingPage() {
    const [shortenBtnText, setshortenBtnText] = useState('Shorten It')
    const [urlValue, setUrlValue] = useState("")
    const [spinLoading, setspinLoading] = useState(false)

    const updateUrlValue = (e) => {
      setUrlValue(e.target.value)
    }
    const shortenUrl = async (e) => {
      if(!spinLoading && shortenBtnText !== 'Copy' && urlValue.length > 4){
        setspinLoading(true)
        setshortenBtnText('Loading')

        await client.mutate(
          {
            mutation: CREATE_FREE_LINK,
            variables: {theLink: urlValue}
          }).then((result)=> {
            const resultHolder = result.data.createFreemiumLink;
            setspinLoading(false);
            setUrlValue(result.data.createFreemiumLink.link.shortLink)
            if(resultHolder.ok && resultHolder.message){
              message.success(resultHolder.message,5)
            }else{
              message.error(resultHolder.message,5)
            }

            const val = document.getElementById("url__input")
            val.select(); //select the input value
            setshortenBtnText('Copy')
          }).catch(e=> {
            setspinLoading(false);
            setshortenBtnText('Shorten It')
            message.error('Error Occurred while creating your link. Please try again', 5)
          })

      }else if(shortenBtnText === 'Copy'){
        document.execCommand('copy'); //copy to clipboard
        setshortenBtnText('Shorten It')
        setUrlValue('')
      }

    }
    return (
        <>
          <MainLayout>
              <div className="landingHeading">
                <div className="container">
                  <Row gutter={{md: 6}}>
                    <Col xs={{span:24, order: 2}} md={{span:11, order: 1}} >
                      <Slide left>
                        <Title type={1} className="landingHeadingText desktop__landing-heading">
                          When
                          <br/>
                          <span style={{color: '#f16059'}}>Shortly,</span><br/>the better
                        </Title>
                        <Title type={1} className="landingHeadingText mobile__landing-heading">
                          When <span style={{color: '#f16059'}}>Shortly</span>
                          <br/>the better
                        </Title>
                        <Title level={4} className="subtext__heading">
                          A simple, flexible & powerful URL shortener
                          tools created by {DEVELOPED_BY} to help
                          you protect your brand identity.
                        </Title>
                      </Slide>
                    </Col>
                    <Col xs={{span:24, order: 1}} md={{span:13, order: 2}}>
                      <Slide right>
                        <div className="display__img">
                          {/* image */}
                          <img src="images/_main_img2.png" alt="" />
                        </div>
                      </Slide>
                    </Col>
                  </Row>
                  <Row style={{margin: "15px 0"}} justify="center">
                    <Col xs={{span: 24 }} md={{span: 19}}>
                      <Fade>
                        <input className="url__input"
                            id="url__input"
                            type="url"
                            required
                            placeholder="Type or paste a link to shorten"
                            value={urlValue}
                            onChange={(e) => updateUrlValue(e)}
                            />
                      </Fade>
                    </Col>
                    <Col xs={{span: 24 }} md={{span: 5}} >
                      <Fade>
                        <div className="button__wrapper">
                          <Button loading={spinLoading} onClick={(e)=> shortenUrl(e)} type="default">{shortenBtnText}</Button>
                        </div>
                      </Fade>
                    </Col>
                  </Row>
                </div>
                <div className="features__wrapper">
                  <div className="container">
                    <Row align="center" justify="center">
                      <Col>
                        <h1 className="features__heading">
                        <span className="strip__overline"></span>
                        <Zoom>
                          FEATURES
                        </Zoom>
                        <span className="strip__underline"></span>
                        </h1>
                      </Col>
                    </Row>
                    <Row gutter="16">
                      <Col className="features__items" xs={{span: 24}}  md={{span: 12}}>
                        <Slide left>
                          <Card
                            title="Links Management"
                            className="features__items-card"
                            bordered={false}
                            headStyle={{textAlign: 'center', color: '#eee'}}
                            >
                            Don't let the linke limit you.
                            Take total control over your generated links.
                            Manage your link like a pro.
                          </Card>
                        </Slide>
                      </Col>
                      <Col className="features__items" xs={{span: 24}} md={{span: 12}}>
                        <Slide right>
                          <Card
                            title="Branded Links"
                            className="features__items-card"
                            bordered={false}
                            headStyle={{textAlign: 'center', color: '#eee'}}
                            >
                              Optimize and customize each short Link to take
                              advantage of its potentials.
                              More more clicks comes increased brand recognition and
                              consumer trust in your communications - which in turn inspires even
                              more engagement with your links.
                          </Card>
                        </Slide>
                      </Col>
                    </Row>
                  </div> {/*container */}
                </div> {/*wrapper */}

                <div className="container">
                  <div className="creator__wrapper">
                    <h1 className="creator__heading">
                      <span className="strip__overline">
                        </span>
                        <Zoom>
                          TEAMS
                        </Zoom>
                        <span className="strip__underline"></span>
                    </h1>
                    <div className="creator__body">
                      <div className="creator__avatar">
                        <Avatar size={200} src="/images/creator_img.jpg" />
                      </div>
                      <div className="creator__details">
                        <h1 className="details__head">Creator</h1>
                        <Slide bottom>
                          <p className="details__body">
                            Adelola, Kayode Samson
                            <span>A 400L student of Better By Far University
                              (University of Ilorin, Ilorin Kwara State Nigeria)
                              studying Mathematics (BSc. Mathematics) and popularly known as <b>Rasta</b>.
                              He a Graphics Designer, FullStack Developer using Python(Flask) for backend,
                              NuxtJS(VueJs SSR) and React for Frontend. He is well equiped with modern frameworks
                              both for frontend and backend.
                              </span>
                            </p>
                          </Slide>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </MainLayout>
        </>
    )
}
