import { PageContainer } from "../common/components/styles";
import { WromBlogMainImage } from "../svg-sandbox/components/WromBlogMainImage";

export const SvgSandboxPage: React.FC = () => {
  return (
    <PageContainer style={{
      backgroundColor: '#eee', // Fallback
      backgroundImage: `
        linear-gradient(45deg, #ccc 25%, transparent 25%),
        linear-gradient(-45deg, #ccc 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #ccc 75%),
        linear-gradient(-45deg, transparent 75%, #ccc 75%)
      `,
      backgroundSize: '20px 20px', /* Size of the chequered square */
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        marginBottom: '1rem',
      }}>
        All blog images should ideally be 800x200, with the main focus of the
        image between 300 and 500 pixels (200 pixels wide). This means scaling
        images to a height of 200px at any width keeps the central part visible.
      </div>
      <div style={{
        width: 800,
        height: 200,
        border: 'solid 1px #444',
      }}>
        <WromBlogMainImage />
      </div>
    </PageContainer>
  );
};
