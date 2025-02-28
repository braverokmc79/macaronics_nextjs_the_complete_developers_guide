
import React from 'react'
import Hero from '../components/hero';

const PerformancePage:React.FC = () => {
  return (
    <Hero 
      imgUrl='/images/performance.jpg'
      imagAlt="welding"   
      title='고성능 애플리케이션을 제공합니다.' />
  )
}

export default PerformancePage;