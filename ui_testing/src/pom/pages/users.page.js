const UserSearchComponent = require('../components/users/userSearch.component');
const UsersResultsComponent = require('../components/users/userResults.component');
const UsersCardComponent = require('../components/users/usersCard.component');
const Pagination = require('../common/pagination.component');
const EditUserComponent = require('../components/users/userEdit.component');
const DeleteUserComponent = require('../common/delete.component');
const SearchUserResultComponent = require('../components/users/searchUserResult.component');
const UserCreateCardComponent = require('../components/users/userCreateCard.component');
const BasePage = require('./base.page');

class UserPage extends BasePage {
  constructor(page) {
    super(page, '/users');

    this.search = new UserSearchComponent(page);
    this.results = new UsersResultsComponent(page);
    this.pagination = new Pagination(page);
    this.editUserForm = new EditUserComponent(page);
    this.deleteUserForm = new DeleteUserComponent(page); 
    this.userCard = new UsersCardComponent(page); 
    this.searchUserResult = new SearchUserResultComponent(page);
    this.createUserForm = new UserCreateCardComponent(page);
  }

    getUserCard(index) {
        return new UsersCardComponent(this.page, index);
    }

    async getUserCardsCount(){
        const cardComponent = new UsersCardComponent(this.page);
        return await cardComponent.getCardsCount();
    }
  
}

module.exports = UserPage;
