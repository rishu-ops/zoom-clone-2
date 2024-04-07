import React, { useEffect } from 'react'
import {
    Homeimage1,
    Homeimage2,
    Homeimage3,
    Homeimage4,
    Homeimage5,
} from '../../assets'

import { motion } from "framer-motion";


const Home = () => {

    return (

        <div className='w-full h-auto flex-col '>


            <div className="lg:flex md:flex ">
                <div className=" lg:w-[60%] md:w-[60%] p-16 flex flex-col  justify-center">

                    <h1 className='text-4xl font-bold pb-8'>
                        AI that makes you more <br />
                        <span className='text-3xl text-blue-600'> Productive </span>
                    </h1>

                    <p className='text-xl font-semibold pb-6 w-[80%]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic distinctio a culpa molestiae aliquam? Iusto
                    </p>

                    <div className="flex gap-8 ">
                        <button className='bg-blue-600 text-white rounded-3xl w-[200px]'>
                            Plans & Pricing
                        </button>
                        <p className='p-3 text-blue-600 text-xl'>
                            Discover AI Companion
                        </p>
                    </div>

                </div>

                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{  delay : .2 ,  type : "tween" , duration : .6 }}
                       
                    className="p-6 lg:w-[40%] md:w-[40%] mt-10">
                    <div className="p-4 relative">
                        <img src={Homeimage1} className='absolute left-0 top-20 ' alt="" />
                        <img src={Homeimage2} className='h-[300px] rounded-xl absolute left-0 top-0' alt="" />
                    </div>
                    <div className="p-4 relative h-[500px]">
                        <img src={Homeimage3} className='h-[200px] rounded-xl absolute right-0 bottom-0' alt="" />
                        <img src={Homeimage4} className='h-[70px] rounded-xl absolute left-0 top-[310px]' alt="" />
                    </div>
                </motion.div>





            </div>

            <div className="">
                <div className="w-full flex  justify-center bg-blue-800 p-3 ">
                    <img src={Homeimage5} alt="" className='p-2  ' />
                </div>

                <div className="flex-col text-center items-center justify-center bg-[#00031f] p-10 ">
                    <h1 className='text-3xl font-bold text-white  '> One platform for limitless huamns connection</h1>

                    <div className="flex flex-wrap items-center justify-center lg:gap-5 md:gap-3 gap-2 mt-6 p-3 ">
                        <button className='hover:bg-[#1c2a52] text-white lg:text-2xl md:text-xl text-sm border border-2px-[#47669f] rounded-3xl p-3 ' > Zoom Workplace  </button>
                        <button className='hover:bg-[#1c2a52] text-white lg:text-2xl md:text-xl text-sm border border-2px-[#47669f] rounded-3xl p-3 ' > Zoom AI  </button>
                        <button className='hover:bg-[#1c2a52] text-white lg:text-2xl md:text-xl text-sm border border-2px-[#47669f] rounded-3xl p-3 ' > Business Services  </button>
                        <button className='hover:bg-[#1c2a52] text-white lg:text-2xl md:text-xl text-sm border border-2px-[#47669f] rounded-3xl p-3 ' > Developer Ecosystem  </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Home
