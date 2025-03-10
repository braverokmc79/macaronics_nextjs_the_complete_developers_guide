import React from 'react'
import Hero from '../components/hero';

const ScalePage:React.FC = () => {
  return (
    <Hero 
      imgUrl='/images/scale.jpg'
      imagAlt="steel factory"   
      title='앱을 무한대로 확장하세요.' />
  );
}

export default ScalePage;