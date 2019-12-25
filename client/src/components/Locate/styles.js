import styled from "styled-components"

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  position: relative;
  height: 50px;
  width: 70%;
`

const Input = styled.input`
  border: none;
  padding: 15px;
  width: 75%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const Submit = styled.input.attrs({
  type: "submit",
  value: "Find Food"
})`
  padding: 15px;
  text-decoration: none;
  position: absolute;
  background-color: #db741e;
  color: #fff;
  width: 20%;
  border: none;
`
export { Wrapper, Input, Submit }
