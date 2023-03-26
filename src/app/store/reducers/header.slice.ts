import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { cmsQueryExecute } from "../../helpers/cmsHelper";
import { AppThunk } from "../services/beers/reducers/beer.slice";

interface IArticle {
    id: number,
    articleName: string
}

interface ISocialNetwork {
    id: number,
    link: string,
    name: string
}

interface IPhone {
    id: number,
    number: string
}

interface IinitialState {
    phone: string,
    address:string,
    linkForAddress: string,
    socialNetworkName: string,
    socialNetworkLink: string,
    phoneList: IPhone[],
    socialNetworksList: ISocialNetwork[],
    articlesList: IArticle[]
}

const initialState:IinitialState = {
    phone: "",
    address: "",
    linkForAddress: "",
    socialNetworkName: "",
    socialNetworkLink: "",
    phoneList: [],
    socialNetworksList: [],
    articlesList: []
};

export const headerSlice = createSlice({
    name: 'headerData',
    initialState,
    reducers: {
        setHeaderState: (state, action) => {
            const payload = action.payload;
            state.phone = payload.phone;
            state.address = payload.address;
            state.linkForAddress = payload.linkForAddress;
            state.socialNetworkName = payload.socialNetworkName;
            state.socialNetworkLink = payload.socialNetworkLink;
        },
        setPhonesList: (state, action) => {
            state.phoneList = action.payload;
        },
        setSocialNetworks: (state, action) => {
            state.socialNetworksList = action.payload;
        },
        setArticlesList: (state, action) => {
            state.articlesList = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            const hydrateObject = {
                ...state,
                ...action.payload.subject,
            };

            if (action.payload.headerReducer.phone) {
                hydrateObject.phone = action.payload.headerReducer.phone;
                hydrateObject.address = action.payload.headerReducer.address;
                hydrateObject.linkForAddress = action.payload.headerReducer.linkForAddress;
                hydrateObject.socialNetworkName = action.payload.headerReducer.socialNetworkName;
                hydrateObject.socialNetworkLink = action.payload.headerReducer.socialNetworkLink;
            }

            if (action.payload.headerReducer.socialNetworksList) {
                hydrateObject.socialNetworksList = action.payload.headerReducer.socialNetworksList;
            }

            if (action.payload.headerReducer.phoneList) {
                hydrateObject.phoneList = action.payload.headerReducer.phoneList;
            }

            if (action.payload.headerReducer.articlesList) {
                hydrateObject.articlesList = action.payload.headerReducer.articlesList;
            }

            return hydrateObject;
        }
    }
});

export const fetchHeaderData = (): AppThunk => async dispatch => {
    let data = await cmsQueryExecute('/api/header');
    if (!data) {
        data = {
            phone: "+7 920 899-77-72",
            address: "ул. Братьев Луканиных, 7, Калуга",
            linkForAddress: "https://yandex.ru/maps/org/pivgrad/215648184161/?ll=36.180887%2C54.497520&z=17.09",
            socialNetworkName: "ВКонтакте",
            socialNetworkLink: "https://vk.com/id474817801" 
        };
    }

    dispatch(headerSlice.actions.setHeaderState(data));
}

export const fetchPhonesList = (): AppThunk => async dispatch => {
    let data = await cmsQueryExecute('/api/phone-numbers');
    if (!data) {
        data = [{id: "1", number:"+7 920 899-77-72"}];
    }

    dispatch(headerSlice.actions.setPhonesList(data));
    
}

export const fetchSocialNetworks = (): AppThunk => async dispatch => {
    let data = await cmsQueryExecute('/api/social-networks');
    if (!data) {
        data = [{id: "1", name: "ВКонтакте", link:"https://vk.com/id474817801"}];
    }

    dispatch(headerSlice.actions.setSocialNetworks(data));
}

export const fetchArticlesList = (): AppThunk => async dispatch => {
    let articles = await cmsQueryExecute(`/api/articles-for-customers/`);
    if (!articles) {
        articles = [
            {id: "1", articleName: "Политика конфеденциальности", link:""},
            {id: "2", articleName: "Как оформить заказ", link:""},
        ];
    }
  
    dispatch(headerSlice.actions.setArticlesList(articles));
}

export const headerReducer = headerSlice.reducer;
export const headerActions = headerSlice.actions;