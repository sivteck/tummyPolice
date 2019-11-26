
export const getRequest = async (cart) =>{
    let result
    try {
      let res = await fetch(`https://tummypolice.iyangi.com/api/v1/${cart}`)
      let data = await res.json()
      result = [res, data]
    //   dispatch({type: 'SET_CART', data: data})
    //   setFetchStatus(res.ok)   
    } catch (error) {
      throw error
    }
  return result
}
