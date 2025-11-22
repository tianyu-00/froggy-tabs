export function getRandomBackground() {
  const images = import.meta.glob("../assets/*.{jpg,png}", { eager: true });

  const paths = Object.keys(images);
  const imageArray = Object.values(images).map((module) => module.default);

  const randomIndex = Math.floor(Math.random() * imageArray.length);

  // console.log("Image:", paths[randomIndex]);

  return imageArray[randomIndex];
}
