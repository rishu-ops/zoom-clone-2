import React from 'react'
import { Homeimage6, Homeimage7, Homeimage8 } from '../../assets'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const Home2 = () => {

    const [ref, inView] = useInView();

    return (
        <div className='w-full h-auto '>

            <div className="lg:flex md:flex  gap-2 ">
                <motion.div
                    ref={ref}
                    initial={{ y: 100 }}
                    animate={inView ? { y: 0 } : { y: 100 }}
                    transition={{ delay: .2, type: "tween", duration: .6 }}
                    className='lg:w-[50%] md:w-[50%] p-6'
                >
                    <div className="" ref={ref} >
                        <img src={Homeimage6} alt="" />
                    </div>
                </motion.div>

                <div className='lg:w-[50%] md:w-[50%] p-6 lg:flex md:flex items-center '>
                    <div className=' flex flex-col gap-3 '>
                        <h1 className='text-3xl font-bold'>  <span className='text-blue-600'> Zoom </span> Workplace </h1>

                        <p className='text-lg  '> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quos repudiandae  </p>
                    </div>

                    <div className='flex  w-full justify-between'>

                        <div className="">
                            <ul className='p-3 lg:text-xl font-semibold text-blue-500 leading-10 '>
                                <li> Meetings </li>
                                <li> Team chat </li>
                                <li> Phone  </li>
                                <li> Mail & Calender </li>
                                <li> Schedule </li>
                            </ul>
                        </div>

                        <div className="">
                            <ul className='p-3 lg:text-xl font-semibold text-blue-500 leading-10'>
                                <li> Productive  </li>
                                <li> Employee Engagement </li>
                                <li> Flexible Workspace </li>
                                <li> Workvivo </li>
                                <li> App Marketplace </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <div className="lg:flex md:flex p-4 lg:p-0 md:p-0 w-full bg-[#00053d] ">

                <div className="p-2 flex justify-center items-center lg:w-[50%] md:w-[50%] ">
                    <img src={Homeimage8} alt="" />
                </div>



                <div className="lg:w-[50%] md:w-[50%] p-2 text-white ">

                    <h1 className='text-4xl font-bold pt-6 pb-8'> One platform for limitless human connection </h1>

                    <p className='text-2xl font-semibold pb-8'>
                        Drive impact with AI Companion, reimagine teamwork, enhance customer relationships, and enable seamless experiences with a single platform.
                    </p>

                    <h2 className='text-4xl font-bold  pb-8'>
                        Discover the Possibilities
                    </h2>

                    <p className='text-2xl font-semibold pb-8 opacity-40'>
                        *AI Companion is included at no additional cost with the paid services in your Zoom user account and may not be available for all regions and industry verticals. Some features not currently available across all regions or plans and are subject to change.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Home2
