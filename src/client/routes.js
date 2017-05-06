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
  Dashboard
} from './admin/dashboard/index';

// announcements
import {
  Announcement,
  AnnouncementList,
  NewAnnouncement,
  EditAnnouncement
} from './admin/announcements/index';


// categories
import {
  Category,
  CategoryList,
  NewCategory,
  EditCategory
} from './admin/categories/index';


// media
import {
  Media,
  MediaList,
  NewMedia,
  EditMedia
} from './admin/media/index';


// posts
import {
  Post,
  PostList,
  NewPost,
  EditPost
} from './admin/posts/index';


// services
import {
  Service,
  ServiceList,
  NewService,
  EditService
} from './admin/services/index';


// settings
import {
  Settings
} from './admin/settings/index';


// store
import {
  // store index
  Store,
  // coupons
  Coupon,
  CouponList,
  NewCoupon,
  EditCoupon,
  // orders
  Order,
  OrderList,
  NewOrder,
  EditOrder,
  // products
  Product,
  ProductList,
  NewProduct,
  EditProduct,
} from './admin/store/index';



// admin/users
import {
  User,
  UserList,
  NewUser,
  EditUser
} from './admin/users/index';






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
        <Route path=":slug" component={Announcement} />
        <Route path="new" component={NewAnnouncement} />
        <Route path=":slug/edit" component={EditAnnouncement} />
      </Route>

      {/***  admin/categories  ***/}
      <Route path="categories">
        <IndexRoute component={CategoryList} />
        <Route path=":slug" component={Category} />
        <Route path="new" component={NewCategory} />
        <Route path=":slug/edit" component={EditCategory} />
      </Route>


      {/***  admin/media  ***/}
      <Route path="media">
        <IndexRoute component={MediaList} />
        <Route path=":slug" component={Media} />
        <Route path="new" component={NewMedia} />
        <Route path=":slug/edit" component={EditMedia} />
      </Route>


      {/***  admin/posts  ***/}
      <Route path="posts">
        <IndexRoute component={PostList} />
        <Route path=":slug" component={Post} />
        <Route path="new" component={NewPost} />
        <Route path=":slug/edit" component={EditPost} />
      </Route>


      {/***  admin/services  ***/}
      <Route path="services">
        <IndexRoute component={ServiceList} />
        <Route path=":slug" component={Service} />
        <Route path="new" component={NewService} />
        <Route path=":slug/edit" component={EditService} />
      </Route>


      {/***  admin/users  ***/}
      <Route path="users">
        <IndexRoute component={UserList} />
        <Route path=":slug" component={User} />
        <Route path="new" component={NewUser} />
        <Route path=":slug/edit" component={EditUser} />
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
          <Route path=":slug/edit" component={EditCoupon} />
        </Route>

        <Route path="orders">
          <IndexRoute component={OrderList} />
          <Route path=":slug" component={Order} />
          <Route path="new" component={NewOrder} />
          <Route path=":slug/edit" component={EditOrder} />
        </Route>

        <Route path="products">
          <IndexRoute component={ProductList} />
          <Route path=":slug" component={Product} />
          <Route path="new" component={NewProduct} />
          <Route path=":slug/edit" component={EditProduct} />
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
