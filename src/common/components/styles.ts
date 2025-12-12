import styled from "@emotion/styled";

export const PageContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const StyledPanelContainer = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledResponsivePageContainer = styled(PageContainer)<{
  width: number;
}>`
  min-width: ${({ width }) => width}rem;
  width: ${({ width }) => width}rem;
`;
