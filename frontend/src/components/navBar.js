import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TopAppBar, {TopAppBarFixedAdjust, TopAppBarIcon, TopAppBarRow,TopAppBarSection,TopAppBarTitle
} from '@material/react-top-app-bar';
import { Headline5, Subtitle1, Subtitle2 } from "@material/react-typography";
class NavBar extends Component {
    render() { 
        const {user} = this.props;
        return (
          <React.Fragment>
            <TopAppBar>
              <TopAppBarRow>
                <TopAppBarSection align="start">
                  <TopAppBarTitle>Practice Project</TopAppBarTitle>
                </TopAppBarSection>
                {user.is_staff && (
                  <TopAppBarSection align="end" role="toolbar">
                    <Subtitle1>
                      <Link to="/users/new" style={{ color: "#FFF" }}>
                        Register New User
                      </Link>
                    </Subtitle1>
                  </TopAppBarSection>
                )}
                <TopAppBarSection align="end" role="toolbar">
                  <Subtitle1>
                    <Link to="/logout" style={{ color: "#FFF" }}>
                      Logout
                    </Link>
                  </Subtitle1>
                </TopAppBarSection>
              </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust align='middle'>
              <Subtitle1>Welcome {user.username} </Subtitle1>
            </TopAppBarFixedAdjust>
          </React.Fragment>
        );
    }
}
 
export default NavBar;