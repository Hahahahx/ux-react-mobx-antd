import { action, computed, observable, runInAction } from 'mobx'


export class UserModule {

    @observable
    user = 'asd'


    @observable
    userList = ['kk', 'cc']



    @action
    setUser = () => {
        console.log('beizhixing ')
        this.user = 'adgadg'
    }

    @action
    setUserList = () => {
        this.userList = ['dd', 'cc', 'as']
    }
}
