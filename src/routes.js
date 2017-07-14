import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';


// global components
import AppIndex from './app/AppIndex';
import NotFound from './app/NotFound';


// frontend/auth
import {
  Login,
  Logout,
  ForgotPassword,
  ResetPassword
} from './auth/index';


import {

  // dashboard index
  Dashboard,

  // announcements
  SingleAnnouncement,
  AnnouncementList,
  NewAnnouncement,

  // categories
  Category,
  CategoryList,
  NewCategory,

  // email
  Email,

  // media
  Media,
  MediaList,
  NewMedia,

  // posts
  SinglePost,
  PostList,
  NewPost,

  // services
  SingleService,
  ServiceList,
  NewService,

  // settings
  Settings,


  // store index
  Store,
  
  // store/coupons
  SingleCoupon,
  CouponList,
  NewCoupon,
  
  // store/orders
  SingleOrder,
  OrderList,
  NewOrder,

  // store/products
  SingleProduct,
  ProductList,
  NewProduct,

  // users
  SingleUser,
  UserList,
  NewUser

} from './admin/index';







// router
export default (
  <Route path="/">
    <IndexRoute component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="forgot-password" component={ForgotPassword} />
    <Route path="reset-password:token" component={ResetPassword} />


    {/* Admin Routes */}
    <Route path="admin" component={AppIndex}>
      <IndexRoute component={Dashboard} />

      {/***  admin/announcements  ***/}
      <Route path="announcements">
        <IndexRoute component={AnnouncementList} />
        <Route path="new" component={NewAnnouncement} />
        <Route path=":slug" component={SingleAnnouncement} />
      </Route>

      {/***  admin/categories  ***/}
      <Route path="categories">
        <IndexRoute component={CategoryList} />
        <Route path="new" component={NewCategory} />
        <Route path=":slug" component={Category} />
      </Route>

      {/***  admin/email  ***/}
      <Route path="email">
        <IndexRoute component={Email} />
      </Route>



      {/***  admin/media  ***/}
      <Route path="media">
        <IndexRoute component={MediaList} />
        <Route path="new" component={NewMedia} />
        <Route path=":slug" component={Media} />
      </Route>


      {/***  admin/posts  ***/}
      <Route path="posts">
        <IndexRoute component={PostList} />
        <Route path="new" component={NewPost} />
        <Route path=":slug" component={SinglePost} />
      </Route>


      {/***  admin/services  ***/}
      <Route path="services">
        <IndexRoute component={ServiceList} />
        <Route path="new" component={NewService} />
        <Route path=":slug" component={SingleService} />
      </Route>


      {/***  admin/users  ***/}
      <Route path="users">
        <IndexRoute component={UserList} />
        <Route path="new" component={NewUser} />
        <Route path=":slug" component={SingleUser} />
      </Route>


      {/***  admin/settings  ***/}
      <Route path="settings">
        <IndexRoute component={Settings} />
      </Route>


      {/***  admin/store  ***/}
      <Route path="store">
        <IndexRoute component={Store} />

        <Route path="coupons">
          <IndexRoute component={CouponList} />
          <Route path="new" component={NewCoupon} />
          <Route path=":slug" component={SingleCoupon} />
        </Route>

        <Route path="orders">
          <IndexRoute component={OrderList} />
          <Route path="new" component={NewOrder} />
          <Route path=":slug" component={SingleOrder} />
        </Route>

        <Route path="products">
          <IndexRoute component={ProductList} />
          <Route path="new" component={NewProduct} />
          <Route path=":slug" component={SingleProduct} />
        </Route>


      </Route>
      {/***  end of admin/store  ***/}

      {/* Admin Not Found Route */}
      <Route path="*" component={NotFound} />

    </Route>
    {/***  end of admin/  ***/}








    {/* Not Found Route */}
    <Route path="*" component={NotFound} />
  </Route>
);
