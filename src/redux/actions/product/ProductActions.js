import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const productActions = createActions({
  getCategoryRequest: (payload) => payload,
  getCategorySuccess: (payload) => payload,
  getCategoryFailure: (payload) => payload,

  createProductRequest: (payload) => payload,
  createProductSuccess: (payload) => payload,
  createProductFailure: (payload) => payload,

  setProductSuccess: (payload) => payload,

  getSellerProductRequest: (payload) => payload,
  getSellerProductSuccess: (payload) => payload,
  getSellerProductFailure: (payload) => payload,

  editProductRequest: (payload) => payload,
  editProductSuccess: (payload) => payload,
  editProductFailure: (payload) => payload,

  getCommentRequest: (payload) => payload,
  getCommentSuccess: (payload) => payload,
  getCommentFailure: (payload) => payload,

  createCommentRequest: (payload) => payload,
  createCommentSuccess: (payload) => payload,
  createCommentFailure: (payload) => payload,

  getShopRankingSalesRequest: (payload) => payload,
  getShopRankingSalesSuccess: (payload) => payload,
  getShopRankingSalesFailure: (payload) => payload,

  getShopRankingRatingRequest: (payload) => payload,
  getShopRankingRatingSuccess: (payload) => payload,
  getShopRankingRatingFailure: (payload) => payload,

  getRankingDataRequest: (payload) => payload,
  getRankingDataSuccess: (payload) => payload,
  getRankingDataFailure: (payload) => payload,

  getProductSalesDataRequest: (payload) => payload,
  getProductSalesDataSuccess: (payload) => payload,
  getProductSalesDataFailure: (payload) => payload,

  getSalesToBuyRequest: (payload) => payload,
  getSalesToBuySuccess: (payload) => payload,
  getSalesToBuyFailure: (payload) => payload,

  askOverviewAIRequest: (payload) => payload,
  askOverviewAISuccess: (payload) => payload,
  askOverviewAIFailure: (payload) => payload,
});
