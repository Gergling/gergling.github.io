import { remToPx } from "../../common/utilities";
import { getRem } from "../../features/elastic-response/utilities/rem-cell";

const columns = Array.from({ length: 4 }).map((_, column) => remToPx(getRem(column + 1, 0).width));

const guidelineColour = 'rgba(0, 0, 0, 0.1)';

export const SvgGuidelines = () => <>
  <rect
    x="-100"
    y="0"
    width="200"
    height="200"
    fill="transparent"
    stroke={guidelineColour}
    strokeWidth="1"
  />
  {columns.map((column, idx) => {
    const x = column + 132;
    console.log(x)
    return <g key={idx}>
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="200"
        stroke={guidelineColour}
        strokeWidth="1"
        transform={`translate(${-x}, 0)`}
      />
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="200"
        stroke={guidelineColour}
        strokeWidth="1"
        transform={`translate(${x}, 0)`}
      />
    </g>;
  })}
</>;
