import React from "react"
import styled from "styled-components"
import DeliveryAddress from "./DeliveryAddress"

const Article = styled.article`
  display: flex;
  flex-direction: column;
`

const Section = styled.section`
  padding: 20px;
  margin: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  height: fit-content;
  background: #e9ecee;
`
const H1 = styled.h1`
  text-align: left;
  padding-bottom: 15px;
  font-size: 32px;
  font-weight: 600;
`

const P = styled.p`
  text-transform: capitalize;
  font-weight: 500;
  margin-top: 5px;
  font-size: 20px;
`
const UserLogin = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"))
  console.log(userDetails)
  return (
    <Article>
      <Section>
        <H1>User logged in as</H1>
        <P>
          {userDetails.username} | {userDetails.phone}
        </P>
      </Section>
      <Section>
        <DeliveryAddress />
      </Section>
    </Article>
  )
}

export default UserLogin
