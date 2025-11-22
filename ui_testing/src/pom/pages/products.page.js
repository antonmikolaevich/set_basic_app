const ProductsSearchComponent = require('../components/products/productSearch.component');
const ProductsResultsComponent = require('../components/products/productResults.component');
const ProductsCardComponent = require('../components/products/productCard.component');
const Pagination = require('../common/pagination.component');
const EditProductComponent = require('../components/products/productEdit.component');
const DeleteProductComponent = require('../components/products/productDelete.component');
const SearchProductsResultComponent = require('../components/products/productSearchResult.component');
const ProductCreateCardComponent = require('../components/products/productCreateCard.component');
const BasePage = require('./base.page');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page, '/products');

    this.search = new ProductsSearchComponent(page);
    this.results = new ProductsResultsComponent(page);
    this.pagination = new Pagination(page);
    this.editProductForm = new EditProductComponent(page);
    this.deleteProductForm = new DeleteProductComponent(page); 
    this.productCard = new ProductsCardComponent(page); 
    this.searchProductResult = new SearchProductsResultComponent(page);
    this.createProductForm = new ProductCreateCardComponent(page);
  }

    getProductsCard(index) {
        return new ProductsCardComponent(this.page, index);
    }

    async getProductsCardsCount(){
        const cardComponent = new ProductsCardComponent(this.page);
        return await cardComponent.getProductsCard();
    }
  
}

module.exports = ProductsPage;
