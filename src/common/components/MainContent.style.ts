import styled from '@emotion/styled';

export const StyledMainContent = styled.main<{
  width: number;
}>`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.grey.A200};
  min-height: 100vh;

  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  min-width: ${({ width }) => width}rem;
  width: ${({ width }) => width}rem;
`;
