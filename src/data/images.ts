/**
 * Central image registry for Hassan Artificial Jewellery.
 * Uses the authentic Daraz product images from products.ts.
 */
export const DARAZ_IMAGES = {
  necklaceSetWithEarrings: 'https://static-01.daraz.pk/p/31cc50018128781cbd8fd69da40ad621.png',
  redRubyLockset: 'https://static-01.daraz.pk/p/0c43e190706d7abfc6ef2144098588c5.jpg',
  rubyGoldCrystalSet: 'https://static-01.daraz.pk/p/ffa648f4cbfffb94792d5160e13b4164.png',
  rubyBloomGoldLockset: 'https://static-01.daraz.pk/p/3fce4a45fa5235b34060c69eb5034047.png',
  crystalWhiteGoldSet: 'https://static-01.daraz.pk/p/fcc2972ae60dfabee6769eb523cce175.jpg',
  redStoneArtificialSet: 'https://static-01.daraz.pk/p/806f0ee0b461a11ce11ae1f50718eab1.png',
  blackCrystalSet: 'https://static-01.daraz.pk/p/bf9f622bbbd9e306a0da8f71cd524468.png',
  goldenStoneJhumka1: 'https://static-01.daraz.pk/p/a2bb919b89420a137f3d7fa3a184062a.png',
  goldenStoneJhumka2: 'https://static-01.daraz.pk/p/6ed8f5581941470d2447ef1c33ace61c.png',
  goldenFlowerSet1: 'https://static-01.daraz.pk/p/f2a6f5daf75198ff5abf1b7196c4a285.png',
  goldenFlowerSet2: 'https://static-01.daraz.pk/p/ebd559964d1fe8d08a0818c811ec9b7e.png',
  goldenCrystalDrop1: 'https://static-01.daraz.pk/p/fc8d96422ed3a5bb65dc6137469356a1.png',
  goldenCrystalDrop2: 'https://static-01.daraz.pk/p/168d0ad7c4944b13a8f2647f7d02ceb4.png',
} as const;

export const JEWELLERY_IMAGES = {
  bridalSet: DARAZ_IMAGES.necklaceSetWithEarrings,
  necklaceSet: DARAZ_IMAGES.rubyGoldCrystalSet,
  earringsJhumkay: DARAZ_IMAGES.goldenStoneJhumka1,
  rubyLockset: DARAZ_IMAGES.redRubyLockset,
  rubyBloom: DARAZ_IMAGES.rubyBloomGoldLockset,
  crystalWhiteGold: DARAZ_IMAGES.crystalWhiteGoldSet,
  redStoneSet: DARAZ_IMAGES.redStoneArtificialSet,
  blackCrystal: DARAZ_IMAGES.blackCrystalSet,
  goldenFlower: DARAZ_IMAGES.goldenFlowerSet1,
  goldenCrystalDrop: DARAZ_IMAGES.goldenCrystalDrop1,
};
