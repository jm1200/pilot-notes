import styled from "styled-components";
import { device } from "styles/devices";
import { lighten, darken } from "polished";
import {} from "styles/themes";

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
    width: 100%;
    align-items: center;
    justify-items: left;
    justify-content: left;
  }

  [type="text"] {
    -webkit-appearance: none;
    border-radius: 4px;
    background: ${props =>
      props.theme.mainNavBackground &&
      darken(0.05, props.theme.mainNavBackground)};
    border: none;
    font-size: 0.9rem;
    color: #eee;
    line-height: 1;
    padding: 0;
    width: auto;
    max-width: 100px;
    margin: 0;

    &:hover,
    &:focus {
      border: none;
    }
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

export const AddCategoryButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  color: ${props =>
    props.theme.colors.lightFontColor &&
    darken(0.25, props.theme.colors.lightFontColor)};
  font-size: 0.8rem;
  background: transparent;
  border: none;
  margin: 1rem 0.5rem;

  svg {
    margin-right: 0.75rem;
  }
  &:hover {
    color: white;
  }
`;

export const AddCategoryForm = styled.form`
  [type="text"] {
    background: ${props =>
      props.theme.mainNavBackground &&
      darken(0.05, props.theme.mainNavBackground)};
    width: 94%;
    margin: 10px auto;

    &:hover,
    &:focus {
      border: none;
    }
  }
`;

export const MainNavBodyBottomSection = styled.div`
  padding-bottom: 30px;
`;

export const Synced = styled.section`
  display: none;

  @media ${device.tablet} {
    display: block;
    width: 200px;
    border-top: 1px solid
      ${props =>
        props.theme.mainNavBackground &&
        darken(0.05, props.theme.mainNavBackground)};
    border-right: 1px solid
      ${props =>
        props.theme.mainNavBackground &&
        darken(0.1, props.theme.mainNavBackground)};
    position: absolute;
    bottom: 0;
    width: $app-sidebar-width;
    padding: 0.5rem;
    background: ${props => props.theme.mainNavBackground};

    .last-synced {
      display: flex;
      align-items: center;
      color: ${props =>
        props.theme.mainNavBackground &&
        lighten(0.3, props.theme.mainNavBackground)};
      font-size: 0.75rem;
    }
  }
`;
