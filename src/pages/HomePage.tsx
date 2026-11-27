import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HomeSectionsUpper } from '../components/home/HomeSectionsUpper';
import { HomeSectionsLower } from '../components/home/HomeSectionsLower';

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <HomeSectionsUpper />
      <HomeSectionsLower />
    </div>
  );
};
