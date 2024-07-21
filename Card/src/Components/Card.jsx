import React from 'react'
import { useState } from 'react'
const Card = () => {
  const [img,setImg]=useState("")
  const [qr,setQr]=useState("Google")
  const [width,setWidth]=useState(150)
  const [loading,setLoading]=useState(false)
  async function generate(){
    try {
      setLoading(true)
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${width}x${width}&data=${encodeURIComponent(qr)}`
      setImg(url)
    } catch (error) {
      
    }
    finally{
      setLoading(false)
    }
  }
  function download(){
    fetch(img).then((res)=>res.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob)
      link.download="qr.png"
      document.body.appendChild(link);
      link.click()
    })
  }
  return (
    <>
   <div className='app-container'>
    <div className='card gradient-background'>
    <h2>QR CODE GENERATOR</h2>
    {img && <img src={img}/>}
    {loading && <p>Loading...</p>}
    <div className='self'>
    <label htmlFor='link' className='label'>
      Enter Link
    </label>
    <input type='text' id="link" placeholder='(ex:https://www.youtube.com/)' onChange={(e)=>{
      setQr(e.target.value)
    }}/>
    </div>
    <div className='self'>
    <label htmlFor='size' className='label'>
      Enter Size
    </label>
    <input type='text'  id="size" placeholder='(ex:150)' onChange={(e)=>{
      setWidth(e.target.value)
    }}/>
    </div>
    <button onClick={generate} className='generate' disabled={loading}>Generate QR Code</button>
    <button className='Download' onClick={download}>Download QR Code</button>
    
   <a className="footer">Designed with ❤ by <span> Sanjay </span></a>
   </div>
   
   </div>
    </>
  )
}

export default Card
