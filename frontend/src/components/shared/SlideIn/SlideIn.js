import ProfilePic from "../ProfilePic";
import {
    DisplayFlex,
    DisplayIcon,
    FollowerStats,
    FullName,
    Header, InfoIcon, ListIcon, LogOutIcon,
    Navigation, NavigationContainer,
    NavItems, ProfileIcon,
    StatsFlex,
    UserInfo,
    UserName,
    Wrapper
} from "./SlideIn.styling";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, slideInMenu} from "../../utils/SharedStates";

const SlideIn = () => {
    const [userData,setUserData] = useRecoilState(loggedInUser);
    const [showMenu, setShowMenu] = useRecoilState(slideInMenu);
    const navigator = useNavigate();

    const toProfile = () => {
        setShowMenu(false);
        navigator(`/profile/${userData._id}`)
    }

    const logoutHandler = () => {
        setUserData({});
        localStorage.clear();
        navigator('/')
    }

    return <Wrapper showMenu={showMenu}>
        <Header>
            <h3>Account Info</h3>
            <span onClick={()=> setShowMenu(false)}>X</span>
        </Header>
        <UserInfo>
            <ProfilePic/>
            <FullName>First Name Last Name</FullName>
            <UserName>@Username</UserName>
            <FollowerStats>
                <StatsFlex><span>0</span><p>Following</p></StatsFlex>
                <StatsFlex><span>0</span><p>Followers</p></StatsFlex>
            </FollowerStats>
        </UserInfo>
        <NavigationContainer>
            <Navigation>
                <NavItems onClick={toProfile}><ProfileIcon size={24}/><span>Profile</span></NavItems>
                <NavItems><ListIcon size={24}></ListIcon><span>Lists</span></NavItems>
            </Navigation>
            <Navigation>
                <NavItems><InfoIcon size={24}/><span>About Tweety</span></NavItems>
            </Navigation>
            <Navigation>
                <NavItems><DisplayIcon size={24}/>
                    <DisplayFlex><span>Dark Mode</span><input type="checkbox"/></DisplayFlex>
                </NavItems>
                <NavItems onClick={logoutHandler}>
                    <LogOutIcon size={24}/> <span>Logout</span>
                </NavItems>
            </Navigation>
        </NavigationContainer>
    </Wrapper>
}

export default SlideIn;