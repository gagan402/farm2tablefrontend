import React from 'react'
import c1 from "../images/c1.jpg"
import c2 from "../images/c2.avif"
import c3 from "../images/c3.jpg"
import s1 from "../images/growers-pic.jpg";
import s2 from "../images/connect-2-consumer.jpg";
import s3 from "../images/un.jpg";
import { Carousel } from "flowbite-react";
function FrontPage() {
  return (
    <>

    <div className="h-[600px] sm:h-[600px] xl:h-[600px] 2xl:h-[600px] px-2 py-2">
      <Carousel>
        <img src={c1} alt="..." />
        <img src={c2} alt="..." />
        <img src={c3} alt="..." />
      </Carousel>
    </div>


  
<div className="text-4xl text-center font-bold px-2 py-2" style={{ color: '#0A6847', backgroundColor: '#F6E9B2' }}>OUR SERVICES</div>

<div className="flex flex-wrap justify-center space-x-4 px-2 py-2">
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-1 my-1">
    <a href="#">
      <img className="rounded-t-lg" src={s1} alt="Direct Transactions" />
    </a>
    <div className="p-5">
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Eliminate the middleman and engage in direct transactions between growers and consumers for fresher produce and better prices. Our platform facilitates seamless communication and transactions, ensuring that both parties benefit.
      </p>
    </div>
  </div>

  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-1 my-1">
    <a href="#">
      <img className="rounded-t-lg" src={s2} alt="Grower Profiles" />
    </a>
    <div className="p-5">
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Explore detailed profiles of local growers, including their farming practices, produce varieties, and customer reviews. Get to know the people behind your food and build lasting relationships with your favorite growers.
      </p>
     
    </div>
  </div>

  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-1 my-1">
    <a href="#">
      <img className="rounded-t-lg" src={s3} alt="Sustainable Farming" />
    </a>
    <div className="p-5">
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Learn about and support sustainable farming practices that promote environmental health and ensure quality produce. Our platform highlights growers committed to sustainable methods, helping you make eco-friendly choices.
      </p>
      
    </div>
  </div>

  
</div>


   


<div className="text-4xl  text-center font-bold px-2 py-2 " style={{color:'#0A6847',backgroundColor:'#F6E9B2'}}>CONTACT US</div>
<div class=" mb-3 px-2 py-2 mb-4">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.175135209825!2d76.65720287540971!3d30.516086474689622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1701671768027!5m2!1sen!2sin" width="100%" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </>
  )
}

export default FrontPage;