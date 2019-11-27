import styled from "styled-components";
import { device } from "styles/devices";
import { lighten, darken } from "polished";

export const MainNavContainer = styled.aside`
  flex: 0;
  width: 0;
  transition: all 1s ease;
  overflow: hidden;
  z-index: 4;
  padding: 1rem 0 0.25rem;
  display: flex;
  flex-direction: column;

  background: ${props => props.theme.mainNavBackground};
  border-right: 1px solid ${props => props.theme.borderColor};
  color: ${props => props.theme.colors.lightFontColor};

  &.open {
    flex: 0 0 200px;
  }

  @media ${device.tablet} {
    flex: 0 0 200px;
  }
`;

export const MainNavActions = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

export const MainNavBody = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MainNavBodyTopSection = styled.div`
  flex: 1;
  padding-bottom: 3rem;
`;

export const MainNavLink = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;

  &:hover {
    background: ${props =>
      props.theme.mainNavBackground &&
      lighten(0.05, props.theme.mainNavBackground)};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props =>
      props.theme.mainNavBackground &&
      darken(0.05, props.theme.mainNavBackground)};

    svg {
      stroke: ${props => props.theme.colors.primary};
    }
  }
  .main-nav-icon {
    margin-right: 0.75rem;
  }

  svg {
    stroke: rgba(255, 255, 255, 0.25);
  }
`;
export const CategoryTitle = styled.h2`
  margin: 1rem 0;
  color: lighten($app-sidebar-color, 20%);
  text-transform: uppercase;
  font-size: 0.7rem;
`;

export const CategoryList = styled.div`
  font-size: 0.9rem;
`;

export const CategoryListEach = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .main-nav-icon {
    margin-right: 0.75rem;
  }

  .category-options {
    svg {
      stroke: transparent;
    }
  }

  .category-list-name {
    display: flex;
    align-items: center;
  }

  &:hover {
    background: ${props =>
      props.theme.mainNavBackground &&
      lighten(0.05, props.theme.mainNavBackground)};

    .category-options {
      svg {
        stroke: ${props =>
          props.theme.mainNavBackground &&
          lighten(0.9, props.theme.mainNavBackground)};
      }
    }
  }
  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props =>
      props.theme.mainNavBackground &&
      darken(0.05, props.theme.mainNavBackground)};

    .category-list-name {
      svg {
        stroke: ${props => props.theme.colors.primary};
      }
    }
  }
  svg {
    stroke: rgba(255, 255, 255, 0.25);
  }
`;

export const MainNavBodyBottomSection = styled.div``;

export const Synced = styled.section``;
