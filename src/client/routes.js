import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';


// global components
import AppIndex from './app/AppIndex';
import NotFound from './app/NotFound';


// frontend/auth
import Login from './frontend/auth/components/Login';
import Logout from './frontend/auth/components/Logout';
import Register from './frontend/auth/components/Register';
import ForgotPassword from './frontend/auth/components/ForgotPassword';
import ResetPassword from './frontend/auth/components/ResetPassword';



/**********************************************

================ ADMIN

**********************************************/

// global admin components
import AdminIndex from './app/admin/AdminIndex';
import AdminNotFound from './app/admin/AdminNotFound';


// admin/dashboard
import AdminDashboard from './admin/dashboard/components/AdminDashboard';

// admin/announcements
import AdminAnnouncement from './admin/announcements/components/AdminAnnouncement';
import AdminAnnouncementList from './admin/announcements/components/AdminAnnouncementList';
import AdminNewAnnouncement from './admin/announcements/components/AdminNewAnnouncement';
import AdminEditAnnouncement from './admin/announcements/components/AdminEditAnnouncement';
import AdminDeleteAnnouncement from './admin/announcements/components/AdminDeleteAnnouncement';


// admin/categories
import AdminCategory from './admin/categories/components/AdminCategory';
import AdminCategoryList from './admin/categories/components/AdminCategoryList';
import AdminNewCategory from './admin/categories/components/AdminNewCategory';
import AdminEditCategory from './admin/categories/components/AdminEditCategory';
import AdminDeleteCategory from './admin/categories/components/AdminDeleteCategory';


// admin/media
import AdminMedia from './admin/media/components/AdminMedia';
import AdminMediaList from './admin/media/components/AdminMediaList';
import AdminNewMedia from './admin/media/components/AdminNewMedia';
import AdminEditMedia from './admin/media/components/AdminEditMedia';
import AdminDeleteMedia from './admin/media/components/AdminDeleteMedia';


// admin/posts
import AdminPost from './admin/posts/components/AdminPost';
import AdminPostList from './admin/posts/components/AdminPostList';
import AdminNewPost from './admin/posts/components/AdminNewPost';
import AdminEditPost from './admin/posts/components/AdminEditPost';
import AdminDeletePost from './admin/posts/components/AdminDeletePost';


// admin/services
import AdminService from './admin/services/components/AdminService';
import AdminServiceList from './admin/services/components/AdminServiceList';
import AdminNewService from './admin/services/components/AdminNewService';
import AdminEditService from './admin/services/components/AdminEditService';
import AdminDeleteService from './admin/services/components/AdminDeleteService';


// admin/settings
import AdminSettings from './admin/settings/components/AdminSettings';


import {
  // store index
  AdminStore,
  // coupons
  AdminCoupon,
  AdminCouponList,
  AdminNewCoupon,
  AdminEditCoupon,
  AdminDeleteCoupon,
  // orders
  AdminOrder,
  AdminOrderList,
  AdminNewOrder,
  AdminEditOrder,
  AdminDeleteOrder,
  // products
  AdminProduct,
  AdminProductList,
  AdminNewProduct,
  AdminEditProduct,
  AdminDeleteProduct,
} from './admin/store/index';



// // admin/store/store
// import AdminStore from './admin/store/AdminStore';

// admin/store/coupons
// import AdminCoupon from './admin/store/coupons/components/AdminCoupon';
// import AdminCouponList from './admin/store/coupons/components/AdminCouponList';
// import AdminNewCoupon from './admin/store/coupons/components/AdminNewCoupon';
// import AdminEditCoupon from './admin/store/coupons/components/AdminEditCoupon';
// import AdminDeleteCoupon from './admin/store/coupons/components/AdminDeleteCoupon';

// // admin/store/orders
// import AdminOrder from './admin/store/orders/components/AdminOrder';
// import AdminOrderList from './admin/store/orders/components/AdminOrderList';
// import AdminNewOrder from './admin/store/orders/components/AdminNewOrder';
// import AdminEditOrder from './admin/store/orders/components/AdminEditOrder';
// import AdminDeleteOrder from './admin/store/orders/components/AdminDeleteOrder';


// // admin/store/products
// import AdminProduct from './admin/store/products/components/AdminProduct';
// import AdminProductList from './admin/store/products/components/AdminProductList';
// import AdminNewProduct from './admin/store/products/components/AdminNewProduct';
// import AdminEditProduct from './admin/store/products/components/AdminEditProduct';
// import AdminDeleteProduct from './admin/store/products/components/AdminDeleteProduct';


// admin/users
import AdminUser from './admin/users/components/AdminUser';
import AdminUserList from './admin/users/components/AdminUserList';
import AdminNewUser from './admin/users/components/AdminNewUser';
import AdminEditUser from './admin/users/components/AdminEditUser';
import AdminDeleteUser from './admin/users/components/AdminDeleteUser';






// router
export default (
  <Route path="/" component={AppIndex}>
    <IndexRoute component={Login} />


    {/* Admin Routes */}
    <Route path="admin" component={AdminIndex}>
      <IndexRoute component={AdminDashboard} />

      {/***  admin/announcements  ***/}
      <Route path="announcements">
        <IndexRoute component={AdminAnnouncementList} />
        <Route path=":slug" component={AdminAnnouncement} />
        <Route path="new" component={AdminNewAnnouncement} />
        <Route path=":slug/edit" component={AdminEditAnnouncement} />
        <Route path=":slug/delete" component={AdminDeleteAnnouncement} />
      </Route>

      {/***  admin/categories  ***/}
      <Route path="categories">
        <IndexRoute component={AdminCategoryList} />
        <Route path=":slug" component={AdminCategory} />
        <Route path="new" component={AdminNewCategory} />
        <Route path=":slug/edit" component={AdminEditCategory} />
        <Route path=":slug/delete" component={AdminDeleteCategory} />
      </Route>


      {/***  admin/media  ***/}
      <Route path="media">
        <IndexRoute component={AdminMediaList} />
        <Route path=":slug" component={AdminMedia} />
        <Route path="new" component={AdminNewMedia} />
        <Route path=":slug/edit" component={AdminEditMedia} />
        <Route path=":slug/delete" component={AdminDeleteMedia} />
      </Route>


      {/***  admin/posts  ***/}
      <Route path="posts">
        <IndexRoute component={AdminPostList} />
        <Route path=":slug" component={AdminPost} />
        <Route path="new" component={AdminNewPost} />
        <Route path=":slug/edit" component={AdminEditPost} />
        <Route path=":slug/delete" component={AdminDeletePost} />
      </Route>


      {/***  admin/services  ***/}
      <Route path="services">
        <IndexRoute component={AdminServiceList} />
        <Route path=":slug" component={AdminService} />
        <Route path="new" component={AdminNewService} />
        <Route path=":slug/edit" component={AdminEditService} />
        <Route path=":slug/delete" component={AdminDeleteService} />
      </Route>


      {/***  admin/users  ***/}
      <Route path="users">
        <IndexRoute component={AdminUserList} />
        <Route path=":slug" component={AdminUser} />
        <Route path="new" component={AdminNewUser} />
        <Route path=":slug/edit" component={AdminEditUser} />
        <Route path=":slug/delete" component={AdminDeleteUser} />
      </Route>


      {/***  admin/settings  ***/}
      <Route path="settings">
        <IndexRoute component={AdminSettings} />
      </Route>


      {/***  admin/store  ***/}
      <Route path="store">
        <IndexRoute component={AdminStore} />

        <Route path="coupons">
          <IndexRoute component={AdminCouponList} />
          <Route path=":slug" component={AdminCoupon} />
          <Route path="new" component={AdminNewCoupon} />
          <Route path=":slug/edit" component={AdminEditCoupon} />
          <Route path=":slug/delete" component={AdminDeleteCoupon} />
        </Route>

        <Route path="orders">
          <IndexRoute component={AdminOrderList} />
          <Route path=":slug" component={AdminOrder} />
          <Route path="new" component={AdminNewOrder} />
          <Route path=":slug/edit" component={AdminEditOrder} />
          <Route path=":slug/delete" component={AdminDeleteOrder} />
        </Route>

        <Route path="products">
          <IndexRoute component={AdminProductList} />
          <Route path=":slug" component={AdminProduct} />
          <Route path="new" component={AdminNewProduct} />
          <Route path=":slug/edit" component={AdminEditProduct} />
          <Route path=":slug/delete" component={AdminDeleteProduct} />
        </Route>


      </Route> 
      {/***  end of admin/store  ***/}

      {/* Admin Not Found Route */}
      <Route path="*" component={AdminNotFound} />

    </Route> 
    {/***  end of admin/  ***/}







    {/* Not Found Route */}
    <Route path="*" component={NotFound} />
  </Route>
);
