import { useState } from 'react';
import useFetchCartItems from '../CartPageHook/useFetchCartItems';
import useGetStatesData from '../GeneralHooks/useGetStateList';
import postPlaceOrderAPI from '../../services/api/cart-apis/place-order-api';
import { toast } from 'react-toastify';
import { CONSTANTS } from '../../services/config/app-config';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { PostRazorpayAPI } from '../../services/api/checkout/post-razorpay-payment-api';
import { PostAddToCartAPI } from '../../services/api/cart-apis/add-to-cart-api';

const useCheckout = () => {
  const { cartListingItems, fetchCartListingData } = useFetchCartItems();
  const { SUMMIT_APP_CONFIG, ENABLE_PAYMENT_INTEGRATION }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { statesListLoading, statesListError, stateList } = useGetStatesData();
  const partyName = localStorage.getItem('party_name');
  const [showLocation, setShowLocation] = useState(false);
  const [orderObj, setOrderObj] = useState({
    order_id: '',
    party_name: partyName,
    shipping_address_id: '',
    billing_address_id: '',
    transporter: '',
    godown_delivery: '',
    door_delivery: '',
    location: '',
    remarks: '',
  });

  const handleUserAddressChange = (e: any, delivery_type?: any) => {
    const { name, value } = e.target;
    if (delivery_type) {
      setOrderObj((prevObj) => ({ ...prevObj, [delivery_type]: 1 }));
      if (delivery_type === 'godown_delivery') {
        setShowLocation(!showLocation);
      } else {
        setShowLocation(false);
      }
    } else {
      setOrderObj((prevObj) => ({ ...prevObj, [name]: value }));
    }
  };

  const handlePlaceOrder = async (billingAddress: string, shippingAddress: any, showBillingAddress: any) => {
    if (ENABLE_PAYMENT_INTEGRATION) {
      const param = {
        payment_gateway: 'Razorpay',
        document_type: 'Quotation',
        amount: cartListingItems?.grand_total_including_tax,
        order_id: cartListingItems?.name,
      };
      try {
        let RazorOrderPlace: any = await PostRazorpayAPI(SUMMIT_APP_CONFIG, param, tokenFromStore.token);

        if (RazorOrderPlace?.status === 200 && RazorOrderPlace?.data?.message !== 'error') {
          fetchCartListingData();
          window.location.href = `${RazorOrderPlace?.data?.message}`;
        } else {
          // setOrderSummary({});
          toast.error('Error ');
          setErrMessage(RazorOrderPlace?.data?.message?.error);
        }
      } catch (error) {
        setErrMessage('Failed to place order');
      } finally {
        setIsLoading(false);
      }
    } else {
      const params = {
        ...orderObj,
        shipping_address_id: shippingAddress,
        billing_address_id: showBillingAddress ? shippingAddress : billingAddress,
        order_id: cartListingItems.name,
      };
      try {
        let orderPlace: any = await PostAddToCartAPI(SUMMIT_APP_CONFIG, params, tokenFromStore.token);
        if (orderPlace?.status === 200 && orderPlace?.data?.message === 'success') {
          // setOrderSummary(orderSummaryData?.data?.message?.data);
          toast.success('Order place sucessfully!');
          fetchCartListingData();
        } else {
          // setOrderSummary({});
          toast.error(orderPlace?.data?.message?.error);
          setErrMessage(orderPlace?.data?.message?.error);
        }
      } catch (error) {
        setErrMessage('Failed to place order');
      } finally {
        setIsLoading(false);
      }
    }
  };
  return {
    handlePlaceOrder,
    stateList,
    handleUserAddressChange,
    showLocation,
  };
};

export default useCheckout;
