import styled from '@emotion/styled';

import { SettingsIconSection } from '@/settings/components/SettingsIconSection';
import { objectSettingsWidth } from '@/settings/objects/constants/objectSettings';
import { IconSettings } from '@/ui/input/constants/icons';
import { useIconPicker } from '@/ui/input/hooks/useIconPicker';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';

const StyledContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  height: fit-content;
  padding: ${({ theme }) => theme.spacing(8)};
  width: ${objectSettingsWidth};
`;

export const SettingsNewObject = () => {
  const { Icon, iconKey, setIconPicker } = useIconPicker();

  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <StyledContainer>
        <Breadcrumb
          links={[
            { children: 'Objects', href: '/settings/objects' },
            { children: 'New' },
          ]}
        />

        <SettingsIconSection
          Icon={Icon}
          iconKey={iconKey}
          setIconPicker={setIconPicker}
        />
      </StyledContainer>
    </SubMenuTopBarContainer>
  );
};
