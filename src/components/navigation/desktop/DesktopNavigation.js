import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logotype } from "../Logotype";
import { NavigationButton } from "../NavigationButton";
import { ArrowUpRight } from "../../icons/ArrowUpRight";
import { DevActionsDropdown } from "./DevActionsDropdown";
import { Widget } from "near-social-vm";
import { SignInButton} from "../SignInButton";
import { UserDropdown } from "./UserDropdown";

const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding: 12px 0;
  background: linear-gradient(
      252.46deg,
      rgba(82, 0, 255, 0.32) 6.76%,
      rgba(255, 0, 154, 0) 94.32%
    ),
    #000;

  .user-section {
    margin-left: auto;
    > button {
      font-size: 14px;
    }
  }

  .container-fluid {
    display: flex;
    align-items: center;

    .navigation-section {
      margin-left: 50px;
      display: flex;

      > div {
        > a {
          margin-right: 20px;
        }
      }
    }

    .user-section {
      display: flex;
      align-items: center;

      .nav-create-btn {
        margin-left: 10px;
      }

      .nav-sign-in-btn {
        margin-left: 10px;
      }
    }

    .arrow-up-right {
      margin-left: 4px;
    }
  }
`;

export function DesktopNavigation(props) {
  return (
    <StyledNavigation>
      <div className="container-fluid">
        <Link
          to="/"
          className="logo-link"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logotype />
        </Link>
        <div className="navigation-section">
          <NavigationButton route="/">Home</NavigationButton>
          <NavigationButton route="/edit">Editor</NavigationButton>
          <NavigationButton href={props.documentationHref}>
            Docs
            <ArrowUpRight />
          </NavigationButton>
        </div>
        <div className="user-section">
          <DevActionsDropdown {...props} />
          <Widget
            code={`return <Web3Connect connectLabel="Connect Wallet" disconnectLabel="Disconnect"/>`}
          />
           {(!props.signedIn && props.useWalletSelector ) && (
            <SignInButton onSignIn={() => props.requestSignIn()} />
          )}
          {props.signedIn && (
            <>
              <UserDropdown {...props}/>
            </>
          )}
        </div>
      </div>
    </StyledNavigation>
  );
}
