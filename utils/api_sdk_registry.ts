const apiSdkRegistry: any = {
  'registration-api': { version: '', method: 'customer_signup', entity: 'registration' },
  'guest-login-api': { version: '', method: 'existing_user_signin', entity: 'signin' },
  'otp-login-api': { version: '', method: 'signin', entity: 'signin' },
  'google-login-api': { version: '', method: 'signin', entity: 'signin' },
  'login-api': { version: '', method: 'get_access_token', entity: 'access_token' },
  'default-currency-api': { version: '', method: 'get_default_currency', entity: 'product' },
  'multi-language-data-api': { version: '', methiod: 'get_languages', entity: 'translation' },
  'navbar-api': { version: '', method: 'get_mega_menu', entity: 'mega_menu' },
  'banner-api': { version: '', method: 'get', entity: 'banner' },
  'display-tags-api': { version: '', method: 'get_tagged_products', entity: 'product' },
  'breadcrums-api': { version: '', method: 'breadcrums', entity: 'mega_menu' },
  'get-product-listing-filters-api': { version: '', method: 'get_filters', entity: 'filter' },
  'product-list-api': { version: '', method: 'get_list', entity: 'product' },
  'catalog-product-list-api': { version: '', method: 'get_items', entity: 'catalog' },
  'brand-product-list-api': { version: '', method: 'get_list', entity: 'product' },
  'product-detail-api': { version: '', method: 'get_details', entity: 'product' },
  'product-variants-api': { version: '', method: 'get_variants', entity: 'variant' },
  'product-stock-availability': { version: '', method: 'check_availability', entity: 'product' },
  'product-matching-items': { version: '', method: 'get_recommendation', entity: 'product' },
  'product-review': { version: '', method: 'get_customer_review', entity: 'customer_review' },
  'add-product-review': { version: '', method: 'create_customer_review', entity: 'customer_review' },
  'get-wishlist-items-api': { version: '', method: 'get_wishlist_items', entity: 'wishlist' },
  'add-item-to-wishlist-api': { version: '', method: 'add_to_wishlist', entity: 'wishlist' },
  'remove-item-from-wishlist-api': { version: '', method: 'remove_from_wishlist', entity: 'wishlist' },
  'get-cart-list-items-api': { version: '', method: 'get_list', entity: 'cart' },
  'add-cart-api': { version: '', method: 'put_products', entity: 'cart' },
  'clear-cart-api': { version: '', method: 'clear_cart', entity: 'cart' },
  'remove-single-item-cart-api': { version: '', method: 'delete_products', entity: 'cart' },
  'order-list-api': { version: '', method: 'get_list', entity: 'order' },
  'order-detail-api': { version: '', method: 'get_order_details', entity: 'order' },
  'order-reports-api': { version: '', method: 'report_data', entity: 'sales_order_report' },
};

export default apiSdkRegistry;
