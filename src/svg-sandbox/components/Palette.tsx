import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const Swatch = ({ color }: { color: string; }) => <div style={{
  backgroundColor: color,
  width: '20px',
  height: '20px',
}} />;

export const Palette = (palette: { [K: string]: string; }) => <Table>
  {Object.entries(palette).map(([name, value]) => (
    <TableBody>
      <TableRow>
        <TableCell align="right">{name}</TableCell>
        <TableCell><Swatch color={value} /></TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    </TableBody>
  ))}
</Table>;
