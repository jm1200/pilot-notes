import styled from "styled-components";
import { device } from "styles/devices";
import { darken, lighten } from "polished";

export const NoteListContainer = styled.div`
  flex: 1;
  width: 100%;
  transition: all 1s ease;

  background: ${props => props.theme.notelistBackground};
  border-right: 1px solid ${props => props.theme.borderColor};

  &.note-open {
    flex: 0;
    width: 0;
  }

  @media ${device.tablet} {
    flex: 0 0 300px;

    &.note-open {
      flex: 0 0 300px;
    }
  }
`;

export const NoteSidebarHeader = styled.div`
  padding: 0.5rem;
  text-align: center;

  .mobile-sidebar-options {
    display: flex;
  }
  .toggle-mobile-nav {
    padding: 0.25rem 1rem;
    margin-right: 0.5rem;
    color: ${props => props.theme.color};

    @media ${device.tablet} {
      display: none;
    }
  }
  [type="search"] {
    background: ${props =>
      props.theme.notelistBackground &&
      lighten(0.12, props.theme.notelistBackground)};
    color: ${props => props.theme.color};
    border: 1px solid
      ${props =>
        props.theme.notelistBackground &&
        lighten(0.08, props.theme.notelistBackground)};
  }
`;

export const NoteListDiv = styled.div``;

export const NoteListEach = styled.div`
  cursor: pointer;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid
    ${props =>
      props.theme.notelistBackground &&
      darken(0.08, props.theme.notelistBackground)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.3;

  .note-title {
    display: flex;
    align-items: center;
    width: 100%;

    .icon {
      flex: 0 0 20px;
    }
    .note-favorite {
      stroke: ${props => props.theme.colors.primary};
    }
  }

  &:hover {
    background: ${props =>
      props.theme.notelistBackground &&
      darken(0.05, props.theme.notelistBackground)};

    .note-options {
      color: ${props => props.theme.colors.darkFontColor};
    }
  }

  @media ${device.tablet} {
    padding: 0.5rem;
    font-size: 0.85rem;

    &.active {
      background: ${props => props.theme.colors.primary};
      color: white;
      border-bottom: 1px solid ${props => props.theme.colors.primary};

      &:hover {
        .note-options {
          color: white;
        }
      }
      .note-favorite {
        stroke: white;
      }
    }
  }
  .note-options {
    display: none;

    @media ${device.tablet} {
      display: block;
      font-size: 1rem;
      color: transparent;
      padding: 0.5rem;
      z-index: 1;
      cursor: pointer;
    }

    &.active {
      color: ${props => props.theme.colors.darkFontColor};
    }

    &-context-menu {
      cursor: default;
      border-radius: 4px;
      position: absolute;
      padding: 0.5rem;
      color: ${props => props.theme.color};
      top: 32px;
      left: 200px;
      min-width: 250px;
      background: ${props =>
        props.theme.notelistBackground &&
        darken(0.03, props.theme.notelistBackground)};
      border: 1px solid ${props => props.theme.colors.accentGrey};
      z-index: 3;
      box-shadow: ${props => props.theme.boxShadow};

      .select {
        -webkit-appearance: none;
        font-size: 1rem;
        padding: 0.5rem;
        width: calc(100% - 1rem);
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.25rem;
        margin-bottom: 0.5rem;
      }
    }
    &-nav {
      font-size: 0.9rem;

      .nav-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        border-radius: 2px;

        &:hover {
          background: ${props =>
            props.theme.notelistBackground &&
            darken(0.08, props.theme.notelistBackground)};
        }
      }

      svg {
        margin-right: 0.5rem;
      }
    }
  }
`;
