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


/**********************************************

================ ADMIN

**********************************************/



// dashboard
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
  Post,
  PostList,
  NewPost,

  // services
  Service,
  ServiceList,
  NewService,

  // settings
  Settings,


  // store index
  Store,
  
  // store/coupons
  Coupon,
  CouponList,
  NewCoupon,
  
  // store/orders
  Order,
  OrderList,
  NewOrder,

  // store/products
  Product,
  ProductList,
  NewProduct,

  // users
  User,
  UserList,
  NewUser,
  EditUser

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
        <Route path=":slug" component={SingleAnnouncement} />
        <Route path="new" component={NewAnnouncement} />
      </Route>

      {/***  admin/categories  ***/}
      <Route path="categories">
        <IndexRoute component={CategoryList} />
        <Route path=":slug" component={Category} />
        <Route path="new" component={NewCategory} />
      </Route>

      {/***  admin/email  ***/}
      <Route path="email">
        <IndexRoute component={Email} />
      </Route>



      {/***  admin/media  ***/}
      <Route path="media">
        <IndexRoute component={MediaList} />
        <Route path=":slug" component={Media} />
        <Route path="new" component={NewMedia} />
      </Route>


      {/***  admin/posts  ***/}
      <Route path="posts">
        <IndexRoute component={PostList} />
        <Route path=":slug" component={Post} />
        <Route path="new" component={NewPost} />
      </Route>


      {/***  admin/services  ***/}
      <Route path="services">
        <IndexRoute component={ServiceList} />
        <Route path=":slug" component={Service} />
        <Route path="new" component={NewService} />
      </Route>


      {/***  admin/users  ***/}
      <Route path="users">
        <IndexRoute component={UserList} />
        <Route path=":slug" component={User} />
        <Route path="new" component={NewUser} />
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
          <Route path=":slug" component={Coupon} />
          <Route path="new" component={NewCoupon} />
        </Route>

        <Route path="orders">
          <IndexRoute component={OrderList} />
          <Route path=":slug" component={Order} />
          <Route path="new" component={NewOrder} />
        </Route>

        <Route path="products">
          <IndexRoute component={ProductList} />
          <Route path=":slug" component={Product} />
          <Route path="new" component={NewProduct} />
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
