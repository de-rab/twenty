import styled from '@emotion/styled';
import { Workspace } from '../../interfaces/workspace.interface';

type OwnProps = {
  workspace: Workspace;
};

const StyledContainer = styled.button`
  display: inline-flex;
  width: min-content;
  height: 34px;
  align-items: center;
  cursor: pointer;
  border: 0;
  background: inherit;
  border: 1px solid ${(props) => props.theme.primaryBorder};
  border-radius: 4px;
  padding: 8px;
  margin-left: 4px;
`;

type StyledLogoProps = {
  logo: string;
};

const StyledLogo = styled.div<StyledLogoProps>`
  background: url(${(props) => props.logo});
  background-size: cover;
  width: 16px;
  height: 16px;
  border-radius: 2px;
`;

const StyledName = styled.div`
  margin-left: 4px;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 14px;
  font-color: ${(props) => props.theme.text0};
`;

function ProfileContainer({ workspace }: OwnProps) {
  return (
    <StyledContainer>
      <StyledLogo logo={workspace.logo}></StyledLogo>
      <StyledName>{workspace?.name}</StyledName>
    </StyledContainer>
  );
}

export default ProfileContainer;
