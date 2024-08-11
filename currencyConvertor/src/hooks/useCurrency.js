import {useState,useEffect} from "react";

function useCurrencyInfo(currency){
  let [data,setData] = useState({});
  useEffect(()=>{
    fetch(`https://v6.exchangerate-api.com/v6/66e6416c8b91f1af278badc8/latest/${currency}`)
    .then((res)=> res.json())
    .then((res)=> setData(res.conversion_rates))
    
  },[currency])
  return data
}

export default useCurrencyInfo