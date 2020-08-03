import React from 'react';
import {useObserver} from 'mobx-react-lite';
import {TStore} from '@/components/Provider/Provider';
import {Decrypt, Encrypt} from '@/utils/js-aes';

/**
 * @File: index.ts
 * @Author: Ux
 * @Date: 2020/7/27
 * @Description: createStore(状态集)| TStore(状态集类型)| storeContext（context对象）|
 */
// storeContext（context对象）
export const storeContext = React.createContext<TStore | null>(null);

// 封装mobx 自定义Hook
const useStoreData = <ContextData, Store, Selection>(
    context: React.Context<ContextData>,
    storeSelector: (contextData: ContextData) => Store,
    dataSelector: (store: Store) => Selection
) => {
    const value = React.useContext(context);
    if (!value) {
        throw new Error();
    }
    const store = storeSelector(value);
    return useObserver(() => {
        return dataSelector(store);
    });
};

/**
 * 自定义hook，取store
 * @param dataSelector store=>({user: store.user}) || store=>store.user
 * ____________
 * const {user} = useStore(store=>({user: store.user}))
 * const user = useStore(store=>store.user)
 */
export const useStore = <Selection>(
    dataSelector: (store: TStore) => Selection
) =>
    useStoreData(storeContext, contextData => contextData!, dataSelector);

const Session = window.sessionStorage;

export const persist = (...a: any) => {
    console.log(a);
    /*
        const obj:{[name:string]:any} = {}
        for(const key in a[0]){
            obj[key] =  a[0][key]
        }
        Session.setItem( a[0].constructor.name,JSON.stringify(obj));
        */
};

/**
 * 初始化数据store
 */
export const setModule = () => {
    return (target: any) => {
        const module = Session.getItem(target.name);
        if (module) {
            for (const key in target.prototype) {
                target.prototype[key] = JSON.parse(Decrypt(module))[key];
            }
        } else {
            const obj: { [name: string]: any } = {};
            for (const key in target.prototype) {
                obj[key] = target.prototype[key];
            }
            Session.setItem(target.name, Encrypt(JSON.stringify(obj)));
        }
    };
};

/**
 * 更新SessionStorage中的数据
 * @param module
 * @param item
 * @param value
 */
export const setItem = (module: string, key: string, value: any) => {
    const store = JSON.parse(Decrypt(Session.getItem(module)));
    store[key] = value
    Session.setItem(module, Encrypt(JSON.stringify(store)));
};