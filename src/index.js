import React from "react";
import "./styles/fgpReact-BaseStyles.css";
import {Navigation} from './components/Navigation/Navigation';
import {TopNavigation} from  './components/Navigation/TopNavigation/TopNavigation';
import {SideNavigation} from  './components/Navigation/SideNavigation/SideNavigation';
import {SideNavigationItem} from  './components/Navigation/SideNavigation/SideNavigationItem/SideNavigationItem';
import {Page} from './components/Page/Page';
import {RouteWrap} from './components/RouteWrap/RouteWrap';
import {Auth} from './components/rude_auth/auth';
import {Search} from './components/Search/Search';
import {SearchRow} from './components/Search/searchrow/SearchRow';
import {ResultTable} from './components/Search/resulttable/ResultTable';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])

library.add(...iconList)



   
export { 
    Navigation,
    TopNavigation,
    SideNavigation,
    SideNavigationItem,
    RouteWrap,
    Icons,
    library,
    Page,
    Auth,
    Search,
    SearchRow,
    ResultTable
  }