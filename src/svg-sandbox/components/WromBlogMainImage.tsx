import { useTheme } from "@gergling/ui-components";
import { SvgGroup } from "./SvgGroup";
import { HornedHelmet } from "./HornedHelmet";
import { EyeMask } from "./EyeMask";
import { PointyHat } from "./PointyHat";
import { Dagger } from "./Dagger";
import { MagicStaff } from "./MagicStaff";
import { Sword } from "./Sword";
import { Tie } from "./Tie";
import { SVG_GRADIENT_GOLD_LINEAR, SVG_GRADIENT_GOLD_RADIAL } from "../constants";
import { SvgComponentProps } from "../types";

const defIds = [
  'metallicGold',
  'metallicGoldAngled',
  'metallicGoldVertical',
  'radialGold',
  'shiningPoint',
  'hammeredGoldFilter',
] as const;
type DefId = typeof defIds[number];
type SvgDefs = Record<DefId, string>;
const svgDefs = defIds.reduce((acc, key, idx) => ({ ...acc, [key]: `svg-defs-${idx}` }), {} as SvgDefs);

const useColours = () => {
  const { theme: { colors: { primary: { main: primary } } } } = useTheme();
  return { primary };
};

const tieLevel = 100;

const Warrior: React.FC<
  SvgComponentProps<'metallicGold' | 'metallicGoldVertical' | 'radialGold'>
> = ({ defs, x = 0 }) => {
  const { primary } = useColours();
  const swordLocation = [x + 50, 30];
  return <>
    <HornedHelmet color={primary} x={x} y={60} />
    <Tie color={primary} x={x} y={tieLevel} />
    <g transform={`rotate(20 ${swordLocation[0]} ${swordLocation[1] + 25})`}>
      <Sword defs={defs} x={swordLocation[0]} y={swordLocation[1]} />
    </g>
  </>;
};
const Rogue: React.FC<
  SvgComponentProps<'metallicGold'>
> = ({ defs, x = 0 }) => {
  const { primary } = useColours();
  const leftDaggerLocation = [x - 30, 100];
  const rightDaggerLocation = [x + 30, 50];
  return <>
    <EyeMask color={primary} x={x} y={60} />
    <Tie color={primary} x={x} y={tieLevel} />
    <g transform={`rotate(-170 ${leftDaggerLocation[0]} ${leftDaggerLocation[1] + 25})`}>
      <Dagger defs={defs} x={leftDaggerLocation[0]} y={leftDaggerLocation[1]} />
    </g>
    <g transform={`rotate(10 ${rightDaggerLocation[0]} ${rightDaggerLocation[1] + 25})`}>
      <Dagger defs={defs} x={rightDaggerLocation[0]} y={rightDaggerLocation[1]} />
    </g>
  </>;
};
const Mage: React.FC<
  SvgComponentProps<'metallicGoldVertical' | 'radialGold'>
> = ({ defs, x = 0 }) => {
  const { primary } = useColours();
  const staffLocation = [x - 30, 50];
  return <>
    <PointyHat color={primary} x={x} y={60} />
    <Tie color={primary} x={x} y={tieLevel} />
    <g transform={`rotate(-5 ${staffLocation[0]} ${staffLocation[1] + 25})`}>
      <MagicStaff defs={defs} x={staffLocation[0]} y={staffLocation[1]} />
    </g>
  </>;
};

export const WromBlogMainImage = () => {
  // TODO: Text fill colour can be themed.
  // TODO: SVG tag can be standardised, probably.
  return (
    <>
      <svg width="100%" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={svgDefs.metallicGold} x1="0%" y1="0%" x2="0%" y2="100%">
            {SVG_GRADIENT_GOLD_LINEAR.map((attrs, idx) => (
              <stop key={idx} {...attrs} />
            ))}            
          </linearGradient>
          <linearGradient id={svgDefs.metallicGoldAngled} x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(225)">
            {SVG_GRADIENT_GOLD_LINEAR.map((attrs, idx) => (
              <stop key={idx} {...attrs} />
            ))}            
          </linearGradient>
          <linearGradient id={svgDefs.metallicGoldVertical} x1="0%" y1="0%" x2="100%" y2="0%">
            {SVG_GRADIENT_GOLD_LINEAR.map((attrs, idx) => (
              <stop key={idx} {...attrs} />
            ))}            
          </linearGradient>

          {/* <pattern id="goldStripes" 
            width="20" height="20" 
            patternUnits="userSpaceOnUse" 
            patternTransform="rotate(45)"
          > 
            <rect x="0" y="0" width="10" height="20" fill="url(#metallicGold)" />
            <rect x="10" y="0" width="10" height="20" fill="#333" /> 
          </pattern> */}

          <radialGradient id={svgDefs.radialGold} cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
            {SVG_GRADIENT_GOLD_RADIAL.map((attrs, idx) => (
              <stop key={idx} {...attrs} />
            ))}
          </radialGradient>
          <radialGradient id={svgDefs.shiningPoint} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>

          <filter id={svgDefs.hammeredGoldFilter} x="0" y="0" width="100%" height="100%">
            {/* <!-- Generate Perlin Noise (simulates roughness/texture) --> */}
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            {/* <!-- Use the noise to distort the original source graphic (the gold color) --> */}
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="distort" />
            {/* <!-- Apply a slight gaussian blur to soften the texture edges --> */}
            <feGaussianBlur in="distort" stdDeviation="0.5" result="blur" />
          </filter>
        </defs>
        {/* <text x="20" y="30" fontFamily="Inter, sans-serif" fontSize="20" fill="#EAD994">1. Direct Metallic Fill (Linear)</text>
        <rect x="20" y="50" width="25%" height="80" rx="10" ry="10" fill="url(#metallicGoldAngled)" stroke="#CCAC00" strokeWidth="2"/>

        <text x="20" y="180" fontFamily="Inter, sans-serif" fontSize="20" fill="#EAD994">2. Gold Stripe Pattern Fill (Rotated)</text>
        <rect x="20" y="200" width="25%" height="80" rx="10" ry="10" fill="url(#goldStripes)" stroke="#CCAC00" strokeWidth="2"/>

        <text x="20" y="360" fontFamily="Arial Black, sans-serif" fontSize="70" fontWeight="900" 
          fill="url(#radialGold)" stroke="#8B6A02" strokeWidth="2">
            GOLD
        </text> */}
        <SvgGroup x={400} y={0}>
          {/* <SvgGuidelines /> */}
          <Warrior defs={svgDefs} x={-100} />
          <Rogue defs={svgDefs} x={0} />
          <Mage defs={svgDefs} x={100} />
          {/* <rect x={-100} y={0} width={200} height={200} fill="white" /> */}
          {/* <g transform="scale(3) translate(0, 0)">
            <Dagger x={0} y={0} />
          </g> */}
        </SvgGroup>
        {/* <SvgGroup x={700} y={0}>
          <Tie color={primary} x={0} y={10} />
          <HornedHelmet color={primary} x={0} y={110} />
          <EyeMask color={primary} x={0} y={150} />
          <PointyHat color={primary} x={0} y={220} />
        </SvgGroup> */}
        {/* <SvgGroup x={600} y={0}>
          <Sword x={0} y={0} />
          <Sword x={0} y={100} variant="shiny" />
          <Sword x={0} y={200} variant="hammered" />
          <Sword x={0} y={300} variant="buffed" />
        </SvgGroup>
        <SvgGroup x={500} y={0}>
          <MagicStaff x={0} y={0} />
          <Dagger x={0} y={150} />
        </SvgGroup> */}
      </svg>
      {/* <Palette {...palette}></Palette> */}
    </>
  );
};
