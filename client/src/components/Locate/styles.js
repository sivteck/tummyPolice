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
  width: 75%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

// const Span = styled.span`
//   position: absolute;
//   right: 100px;
//   padding: 15px;
//   color: #535665;
//   cursor: pointer;
//   font-size: 13px;
// `

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
export { Wrapper, Input, Submit }
