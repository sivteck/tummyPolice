import React from "react"

const PopulateDataList = ({ inputValueLength, predictions }) => {
  if (inputValueLength > 0)
    return (
      <div>
        <datalist id="places">
          {predictions.map(({ id, description }) => (
            <option key={id} value={description + ":" + id}>
              {description}
            </option>
          ))}
        </datalist>
      </div>
    )
  return null
}

export default PopulateDataList
