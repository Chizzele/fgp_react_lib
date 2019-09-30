import React from "react";
import "./styles/fgpReact-BaseStyles.css";
import {Navigation} from './components/Navigation/Navigation';
import {TopNavigation} from  './components/Navigation/TopNavigation/TopNavigation';
import {SideNavigation} from  './components/Navigation/SideNavigation/SideNavigation';
import {SideNavigationItem} from  './components/Navigation/SideNavigation/SideNavigationItem/SideNavigationItem';
import {Page} from './components/Page/Page';
import {RouteWrap} from './components/RouteWrap/RouteWrap';
import {ProtectedRoute} from './components/ProtectedRoute/ProtectedRoute';
import {Auth} from './components/rude_auth/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])

library.add(...iconList)

import {Test} from  './components/TestOuter/Test/Test';
import {TestOuter} from './components/TestOuter/TestOuter';


   
export { 
    Navigation,
    TopNavigation,
    SideNavigation,
    SideNavigationItem,
    Test,
    ProtectedRoute,
    RouteWrap,
    TestOuter,
    Icons,
    library,
    Page,
    Auth
  }