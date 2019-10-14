<h1> Future Grid <br>
React Library Guide </h1>

<li> [Summary](#summary) </li>
<li> [Quick Start](#quick-start) </li>
<li> [Components](#components) </li>



## Summary
<p> The following guid will allow you to install and get acquainted with the Future Grid React Library <br>
    The library is host to a multitude of components written in <code>React 16.0</code> which help make up the out of the box <i> Compass </i> User Interface that is deployed with the Future Grid Application.
    <br>
    The components listed are in alphabetical order however a shortened list below has been created that form the basis of the most used components in the library which you can navigate to or search on immediately, these include.
    <ul>
      <li>
        <code>Navigation</code>
      </li>
      <li>
        <code>Page</code>
      </li>
      <li>
        <code>DevicePage</code>
      </li>
    </ul>
</p>

## Quick Start
<p>
  This is an example of how to use the FGP React Library, you should be able to create a project just like this one running in a matter of minutes.
  <br>
  In this guide it is assumed you have <b><i>npm</i></b> installed .
</p>
<ul>
  <li>
    <h5> Step 1 - Setting up a React app</h5>
    <span> Firstly, create a new <code>React</code> application using the following command in your terminal, if you already have an existing <code>React</code> app, you can skip this step. </span>
    <br>
    <code>$ npx create-react-app < your-app-name ></code>
    <br>
    You will then want to navigate into the directory of whatever you have named your app
  </li>
  <li>
    <h5> Step 2 - Installing the package</h5>
    <span> Run the following command from the terminal to install the Future Grid React Library, ensuring that you have root permissions to do so, ensure that you have by using <i>sudo</i></span>
    <br>
    <code>$ sudo npm i @chizzele-/fgp_react_lib</code>
    <br>
  </li>
  <li>
    <h5> Step 3 - Import some components into your <i>App.js</i> file</h5>
    <span> At the very top of your <i>App.js</i> file you will find the standard <code>React</code> imports, underneath these you should include the following import to get you started</span>
    <br>
      <code>
        import {RouteWrap, Page, Navigation} from '@chizzele-/fgp_react_lib';
      </code>
    <br>
  </li>
  <li>
    <h5> Step 4 - Setting up the components</h5>
    <span> When using the Future Grid Component Library, if your application requires routing, more than a single page or a navigation, it is recommended to follow the following structure inside the <code>return()</code> <i>App.js</i> If you have built a new app, you may find that a div with a className of App is present, place the following component structure inside those tags</span>
    <br>
    <code>
    < RouteWrap > <br>
    &nbsp;&nbsp;< Page  >
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;< Navigation />
    <br>
    &nbsp;&nbsp;</ Page >
    <br>
    </ RouteWrap >
    </code><br>
    Next we need to configure these components by passing through props so they work as we want.
  </li>
  <li>
    <h5> Step 6 - Configuring the components </h5>
    <span> Now that the components have been included in your project you can begin to use them. In this quickstart guide we will be using the 3 building block components to get a simple page working, these are the 3 imported and included in the last step, <i>RouteWrap, Page </i> and <i> Navigation</i> </span>. For more information on the implementation and usage of these components please refer to sections dedicated to these components further in this document.
    <br>
    <br>
    Firstly, lets give our <i>Page</i> component the following props, <br>
    <code>
      < Page exact path={"/"} >
    </code>
    <br>
    <br>
    Next, lets fill out the <i>Navigation</i> component that is nested inside the <i>Page</i> component.
    <br>
    <code>
      < Navigation <br>
      &nbsp;&nbsp;topNavTitle={"Home Title"}<br>
      &nbsp;&nbsp;sideNavLogo={logo}<br>
      &nbsp;&nbsp;currentPage={"/"}<br>
      &nbsp;&nbsp;items={navItems}<br>
      />
    </code>
    <br>
    before we put out first component on the page, we will need to define a variable that will hold our navigation links and their properties, you can do this whichever way you please, in fact you could type them out every time in the <code>Navigation</code> component itself each time you use it, but this can become cumbersome, instead, it is recommended to declare a <code>const</code> or <code>var</code> to hold these links for easier modification, and consistency in your configuration of the properties of the <code>Navigation</code> component. Here is an example, written inside the <code>App()</code> function found in <i>App.js</i>.
    <br>
    <code>
      const navigationItems = [{ <br>
        &nbsp;&nbsp;key:"home01"<br>
        &nbsp;&nbsp;linkTo:"/Home",<br>
        &nbsp;&nbsp;fontAwesomeIcon:"home",<br>
        &nbsp;&nbsp;fontAwesomeLib:"fa",<br>
        &nbsp;&nbsp;description: "Home"<br>
      }];
    </code>

  </li>

</ul>
