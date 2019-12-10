import styled from "styled-components"

const Wrapper = styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  /* border: 1px solid #bebfc5; */
  height: 50px;
  width: 500px;
`

const Input = styled.input`
  border: none;
  padding: 15px;
  width: 80%;
`

const Span = styled.span`
  position: absolute;
  right: 60px;
  padding: 18px;
  color: #535665;
  font-size: 13px;
  cursor: pointer;
`

const Submit = styled.input.attrs({
  type: "submit",
  value: "Find Food"
})`
  color: white;
  padding: 15px;
  text-decoration: none;
  position: absolute;
  background-color: #db741e;
  color: #fff;
  width: 100px;
  border: none;
`
export { Wrapper, Input, Span, Submit }
